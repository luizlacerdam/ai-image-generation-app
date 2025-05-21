import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { AppWindow, Plus } from "lucide-react";

const MenuBar = () => {
	const navigate = useNavigate();
	const url = useLocation();

	const handleNavigate = () => {
		if (url.pathname === "/post") {
			navigate("/");
		} else {
			navigate("/post");
		}
	};

	return (
		<nav className="flex flex-row justify-between items-center bg-[#1e1f2a] text-white p-4 shadow-md px-8 sticky top-0 z-10">
			<Link to={'/'} className="font-bold text-xl">luiz's GemAI</Link>
			<Button
				onClick={handleNavigate}
				className={
					url.pathname === "/post"
						? "bg-violet-500 hover:bg-violet-800"
						: "bg-blue-500 hover:bg-blue-800"
				}
				type="button"
			>
				{url.pathname === "/post" ? <AppWindow /> : <Plus />}
				Create new post
			</Button>
		</nav>
	);
};

export default MenuBar;
