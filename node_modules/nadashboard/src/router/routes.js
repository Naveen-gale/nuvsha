import Dashboard from "../pages/Dashboard.nuv";
import Analytics from "../pages/Analytics.nuv";
import Users from "../pages/Users.nuv";
import Projects from "../pages/Projects.nuv";
import Tasks from "../pages/Tasks.nuv";
import Settings from "../pages/Settings.nuv";
import NotFound from "../pages/NotFound.nuv";

export const routes = [
  { path: "/", component: Dashboard },
  { path: "/analytics", component: Analytics },
  { path: "/users", component: Users },
  { path: "/projects", component: Projects },
  { path: "/tasks", component: Tasks },
  { path: "/settings", component: Settings },
  { path: "*", component: NotFound }
];
