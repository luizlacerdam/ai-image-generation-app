// Layout.tsx
import { Outlet } from "react-router-dom";
import MenuBar from "./Menubar";
import { ToastContainer } from 'react-toastify';

const Layout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<MenuBar />
			<main className="flex-grow bg-[#171821]">
				<Outlet />
				<ToastContainer
				/>
			</main>
		</div>
	);
};

export default Layout;
