Tech Stack 

Nextjs , typescript, nodejs, javascript, mongoDB.

Deployment
Nextjs (client) - vercel
Nodejs (server) - render

Architecture
 
Client-Side (Next.js):
Register Page: User enters name, email, and password. Password is validated for at least 8 characters and alphanumeric.
OTP Verify Page: After registration, user is redirected to OTP verification page. User enters OTP received via email.
Login Page: User can log in with email and password.
Dashboard Page: Shows user's login history.
Server-Side (Node.js with Express):
Routes:
/register: Receives registration data from client, validates password, saves user data (name, email, password) to MongoDB as unverified, and sends OTP to user's email.
/verifyotp: Receives OTP from client, verifies it, and updates user's status to verified in MongoDB.
/login: Receives login credentials from client, authenticates user, and establishes WebSocket connection for login history.
Middleware:
Authentication middleware: Authenticates users during login.
Database middleware: Establishes connection to MongoDB Atlas for user data storage.
WebSocket Server:
Handles WebSocket connections for real-time communication.
Sends login history data to client for display on dashboard.
Database (MongoDB Atlas):
Stores user data including name, email, hashed password, verification status, and login history.
Login history is updated with user's device information, date, and time upon successful login.
Communication:
Client communicates with server via RESTful APIs for registration, OTP verification, and login.
WebSocket connection is established for real-time login history updates.
Additional Components:
Email Service: Sends OTP to user's email for verification.
Password Hashing: Passwords are hashed before storing in MongoDB for security.
Session Management: Manages user sessions and authentication state.
Error Handling: Proper error handling for API requests, database operations, and WebSocket communication.

Github server - https://github.com/deltrexgg/assignment-server
Github client - https://github.com/deltrexgg/assignment-client
Web App       - https://assignment-client-smoky.vercel.app/
