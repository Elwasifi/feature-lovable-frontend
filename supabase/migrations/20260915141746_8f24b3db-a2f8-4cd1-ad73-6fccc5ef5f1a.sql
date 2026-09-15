DELETE FROM public.trip_items WHERE trip_id IN (SELECT id FROM public.trips WHERE title = 'ZZTEST AUDIT TRIP');
DELETE FROM public.trip_days WHERE trip_id IN (SELECT id FROM public.trips WHERE title = 'ZZTEST AUDIT TRIP');
DELETE FROM public.trips WHERE title = 'ZZTEST AUDIT TRIP';
DELETE FROM public.bookings WHERE contact_email = 'info@egyptora-hub.com';
DELETE FROM public.profiles WHERE id IN (SELECT id FROM auth.users WHERE email LIKE 'zzaudit%@example.com');
DELETE FROM auth.users WHERE email LIKE 'zzaudit%@example.com';