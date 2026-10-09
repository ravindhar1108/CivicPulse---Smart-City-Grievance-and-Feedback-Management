# CivicPulse Development Log

This document serves as a comprehensive log of the development process for the **CivicPulse** - Smart City Grievance & Feedback Management Portal. It tracks requirements, decisions, implementations, and future phases.

---

## 1. Project Inception & Requirements Analysis
**Objective**: Build a citizen-centric Smart City web portal for real-time grievance reporting, issue tracking, and civic feedback collection.

**Roles Identified**:
1. **Citizen**: Reports complaints, tracks statuses, and provides feedback/ratings.
2. **Admin**: Has global oversight, assigns officers to grievances, and monitors SLAs.
3. **Department Officer**: Resolves assigned tasks, uploads proof, and updates statuses.

**Tech Stack Decisions**:
- **Backend**: Java / Spring Boot 3+
- **Frontend**: React (initialized via Vite) with Material UI (MUI)
- **Database**: PostgreSQL
- **Security**: Spring Security with JSON Web Tokens (JWT)

---

## 2. Phase 1: Backend Foundation (COMPLETED)
The focus of Phase 1 was setting up the database schema, creating the business logic, and securing the REST APIs.

### 2.1. Entities & Database Schema (PostgreSQL)
We utilized Spring Data JPA (`ddl-auto=update`) to automatically generate tables from Java classes:
- **`User`**: Stores user details and their `Role` (CITIZEN, ADMIN, OFFICER).
- **`Grievance`**: Represents a complaint. Includes fields like title, description, category, status, and relationships to the reporting Citizen and the assigned Officer.
- **`Feedback`**: A One-to-One relationship with a resolved Grievance to store citizen ratings and comments.

### 2.2. Repositories
Created JPA repositories (`UserRepository`, `GrievanceRepository`, `FeedbackRepository`) to handle native PostgreSQL CRUD operations efficiently without writing boilerplate SQL.

### 2.3. Security & Authentication
- **JWT Integration**: Added `io.jsonwebtoken` (jjwt) dependencies.
- **Stateless Sessions**: Configured Spring Security to use stateless sessions instead of traditional cookies.
- **Role-Based Access Control (RBAC)**:
  - `/api/auth/**` -> Public (Login, Register)
  - `/api/citizen/**` -> Restricted to `CITIZEN` role.
  - `/api/admin/**` -> Restricted to `ADMIN` role.
  - `/api/officer/**` -> Restricted to `OFFICER` role.
- **Custom Filters**: Implemented `JwtAuthenticationFilter` to validate JWTs passed in the Authorization header on every request.

### 2.4. Services & Business Logic
- **`AuthService`**: Handles user registration (encrypting passwords with BCrypt) and login (authenticating and generating JWTs).
- **`GrievanceService`**: Centralized logic for submitting grievances, retrieving lists based on roles, assigning officers, and updating grievance statuses.

### 2.5. REST API Controllers
Exposed the internal services as HTTP endpoints using DTOs (Data Transfer Objects) to prevent exposing raw database models to the client:
- `AuthController.java`
- `CitizenController.java`
- `AdminController.java`
- `OfficerController.java`

### 2.6. Verification
- Successfully verified the structural integrity of the backend via Maven compilation (`mvn clean compile`).

---

## 3. Phase 2: Frontend Foundation (PENDING)
The next phase involves building the user interface.

**Planned Steps**:
1. Initialize the React app using **Vite**.
2. Install **Material UI (MUI)** for professional, responsive components.
3. Set up **React Router** to manage distinct views (Login, Citizen Dashboard, Admin Dashboard, Officer Dashboard).
4. Create an **Auth Context** to manage the JWT token in local storage and protect routes.
5. Build the core forms:
   - Grievance Submission Form (with file upload).
   - Admin assignment data tables.
   - Officer resolution form.
6. Integrate **Chart.js** for the Admin/Officer analytics view.

---

## 4. Phase 3: Integration & Polish (PENDING)
**Planned Steps**:
1. Connect the React frontend to the Spring Boot REST APIs using `axios` or `fetch`.
2. Configure CORS in Spring Boot to allow cross-origin requests from the React development server.
3. Perform End-to-End (E2E) testing to ensure a seamless flow from a Citizen reporting an issue to an Officer resolving it.
4. Polish the UI with micro-animations and ensuring responsiveness on mobile devices.
