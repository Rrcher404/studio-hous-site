-- One public bucket for all client media. Paths are {client_id}/{timestamp}-{filename};
-- prefix RLS here, and the Panel upload route enforces size + MIME again
-- (belt and suspenders — the donor defined limits and never enforced them).

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'client-media',
  'client-media',
  true,
  26214400, -- 25MB
  array['image/jpeg','image/png','image/webp','image/avif']
)
on conflict (id) do nothing;

-- Public bucket serves object URLs without a select policy; scoping select to
-- the owning tenant prevents anonymous listing (advisor 0025).
create policy "client media read" on storage.objects for select to authenticated
  using (
    bucket_id = 'client-media'
    and ((storage.foldername(name))[1] = my_client_id()::text or is_studio())
  );

create policy "client media upload" on storage.objects for insert to authenticated
  with check (
    bucket_id = 'client-media'
    and ((storage.foldername(name))[1] = my_client_id()::text or is_studio())
  );

create policy "client media delete" on storage.objects for delete to authenticated
  using (
    bucket_id = 'client-media'
    and ((storage.foldername(name))[1] = my_client_id()::text or is_studio())
  );
