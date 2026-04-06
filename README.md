## 👔 HR Platform - Candidate & Skill Management System
A full-stack application designed to facilitate HR processes by managing job candidates and their professional skills. This project demonstrates a robust Spring Boot 3 backend integrated with a React frontend, featuring a Many-to-Many relationship with smart data persistence.
## 🧠 Design Commentary
The most interesting part of this project for me was architecting the database model and ensuring its consistency throughout the entire lifecycle of the platform. I believe that data integrity is the foundation of any reliable application, so I started at the lowest level by strictly defining entity constraints and relationships.
In the Service layer, my focus shifted to making the business logic as resilient as possible. My priority was ensuring that all operations are atomic and consistent, while proactively addressing common performance pitfalls like the 'N+1 Select' problem. I enjoyed the challenge of creating an intelligent system that maintains a clean, normalized database while keeping the codebase professional and scalable. For me, every architectural decision was driven by a commitment to long-term system reliability.
## 🚀 Features
Backend (Java/Spring Boot)
* Smart Candidate Management: Full CRUD (Create, Read, Update, Delete) for job candidates.
* Intelligent Skill Linking: Automatically detects if a skill exists in the global catalog by name or ID before associating it with a candidate.
Advanced Search:
* Search candidates by Full Name (partial match, case-insensitive).
* Search candidates by a specific Skill (filtering based on the many-to-many relationship).
Data Integrity: 
* Implemented Jakarta Validation (@NotBlank, @Email, @Past, etc.) to ensure high-quality data.
API Documentation: 
* Fully documented with Swagger/OpenAPI 3.
  
Frontend (React)
* Dynamic UI: Modern Single Page Application (SPA) built with React.
* Skill Selector:A user-friendly interface to select existing skills from the database or add new ones on the fly.
* Responsive Design: Custom CSS layout for clean and intuitive candidate tracking.
* Real-time Interaction: Communicates with the backend using the native Fetch API and async/await syntax.
## 🛠️ Tech Stack
- Backend: Java 17, Spring Boot 3, Maven, Spring Data JPA, Hibernate.
- Frontend: React (Hooks, Functional Components), JavaScript (ES6+), CSS3.
- Database: PostgreSQL.
- Testing: JUnit 5, Mockito.
- Documentation: Springdoc OpenAPI (Swagger UI).
## ⚙️ Getting Started
Prerequisites
JDK 17 or higher.
Node.js (v16 or higher) & npm.
PostgreSQL database.
1. Database Setup
Open pgAdmin (or your preferred SQL tool).
Create a new database named: hr_db.
The tables will be automatically created by Hibernate upon starting the backend.
2. Backend Configuration
Navigate to backend/src/main/resources/application.properties.
Update your PostgreSQL username and password:
Properties
spring.datasource.username=your_username
spring.datasource.password=your_password

* Run the backend from the backend folder:
mvn spring-boot:run
The server will start at http://localhost:8080.
3. Frontend Setup
Open a new terminal and navigate to the frontend folder.
Install dependencies:
npm install

* Start the React application:
npm start
The app will open at http://localhost:3000.
## 🧪 Testing & API Documentation
- API Documentation (Swagger)
- Explore the REST API endpoints directly via Swagger UI:
🔗 http://localhost:8080/swagger-ui/index.html
- Running JUnit Tests
To run the backend unit and integration tests (Service & Controller layers):
cd backend
mvn test
## ✅ Development Highlights 
* Implemented JUnit 5 and Mockito for both Service and Controller layers.
* Integrated Swagger UI for interactive API testing.
* Developed a custom React UI for a complete end-to-end user experience.
* Configured CORS for secure communication between frontend and backend.

## Author: Dušan Lazić
