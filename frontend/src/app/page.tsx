import { redirect } from "next/navigation";

export default function HomePage() {
  // Vào trang / sẽ tự chuyển sang /login
  redirect("/login");
}
