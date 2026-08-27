import Home from "../pages/Home.nuv";
import About from "../pages/About.nuv";
import NotFound from "../pages/NotFound.nuv";

export const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "*", component: NotFound }
];
