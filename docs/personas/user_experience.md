# 📱 Movie/TV Social App – User Experience

## 🚀 User Flow

### 1. App Launch
- When the user opens the app, they see two options:
  - **Log in**
  - **Create an account**

### 2. 🔑 Sign-Up (if “Create an Account” is selected)
- The user can create an account by entering:
  - Email  
  - Username  
  - Password  
- After signing up, the user is redirected to the **Home Screen**.

### 3. 🏠 Home Feed / Personalized User Feed
- Initially shows only **recommendations** (since the user doesn’t follow anyone yet).  
- Displays:  
  - Latest reviews from followed users  
  - Trending movies and TV shows  
  - Personalized recommendations based on past ratings  
- Users can:  
  - 🔍 Search for movies and TV shows  
  - 🎬 See where movies/shows are available for streaming  
  - 💬 Read reviews and leave comments  

### 4. 🎥 Movie or TV Show Page / Posting to the Feed
- When a user selects or searches for a movie/TV show, the page shows:  
  - Title, description, cast & crew  
  - Trailers (if available)  
  - Available streaming platforms (via APIs like **TMDb** and **JustWatch**)  
- Users can:  
  - ⭐ Rate the movie/show (1–5 stars)  
  - 📝 Write and post reviews  

### 5. 👤 Profile Page & Following System
- Each user has their own profile with:  
  - Their posted reviews  
  - List of followers & following  
  - Favorite movies and TV shows  

### 6. 🔍 Search & Recommendations
- Search for movies/TV shows using the **TMDb** or **JustWatch API**  
- Discover recommended content based on past ratings and reviews  

### 7. 🔔 Notifications
- Users can enable notifications for:  
  - Likes on their reviews  
  - Comments on their reviews  
  - New reviews from people they follow  
