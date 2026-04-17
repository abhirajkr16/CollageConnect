# College Networking Platform (MERN)

Beginner-friendly full stack project with:

- JWT authentication
- Profile management
- Post feed with like/unlike and delete
- Basic follow/unfollow system
- Dark glassmorphism React UI

## Folder Structure

```text
client/
  components/
  pages/
  services/
  styles/
server/
  controllers/
  routes/
  models/
  middleware/
  server.js
```

## 1) Backend Setup (Step-by-Step)

1. Open terminal in `server`.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` from `.env.example`:

   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/college_network
   JWT_SECRET=replace_with_strong_secret
   ```

4. Run backend:

   ```bash
   npm run dev
   ```

## 2) Frontend Setup (Step-by-Step)

1. Open second terminal in `client`.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` from `.env.example`:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Run frontend:

   ```bash
   npm run dev
   ```

## 3) API Endpoints

### Auth (`/api/auth`)

- `POST /signup` -> create account
- `POST /login` -> login and get JWT token

### Users (`/api/users`)

- `GET /me` -> get logged-in user profile
- `PUT /me` -> update profile (`bio`, `skills`, `college`, `profilePicture`)
- `POST /:userId/follow` -> follow user
- `POST /:userId/unfollow` -> unfollow user
- `GET /:userId` -> fetch user profile by id

### Posts (`/api/posts`)

- `GET /` -> get all posts feed
- `POST /` -> create post
- `PUT /:postId/like` -> like/unlike post
- `DELETE /:postId` -> delete own post

> Protected routes require `Authorization: Bearer <token>`.

## 4) Sample Database Schema

### User

```js
{
  name: String,
  email: String,
  password: String, // hashed with bcrypt
  bio: String,
  skills: [String],
  college: String,
  profilePicture: String,
  followers: [ObjectId],
  following: [ObjectId]
}
```

### Post

```js
{
  text: String,
  author: ObjectId,
  likes: [ObjectId]
}
```

## 5) How It Works

### Authentication Flow

- During signup/login, backend hashes passwords with `bcryptjs`.
- Backend creates JWT token with `jsonwebtoken`.
- Frontend stores token in `localStorage`.
- Axios interceptor automatically sends token on protected API calls.
- Express middleware verifies token and attaches `req.user.id`.

### Frontend-Backend Communication

- Frontend uses Axios service files in `client/services`.
- All API calls go through one Axios instance (`services/api.js`).
- Pages call service methods (no direct URL strings all over the app).

### Where Database Is Used

- MongoDB stores users and posts collections.
- Mongoose models define shape, validations, and relationships.
- Controllers perform create/read/update/delete actions on those models.

## 6) Interview Explanation (Simple Script)

"I built a MERN-based College Networking Platform with JWT auth and protected APIs.  
On the backend, I used Express with modular controllers/routes, Mongoose for schemas, bcrypt for secure password hashing, and JWT middleware for authorization.  
On the frontend, I used React functional components, hooks, Context API for auth state, and Axios interceptors for token-based API communication.  
The app supports profile editing, post feed interactions, and follow/unfollow features, while keeping a clean and scalable folder structure."
