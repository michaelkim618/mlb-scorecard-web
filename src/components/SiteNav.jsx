import { useAuth } from "../hooks/useAuth";
import NavBar from "./NavBar";
import PublicNav from "./PublicNav";

/** The members' NavBar for a signed-in user, the public one for everyone else.
 *  Pages that are open to both (articles, track record) render this. */
export default function SiteNav() {
  const { user } = useAuth();
  return user ? <NavBar /> : <PublicNav />;
}
