Features
User Authentication: Secure sign-up and login functionality.
User Profile: Personal profile where users can view and update their information.
Create & Edit Posts: Users can create and edit posts, including images and text.

Likes & share & Comments: Interaction with posts through likes and comments.
Real-time Updates: Post, comment, and follow updates in real time.
Responsive UI: Mobile-friendly and optimized for both desktop and mobile use.

Technology used
MongoDB: NoSQL database for storing user data, posts, and interactions.
Express: Web framework for Node.js, handling server-side logic and API endpoints.
React: Frontend JavaScript library to build a dynamic and interactive user interface.
Node.js: JavaScript runtime for server-side logic and API communication.
tailwind:used for styling

nstall backend dependencies
Navigate to the backend folder and install dependencies:
cd backend
npm install


Install frontend dependencies
Navigate to the frontend folder and install dependencies:
cd frontend
npm install


Set up environment variables
Create a .env file in the backend directory and add the following variables:
PORT=5000
MONGODB_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
Run the application


Start the backend server:
cd backend
npm start


Start the frontend server:
cd frontend
npm start


The app will be available at http://localhost:3000.
API Endpoints
User Authentication
POST /api/auth/signup: Create a new user account.
POST /api/auth/login: Login an existing user.

Posts
GET /api/posts: Get all posts.
POST /api/posts: Create a new post.
PUT /api/posts/:id : Edit a post.
DELETE /api/posts/:id : Delete a post.




Acknowledgements
Thank you to all the open-source libraries and tools that made this project possible!
