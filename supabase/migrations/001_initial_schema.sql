-- ─────────────────────────────────────────────
-- EXTENSIONS
-- ─────────────────────────────────────────────
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";  -- for geolocation queries

-- ─────────────────────────────────────────────
-- ENUMS
-- ─────────────────────────────────────────────
create type user_role as enum ('patient', 'doctor', 'admin');
create type request_status as enum (
  'pending', 'accepted', 'doctor_en_route',
  'arrived', 'in_progress', 'completed', 'cancelled'
);
create type urgency_level as enum ('normal', 'urgent', 'very_urgent');
create type payment_method as enum ('card', 'cash');
create type payment_status as enum ('pending', 'paid', 'refunded');
create type specialization as enum (
  'generaliste', 'cardiologue', 'pediatre',
  'gynecologue', 'dermatologue', 'neurologue',
  'ophtalmologue', 'kinesitherapeute', 'autre'
);

-- ─────────────────────────────────────────────
-- PROFILES (extends Supabase auth.users)
-- ─────────────────────────────────────────────
create table profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  role          user_role not null,
  full_name     text not null,
  phone         text unique,
  avatar_url    text,
  date_of_birth date,
  gender        text,
  language      text default 'fr',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ─────────────────────────────────────────────
-- PATIENT PROFILES
-- ─────────────────────────────────────────────
create table patient_profiles (
  id                uuid primary key references profiles(id) on delete cascade,
  blood_type        text,
  chronic_conditions text[],
  allergies         text[],
  current_medications text[],
  emergency_contact_name  text,
  emergency_contact_phone text,
  address           text,
  latitude          float8,
  longitude         float8,
  id_verified       boolean default false
);

-- ─────────────────────────────────────────────
-- DOCTOR PROFILES
-- ─────────────────────────────────────────────
create table doctor_profiles (
  id                  uuid primary key references profiles(id) on delete cascade,
  specialization      specialization not null,
  license_number      text unique not null,
  years_experience    int,
  bio                 text,
  is_online           boolean default false,
  is_verified         boolean default false,
  is_suspended        boolean default false,
  current_latitude    float8,
  current_longitude   float8,
  coverage_radius_km  float4 default 10,
  rating_avg          float4 default 0,
  rating_count        int default 0,
  base_fee            numeric(10,2) default 2000,
  address             text
);

-- ─────────────────────────────────────────────
-- DOCTOR SCHEDULES
-- ─────────────────────────────────────────────
create table doctor_schedules (
  id          uuid primary key default uuid_generate_v4(),
  doctor_id   uuid references doctor_profiles(id) on delete cascade,
  day_of_week int not null check (day_of_week between 0 and 6),
  start_time  time not null,
  end_time    time not null,
  is_available boolean default true
);

-- ─────────────────────────────────────────────
-- FAMILY MEMBERS
-- ─────────────────────────────────────────────
create table family_members (
  id           uuid primary key default uuid_generate_v4(),
  patient_id   uuid references patient_profiles(id) on delete cascade,
  full_name    text not null,
  relationship text not null,
  date_of_birth date,
  blood_type   text,
  allergies    text[],
  notes        text
);

-- ─────────────────────────────────────────────
-- CONSULTATION REQUESTS
-- ─────────────────────────────────────────────
create table consultation_requests (
  id                uuid primary key default uuid_generate_v4(),
  patient_id        uuid references profiles(id),
  doctor_id         uuid references profiles(id),
  family_member_id  uuid references family_members(id),
  specialization    specialization not null,
  symptoms          text,
  symptom_tags      text[],
  urgency           urgency_level default 'normal',
  attachment_urls   text[],
  status            request_status default 'pending',
  scheduled_at      timestamptz,
  accepted_at       timestamptz,
  arrived_at        timestamptz,
  completed_at      timestamptz,
  patient_latitude  float8 not null,
  patient_longitude float8 not null,
  patient_address   text not null,
  notes             text,
  payment_method    payment_method default 'cash',
  payment_status    payment_status default 'pending',
  fee               numeric(10,2),
  platform_fee      numeric(10,2),
  created_at        timestamptz default now()
);

