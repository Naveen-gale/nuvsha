import Home from "../pages/Home.nuv";
import About from "../pages/About.nuv";
import Contact from "../pages/Contact.nuv";
import Data from "../pages/Data.nuv";
import NotFound from "../pages/NotFound.nuv";

export const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/data", component: Data },
  { path: "*", component: NotFound }
];
