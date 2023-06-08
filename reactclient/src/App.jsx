import { createBrowserRouter, Outlet, RouterProvider, useNavigate, Link } from "react-router-dom";

// =========> Imports = Libraries <=========
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SiteData } from "./SiteData";
import { AuthContextProvider } from "./context/AuthContext";
import { useAuthContext } from "./Hooks";

// Importing elements
import { MakeNavItems } from "./components/MainNav";
import { userLoader } from "./Helper";
import Footer from "./components/Footer";
import ErrorElement from "./components/Error";

// Importing Pages
import { AuthTab } from "./pages/AuthPage";
import { Home, About, FAQ } from "./pages/Home";
import { Discover, Prepaid, Recharge, Paybills, Services } from "./pages/Services";
import { Channel, LearningHome, Gaming, LearningPages, Music, Trending } from "./pages/LearningPages";
import { ECommerce, Food, ITsepcs, Sports, TrendingECommerce } from "./pages/eCommerce";

// Application Pages
import { TaskPage } from "./pages/Tasks2";
import Posts from "./pages/Posts";
import { BudgetExpensesPage, BudgetPage, OneBudget } from "./pages/BudgetExpenses";
import { BudgetServerless, ServiceLoader, ServiceAction } from "./pages/BudgetAppServerless";

// =========> Layout = PageLayout <=========
export function PageLayout() {
  const { user } = useAuthContext();
  return (
    <div className="PageLayout">
      <header>
        <MakeNavItems data={SiteData.PublicMenu} />
        {/* <BraidCrumbs /> */}
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

// =========> Action = LogOut <=========
export async function LogoutAction() {
  localStorage.removeItem("user");
  const { dispatch } = useAuthContext();
  dispatch({ type: "LOGOUT" });
  const navigate = useNavigate();
  navigate("/");
}

export const Pricing = () => {
  const { user } = useAuthContext();
  const notify = () => toast.info("Wow so easy!"); // success, warning, error, default
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
      {
        path: "signup",
        element: <AuthTab />,
      },
      {
        path: "services",
        element: <Services />,

        children: [
          { path: "discover", element: <Discover /> },
          {
            path: "prepaid",
            element: <Prepaid />,
          },
          { path: "recharge", element: <Recharge /> },
          { path: "paybills", element: <Paybills /> },
        ],
      },
      {
        path: "learning",
        element: <LearningPages />,
        children: [
          { path: "home", element: <LearningHome /> },
          { path: "channel", element: <Channel /> },
          { path: "trending", element: <Trending /> },
          { path: "gaming", element: <Gaming /> },
          { path: "music", element: <Music /> },
        ],
      },
      {
        path: "ecommerce",
        element: <ECommerce />,
        children: [
          { path: "trending", element: <TrendingECommerce /> },
          { path: "food", element: <Food /> },
          { path: "sports", element: <Sports /> },
          { path: "itspecs", element: <ITsepcs /> },
        ],
      },
      {
        path: "about",
        children: [
          { index: true, element: <About /> },
          { path: "team", element: <h1>Team</h1> },
          { path: "vision", element: <h1>Vision</h1> },
          { path: "pricing", element: <Pricing />, loader: userLoader },
        ],
      },
      {
        path: "support",
        children: [
          { index: true, element: <h1>Support</h1> },
          { path: "FAQ", element: <FAQ /> },
          { path: "contact", element: <h1>Contact</h1> },
        ],
      },
      {
        path: "tasks",
        children: [
          { index: true, element: <TaskPage /> },
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
        element: <BudgetPage />,
        children: [
          { index: true, element: <BudgetExpensesPage /> },
          { path: "serverless", element: <BudgetServerless />, loader: ServiceLoader, action: ServiceAction, errorElement: <ErrorElement /> },
          { path: ":budget_id", element: <OneBudget /> },
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
    <div className="App">
      <AuthContextProvider>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      </AuthContextProvider>
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
