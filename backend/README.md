# Backend for "new" frontend

Instructions to run the backend (Express + MongoDB):

1. Install dependencies

```bash
cd backend
npm install
```

2. Create an `.env` file in `backend/` (you can copy `.env.example`). The project expects `MONGODB_URI` and `JWT_SECRET`.

3. Start the server

```bash
npm run dev
```

API endpoints (basic):
- `POST /api/auth/register` - register user
- `POST /api/auth/login` - login
- `GET /api/auth/me` - get current user (requires `Authorization: Bearer <token>`)
- `POST /api/students` - create student/application (protected)
- `GET /api/students` - list students (protected)

New/updated endpoints (cookie-based auth):
- `POST /api/auth/register` - register user (sets `token` cookie)
- `POST /api/auth/login` - login (sets `token` and `role` cookies)
- `GET /api/auth/check-session` - validate current session (uses cookie)
- `POST /api/auth/logout` - clear session cookies

Admission endpoints:
- `POST /api/admission/personal-details` - submit personal details and upload counseling letter (protected)

Admin endpoints (require admin role cookie):
- `GET /api/admin/applications` - list applications
- `GET /api/admin/applications/:id` - get application
- `PUT /api/admin/applications/:id` - update application (status, etc.)
- `GET /api/admin/count-by-status` - dashboard counts

Payment endpoints:
- `GET /api/payment/payment/me` - get current user's payment
- `POST /api/payment/student/payment` - record a payment

This is a minimal MVC scaffold to match the existing frontend structure. Expand models/controllers as needed for additional frontend features.
