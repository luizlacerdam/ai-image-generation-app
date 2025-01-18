import { Input } from "@/components/ui/input";
import { Brain } from "lucide-react";

const Home = () => {
	return (
		<div className="bg-[#171821]">
			<div className="flex flex-col mt-6 gap-2">
				<span className="text-white text-4xl font-normal text-center">
					Explore popular posts in the Community
				</span>
				<div className="flex flex-row justify-center items-center gap-2">
					<Brain size={24} className="text-violet-500" />
					<span className="text-violet-500 font-bold text-2xl text-center">
						Generated with AI
					</span>
					<Brain size={24} className="text-violet-500" />
				</div>
			</div>
			<Input
				className="bg-homeBackground text-white mt-6 mx-auto w-1/2 h-12"
				type="text"
				placeholder="Search with prompt or name . . ."
			/>
		</div>
	);
};

export default Home;
