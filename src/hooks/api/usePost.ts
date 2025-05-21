import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

export interface Post {
	name: string;
	prompt: string;
	photo: string;
}

const getPosts = async (): Promise<Post[]> => {
  const response = await api.get("/posts/all");
  return response.data;
};

const savePost = async (data: Post): Promise<Post> => {
  const response = await api.post("/posts/new", data);
  return response.data;
};

export default function usePost() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const savePostMutation = useMutation({
    mutationFn: savePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  
	return {
		...postsQuery,
		posts: postsQuery.data,
		savePost: savePostMutation,
	};
}
