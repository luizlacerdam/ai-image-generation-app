import aiApi from "@/api/aiApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const generateImage = async (prompt: string): Promise<Blob> => {
  const response = await aiApi.get(`/prompt/${prompt}`, {
    responseType: "arraybuffer",
  });

  return new Blob([response.data], { type: "image/jpeg" });
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
