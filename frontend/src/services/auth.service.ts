import axios from "axios";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";

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
  await api.post("/api/auth/register", input);
}

export function getServerErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data: any = error.response?.data;
    if (typeof data?.message === "string") return data.message;
    if (typeof data?.error === "string") return data.error;
  }
  return "Đã xảy ra lỗi. Vui lòng thử lại.";
}
