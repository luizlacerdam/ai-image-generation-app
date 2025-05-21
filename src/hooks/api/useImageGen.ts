import aiApi from "@/api/aiApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const generateImage = async (prompt: string): Promise<string> => {
	const response = await aiApi.get(`/prompt/${prompt}`, {
		responseType: 'arraybuffer', // ensure binary response
	});
	const blob = new Blob([response.data], { type: "image/jpeg" });
	return URL.createObjectURL(blob); // return image URL directly
}

const queryKey = ["generateImage"];

export default function useImageGen() {
	const queryClient = useQueryClient();

	const generateNewImageMutation = useMutation({
		mutationFn: generateImage,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	});

	return {
		generateNewImage: generateNewImageMutation,
	};
}
