import Header from "./components/Header";
import MovieDetails from "./components/MovieDetails";
import UserProfile from "./components/UserProfile";
import MovieList from "./components/MovieList";  
import Reviews from "./components/Reviews";  
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <MovieList /> 
        <MovieDetails />
        <UserProfile />
        <Reviews />
      </main>
    </>
  );
}

export default App;
