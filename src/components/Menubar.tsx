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
		<nav className="flex items-baseline justify-between bg-[#1e1f2a] text-white p-4 shadow-md sticky top-0 z-10">
			{/* Left side - logo + links */}
			<div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
				<Link
				to="/"
				className="font-bold text-lg sm:text-xl text-white hover:text-violet-400 transition"
				>
				luiz's GemAI
				</Link>

				<div className="flex gap-3">
					<a
						href="https://github.com/luizlacerdam"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-violet-400 transition"
					>
						<Github className="w-5 h-5" />
					</a>
					<a
						href="https://www.linkedin.com/in/luizlacerdam/"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-violet-400 transition"
					>
						<Linkedin className="w-5 h-5" />
					</a>
					<a
						href="https://www.luizlacerdam.dev/"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-violet-400 transition"
					>
						<Globe className="w-5 h-5" />
					</a>
				</div>
			</div>
			<div className="w-36 md:w-auto">
				<Button
				onClick={handleNavigate}
				className={`w-full md:w-auto ${
					url.pathname === "/post"
					? "bg-violet-500 hover:bg-violet-800"
					: "bg-blue-500 hover:bg-blue-800"
				}`}
				type="button"
				>
				{url.pathname === "/post" ? (
					<AppWindow className="mr-2" />
				) : (
					<Plus className="mr-2" />
				)}
				{url.pathname === "/post" ? "Home" : "New post"}
				</Button>
			</div>
		</nav>

	);
};

export default MenuBar;
