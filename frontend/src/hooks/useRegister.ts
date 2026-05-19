"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterInput } from "@/schemas/auth.schema";
import { getServerErrorMessage, registerApi } from "@/services/auth.service";

export function useRegister() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      sex: "Nam",
      email: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      await registerApi(values);
      setSuccessMessage("Đăng ký thành công, đang chuyển sang trang đăng nhập...");
      setTimeout(() => router.push("/login"), 700);
    } catch (error) {
      const message = getServerErrorMessage(error);
      setServerError(message);
      const normalized = message.toLowerCase();

      if (normalized.includes("username") && normalized.includes("tồn tại")) {
        form.setError("username", { type: "server", message });
        return;
      }

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
    showConfirmPassword,
    setShowConfirmPassword,
  };
}
