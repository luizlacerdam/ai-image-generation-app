import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkle, WandSparkles } from "lucide-react";

const Post = () => {
	return (
		<div className="flex flex-row mt-20 p-12 gap-20 px-12 max-w-7xl mx-auto">
			<div className="flex flex-col gap-6 p-4 text-white w-1/2">
				<div className="flex flex-col gap-2">
					<span className="text-2xl font-semibold">
						Generate Image with prompt
					</span>
					<span className="text-normal opacity-50">
						Write your prompt according to the image you want to generate!
					</span>
				</div>
				<div className="flex flex-col gap-6">
					<div>
						<Label className="opacity-50 text-sm">AUTHOR</Label>
						<Input
							className="bg-homeBackground h-12"
							type="text"
							placeholder="Enter your name"
						/>
					</div>
					<div>
						<Label className="opacity-50 text-sm">IMAGE PROMPT</Label>
						<Textarea
							className="bg-homeBackground h-40"
							placeholder="Write your prompt here"
						/>
					</div>
					<span className="text-sm opacity-50">
						* You can post the AI Generated image to showcase in the community!
					</span>
				</div>
				<div className="flex flex-row justify-center gap-4 w-full">
					<Button className="bg-blue-500 hover:bg-blue-800 w-1/2" type="button">
						<Sparkle />
						Generate Image
					</Button>
					<Button
						className="bg-violet-500 hover:bg-violet-800 w-1/2"
						type="button"
					>
						<WandSparkles />
						Post Image
					</Button>
				</div>
			</div>
			<div className="w-1/2 border-dashed border-2 border-violet-500 flex justify-center items-center border-opacity-50 rounded-xl">
				<span className="text-white text-opacity-50">
					Write a prompt to generate image
				</span>
			</div>
		</div>
	);
};

export default Post;
