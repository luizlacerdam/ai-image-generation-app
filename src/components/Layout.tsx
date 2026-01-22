import { Outlet } from "react-router-dom";
import MenuBar from "./Menubar";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <MenuBar />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