-- ─────────────────────────────────────────────
-- CONSULTATIONS (medical details)
-- ─────────────────────────────────────────────
create table consultations (
  id              uuid primary key default uuid_generate_v4(),
  request_id      uuid unique references consultation_requests(id),
  doctor_id       uuid references profiles(id),
  patient_id      uuid references profiles(id),
  diagnosis       text,
  notes           text,
  follow_up_date  date,
  referral        text,
  created_at      timestamptz default now()
);

-- ─────────────────────────────────────────────
-- PRESCRIPTIONS
-- ─────────────────────────────────────────────
create table prescriptions (
  id              uuid primary key default uuid_generate_v4(),
  consultation_id uuid references consultations(id),
  doctor_id       uuid references profiles(id),
  patient_id      uuid references profiles(id),
  medications     jsonb not null,
  -- format: [{ name, dosage, frequency, duration, instructions }]
  notes           text,
  pdf_url         text,
  created_at      timestamptz default now()
);

-- ─────────────────────────────────────────────
-- RATINGS & REVIEWS
-- ─────────────────────────────────────────────
create table ratings (
  id              uuid primary key default uuid_generate_v4(),
  request_id      uuid unique references consultation_requests(id),
  patient_id      uuid references profiles(id),
  doctor_id       uuid references profiles(id),
  stars           int check (stars between 1 and 5),
  comment         text,
  created_at      timestamptz default now()
);

-- ─────────────────────────────────────────────
-- NOTIFICATIONS
-- ─────────────────────────────────────────────
create table notifications (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references profiles(id) on delete cascade,
  title       text not null,
  body        text not null,
  type        text,   -- 'request', 'status', 'chat', 'system'
  is_read     boolean default false,
  data        jsonb,
  created_at  timestamptz default now()
);

-- ─────────────────────────────────────────────
-- CHAT MESSAGES
-- ─────────────────────────────────────────────
create table chat_messages (
  id          uuid primary key default uuid_generate_v4(),
  request_id  uuid references consultation_requests(id),
  sender_id   uuid references profiles(id),
  content     text,
  image_url   text,
  is_read     boolean default false,
  created_at  timestamptz default now()
);

-- ─────────────────────────────────────────────
-- HEALTH METRICS
-- ─────────────────────────────────────────────
create table health_metrics (
  id          uuid primary key default uuid_generate_v4(),
  patient_id  uuid references profiles(id),
  type        text not null,  -- 'blood_pressure', 'weight', 'glucose', 'temperature'
  value       text not null,
  unit        text,
  notes       text,
  measured_at timestamptz default now()
);

-- ─────────────────────────────────────────────
-- HEALTH TIPS (admin-managed)
-- ─────────────────────────────────────────────
create table health_tips (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  content     text not null,
  category    text,
  emoji       text,
  is_active   boolean default true,
  created_at  timestamptz default now()
);

-- ─────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────
alter table profiles enable row level security;
alter table patient_profiles enable row level security;
alter table doctor_profiles enable row level security;
alter table consultation_requests enable row level security;
alter table consultations enable row level security;
alter table prescriptions enable row level security;
alter table chat_messages enable row level security;
alter table notifications enable row level security;
alter table health_metrics enable row level security;

-- Profiles: users read own, doctors/admins read all
create policy "Users read own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users update own profile"
  on profiles for update using (auth.uid() = id);

-- Requests: patient sees own, doctor sees assigned + pending nearby
create policy "Patient sees own requests"
  on consultation_requests for select
  using (auth.uid() = patient_id);

create policy "Doctor sees relevant requests"
  on consultation_requests for select
  using (auth.uid() = doctor_id
    or status = 'pending');

-- Chat: only request participants
create policy "Chat participants only"
  on chat_messages for all
  using (
    auth.uid() in (
      select patient_id from consultation_requests where id = request_id
      union
      select doctor_id from consultation_requests where id = request_id
    )
  );

-- Auth Trigger
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role, full_name, phone)
  values (
    new.id,
    (new.raw_user_meta_data->>'role')::user_role,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
