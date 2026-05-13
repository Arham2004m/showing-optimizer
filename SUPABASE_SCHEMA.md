# Showing Optimizer - Database Schema

## Tables
- `tours`: Stores the overall showing tour details (date, time window, starting location).
- `tour_stops`: Stores individual properties attached to a tour, their order, and scheduled times.

## Relationships
- One `tour` has many `tour_stops` (Foreign Key: `tour_id`).
- RLS is enabled: Users can only read/write their own tours and stops based on `auth.uid()`.

## SQL Schema
```sql
create table tours (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  start_address text not null,
  start_latlng point,
  tour_date date not null,
  start_time time not null,
  end_time time not null,
  client_email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table tour_stops (
  id uuid default gen_random_uuid() primary key,
  tour_id uuid references tours(id) on delete cascade,
  stop_order int,
  address text not null,
  latlng point,
  notes text,
  showing_instructions text,
  listing_link text,
  duration_minutes int default 30,
  scheduled_time timestamp with time zone
);

alter table tours enable row level security;
alter table tour_stops enable row level security;

create policy "Agents can manage their own tours" on tours for all using (auth.uid() = user_id);
create policy "Agents can manage their own stops" on tour_stops for all using (tour_id in (select id from tours where user_id = auth.uid()));
```
