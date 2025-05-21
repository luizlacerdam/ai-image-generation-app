import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { AppWindow, Plus, Github, Linkedin, Globe } from "lucide-react";

const MenuBar = () => {
	const navigate = useNavigate();
	const url = useLocation();

	const handleNavigate = () => {
		navigate(url.pathname === "/post" ? "/" : "/post");
	};

	return (
		<nav className="flex flex-wrap justify-between items-center bg-[#1e1f2a] text-white p-4 shadow-md px-8 sticky top-0 z-10">
			<div className="flex items-center gap-4">
				<Link to="/" className="font-bold text-xl text-white hover:text-violet-400 transition">
					luiz's GemAI
				</Link>
				<a
					href="https://github.com/luizlacerdam"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-violet-400 transition"
					>
					<Github />
				</a>
				<a
					href="https://www.linkedin.com/in/luizlacerdam/"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-violet-400 transition"
					>
					<Linkedin />
				</a>
				<a
					href="https://www.luizlacerdam.dev/"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-violet-400 transition"
					>
					<Globe />
				</a>
			</div>

			<Button
				onClick={handleNavigate}
				className={
					url.pathname === "/post"
						? "bg-violet-500 hover:bg-violet-800"
						: "bg-blue-500 hover:bg-blue-800"
				}
				type="button"
			>
				{url.pathname === "/post" ? <AppWindow className="mr-2" /> : <Plus className="mr-2" />}
				{url.pathname === "/post" ? "Back to Home" : "Create new post"}
			</Button>
		</nav>
	);
};

export default MenuBar;
