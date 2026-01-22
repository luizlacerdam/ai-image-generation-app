import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  AppWindow,
  Plus,
  Github,
  Linkedin,
  Globe,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { clearToken, isAuthenticated } from "@/utils/auth";

const MenuBar = () => {
  const navigate = useNavigate();
  const url = useLocation();

  const authed = isAuthenticated();

  const handleMainAction = () => {
    if (!authed) {
      navigate("/auth/login");
      return;
    }
    navigate(url.pathname === "/post" ? "/" : "/post");
  };

  const handleLogout = () => {
    clearToken();
    navigate("/auth/login", { replace: true });
  };

  return (
    <nav className="flex items-baseline justify-between bg-[#1e1f2a] text-white p-4 shadow-md sticky top-0 z-10">
      <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
        <Link
          to="/"
          className="font-bold text-lg sm:text-xl text-white hover:text-violet-400 transition"
        >
          luiz&apos;s AIGenerator
        </Link>

        <div className="flex gap-3">
          <a
            href="https://github.com/luizlacerdam"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400 transition"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/luizlacerdam/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400 transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.luizlacerdam.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400 transition"
          >
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="flex items-center gap-2 w-36 md:w-auto">
        {/* Main action */}
        <Button
          onClick={handleMainAction}
          className={`w-full md:w-auto ${
            authed
              ? url.pathname === "/post"
                ? "bg-violet-500 hover:bg-violet-800"
                : "bg-blue-500 hover:bg-blue-800"
              : "bg-blue-500 hover:bg-blue-800"
          }`}
          type="button"
        >
          {!authed ? (
            <LogIn className="mr-2" />
          ) : url.pathname === "/post" ? (
            <AppWindow className="mr-2" />
          ) : (
            <Plus className="mr-2" />
          )}
          {!authed ? "Login" : url.pathname === "/post" ? "Home" : "New post"}
        </Button>

        {/* Secondary actions */}
        {!authed ? (
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            type="button"
            onClick={() => navigate("/auth/register")}
          >
            <UserPlus className="mr-2" />
            Sign up
          </Button>
        ) : (
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            type="button"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" />
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default MenuBar;
