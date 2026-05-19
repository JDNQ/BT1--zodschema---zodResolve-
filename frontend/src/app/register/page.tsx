"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas/auth.schema";
import { getServerErrorMessage, registerApi } from "@/services/auth.service";

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      passwordAgain: "",
      sex: "Nam",
      email: "",
    },
  });

  const onSubmit = async (values: any) => {
    setServerError(null);
    try {
      const payload = {
        ...values,
        email: values.email?.trim() === "" ? undefined : values.email,
      };

      await registerApi(payload);
      router.push("/login");
    } catch (err: unknown) {
      const message = getServerErrorMessage(err);
      setServerError(message);

      // Nếu backend trả lỗi theo field (ví dụ username đã tồn tại), ta có thể map về field.
      // Hiện tại hiển thị lên serverError tổng quát.
      setError("username", { type: "server", message });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-xl shadow p-6"
      >
        <h1 className="text-2xl font-semibold">Signup</h1>

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

        <div className="mt-4">
          <label className="block text-sm font-medium">Password again</label>
          <input
            type="password"
            className="mt-1 w-full rounded border px-3 py-2"
            {...register("passwordAgain")}
            disabled={isSubmitting}
          />
          {errors.passwordAgain ? (
            <p className="mt-1 text-sm text-red-600">
              {errors.passwordAgain.message}
            </p>
          ) : null}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Sex</label>
          <select
            className="mt-1 w-full rounded border px-3 py-2"
            {...register("sex")}
            disabled={isSubmitting}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
          {errors.sex ? (
            <p className="mt-1 text-sm text-red-600">{errors.sex.message}</p>
          ) : null}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Email (optional)</label>
          <input
            type="email"
            className="mt-1 w-full rounded border px-3 py-2"
            {...register("email")}
            disabled={isSubmitting}
          />
          {errors.email ? (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          ) : null}
        </div>

        <button
          className="mt-6 w-full rounded bg-black text-white py-2 disabled:opacity-60"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang tạo tài khoản..." : "Signup"}
        </button>
      </form>
    </main>
  );
}
