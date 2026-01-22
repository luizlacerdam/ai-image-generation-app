import { Outlet } from "react-router-dom";
import MenuBar from "./Menubar";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <MenuBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
