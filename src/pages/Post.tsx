import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useImageGen from "@/hooks/api/useImageGen";
import usePost from "@/hooks/api/usePost";
import { Loader, Sparkle, WandSparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

export async function compressImage(
  blob: Blob,
  {
    maxWidth = 1024,
    maxHeight = 1024,
    quality = 0.75, // 0..1
    type = "image/webp", // "image/webp" | "image/jpeg"
  }: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    type?: string;
  } = {},
): Promise<Blob> {
  const img = new Image();
  const url = URL.createObjectURL(blob);

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () =>
      reject(new Error("Failed to load image for compression"));
    img.src = url;
  });

  let width = img.width;
  let height = img.height;

  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = Math.max(1, Math.round(width * ratio));
    height = Math.max(1, Math.round(height * ratio));
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    URL.revokeObjectURL(url);
    throw new Error("Canvas not supported");
  }

  ctx.drawImage(img, 0, 0, width, height);
  URL.revokeObjectURL(url);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (!b)
          return reject(
            new Error("Image compression failed (toBlob returned null)"),
          );
        resolve(b);
      },
      type,
      quality,
    );
  });
}

const Post = () => {
  const [prompt, setPrompt] = useState("");
  const { generateNewImage } = useImageGen();
  const { savePost } = usePost();

  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const postImageDisabled =
    !imageBlob || generateNewImage.isPending || savePost.isPending;

  const handleGenerateImage = () => {
    if (!prompt.trim()) return;

    generateNewImage.mutate(prompt, {
      onSuccess: (blob) => {
        setImageBlob(blob);

        setImageUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
      },
      onError: () => toast.error("Failed to generate image"),
    });
  };

  const handleSavePost = async () => {
    try {
      if (!imageBlob || !prompt.trim()) {
        toast.error("All fields are required!");
        return;
      }

      const compressedBlob = await compressImage(imageBlob, {
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 0.75,
        type: "image/webp",
      });

      const base64Image = await blobToBase64(compressedBlob);

      savePost.mutate(
        {
          prompt: prompt.trim(),
          photo: base64Image,
        },
        {
          onSuccess: () => toast.success("Post saved successfully!"),
          onError: (err: any) => {
            const msg =
              err?.response?.status === 413
                ? "Image still too large. Try lower quality or smaller max size."
                : "Failed to save post";
            toast.error(msg);
          },
        },
      );
    } catch (e) {
      console.error(e);
      toast.error("Failed to compress/upload image");
    }
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
              disabled={!prompt.trim() || generateNewImage.isPending}
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
