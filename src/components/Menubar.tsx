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
  Menu,
} from "lucide-react";
import { clearToken, isAuthenticated } from "@/utils/auth";
import useTheme from "@/hooks/useTheme";

// shadcn/ui dropdown
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MenuBar = () => {
  const navigate = useNavigate();
  const url = useLocation();
  const authed = isAuthenticated();
  const { theme, toggleTheme } = useTheme();

  const handleMainAction = () => {
    if (!authed) return navigate("/auth/login");
    navigate(url.pathname === "/post" ? "/" : "/post");
  };

  const handleLogout = () => {
    clearToken();
    navigate("/", { replace: true });
  };

  const mainActionLabel = !authed
    ? "Login"
    : url.pathname === "/post"
      ? "Home"
      : "New post";

  const MainActionIcon = !authed
    ? LogIn
    : url.pathname === "/post"
      ? AppWindow
      : Plus;

  return (
    <nav className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-secondary/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-4">
        {/* Left: Logo + socials (socials only on md+) */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-bold text-lg sm:text-xl text-foreground hover:text-primary transition"
          >
            luiz&apos;s AIGenerator
          </Link>

          <div className="hidden items-center gap-3 text-muted-foreground md:flex">
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

        {/* Right: Desktop actions + Mobile hamburger */}
        <div className="flex items-center gap-2">
          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
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

            <Button onClick={handleMainAction} type="button">
              <MainActionIcon className="mr-2" />
              {mainActionLabel}
            </Button>

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

          {/* Mobile hamburger menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border"
                  aria-label="Open menu"
                  title="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                {/* Theme toggle */}
                <DropdownMenuItem onClick={toggleTheme} className="gap-2">
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </DropdownMenuItem>

                {/* Main action */}
                <DropdownMenuItem onClick={handleMainAction} className="gap-2">
                  <MainActionIcon className="h-4 w-4" />
                  {mainActionLabel}
                </DropdownMenuItem>

                {/* Auth action */}
                {!authed ? (
                  <DropdownMenuItem
                    onClick={() => navigate("/auth/register")}
                    className="gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    Sign up
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={handleLogout} className="gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                )}

                {/* Socials inside hamburger (mobile only) */}
                <div className="mt-2 border-t pt-2 flex items-center justify-around text-muted-foreground">
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
