"use client";

import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 text-[#1a56db]"
      aria-hidden="true"
    >
      <path
        d="M7 10V8a5 5 0 0110 0v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M10.5 6.2A10.6 10.6 0 0112 6c6.5 0 10 6 10 6a18 18 0 01-4.1 4.6"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M6 7.6A17.6 17.6 0 002 12s3.5 6 10 6c1 0 1.9-.1 2.8-.4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="mt-0.5 h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 3l9 16H3l9-16z" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 9v4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" />
    </svg>
  );
}

function Spinner() {
  return (
    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
  );
}

export default function LoginPage() {
  const {
    register,
    formState: { errors, isSubmitting },
    onSubmit,
    serverError,
    successMessage,
    showPassword,
    setShowPassword,
  } = useLogin();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-2">
          <LockIcon />
          <h1 className="text-2xl font-bold text-slate-900">Đăng nhập</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Username *
            </label>
            <input
              {...register("username")}
              placeholder="Nhập username"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-[#1a56db] transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
            {errors.username ? (
              <p className="mt-1 text-sm text-[#dc2626]">
                {errors.username.message}
              </p>
            ) : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password *
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Nhập password"
                disabled={isSubmitting}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 outline-none ring-[#1a56db] transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
                aria-label={showPassword ? "Ẩn password" : "Hiện password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.password ? (
              <p className="mt-1 text-sm text-[#dc2626]">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-lg bg-[#1a56db] px-4 py-2.5 font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? <Spinner /> : "Đăng nhập"}
          </button>

          {successMessage ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              {successMessage}
            </div>
          ) : null}

          {serverError ? (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-[#dc2626]">
              <AlertIcon />
              <span>{serverError || "Sai username hoặc password"}</span>
            </div>
          ) : null}
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="font-medium text-[#1a56db]">
            Đăng ký
          </Link>
        </p>
      </div>
    </main>
  );
}
