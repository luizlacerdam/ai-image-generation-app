import ImageCard from "@/components/ImageCard";
import { Input } from "@/components/ui/input";
import usePost, { Post } from "@/hooks/api/usePost";
import { Brain, Search } from "lucide-react";
import { useDebounce } from "use-debounce"; // or 'bouncer' if you're using it

import { useState } from "react";

const Home = () => {
		const [searchInput, setSearchInput] = useState("");
			const [debouncedSearch] = useDebounce(searchInput, 500);
	const { posts, isLoading } = usePost(debouncedSearch);

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
			<Search 
			color="white"/>
			<Input
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
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
					{isLoading ? (
						<div className="flex justify-center items-center w-full h-full">
							<span className="text-white text-2xl font-normal">
								Loading...
							</span>
						</div>
					) : (posts ?? []).map((item: Post, index: number) => (
						<ImageCard
							key={index}
							item={item}
							style={calculateGridPosition(index)}
						/>
					)) }
				</div>
			</div>
		</div>
	);
};

export default Home;
