import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Importing Components
import MainNav from "./components/MainNav";

// Importing Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";

// React Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainNav />}>
        <Route index element={<Home title="Home" />} />
        <Route path="register" element={<Register title="register" />} />
        {<Route path="login" element={<Login title="login" />} />}
        {/* <Route path="/pwdfrg" element={<FrogotPassword />} /> */}
        {/* <Route path="/logout" element={<Logout />} /> */}
        <Route path="*" />
      </Route>
      <Route path="/tasks" element={<Tasks />}>
        <Route index />
        {/* <Route path="/:_id" /> */}
      </Route>
      <Route path="/admin">
        <Route index />
      </Route>
      <Route path="/learn">
        <Route index />
      </Route>
      <Route path="/posts">
        <Route index />
      </Route>
    </>
  )
);

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

// <BrowserRouter>
//   <div className="home">
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//     </Routes>
//   </div>
// </BrowserRouter>;
