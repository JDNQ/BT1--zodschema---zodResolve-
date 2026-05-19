"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginInput } from "@/schemas/auth.schema";
import { getServerErrorMessage, loginApi } from "@/services/auth.service";

export function useLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const { accessToken } = await loginApi(values);
      localStorage.setItem("accessToken", accessToken);
      setSuccessMessage("Đăng nhập thành công, đang chuyển trang...");
      setTimeout(() => router.push("/"), 500);
    } catch (error) {
      const message = getServerErrorMessage(error) || "Sai username hoặc password";
      setServerError(message);
      form.setError("username", { type: "server", message });
    }
  });

  return {
    ...form,
    onSubmit,
    serverError,
    successMessage,
    showPassword,
    setShowPassword,
  };
}
