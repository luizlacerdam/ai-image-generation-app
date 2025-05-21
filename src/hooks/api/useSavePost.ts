import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

const savePost = async (data: { name: string; prompt: string; photo: string }) => {
	const response = await api.post("/posts/new", data);
	return response.data;
};

export default function useSavePost() {
	const queryClient = useQueryClient();

	const savePostMutation = useMutation({
		mutationFn: savePost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] }); // optional
		},
	});

	return {
		savePost: savePostMutation,
	};
}
