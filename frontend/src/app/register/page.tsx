"use client";

import Link from "next/link";
import { Controller } from "react-hook-form";
import { useRegister } from "@/hooks/useRegister";

const sexOptions = ["Nam", "Nữ", "Khác"] as const;

function UserPlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#1a56db]" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 19a6 6 0 0112 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 8v6M15 11h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M10.5 6.2A10.6 10.6 0 0112 6c6.5 0 10 6 10 6a18 18 0 01-4.1 4.6" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6 7.6A17.6 17.6 0 002 12s3.5 6 10 6c1 0 1.9-.1 2.8-.4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function Spinner() {
  return <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />;
}

export default function RegisterPage() {
  const {
    control,
    register,
    formState: { errors, isSubmitting },
    onSubmit,
    serverError,
    successMessage,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useRegister();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-2">
          <UserPlusIcon />
          <h1 className="text-2xl font-bold text-slate-900">Đăng ký</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <div className="mb-1 flex items-center justify-between gap-2">
              <label className="text-sm font-medium text-slate-700">Username *</label>
              {errors.username ? <p className="text-sm text-[#dc2626]">{errors.username.message}</p> : null}
            </div>
            <input
              {...register("username")}
              placeholder="Nhập username"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-[#1a56db] transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between gap-2">
              <label className="text-sm font-medium text-slate-700">Password *</label>
              {errors.password ? <p className="text-sm text-[#dc2626]">{errors.password.message}</p> : null}
            </div>
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
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between gap-2">
              <label className="text-sm font-medium text-slate-700">Password again *</label>
              {errors.confirmPassword ? <p className="text-sm text-[#dc2626]">{errors.confirmPassword.message}</p> : null}
            </div>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại password"
                disabled={isSubmitting}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 outline-none ring-[#1a56db] transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
                aria-label={showConfirmPassword ? "Ẩn password" : "Hiện password"}
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Sex *</label>
            <Controller
              control={control}
              name="sex"
              render={({ field }) => (
                <div className="flex flex-wrap items-center gap-4">
                  {sexOptions.map((option) => (
                    <label key={option} className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="radio"
                        value={option}
                        checked={field.value === option}
                        onChange={() => field.onChange(option)}
                        disabled={isSubmitting}
                        className="accent-[#1a56db]"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.sex ? <p className="mt-1 text-sm text-[#dc2626]">{errors.sex.message}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email (optional)</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Nhập email"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-[#1a56db] transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
            {errors.email ? <p className="mt-1 text-sm text-[#dc2626]">{errors.email.message}</p> : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-lg bg-[#1a56db] px-4 py-2.5 font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? <Spinner /> : "Đăng ký"}
          </button>

          {successMessage ? (
            <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{successMessage}</p>
          ) : null}

          {serverError ? <p className="text-sm text-[#dc2626]">{serverError}</p> : null}
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Đã có tài khoản? <Link href="/login" className="font-medium text-[#1a56db]">Đăng nhập</Link>
        </p>
      </div>
    </main>
  );
}
