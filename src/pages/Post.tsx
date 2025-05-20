import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useImageGen from "@/hooks/api/useImageGen";
import { Sparkle, WandSparkles } from "lucide-react";
import { useState } from "react";

const Post = () => {
	const [name, setName] = useState("");
	const [prompt, setPrompt] = useState("");
	const { generateNewImage, } = useImageGen();
	const [imageUrl, setImageUrl] = useState('');
	const handleGenerateImage = async () => {
		generateNewImage.mutate(prompt, {
			onSuccess: (data) => {
				setImageUrl(data); // Update the image URL state with the generated image URL
			},
			onError: (error) => {
				console.error("Error generating image:", error);
			},
		});
	};

	const postImageDisabled = !imageUrl || generateNewImage.isPending || !name;
	const handlePostImage = () => {
		// Implement the logic to post the image to the community
	}

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
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<Label className="opacity-50 text-sm">IMAGE PROMPT</Label>
						<Textarea
							className="bg-homeBackground h-40"
							placeholder="Write your prompt here"
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
						/>
					</div>
					<span className="text-sm opacity-50">
						* You can post the AI Generated image to showcase in the community!
					</span>
				</div>
				<div className="flex flex-row justify-center gap-4 w-full">
					<Button
						className="bg-blue-500 hover:bg-blue-800 w-1/2"
						type="button"
						onClick={handleGenerateImage}
						disabled={!prompt || generateNewImage.isPending}
					>
						<Sparkle />
						Generate Image
					</Button>
					<Button
						className="bg-violet-500 hover:bg-violet-800 w-1/2"
						type="button"
						disabled={postImageDisabled}
						onClick={handlePostImage}
					>
						<WandSparkles />
						Post Image
					</Button>
				</div>
			</div>
			<div className="w-1/2 border-dashed border-2 border-violet-500 flex justify-center items-center border-opacity-50 rounded-xl">
				{imageUrl ? (
					<img
						src={imageUrl}
						alt="Generated"
						className="rounded-xl max-w-full max-h-full"
					/>
				) : (
					<span className="text-white text-opacity-50">
						Write a prompt to generate image
					</span>
				)}
			</div>
		</div>
	);
};

export default Post;
