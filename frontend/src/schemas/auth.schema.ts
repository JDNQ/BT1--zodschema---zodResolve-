import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, "Username bắt buộc"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    username: z.string().min(1, "Username bắt buộc"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    passwordAgain: z.string().min(1, "Mật khẩu nhập lại bắt buộc"),
    sex: z.enum(["Nam", "Nữ", "Khác"], {
      errorMap: () => ({ message: "Giới tính bắt buộc" }),
    }),
    email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.passwordAgain, {
    path: ["passwordAgain"],
    message: "Mật khẩu nhập lại không khớp",
  });

export type RegisterInput = z.infer<typeof RegisterSchema>;
