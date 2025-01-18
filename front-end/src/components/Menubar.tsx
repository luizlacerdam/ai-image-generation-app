import { Button } from "./ui/button";

const MenuBar = () => {
	return (
		<nav className="flex flex-row justify-between items-center bg-[#1e1f2a] text-white p-4 shadow-md">
			<div className="font-bold text-xl">luiz's GemAI</div>
			<Button className="bg-violet-500 hover:bg-violet-800" type="button">
				+ Create new post
			</Button>
		</nav>
	);
};

export default MenuBar;
