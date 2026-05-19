import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username là bắt buộc"),
  password: z.string().min(1, "Password là bắt buộc"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: z.string().min(1, "Username là bắt buộc"),
    password: z.string().min(6, "Password phải từ 6 ký tự trở lên"),
    confirmPassword: z.string(),
    sex: z.enum(["Nam", "Nữ", "Khác"], {
      message: "Vui lòng chọn giới tính",
    }),
    email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
