# Approach and Fixes for Parking Management System

## Overview

I reviewed the README.md and explored all project folders to understand the setup of the parking management system consisting of Django (API), Go (service), and Next.js (frontend) components. The system has intentional issues as described in the assignment, and my task was to identify and fix them without rebuilding from scratch.

## Approach

1. **Read Documentation**: Started by reading the full README.md to understand the tech stack, setup instructions, and known issues.
2. **Explore Codebase**: Examined each component's code:
   - Django: models.py, views.py, serializers.py, urls.py
   - Go: main.go
   - Next.js: pages/index.js, components/SlotGrid.js, lib/api.js
3. **Identify Issues**: Based on the README's hints and code analysis, pinpointed specific bugs in logic, queries, and integrations.
4. **Fix Issues**: Made targeted fixes to correct the problems while maintaining the existing architecture.
5. **Validate**: Ensured fixes address the described issues without introducing new problems.

## Fixes Implemented

### Django Backend (`backend-django`)

1. **Available Slots Endpoint**: Fixed `get_available_slots` view to filter `is_occupied=False` instead of `True`, so it returns available slots.
2. **Booking Creation**: Added logic to check if the slot is already occupied before creating a booking, and set `slot.is_occupied = True` after successful booking to maintain consistency.
3. **Checkout**: The checkout logic was already correct (setting `is_occupied = False`), but now paired with proper booking creation.

### Go Backend (`backend-go`)

1. **Active Bookings Query**: Changed the WHERE clause from `WHERE b.end_time IS NOT NULL` to `WHERE b.end_time IS NULL` to fetch active bookings instead of completed ones.
2. **Slot Join**: Corrected the JOIN condition from `ON b.slot_id = s.slot_id` to `ON b.slot_id = s.id` to match Django's auto-generated primary key.

### Next.js Frontend (`frontend-nextjs`)

1. **API Base URL**: Fixed `API_DJANGO_BASE` from `http://localhost:8001/api` to `http://localhost:8000/api` to match the Django server port.
2. **Slot Loading**: Modified `loadSlots` function to require selecting a lot first and pass the `selectedLot` to `fetchAvailableSlots(lotId)`.
3. **Slot Refresh After Booking**: Added `fetchSlots()` call in `SlotGrid`'s `handleBook` function to refresh the available slots list after a successful booking.

## Assumptions Made

- The database schema matches the Django models, with tables named as per Django's conventions (e.g., `parking_booking`, `parking_slot`).
- The sample data in fixtures is loaded correctly and provides realistic test cases.
- No additional validation or error handling was needed beyond fixing the core issues, as the assignment focuses on debugging existing code.
- The frontend assumes the backend APIs are running on the specified ports and handles basic error cases.
- Slot occupancy is managed via the `is_occupied` boolean field, synchronized with booking states.

## Testing Approach

After fixes, the system should:

- Correctly show available slots for a selected lot.
- Prevent booking occupied slots.
- Update slot status upon booking and checkout.
- Display accurate active bookings in the Go report.
- Refresh slot list after booking in the frontend.
- Communicate properly between frontend and backends.

To test, follow the setup instructions in the original README.md, then verify the endpoints and UI behaviors match the expected functionality.
