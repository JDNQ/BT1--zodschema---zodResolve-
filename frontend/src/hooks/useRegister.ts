"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema, type RegisterInput } from "../schemas/auth.schema";

export function useRegister() {
  return useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      passwordAgain: "",
      sex: "Nam",
      email: "",
    },
  });
}
