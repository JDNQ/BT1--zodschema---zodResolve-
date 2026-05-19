import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Trang chủ</h1>
        <p className="mt-2 text-slate-600">
          Bạn đã đăng nhập thành công.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
          >
            Đăng nhập lại
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-[#1a56db] px-4 py-2 text-sm font-medium text-white"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </main>
  );
}
