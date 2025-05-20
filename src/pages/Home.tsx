import ImageCard from "@/components/ImageCard";
import { Input } from "@/components/ui/input";
import { Brain, Search } from "lucide-react";

const Home = () => {
	const items = [
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A beautiful sunset",
		},
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A serene mountain view",
		},
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A peaceful beach scene",
		},
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A vibrant cityscape",
		},
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A tranquil forest trail",
		},
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A beautiful sunset",
		},
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A serene mountain view",
		},
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A peaceful beach scene",
		},
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A vibrant cityscape",
		},
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A tranquil forest trail",
		},
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A starry night",
		},
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A snowy mountain peak",
		},
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A desert landscape",
		},
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A lush green valley",
		},
		{
			photo: "https://picsum.photos/600",
			author: "luiz",
			prompt: "A roaring waterfall",
		},
	];

	const calculateGridPosition = (index: number) => {
		const group = Math.floor(index / 5);
		const positionInGroup = index % 5;
		if (positionInGroup === 0) {
			if (group % 2 === 0) {
				return {
					gridColumn: "1 / 3",
					gridRow: `${group * 2 + 1} / ${group * 2 + 3}`,
				};
			}
			return {
				gridColumn: "3 / 5",
				gridRow: `${group * 2 + 1} / ${group * 2 + 3}`,
			};
		}

		const column =
			group % 2 === 0
				? ((positionInGroup - 1) % 2) + 3
				: ((positionInGroup - 1) % 2) + 1;
		const row = Math.floor((positionInGroup - 1) / 2) + group * 2 + 1;
		return {
			gridColumn: `${column} / ${column + 1}`,
			gridRow: `${row} / ${row + 1}`,
		};
	};

	return (
		<div className="bg-[#171821]">
			<div className="flex flex-col mt-12 gap-2">
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
			<div className="flex flex-row justify-center items-center mt-10 gap-2 border-2 border-white rounded-xl py-2 px-4 mx-auto w-1/2">
			<Search color="white"/>
			<Input
				className="focus-visible:ring-offset-0 focus-visible:ring-0 border-none focus-visible:border-0 bg-transparent text-white placeholder:text-white"
				type="text"
				placeholder="Search with prompt or name . . ."
				/>
			</div>
			<div className="mt-10 max-w-7xl flex justify-center py-12 items-center mx-auto">
				<div
					className="grid gap-5"
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(4, 1fr)",
						gridTemplateRows: "repeat(auto-fill, 1fr)",
						gap: "20px",
					}}
				>
					{items.map((item, index) => (
						<ImageCard
							key={index}
							item={item}
							style={calculateGridPosition(index)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
