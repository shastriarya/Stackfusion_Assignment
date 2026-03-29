# Parking Management System – Debug & Fix Assignment

## Overview

This project is a full-stack Parking Management System built using:

- Django – API, database schema, and booking logic  
- Go – Lightweight service using raw SQL  
- Next.js – Frontend interface  

The assignment intentionally included real-world bugs and inconsistencies. The objective was to identify and fix issues without rebuilding the system.

---

## Objective

- Analyze an existing multi-service system  
- Identify logical, API, and integration issues  
- Apply minimal, targeted fixes  
- Ensure correct functionality across all components  

---

## Tech Stack

| Layer        | Technology        |
|-------------|------------------|
| Backend API | Django + DRF     |
| Service     | Go (database/sql)|
| Frontend    | Next.js          |
| Database    | PostgreSQL       |
| DevOps      | Docker Compose   |

---

## Approach

1. Understand Requirements  
   Reviewed the assignment description and expected behavior  

2. Code Exploration  
   - Django: models, views, serializers  
   - Go: SQL queries and handlers  
   - Frontend: API integration and UI logic  

3. Issue Identification  
   Identified logical bugs, incorrect filters, faulty SQL joins, and API mismatches  

4. Fix Implementation  
   Applied minimal and targeted fixes without changing the architecture  

5. Validation  
   Ensured all components work together correctly  

---

## Fixes Implemented

### Django Backend

- Fixed available slots API  
  Corrected filter to return only `is_occupied = False`

- Improved booking logic  
  - Prevent booking of already occupied slots  
  - Mark slot as occupied after successful booking  

- Checkout flow  
  Ensures slot is freed (`is_occupied = False`) after checkout  

---

### Go Backend

- Fixed active bookings query  
  Changed condition to `WHERE end_time IS NULL`

- Corrected SQL JOIN  
  Fixed incorrect join on slot table (`s.id` instead of `s.slot_id`)

- Result  
  Accurate active booking report and correct data mapping  

---

### Frontend (Next.js)

- Fixed API configuration  
  Corrected Django base URL (`http://localhost:8000`)

- Improved slot loading  
  - Ensured lot selection before fetching slots  
  - Passed `lotId` correctly to API  

- Enhanced UI behavior  
  - Auto-refresh slots after booking  
  - Improved user feedback  

---

## System Behavior After Fixes

- Displays correct available slots per parking lot  
- Prevents double booking  
- Updates slot status on booking and checkout  
- Shows correct active bookings (Go service)  
- Maintains proper frontend-backend communication  

---

## Assumptions

- Database schema follows Django conventions  
- Sample data is correctly loaded via fixtures  
- Slot availability is controlled via `is_occupied`  
- Services run on:
  - Django → http://localhost:8000  
  - Go → http://localhost:8080  
  - Frontend → http://localhost:3000  

---

## Testing

To verify functionality:

1. Start all services (Docker or manual setup)  
2. Load sample data  
3. Test the following flows:
   - Select parking lot and view available slots  
   - Book a slot and verify it becomes occupied  
   - Checkout and verify the slot becomes free  
   - Validate active bookings via Go API  

---

## Conclusion

This assignment demonstrates the ability to:

- Debug a real-world multi-service system  
- Identify backend, database, and frontend issues  
- Fix problems without overengineering  
- Ensure proper integration across services  

The system is now stable, consistent, and functionally correct.
