<h2>Tech Stack </h2>
<br>
Nextjs , typescript, nodejs, javascript, mongoDB.
<br>
<h2>Deployment</h2>
Nextjs (client) - vercel
Nodejs (server) - render
<br>
<h2>Architecture</h2>
 <br>
Client-Side (Next.js):<br>
Register Page: User enters name, email, and password. Password is validated for at least 8 characters and alphanumeric.<br>
OTP Verify Page: After registration, user is redirected to OTP verification page. User enters OTP received via email.<br>
Login Page: User can log in with email and password.<br>
Dashboard Page: Shows user's login history.<br>
Server-Side (Node.js with Express):<br>
Routes:<br>
/register: Receives registration data from client, validates password, saves user data (name, email, password) to MongoDB as unverified, and sends OTP to user's email.<br>
/verifyotp: Receives OTP from client, verifies it, and updates user's status to verified in MongoDB.<br>
/login: Receives login credentials from client, authenticates user, and establishes WebSocket connection for login history.<br>
Middleware:<br>
Authentication middleware: Authenticates users during login.<br>
Database middleware: Establishes connection to MongoDB Atlas for user data storage.<br>
WebSocket Server:<br>
Handles WebSocket connections for real-time communication.<br>
Sends login history data to client for display on dashboard.<br>
Database (MongoDB Atlas):<br>
Stores user data including name, email, hashed password, verification status, and login history.<br>
Login history is updated with user's device information, date, and time upon successful login.<br>
Communication:<br>
Client communicates with server via RESTful APIs for registration, OTP verification, and login.<br>
WebSocket connection is established for real-time login history updates.<br>
Additional Components:<br>
Email Service: Sends OTP to user's email for verification.<br>
Password Hashing: Passwords are hashed before storing in MongoDB for security.<br>
Session Management: Manages user sessions and authentication state.<br>
Error Handling: Proper error handling for API requests, database operations, and WebSocket communication.<br>

Github server - https://github.com/deltrexgg/assignment-server<br>
Github client - https://github.com/deltrexgg/assignment-client<br>
Web App       - https://assignment-client-smoky.vercel.app/<br>
