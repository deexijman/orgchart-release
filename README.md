# Organization Chart API Documentation

## Base URL:
```
http://localhost:4000
```

![image](https://github.com/deexijman/orgchart-release/assets/157478451/464d6291-e645-428c-9ebc-623666d45e66)


## Endpoints:

1. ### GET /api/org/allusers

   - **Description:** Fetches all users.
   - **Request Type:** GET
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:**
       ```json
       {
           "message": "Fetched all users successfully",
           "data": [Array of User Objects]
       }
       ```
     - **Status Code:** 500 Internal Server Error
     - **Body:**
       ```json
       {
           "message": "Failed to fetch all the users"
       }
       ```

2. ### POST /api/org/orgchart

   - **Description:** Retrieves hierarchy for the organization chart.
   - **Request Type:** POST
   - **Body Parameters:**
     - `email`: Email of the user.
     - `reportsTo`: Email of the immediate supervisor (optional, set to 'null' if not applicable).
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:** Array of user objects representing the hierarchy.
     - **Status Code:** 500 Internal Server Error
     - **Body:**
       ```json
       {
           "message": "Something went wrong, Cannot fetch the hierarchy"
       }
       ```

3. ### GET /api/org/roles?DOMAIN=[PR/TECH]

   - **Description:** Retrieves all roles in a specified domain.
   - **Request Type:** GET
   - **Query Parameter:**
     - `DOMAIN`: Domain name (PR or TECH).
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:**
       ```json
       {
           "message": "Sent roles from: [DOMAIN]",
           "data": [Array of Role Names]
       }
       ```
     - **Status Code:** 400 Bad Request
     - **Body:**
       ```json
       {
           "message": "Domain doesn't exist"
       }
       ```

4. ### GET /api/org/dept?DOMAIN=[PR/TECH]

   - **Description:** Retrieves all departments in a specified domain.
   - **Request Type:** GET
   - **Query Parameter:**
     - `DOMAIN`: Domain name (PR or TECH).
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:**
       ```json
       {
           "message": "Sent all departments from: [DOMAIN]",
           "data": [Array of Department Names]
       }
       ```
     - **Status Code:** 400 Bad Request
     - **Body:**
       ```json
       {
           "message": "Domain doesn't exist"
       }
       ```

5. ### GET /api/org/senior?ROLE=[Role]&DEPARTMENT=[Department]

   - **Description:** Retrieves emails of immediate seniors in a department for a given role.
   - **Request Type:** GET
   - **Query Parameters:**
     - `ROLE`: Role name.
     - `DEPARTMENT`: Department name.
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:**
       ```json
       {
           "message": "Senior email array sent successfully",
           "data": [Array of Email Addresses]
       }
       ```
     - **Status Code:** 500 Internal Server Error
     - **Body:**
       ```json
       {
           "message": "Error fetching the senior email array"
       }
       ```

6. ### POST /api/user/register

   - **Description:** Adds a new user to the system.
   - **Request Type:** POST
   - **Body Parameters:**
     - `name`: Name of the user.
     - `email`: Email of the user (must be unique).
     - `password`: Password of the user.
     - `role`: Role of the user.
     - `department`: Department of the user.
     - `reportsTo`: Email of the immediate supervisor.
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:**
       ```json
       "User created successfully"
       ```
     - **Status Code:** 409 Conflict
     - **Body:**
       ```json
       "User already exists"
       ```
     - **Status Code:** 500 Internal Server Error
     - **Body:**
       ```json
       "Internal server error, Failed to create user"
       ```

7. ### POST /api/auth/login

   - **Description:** Logs in a user or admin.
   - **Request Type:** POST
   - **Body Parameters:**
     - `NAME`: Name of the user or admin.
     - `ROLE`: Role of the user or admin (USER or ADMIN).
     - `EMAIL`: Email of the user or admin.
     - `PASSWORD`: Password of the user or admin.
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:**
       ```json
       {
           "name": "User/Admin Name",
           "email": "User/Admin Email",
           "role": "User/Admin Role",
           "reportsTo": "Supervisor's Email",
           "accessRole": "User/Admin Role"
       }
       ```
     - **Status Code:** 400 Bad Request (Wrong credentials)
     - **Body:**
       ```json
       "Wrong credentials!"
       ```
     - **Status Code:** 500 Internal Server Error
     - **Body:**
       ```json
       "Internal server error occurred"
       ```

8. ### POST /api/admin/register

   - **Description:** Registers a new admin.
   - **Request Type:** POST
   - **Body Parameters:**
     - `name`: Name of the admin.
     - `email`: Email of the admin (must be unique).
     - `password`: Password of the admin.
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:**
       ```json
       {
           "message": "Admin created successfully",
           "email": "Admin Email"
       }
       ```
     - **Status Code:** 500 Internal Server Error
     - **Body:**
       ```json
       {
           "message": "Failed to create Admin"
       }
       ```

9. ### GET /api/org/samedesignation

   - **Description:** Retrieves employees who work with a specified supervisor.
   - **Request Type:** GET
   - **Body Parameters:**
     - `reportsTo`: Email of the supervisor.
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:**
       ```json
       {
           "data": [Array of Employee Objects]
       }
       ```
     - **Status Code:** 500 Internal Server Error
     - **Body:**
       ```json
       "Internal Server Error"
       ```

---
10. ### POST /api/org/reportingto

- **Description:** Retrieves people reporting to the current user.
- **Request Type:** POST
- **Body Parameters:**
  - `email`: Email of the current user.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
        "data": [Array of User Objects],
        "message": "Fetched successfully"
    }
    ```
  - **Status Code:** 400 Bad Request
  - **Body:**
    ```json
    "Failed to fetch"
    ```

---
**Note**: Replace `[...]` with actual values.

This documentation provides details on each API endpoint, including request type, parameters, response format, and possible status codes. Use it as a reference for integrating with the API.




