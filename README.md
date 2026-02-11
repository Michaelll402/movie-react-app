# Movie Search App 🎬

A modern React movie search application built to demonstrate real-world frontend development skills, performance optimization, and backend integration.

This project allows users to search for movies using the TMDB API and tracks trending searches using an Appwrite database. The app focuses on clean architecture, efficient data handling, and user experience.

---

## 🚀 What This App Does

- Users can search for movies in real time
- Search input is **debounced** to prevent unnecessary API calls
- Search data is stored and analyzed to determine **trending movies**
- Trending movies are ranked based on how often users search for them
- Data is persisted using **Appwrite** as a backend service

---

## 🧠 Key Technical Concepts Used

### 1. Debounced Search (Performance Optimization)
The search input uses a debounce mechanism to delay API requests until the user stops typing.  
This prevents excessive network calls and improves performance, especially for real-world usage.

### 2. React Hooks & State Management
The app makes extensive use of:
- `useState` for managing UI and data state
- `useEffect` for side effects like API calls
- `useDebounce` to control search behavior

The component structure is clean and modular, separating UI components from logic.

### 3. Backend Integration with Appwrite
Appwrite is used to:
- Store search terms
- Increment search counts
- Retrieve trending movies sorted by popularity

The backend logic checks if a search term already exists:
- If it exists → increments its count
- If not → creates a new record

This mimics real analytics tracking used in production apps.

### 4. Error Handling & Loading States
The app handles:
- API errors gracefully
- Loading states using a custom spinner component
- Empty and edge-case responses

---

## 🛠 Tech Stack

- **React**
- **Vite**
- **JavaScript (ES6+)**
- **Appwrite**
- **TMDB API**
- **CSS**

---

## 📂 Project Structure

- `src/components` – Reusable UI components
- `src/appwrite.js` – Backend interaction logic
- `src/App.jsx` – Main application logic
- `.env.example` – Environment variable template (no secrets exposed)

---

## 🔐 Environment Variables

This project uses environment variables for API keys.  
Sensitive data is excluded from version control using `.gitignore`.

To run locally, create a `.env.local` file based on `.env.example`.

---

## ▶️ How to Run Locally

```bash
git clone https://github.com/Michaelll402/movie-react-app.git
cd movie-react-app
npm install
npm run dev
