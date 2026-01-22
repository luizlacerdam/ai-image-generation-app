import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Brain, Loader, Search } from "lucide-react";
import ImageCard from "@/components/ImageCard";
import { Input } from "@/components/ui/input";
import usePost, { PostResponse } from "@/hooks/api/usePost";
import { useNavigate, useParams } from "react-router-dom";
import useUserPosts from "@/hooks/api/useUserPosts";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();
  const { username } = useParams<{ username?: string }>();
  const hasUsername = !!username?.trim();

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);

  const community = usePost(debouncedSearch, !hasUsername);

  const userPosts = useUserPosts(username);

  const posts = hasUsername ? userPosts.posts : community.posts;
  const isLoading = hasUsername ? userPosts.isLoading : community.isLoading;

  const isUserNotFound =
    hasUsername &&
    userPosts.isError &&
    (userPosts.error as any)?.response?.status === 404;

  const calculateGridPosition = (index: number) => {
    const group = Math.floor(index / 5);
    const positionInGroup = index % 5;

    if (positionInGroup === 0) {
      return group % 2 === 0
        ? {
            gridColumn: "1 / 3",
            gridRow: `${group * 2 + 1} / ${group * 2 + 3}`,
          }
        : {
            gridColumn: "3 / 5",
            gridRow: `${group * 2 + 1} / ${group * 2 + 3}`,
          };
    }

    const column =
      group % 2 === 0
        ? ((positionInGroup - 1) % 2) + 3
        : 2 - ((positionInGroup - 1) % 2);

    const row = Math.floor((positionInGroup - 1) / 2) + group * 2 + 1;

    return {
      gridColumn: `${column} / ${column + 1}`,
      gridRow: `${row} / ${row + 1}`,
    };
  };

  if (isUserNotFound) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center px-6">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="mt-4 text-xl text-muted-foreground text-center">
          User{" "}
          <span className="font-semibold text-foreground">@{username}</span> not
          found
        </p>
        <p className="mt-2 text-muted-foreground text-center">
          The user you are looking for does not exist or was removed.
        </p>

        <Button className="mt-8" onClick={() => navigate("/")}>
          Go back home
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="flex flex-col mt-12 gap-2 px-6">
        <span className="text-4xl font-normal text-center text-foreground">
          {hasUsername
            ? `Posts by @${username}`
            : "Explore popular posts in the Community"}
        </span>

        <div className="flex flex-row justify-center items-center gap-2 text-primary">
          <Brain size={24} />
          <span className="font-bold text-2xl text-center">
            Generated with AI
          </span>
          <Brain size={24} />
        </div>
      </div>

      {/* Search only on community feed */}
      {!hasUsername && (
        <div className="mt-10 mx-auto sm:w-1/2 w-[85%] px-6 sm:px-0">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2">
            <Search className="text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border-none bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              type="text"
              placeholder="Search by prompt..."
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 mt-10 sm:max-w-7xl flex justify-center py-12 items-center mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-full">
            <span className="text-muted-foreground animate-pulse flex items-center flex-col">
              <Loader className="animate-spin mr-2" />
              Loading posts...
            </span>
          </div>
        ) : (
          <div
            className="grid sm:gap-6 gap-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(auto-fill, 1fr)",
            }}
          >
            {(posts ?? []).map((item: PostResponse, index: number) => (
              <ImageCard
                key={item._id}
                item={item}
                style={calculateGridPosition(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
