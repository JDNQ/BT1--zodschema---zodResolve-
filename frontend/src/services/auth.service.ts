import axios from "axios";
import type { LoginInput, RegisterInput } from "@/schemas/auth.schema";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
});

export type LoginResponse = {
  accessToken: string;
};

export async function loginApi(input: LoginInput): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/api/auth/login", input);
  return res.data;
}

export async function registerApi(input: RegisterInput): Promise<void> {
  const payload = {
    username: input.username,
    password: input.password,
    passwordAgain: input.confirmPassword,
    sex: input.sex,
    email: input.email?.trim() ? input.email.trim() : undefined,
  };

  await api.post("/api/auth/register", payload);
}

export function getServerErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string | string[]; error?: string }
      | undefined;

    if (Array.isArray(data?.message) && data.message.length > 0) {
      return data.message[0];
    }

    if (typeof data?.message === "string") {
      return data.message;
    }

    if (typeof data?.error === "string") {
      return data.error;
    }
  }

  return "Đã xảy ra lỗi. Vui lòng thử lại.";
}
