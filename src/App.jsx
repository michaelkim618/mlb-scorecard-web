import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import TodaysGames from "./components/TodaysGames";
import SeasonStats from "./components/SeasonStats";
import News from "./components/News";
import Blog from "./components/Blog";
import Community from "./components/Community";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  // When navigating from /blog to /#section, scroll to that section
  // Also handle Supabase OAuth callback (strips access_token from URL)
  useEffect(() => {
    const hash = location.hash;

    // Supabase OAuth callback contains access_token — clean URL and reload
    if (hash && hash.includes("access_token")) {
      window.history.replaceState(null, "", window.location.pathname);
      return;
    }

    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location]);

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <NavBar />
      <main>
        <Hero />
        <TodaysGames />
        <SeasonStats />
        <News />
        <Blog />
        <Community />
      </main>
      <Footer />
    </div>
  );
}

export default App;
