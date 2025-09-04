<img width="1366" height="728" alt="image" src="https://github.com/user-attachments/assets/79d63029-b706-4d79-8a4b-ab93f16b52ac" />
# Library Book Management System (REST API)

**Simple RESTful Spring Boot application to manage a small library**

This project implements a basic library management REST API using Spring Boot and an H2 in-memory database. It follows REST principles and uses service/repository/controller layers, JPA entities, and basic validation and error handling.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Entities](#entities)
3. [Functional Requirements / Endpoints](#functional-requirements--endpoints)
4. [Getting Started (Run locally)](#getting-started-run-locally)
5. [H2 Console & Config](#h2-console--config)
6. [Sample Requests](#sample-requests)
7. [Frontend (React) notes](#frontend-react-notes)
8. [Business Rules & Validation](#business-rules--validation)
9. [Error Handling](#error-handling)
10. [Possible Improvements](#possible-improvements)
11. [Contacts / Contributors](#contacts--contributors)
12. [License](#license)

---

## Project Overview

A lightweight REST API to manage books, members and borrow records. The API supports CRUD operations on books and members (as required) and borrowing/returning books while enforcing simple business rules (e.g., a book can only be borrowed if `available == true`). The backend is written in Spring Boot using Spring Data JPA with an H2 in-memory database for ease of testing.

This README was created to match the provided project skeleton and the following requirements:

* Use H2 in-memory DB for development
* Implement entities: `Book`, `Member`, `BorrowRecord`
* Create repositories, services, controllers
* Implement endpoints for Books, Members and BorrowRecords

---

## Entities

### Book

* `id` (Long / Integer, auto-generated)
* `title` (String, required)
* `author` (String, required)
* `isbn` (String, required, unique)
* `available` (Boolean)

### Member

* `id` (Long / Integer, auto-generated)
* `name` (String, required)
* `email` (String, required, unique, valid email format)
* `membershipDate` (Date / LocalDate)

### BorrowRecord

* `id` (Long / Integer, auto-generated)
* `memberId` (FK)
* `bookId` (FK)
* `borrowDate` (Date / LocalDateTime)
* `returnDate` (Date / LocalDateTime, nullable)

---

## Functional Requirements / Endpoints

> Base URL (default): `http://localhost:8080/api`

### Book APIs

* `GET /books` — list all books
* `GET /books/{id}` — get book by id
* `GET /books/search?query={q}` — search by title, author or id (service may parse id)
* `POST /books` — add a new book (body: `title`, `author`, `isbn`)
* `PUT /books` — update existing book (full entity in body)
* `DELETE /books/{id}` — delete a book **only if not currently borrowed** (`available == true`)

### Member APIs

* `GET /members` — list members
* `GET /members/id/{memberId}` — get member details by id
* `POST /members` — register a new member (body: `name`, `email`, `membershipDate` optional)

### Borrowing APIs

* `GET /brecords` — list all borrow records
* `GET /brecords/book/{bookId}` — borrow records for a book
* `GET /brecords/member/{memberId}` — borrow history for a member
* `POST /brecords` — borrow a book (body: `memberId`, `bookId`) — only if `book.available == true`.
* `PUT /brecords` — return a book (body: the borrow record or identifiers) — sets `returnDate` and marks book available
* `DELETE /brecords/{id}` — delete a borrow record

> NOTE: The exact controller URL prefixes in the provided code are implemented under `@RequestMapping("/api")`. Adjust any example URLs accordingly.

---

## Getting Started (Run locally)

### Prerequisites

* Java 17+ (or the version used by the project)
* Maven or Gradle
* (Optional) IDE: IntelliJ, Eclipse, or VS Code with Java support

### Run backend (Spring Boot)

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```
2. Build and run with Maven:

   ```bash
   ./mvnw clean package
   ./mvnw spring-boot:run
   ```

   or with Gradle:

   ```bash
   ./gradlew bootRun
   ```
3. The app will start on `http://localhost:8080` by default.

### Run frontend (React)

From the React project folder (where `package.json` exists):

```bash
npm install
# if using Vite/dev server
npm run dev
# or if CRA
npm start
```

Make sure the React app's Axios base URL points to `http://localhost:8080/api` (or adjust CORS config and `axios` calls accordingly).

---

## H2 Console & Config

Example `application.properties` (or `application.yml`) snippets for development:

```properties
spring.datasource.url=jdbc:h2:mem:librarydb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Access H2 console at: `http://localhost:8080/h2-console` — JDBC URL: `jdbc:h2:mem:librarydb` (if you used the above config).

---

## Sample Requests

### Add a book

**POST** `/api/books`

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "9780132350884"
}
```

### Borrow a book

**POST** `/api/brecords`

```json
{
  "memberId": 1,
  "bookId": 5
}
```

### Return a book

**PUT** `/api/brecords`

* Send the borrow record object with `memberId`, `bookId` (or the `bRecordsId`) so the backend can find the active borrow and set `returnDate`.

---

## Frontend (React) notes

* Example components provided in the codebase: `ViewMember`, `Members`, `AddMember`, `Home`, `HeroHeader`, `Books`, `BorrowRecords`.
* Axios calls in components currently point to `http://localhost:8080/api/...` — make sure both backend and frontend are running and CORS is configured on the backend.
* Some small bugs/typos to watch for:

  * Ensure `ViewMember` component filename and imports match (`ViewMember` vs `ViewMembers`).
  * `AddMember` component state fields should match the `Members` entity (`name`, `email`) — the current placeholder contains `title/author/isbn` which seems copied from book form.
  * Image asset paths are referenced from `/assets/...`. Ensure these files exist in the public folder of the React app.

---

## Business Rules & Validation

* A book can only be deleted if `available == true` (i.e., not currently borrowed).
* Borrow operation sets `book.available = false`, and creates a `BorrowRecords` entry with a `borrowDate`.
* Return operation sets `returnDate` on the `BorrowRecords` entry and sets `book.available = true`.
* `isbn` and `email` should be unique (enforce with DB unique constraint or check in service layer).
* Validate input payloads (e.g., `@NotBlank`, `@Email`) and return appropriate 4xx errors for invalid data.

---

## Error Handling

* Use `@ControllerAdvice` + `@ExceptionHandler` to centralize error responses (400/404/409/500 with JSON payloads that include `timestamp`, `status`, `message`).
* Throw descriptive exceptions in the service layer for business rule violations (e.g., `IllegalStateException("Book cannot be borrowed")`) and map them to proper HTTP status codes (409 Conflict or 400 Bad Request as appropriate).

---

## Possible Improvements / Next Steps

* Add DTOs and mappers (MapStruct or manual) to decouple API models from JPA entities.
* Add integration tests (SpringBootTest) and unit tests (mocking repositories) for controllers and services.
* Use Spring Security for authentication & authorization (member vs admin roles).
* Replace H2 with a persistent DB (Postgres/MySQL) for production.
* Add pagination & sorting for large lists.
* Add OpenAPI/Swagger documentation.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
