# 📺 StreamVault – Features

StreamVault is a **social platform for movie and TV show enthusiasts**.  
It combines reviews, ratings, recommendations, and social features into one app, available on **React Native (mobile)** and with a **Node.js + MongoDB backend**.

---

## ✨ Key Features

- **User Account Creation**: Sign up with an email, choose a username and password.  
- **Content Posting & Contribution**: Users can add reviews and rate TV shows and movies.  
- **Following System**: Users can follow friends and others with similar interests.  
- **Movie and Show Selection**: Users can either manually input content or select from a pre-existing database (e.g., using the TMDB API).  
- **Streaming Service Information**: Users can see where movies and TV shows are available for streaming (e.g., Netflix, Viaplay, Disney+).  


## ✨ Features

### 🔑 User Accounts
- Sign up with **email, username, password**
- Secure authentication with **Firebase Auth**
- Log in / log out
- Edit profile (name, bio, profile picture)
- View followers & following lists

### 📝 Content Posting
- Post reviews for **movies and TV shows**
- Rate content (⭐ 1–5 stars)
- Write text reviews
- View all reviews on movie/show detail pages

### 👥 Social Interaction
- Follow/unfollow users
- Personalized home feed:
  - Reviews from followed users
  - Trending movies/TV shows
  - Recommendations based on past ratings
- Like and comment on reviews
- Engage in discussions about movies & shows

### 🎬 Movies & TV Shows
- Browse or search movies and TV shows via **TMDb API**
- Manual entry option for custom content
- View detailed pages:
  - Overview, cast, trailers (if available)
  - Streaming service availability (via **JustWatch API**)
  - Average ratings & user reviews

### 🔍 Discovery & Recommendations
- Search by **title, TV show, user, or review**
- Filter results (trending, top-rated, friends’ reviews, etc.)
- Basic recommendation system:
  - Suggests movies/series based on user ratings & preferences

### 🎨 User Experience
- Clean, minimal UI built with **React Native + Tailwind + shadcn/ui**
- **Dark & light mode** support
- Smooth navigation & animations

### 🔔 Notifications *(planned)*
- Alerts for new comments on your reviews
- Notifications when followed users post new reviews
- Likes on your reviews
- Optional push notifications (via **Firebase Cloud Messaging**)


## 🗺️ Roadmap

### Phase 1 – Core Functionality 
- User auth (signup, login, profile)
- Post reviews & ratings
- Follow/unfollow users
- TMDb API integration
- Basic feed
- Setup backend (Node.js + Express + MongoDB Atlas + Firebase Auth)

### Phase 2 – Enhanced UX & Engagement 
- Streaming service info (JustWatch API)
- Movie/TV detail pages (trailers, availability, ratings)
- Likes & comments
- Profile customization (bio, profile picture)
- Search & filters
- Multi-language support (English, Finnish)

### Phase 3 – Future Enhancements 
- Basic recommendation algorithm (based on user ratings)
- Notifications (likes, comments, new reviews from followed users)
- Discussion forums & groups
- UI/UX polish (animations, theming, accessibility)
- Beta testing & deployment
