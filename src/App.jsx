import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import TodaysGames from "./components/TodaysGames";
import SeasonStats from "./components/SeasonStats";
import News from "./components/News";
import Blog from "./components/Blog";
import Community from "./components/Community";
import Footer from "./components/Footer";

function App() {
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
