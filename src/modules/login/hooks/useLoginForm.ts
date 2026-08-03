import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "./useLogin";

import { loginSchema, type LoginSchema } from "../schemas/login.schema";

export function useLoginForm() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
    loginMutation.mutate(data);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isPending: loginMutation.isPending,
  };
}
