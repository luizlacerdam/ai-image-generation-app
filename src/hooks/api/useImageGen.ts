import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

const generateImage = async (prompt: string) => {
	const response = await api.post("/generate", {
		prompt,
	});
	return response.data;
};

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
