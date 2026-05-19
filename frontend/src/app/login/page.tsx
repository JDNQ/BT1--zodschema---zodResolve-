"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginSchema, type LoginInput } from "@/schemas/auth.schema";
import { loginApi } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginInput) => {
    setServerError(null);
    try {
      const { accessToken } = await loginApi(values);
      localStorage.setItem("accessToken", accessToken);
      router.push("/");
    } catch (err: any) {
      const message: string | undefined =
        err?.response?.data?.message || err?.message;

      setServerError(message || "Sai username hoặc password");
      setError("username", {
        type: "server",
        message: message || "Sai username hoặc password",
      });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-xl shadow p-6"
      >
        <h1 className="text-2xl font-semibold">Login</h1>

        {serverError ? (
          <div className="mt-4 text-sm text-red-600">{serverError}</div>
        ) : null}

        <div className="mt-4">
          <label className="block text-sm font-medium">Username</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            {...register("username")}
            disabled={isSubmitting}
          />
          {errors.username ? (
            <p className="mt-1 text-sm text-red-600">
              {errors.username.message}
            </p>
          ) : null}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded border px-3 py-2"
            {...register("password")}
            disabled={isSubmitting}
          />
          {errors.password ? (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <button
          className="mt-6 w-full rounded bg-black text-white py-2 disabled:opacity-60"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang đăng nhập..." : "Login"}
        </button>
      </form>
    </main>
  );
}
