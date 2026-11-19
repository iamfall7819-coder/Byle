create table if not exists public.profiles (
    id text primary key,
    name text not null,
    role text not null,
    about text not null default '',
    owner_id uuid unique references auth.users (id) on delete set null
);

alter table public.profiles enable row level security;

revoke all on table public.profiles from anon, authenticated;
grant select (id, name, role, about) on table public.profiles to anon, authenticated;
grant update (name, about) on table public.profiles to authenticated;

drop policy if exists "Profiles are publicly readable" on public.profiles;
create policy "Profiles are publicly readable"
    on public.profiles for select
    to anon, authenticated
    using (true);

drop policy if exists "Owners can update their profile" on public.profiles;
create policy "Owners can update their profile"
    on public.profiles for update
    to authenticated
    using (owner_id = (select auth.uid()))
    with check (owner_id = (select auth.uid()));

insert into public.profiles (id, name, role) values
    ('siswa-1', '1. Aditya Damara Putra Kristiawan', 'Wakil Ketua'),
    ('siswa-2', '2. Alfaza Oktavino Praditia', 'Anggota Kelas'),
    ('siswa-3', '3. Badria Nur Anisa', 'Anggota Kelas'),
    ('siswa-4', '4. Dwi Ayu Jayanti', 'Ketua Kelas'),
    ('siswa-5', '5. Ferdio Putra Prasetya', 'Bendahara 1'),
    ('siswa-6', '6. Ketut Dimas Muhammad Risal', 'Bendahara 2'),
    ('siswa-7', '7. Muhammad Yusron Ginanda', 'Sekretaris'),
    ('siswa-8', '8. Muhammad Riski Neo Valentino', 'Anggota Kelas'),
    ('siswa-9', '9. Muhammad Rizki', 'Anggota Kelas'),
    ('siswa-10', '10. Naufal Dzaki Hanif Abiyi', 'Anggota Kelas'),
    ('siswa-11', '11. Razky Gabril Wahyudi', 'Seksi Kebersihan'),
    ('siswa-12', '12. Rizky Widodo', 'Anggota Kelas'),
    ('siswa-13', '13. Supriyadi', 'Anggota Kelas'),
    ('kepala-sekolah', 'Irawan Adi Wasito, S.T.', 'Kepala Sekolah'),
    ('wali-kelas', 'Zulfi Amaliyah, S.Kom.', 'Wali Kelas')
on conflict (id) do update
set role = excluded.role;
