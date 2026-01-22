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
  Sun,
  Moon,
} from "lucide-react";
import { clearToken, isAuthenticated } from "@/utils/auth";
import useTheme from "@/hooks/useTheme";

const MenuBar = () => {
  const navigate = useNavigate();
  const url = useLocation();
  const authed = isAuthenticated();

  const { theme, toggleTheme } = useTheme();

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
    <nav className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-4">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-bold text-lg sm:text-xl text-foreground hover:text-primary transition"
          >
            luiz&apos;s AIGenerator
          </Link>

          <div className="flex items-center gap-3 text-muted-foreground">
            <a
              href="https://github.com/luizlacerdam"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/luizlacerdam/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://www.luizlacerdam.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
              aria-label="Website"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="border-border"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Main action */}
          <Button onClick={handleMainAction} type="button">
            {!authed ? (
              <LogIn className="mr-2" />
            ) : url.pathname === "/post" ? (
              <AppWindow className="mr-2" />
            ) : (
              <Plus className="mr-2" />
            )}
            {!authed ? "Login" : url.pathname === "/post" ? "Home" : "New post"}
          </Button>

          {/* Secondary */}
          {!authed ? (
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate("/auth/register")}
            >
              <UserPlus className="mr-2" />
              Sign up
            </Button>
          ) : (
            <Button variant="outline" type="button" onClick={handleLogout}>
              <LogOut className="mr-2" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
