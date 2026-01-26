import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
const Auth = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLogin = pathname.includes("login");

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <div className="flex flex-1">
        <div className="relative grid flex-1 lg:grid-cols-2">
          {/* Mobile-only home link */}
          <Link
            to="/"
            className="lg:hidden absolute left-4 top-4 font-bold text-lg text-foreground hover:text-primary transition"
          >
            luiz&apos;s AIGenerator
          </Link>

          {/* Top-right actions */}
          <div className="absolute right-4 top-4 flex items-center gap-2 md:right-8 md:top-8">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Button
              onClick={() =>
                navigate(isLogin ? "/auth/register" : "/auth/login")
              }
            >
              {isLogin ? "Create account" : "Login"}
            </Button>
          </div>

          {/* Left panel */}
          <div className="relative hidden h-full flex-col p-10 lg:flex">
            <div className="pointer-events-none absolute inset-0 bg-primary/5" />
            <Link
              to="/"
              className="font-bold text-lg sm:text-xl text-foreground hover:text-primary transition"
            >
              luiz&apos;s AIGenerator
            </Link>

            <blockquote className="relative z-20 mt-auto text-muted-foreground leading-normal text-balance">
              "Simplicity is the ultimate sophistication" <br />– Da Vinci
            </blockquote>
          </div>

          {/* Form panel */}
          <div className="flex items-center justify-center p-6 lg:p-8">
            <div className="w-full max-w-sm">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
