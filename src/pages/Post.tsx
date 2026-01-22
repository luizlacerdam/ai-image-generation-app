import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useImageGen from "@/hooks/api/useImageGen";
import useSavePost from "@/hooks/api/usePost";
import { Loader, Sparkle, WandSparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const Post = () => {
  const [prompt, setPrompt] = useState("");
  const { generateNewImage } = useImageGen();
  const { savePost } = useSavePost();

  const [imageUrl, setImageUrl] = useState("");
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  const handleGenerateImage = async () => {
    generateNewImage.mutate(prompt, {
      onSuccess: async (blob) => {
        setImageBlob(blob);
        setImageUrl(URL.createObjectURL(blob));
      },
    });
  };

  const postImageDisabled =
    !imageUrl || generateNewImage.isPending || savePost.isPending;

  const handleSavePost = async () => {
    if (!imageBlob || !prompt) {
      toast.error("All fields are required!");
      return;
    }

    const base64Image = await blobToBase64(imageBlob);

    savePost.mutate(
      {
        prompt,
        photo: base64Image,
      },
      {
        onSuccess: () => toast.success("Post saved successfully!"),
        onError: () => toast.error("Failed to save post"),
      },
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <div className="flex flex-col-reverse gap-10 sm:flex-row sm:gap-20">
        {/* Left panel */}
        <div className="flex w-full flex-col gap-6 sm:w-1/2">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-foreground">
              Generate Image with prompt
            </h1>
            <p className="text-muted-foreground">
              Write your prompt according to the image you want to generate!
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <Label className="text-sm text-muted-foreground">
                IMAGE PROMPT
              </Label>
              <Textarea
                className="mt-2 h-40 bg-card text-foreground placeholder:text-muted-foreground border-border"
                placeholder="Write your prompt here"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <p className="text-sm text-muted-foreground">
              * You can post the AI Generated image to showcase in the
              community!
            </p>
          </div>

          <div className="flex w-full gap-4">
            <Button
              className="w-1/2"
              type="button"
              onClick={handleGenerateImage}
              disabled={!prompt || generateNewImage.isPending}
            >
              <Sparkle className="mr-2 h-4 w-4" />
              {generateNewImage.isPending ? "Generating..." : "Generate Image"}
            </Button>

            <Button
              className="w-1/2"
              variant="secondary"
              type="button"
              disabled={postImageDisabled}
              onClick={handleSavePost}
            >
              <WandSparkles className="mr-2 h-4 w-4" />
              {savePost.isPending ? "Posting..." : "Post Image"}
            </Button>
          </div>
        </div>

        {/* Right panel (preview) */}
        <div className="w-full sm:w-1/2">
          <div className="aspect-square rounded-xl border border-dashed border-border bg-card/50 flex items-center justify-center overflow-hidden">
            {generateNewImage.isPending ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground animate-pulse">
                <Loader className="h-5 w-5 animate-spin" />
                <span>Generating image...</span>
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="Generated"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="text-muted-foreground">
                Write a prompt to generate an image
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
