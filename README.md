# LoginCrud-MongoDB
This project is a backend developed with Node.js, Express, and MongoDB, which implements a user authentication system and CRUD (Create, Read, Update, Delete) operations. It is designed to be the basis for web applications that require robust user and data management.

Technologies Used
- Node.js: Server-side JavaScript runtime environment, used to build a scalable and efficient backend.
- Express.js: Node.js framework that facilitates the creation of routes, middleware, and server logic to manage HTTP requests.
- MongoDB: NoSQL database that allows data to be stored in a flexible document format, ideal for managing user information and other associated data.
- Mongoose: Data modeling library for MongoDB and Node.js, used to define schemas, validate data, and manage interaction with the database.

Backend Features
User Authentication:
-User registration with validation and secure storage of passwords.
-Login with verification of credentials and generation of authentication tokens.
User Management:
-CRUD operations on the user collection, allowing to create, read, update, and delete records.
Security Middleware:
-Implementation of middleware to protect routes, ensuring that only authenticated users can access certain functionalities.
Error Management:
-Centralized error handling for a consistent and clear response to failures or invalid inputs.
