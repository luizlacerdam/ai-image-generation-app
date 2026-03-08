import { PostResponse } from "@/hooks/api/usePost";
import { Avatar } from "@radix-ui/react-avatar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { useAuthToken } from "@/hooks/useAuthToken";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, MoreVertical } from "lucide-react";

interface ImageCardProps {
  item: PostResponse;
  style: React.CSSProperties;
}

const ImageCard: React.FC<ImageCardProps> = ({ item, style }) => {
  const t = useAuthToken();
  const isOwner = t?.username && t.username === item.user.username;

  return (
    <div
      className="relative flex bg-gray-800 rounded-2xl shadow-lg gap-2 cursor-pointer transition-transform duration-300 hover:shadow-xl hover:scale-105"
      style={style}
    >
      {/* Owner actions button */}
      {isOwner && (
        <div className="absolute top-3 right-3 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                // disabled={isSavingVisibility}
                className="rounded-full"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                // onClick={toggleShowPost}
                // disabled={isSavingVisibility}
                className="gap-2"
              >
                {item.showPost ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                {item.showPost ? "Hide from Community" : "Show in Community"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <LazyLoadImage
        alt={item.prompt}
        width="100%"
        src={item.photo}
        style={{ borderRadius: "12px" }}
      />
      <div className="absolute inset-0 flex flex-col justify-end gap-2 p-4 backdrop-blur-sm bg-black/50 rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100">
        <p className="font-normal text-sm text-white">• {item.prompt}</p>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-white">
            <Avatar />
            <Link
              to={`/u/${item.user.username}`}
              className="font-semibold text-sm"
            >
              {item.user.username}
            </Link>
          </div>
          {!item.showPost && (
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white">
              Hidden
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
