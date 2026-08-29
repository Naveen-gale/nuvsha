import Home from "../pages/Home.nuv";
import Language from "../pages/Language.nuv";
import Reactivity from "../pages/Reactivity.nuv";
import Components from "../pages/Components.nuv";
import Forms from "../pages/Forms.nuv";
import Routing from "../pages/Routing.nuv";
import Data from "../pages/Data.nuv";
import Async from "../pages/Async.nuv";
import Styling from "../pages/Styling.nuv";
import Errors from "../pages/Errors.nuv";
import Performance from "../pages/Performance.nuv";
import NotFound from "../pages/NotFound.nuv";

export const routes = [
  { path: '/', component: Home },
  { path: '/language', component: Language },
  { path: '/reactivity', component: Reactivity },
  { path: '/components', component: Components },
  { path: '/forms', component: Forms },
  { path: '/routing', component: Routing },
  { path: '/data', component: Data },
  { path: '/async', component: Async },
  { path: '/styling', component: Styling },
  { path: '/errors', component: Errors },
  { path: '/performance', component: Performance },
  { path: '*', component: NotFound }
];
