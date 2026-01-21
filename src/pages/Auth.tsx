import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
const Auth = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLogin = pathname.includes("login");

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="flex flex-1 flex-col">
        <div className="bg-background flex flex-1 overflow-hidden md:flex-1">
          <div className="relative grid flex-1 lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Toggle button */}

            <Button
              onClick={() =>
                navigate(isLogin ? "/auth/register" : "/auth/login")
              }
              className="absolute top-4 right-4 md:top-8 md:right-8"
            >
              {isLogin ? "Create account" : "Login"}
            </Button>
            {/* Left panel */}
            <div className="text-primary relative hidden h-full flex-col p-10 lg:flex">
              <div className="bg-primary/5 pointer-events-none absolute inset-0" />
              <div className="relative z-20 flex items-center text-lg font-medium">
                luiz&apos;s AIGenerator
              </div>
              <div className="relative z-20 mt-auto">
                <blockquote className="leading-normal text-balance">
                  "Simplicity is the ultimate sophistication" <br />- Da Vinci
                </blockquote>
              </div>
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
    </div>
  );
};

export default Auth;
