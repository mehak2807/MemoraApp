# Memora Backend

Backend API for Memora Dementia Care App.

## Features

- Caregiver registration & login (JWT auth)
- Add and view patients
- MongoDB for data storage

## Setup

1. Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret.
2. Install dependencies:
   ```
   npm install
   ```
3. Start server:
   ```
   npm run dev
   ```

## Endpoints

- `POST /api/auth/register` – Register caregiver
- `POST /api/auth/login` – Login caregiver
- `GET /api/caregiver/profile` – Get caregiver profile (protected)
- `POST /api/patient` – Add patient (protected)
- `GET /api/patient` – List patients (protected)