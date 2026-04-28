import { decodeToken } from "@/utils/token";

export const useAuthToken = () => {
  const token = decodeToken();

  return {
    ...token,
  };
};
