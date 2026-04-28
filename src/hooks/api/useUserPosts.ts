// src/hooks/api/useUserPosts.ts
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import type { PostResponse } from "./usePost";

const getPostsByUsername = async (
  username: string,
): Promise<PostResponse[]> => {
  const res = await api.get(`/posts/user/${encodeURIComponent(username)}`);
  return res.data;
};

export default function useUserPosts(username?: string) {
  const normalized = (username ?? "").trim();

  const query = useQuery<PostResponse[]>({
    queryKey: ["posts", "user", normalized],
    queryFn: () => getPostsByUsername(normalized),
    enabled: normalized.length > 0,
    retry: false,
  });

  return { ...query, posts: query.data };
}
