-- POWER NUTRI HUB — foundation schema
-- Apply in Supabase SQL Editor or with Supabase CLI migrations.
-- This migration creates operational tables only; it does not create marketplace credentials
-- or assume supplier/marketplace API access.

create extension if not exists pgcrypto;

create type public.app_role as enum ('admin', 'supplier');
create type public.order_status as enum (
  'awaiting_payment', 'paid', 'sent_to_supplier', 'supplier_confirmed',
  'picking', 'dispatched', 'in_transit', 'delivered', 'cancelled',
  'return_requested', 'refunded', 'operational_failure'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role public.app_role not null default 'supplier',
  supplier_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_email text,
  active boolean not null default true,
  preparation_days integer check (preparation_days is null or preparation_days >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
  add constraint profiles_supplier_fk foreign key (supplier_id)
  references public.suppliers(id) on delete set null;

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid references public.suppliers(id) on delete restrict,
  category_id uuid references public.categories(id) on delete set null,
  brand_id uuid references public.brands(id) on delete set null,
  sku text not null unique,
  name text not null,
  description text not null default '',
  image_urls text[] not null default '{}',
  cost_price numeric(12,2) check (cost_price is null or cost_price >= 0),
  sale_price numeric(12,2) check (sale_price is null or sale_price >= 0),
  stock_available integer not null default 0 check (stock_available >= 0),
  stock_reserved integer not null default 0 check (stock_reserved >= 0),
  weight_grams integer check (weight_grams is null or weight_grams > 0),
  dimensions jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft','active','inactive','out_of_stock')),
  marketplace_item_id text,
  supplier_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (stock_reserved <= stock_available)
);

create index products_supplier_idx on public.products(supplier_id);
create index products_status_idx on public.products(status);
create index products_marketplace_idx on public.products(marketplace_item_id);

create table public.price_rules (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  marketplace_fee_percent numeric(7,4) not null default 0 check (marketplace_fee_percent between 0 and 100),
  tax_percent numeric(7,4) not null default 0 check (tax_percent between 0 and 100),
  shipping_cost numeric(12,2) not null default 0 check (shipping_cost >= 0),
  operating_cost numeric(12,2) not null default 0 check (operating_cost >= 0),
  minimum_margin_percent numeric(7,4) not null default 0 check (minimum_margin_percent between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (category_id is not null or product_id is not null)
);

create table public.sales_orders (
  id uuid primary key default gen_random_uuid(),
  marketplace text not null default 'mercado_livre',
  marketplace_order_id text not null,
  buyer_reference text,
  status public.order_status not null default 'awaiting_payment',
  total_amount numeric(12,2) check (total_amount is null or total_amount >= 0),
  currency char(3) not null default 'BRL',
  shipping_reference text,
  tracking_code text,
  carrier text,
  paid_at timestamptz,
  dispatched_at timestamptz,
  delivered_at timestamptz,
  raw_marketplace_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (marketplace, marketplace_order_id)
);

create table public.sales_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.sales_orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  sku_snapshot text not null,
  product_name_snapshot text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  created_at timestamptz not null default now()
);

create table public.supplier_order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.sales_orders(id) on delete cascade,
  supplier_id uuid not null references public.suppliers(id) on delete restrict,
  event_type text not null check (event_type in ('forwarded','accepted','unavailable','picking','dispatched','tracking_updated','note')),
  note text,
  carrier text,
  tracking_code text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.sync_runs (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid references public.suppliers(id) on delete set null,
  source_type text not null check (source_type in ('csv','xlsx','api','feed','manual')),
  status text not null default 'running' check (status in ('running','success','partial','failed')),
  rows_seen integer not null default 0 check (rows_seen >= 0),
  rows_created integer not null default 0 check (rows_created >= 0),
  rows_updated integer not null default 0 check (rows_updated >= 0),
  rows_rejected integer not null default 0 check (rows_rejected >= 0),
  error_summary text,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  entity_table text not null,
  entity_id text not null,
  action text not null,
  change_summary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array['profiles','suppliers','products','price_rules','sales_orders'] loop
    execute format('create trigger %I_set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t, t);
  end loop;
end $$;

create or replace function public.current_app_role()
returns public.app_role
language sql stable security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.current_supplier_id()
returns uuid
language sql stable security definer
set search_path = public
as $$
  select supplier_id from public.profiles where id = auth.uid()
$$;

alter table public.profiles enable row level security;
alter table public.suppliers enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.price_rules enable row level security;
alter table public.sales_orders enable row level security;
alter table public.sales_order_items enable row level security;
alter table public.supplier_order_events enable row level security;
alter table public.sync_runs enable row level security;
alter table public.audit_log enable row level security;

-- Admin access is intentionally explicit. Supplier users see only their own profile,
-- supplier-scoped catalog and order events; they do not see sales totals or internal pricing.
create policy "profiles_read_self_or_admin" on public.profiles
for select using (id = auth.uid() or public.current_app_role() = 'admin');
create policy "profiles_admin_manage" on public.profiles
for all using (public.current_app_role() = 'admin')
with check (public.current_app_role() = 'admin');

create policy "suppliers_admin_all" on public.suppliers
for all using (public.current_app_role() = 'admin')
with check (public.current_app_role() = 'admin');

create policy "categories_authenticated_read" on public.categories
for select to authenticated using (true);
create policy "categories_admin_write" on public.categories
for all using (public.current_app_role() = 'admin')
with check (public.current_app_role() = 'admin');

create policy "brands_authenticated_read" on public.brands
for select to authenticated using (true);
create policy "brands_admin_write" on public.brands
for all using (public.current_app_role() = 'admin')
with check (public.current_app_role() = 'admin');

create policy "products_admin_all" on public.products
for all using (public.current_app_role() = 'admin')
with check (public.current_app_role() = 'admin');
create policy "products_supplier_read" on public.products
for select to authenticated using (supplier_id = public.current_supplier_id());
-- Supplier accounts are read-only on the catalog for now. Supplier changes must
-- go through a validated server-side workflow/RPC so they cannot alter prices,
-- stock, product identity, or marketplace fields directly.

create policy "price_rules_admin_only" on public.price_rules
for all using (public.current_app_role() = 'admin')
with check (public.current_app_role() = 'admin');

create policy "sales_orders_admin_only" on public.sales_orders
for all using (public.current_app_role() = 'admin')
with check (public.current_app_role() = 'admin');

create policy "sales_order_items_admin_only" on public.sales_order_items
for all using (public.current_app_role() = 'admin')
with check (public.current_app_role() = 'admin');

create policy "supplier_events_admin_all" on public.supplier_order_events
for all using (public.current_app_role() = 'admin')
with check (public.current_app_role() = 'admin');
create policy "supplier_events_supplier_read" on public.supplier_order_events
for select to authenticated using (supplier_id = public.current_supplier_id());
-- Supplier event creation is intentionally disabled until a server-side
-- RPC can validate supplier/order ownership without relying on client-supplied IDs.


create policy "sync_runs_admin_only" on public.sync_runs
for all using (public.current_app_role() = 'admin')
with check (public.current_app_role() = 'admin');

create policy "audit_log_admin_read" on public.audit_log
for select using (public.current_app_role() = 'admin');
-- Audit records are written only by trusted server-side/admin workflows.
create policy "audit_log_admin_insert" on public.audit_log
for insert with check (public.current_app_role() = 'admin');

grant usage on schema public to authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;
