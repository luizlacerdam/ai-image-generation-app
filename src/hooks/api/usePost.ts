import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

export interface User {
  _id: string;
  username: string;
}

export interface PostCreate {
  prompt: string;
  photo: string;
}

export type PostResponse = PostCreate & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  showPost: boolean;
  user: User;
};

const getPosts = async (search?: string): Promise<PostResponse[]> => {
  const response = await api.get("/posts/all", {
    params: { search },
  });
  return response.data;
};

const savePost = async (data: PostCreate): Promise<PostResponse> => {
  const response = await api.post("/posts/new", data);
  return response.data;
};

export default function usePost(search?: string, enabled = true) {
  const queryClient = useQueryClient();

  const postsQuery = useQuery<PostResponse[]>({
    queryKey: ["posts", search ?? ""],
    queryFn: () => getPosts(search),
    enabled,
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
