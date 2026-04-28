import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Post from "./pages/Post";
import { ToastContainer } from "react-toastify";
import SignInForm from "./components/LoginForm";
import SignUpForm from "./components/RegisterForm";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<SignInForm />} />
          <Route path="register" element={<SignUpForm />} />
        </Route>

        {/* App shell */}
        <Route path="/" element={<Layout />}>
          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="post" element={<Post />} />
          </Route>

          {/* Public */}
          <Route index element={<Home />} />
          <Route path="u/:username" element={<Home />} />
        </Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
