import { useAuth } from "../hooks/useAuth";
import App from "../App";
import LandingPage from "./LandingPage";

/** "/" is the members' dashboard for a signed-in user and the public landing
 *  page for everyone else — the sign-in wall used to be the whole site. */
export default function HomePage() {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ minHeight: "100vh", background: "var(--color-canvas-alt)" }} aria-busy="true" />;
  return user ? <App /> : <LandingPage />;
}
