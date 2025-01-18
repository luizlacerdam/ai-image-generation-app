// Layout.tsx
import { Outlet } from "react-router-dom";
import MenuBar from "./Menubar";

const Layout = () => {
	return (
		<div>
			{/* Menu Bar */}
			<MenuBar />

			{/* Main Content */}
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
