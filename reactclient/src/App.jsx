import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";

// =========> Imports = Libraries <=========
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing elements
import MainNav from "./components/MainNav";

// Importing Pages
import { Home, About, FAQ } from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import { AuthContextProvider } from "./context/AuthContext";
import Posts from "./pages/Posts";
import Footer from "./components/Footer";
import {
  Budget,
  BudgetAction,
  BudgetExpensesPage,
  BudgetLoader,
  Expenses,
} from "./pages/BudgetExpenses";
import { Error, userLoader } from "./Helper";

// =========> Layout = PageLayout <=========
export function PageLayout() {
  return (
    <div className="PageLayout">
      <header>
        <MainNav />
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

// =========> Action = LogOut <=========
export async function LogoutAction() {
  return localStorage.removeItem("user");
}

export const Pricing = () => {
  const notify = () => toast.info("Wow so easy!", { position: "bottom-left" }); // success, warning, error, default

  const { user } = useLoaderData();
  return (
    <div>
      <button className="btn btn-info" onClick={notify}>
        Notify!
      </button>
      <h1>{`Name ${user.user.name}`}</h1>
    </div>
  );
};

// React Router
const router = createBrowserRouter([
  {
    // path: "team", element: <h1>Team</h1>, loader: , ErrorBoundary:
    path: "/*",
    element: <PageLayout />,
    children: [
      { index: true, element: <Home /> },
      // { path: '', element: (<h1>Blog Index</h1>) },
      {
        path: "about",
        children: [
          { index: true, element: <About /> },
          { path: "team", element: <h1>Team</h1> },
          { path: "vision", element: <h1>Vision</h1> },
        ],
      },

      {
        path: "services",
        element: <h1>Services</h1>,
      },
      {
        path: "pricing",
        element: <Pricing />,
        loader: userLoader,
        errorElement: <Error />,
      },

      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "support",
        children: [
          { index: true, element: <h1>Support</h1> },
          { path: "FAQ", element: <FAQ /> },
          { path: "contact", element: <h1>contact</h1> },
        ],
      },
      {
        path: "tasks",
        children: [
          { index: true, element: <Tasks /> },
          // { path: "FAQ", element: FAQ },
        ],
      },
      {
        path: "posts",
        children: [
          { index: true, element: <Posts /> },
          // { path: "FAQ", element: FAQ },
        ],
      },
      {
        path: "budget",
        element: <BudgetExpensesPage />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Budget />,
            loader: BudgetLoader,
            action: BudgetAction,
          },
          { path: ":id" },
        ],
      },
      {
        path: "admin",
        children: [
          { index: true, element: <h1>Admin</h1> },
          // { path: "FAQ", element: FAQ },
        ],
      },
      { path: "*", element: <h1>404 Not found</h1> },
    ],
  },
  { path: "logout", action: LogoutAction, element: <h1>logout</h1> },
]);

export default function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </AuthContextProvider>
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
