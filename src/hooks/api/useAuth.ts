import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";
import { setTokenCookie } from "@/utils/authCookies";

export type AuthPayload = {
  email: string;
  password: string;
};

type AuthResponse = {
  token: string;
  user?: unknown;
};

export default function useAuth() {
  // -----------------------------
  // API calls (inside the hook)
  // -----------------------------
  const loginRequest = async (payload: AuthPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
  };

  const registerRequest = async (
    payload: AuthPayload,
  ): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    return data;
  };

  // -----------------------------
  // Mutations
  // -----------------------------
  const login = useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: loginRequest,
    onSuccess: (data) => {
      if (data?.token) {
        setTokenCookie(data.token);
      }
    },
  });

  const register = useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: registerRequest,
    onSuccess: async (_data, variables) => {
      await login.mutateAsync(variables);
    },
  });

  return {
    login,
    register,
  };
}
