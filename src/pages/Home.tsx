import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Brain, Loader, Search } from "lucide-react";
import ImageCard from "@/components/ImageCard";
import { Input } from "@/components/ui/input";
import usePost, { PostResponse } from "@/hooks/api/usePost";
import { useParams } from "react-router-dom";
import useUserPosts from "@/hooks/api/useUserPosts";

const Home = () => {
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
      <div className="bg-[#171821] min-h-screen flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl opacity-70 mb-6">
          User <span className="font-semibold">@{username}</span> not found
        </p>
        <p className="opacity-50 mb-8">
          The user you are looking for does not exist or was removed.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#171821]">
      <div className="flex flex-col mt-12 gap-2">
        <span className="text-white text-4xl font-normal text-center">
          Explore popular posts in the Community
        </span>
        <div className="flex flex-row justify-center items-center gap-2 text-primary">
          <Brain size={24} />
          <span className="font-bold text-2xl text-center">
            Generated with AI
          </span>
          <Brain size={24} />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center mt-10 gap-2 border-2 border-white rounded-xl py-2 px-4 mx-auto sm:w-1/2 w-[85%]">
        <Search color="white" />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="focus-visible:ring-offset-0 focus-visible:ring-0 border-none focus-visible:border-0 bg-transparent text-white placeholder:text-white"
          type="text"
          placeholder="Search with prompt or name . . ."
        />
      </div>

      <div className="p-4 mt-10 sm:max-w-7xl flex justify-center py-12 items-center mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-full">
            <span className="text-white text-opacity-50 animate-pulse flex items-center flex-col">
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
                key={index}
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
