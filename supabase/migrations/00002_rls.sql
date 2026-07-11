-- RLS: one tenant-isolation pattern on every table, plus public read for the
-- content a public website publishes anyway. Helpers are SECURITY DEFINER so
-- policy subqueries never recurse into their own RLS.

create function my_client_id() returns uuid
  language sql stable security definer set search_path = public
  as $$ select client_id from profiles where id = auth.uid() $$;

create function is_studio() returns boolean
  language sql stable security definer set search_path = public
  as $$ select exists(select 1 from profiles where id = auth.uid() and role = 'studio') $$;

create function client_active(cid uuid) returns boolean
  language sql stable security definer set search_path = public
  as $$ select exists(select 1 from clients where id = cid and status = 'active') $$;

-- clients: tenants read their own row; only the studio writes.
alter table clients enable row level security;
create policy tenant_read on clients for select
  using (id = my_client_id() or is_studio());
create policy studio_insert on clients for insert with check (is_studio());
create policy studio_update on clients for update using (is_studio()) with check (is_studio());
create policy studio_delete on clients for delete using (is_studio());

-- profiles: own row (or studio). Provisioning inserts run service-role.
alter table profiles enable row level security;
create policy tenant_read on profiles for select
  using (id = auth.uid() or is_studio());
create policy self_update on profiles for update
  using (id = auth.uid()) with check (id = auth.uid());

-- site_content: published content on a public website is public by definition.
alter table site_content enable row level security;
create policy public_read on site_content for select using (true);
create policy tenant_insert on site_content for insert
  with check (client_id = my_client_id() or is_studio());
create policy tenant_update on site_content for update
  using (client_id = my_client_id() or is_studio())
  with check (client_id = my_client_id() or is_studio());
create policy studio_delete on site_content for delete using (is_studio());

-- media: rows tenant-only (files are public via the bucket URL anyway).
alter table media enable row level security;
create policy tenant_read on media for select
  using (client_id = my_client_id() or is_studio());
create policy tenant_insert on media for insert
  with check (client_id = my_client_id() or is_studio());
create policy tenant_update on media for update
  using (client_id = my_client_id() or is_studio())
  with check (client_id = my_client_id() or is_studio());
create policy tenant_delete on media for delete
  using (client_id = my_client_id() or is_studio());

-- business_hours: public read, tenant write.
alter table business_hours enable row level security;
create policy public_read on business_hours for select using (true);
create policy tenant_insert on business_hours for insert
  with check (client_id = my_client_id() or is_studio());
create policy tenant_update on business_hours for update
  using (client_id = my_client_id() or is_studio())
  with check (client_id = my_client_id() or is_studio());
create policy tenant_delete on business_hours for delete
  using (client_id = my_client_id() or is_studio());

-- announcements: public read, tenant write.
alter table announcements enable row level security;
create policy public_read on announcements for select using (true);
create policy tenant_insert on announcements for insert
  with check (client_id = my_client_id() or is_studio());
create policy tenant_update on announcements for update
  using (client_id = my_client_id() or is_studio())
  with check (client_id = my_client_id() or is_studio());
create policy tenant_delete on announcements for delete
  using (client_id = my_client_id() or is_studio());

-- form_submissions: anyone may submit to an active tenant; only the tenant reads.
alter table form_submissions enable row level security;
create policy public_submit on form_submissions for insert
  with check (client_active(client_id));
create policy tenant_read on form_submissions for select
  using (client_id = my_client_id() or is_studio());
create policy tenant_update on form_submissions for update
  using (client_id = my_client_id() or is_studio())
  with check (client_id = my_client_id() or is_studio());

-- activity_log: tenant members write and read their own trail.
alter table activity_log enable row level security;
create policy tenant_insert on activity_log for insert
  with check (client_id = my_client_id() or is_studio());
create policy tenant_read on activity_log for select
  using (client_id = my_client_id() or is_studio());
