# ⚛️ Polyglot Inventory - React Frontend

The official frontend application for the Polyglot Inventory project. This single-page application (SPA) is built on the modern React/TypeScript stack and is designed to consume the secure Java/Spring Boot CORE Microservice.

This repository highlights best practices in React architecture, state management (Context API), and schema-driven form validation.

---

## 💡 Key Architectural Highlights

This project is structured around the principle of **Separation of Concerns** using React Hooks and Context for a highly scalable and testable architecture.

### 1. Global State Management (Context API)

* **AuthContext:** Centralized global store for **Authentication State** (`token`, `user`, `isAuthenticated`).
* **JWT Persistence:** Uses `localStorage` to persist the JWT, maintaining the user session across page reloads.
* **Modal Context:** Implements a global context (`ModalProvider`) using **React Portals** to manage dynamic modals (Create, Edit, Delete Confirmation) cleanly and accessibly.

### 2. Data and Business Logic Layer

* **`useFetch` (Generic Hook):** Serves as the global HTTP client. It automatically injects the Bearer **JWT** from the `AuthContext` into every request, centralizes loading/error states, and manages asynchronous request cancellation (`AbortController`).
* **`useProducts` (Service Hook):** Implements the specific business logic for the Products domain (calling the generic `useFetch` with the correct endpoints) and exposes the full CRUD mutation functions (`createProduct`, `updateProduct`, `deleteProduct`).

### 3. Forms and Validation

* **Library Stack:** Uses **React Hook Form** for form management and **Zod** (via `@hookform/resolvers`) for schema-driven validation.
* **Benefit:** Decouples form behavior from component logic, ensuring fields are validated against strict, shared TypeScript schemas before any API call.

### 4. UI/Design

* **Component Library:** **Material UI (MUI)** for professional, high-quality component design and styling.
* **Reusable Components:** Implementation of a generic **`DataTable`** component that handles pagination and sorting, consuming generic types (`<T>`) to display any collection data.
* **Protected Routing:** Uses **React Router DOM** and a custom **`PrivateGuard`** component to ensure users without a valid token are always redirected to the login page.

---

## ⚙️ Features (Current MVP)

| Feature | Method | Path |
| :--- | :--- | :--- |
| User Login | `POST` | `/api/v1/auth/login` |
| Get User Profile | `GET` | `/api/v1/users/me` |
| List Inventory | `GET` | `/api/v1/products` |
| Create Product | `POST` | `/api/v1/products` (via Modal Form) |
| Edit Product | `PUT` | `/api/v1/products/{id}` (Partial Update Logic) |
| Delete Product | `DELETE` | `/api/v1/products/{id}` |

---

## 🏁 Local Setup and Execution

### Prerequisites

1.  **Java Backend:** The [Inventory - Backend - JAVA 21](https://github.com/AntonySML/inventory-backend-java-v2) microservice must be running on **`http://localhost:8080`**.
2.  **CORS:** The Java backend's `WebConfig.java` must allow requests from `http://localhost:5173`.

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone [URL_DEL_REPO]
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run the Application:**
    ```bash
    npm run dev
    ```
    (The application will open on `http://localhost:5173`.)

### Testing Credentials

| Field | Value |
| :--- | :--- |
| **Email** | `[Your registered email]` |
| **Password** | `[Your chosen password]` |

## Related projects

[Inventory - Backend - JAVA 21](https://github.com/AntonySML/inventory-backend-java-v2)