import { api, setAuthToken } from "@/libs/api";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { z } from "zod";

const defaultData = {
  email: "",
  password: "",
};

export const useLogin = () => {
  const { setUser, setToken } = useUserStore();
  const router = useRouter();
  const [form, setForm] = React.useState(defaultData);
  const [errors, setErrors] = React.useState(defaultData);

  const dataSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setForm({
      ...form,
      [name]: value,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const dataValidation = () => {
    const result = dataSchema.safeParse(form);

    if (!result.success) {
      const validErrors = result.error.errors;
      validErrors.forEach((error) => {
        const name = error.path[0];
        const msg = error.message;

        setErrors((prev) => ({
          ...prev,
          [name]: msg,
        }));
      });

      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    const isValid = dataValidation();
    if (!isValid) {
      return;
    }
    const toastId = toast.loading("Login");

     try {
      const response =  await api.post("/auth/login", form);

      toast.success(`Welcome ...`, {
        id: toastId
      });

      const data = response.data;

      localStorage.setItem("token", data.token)
      setAuthToken(data.token);
      setToken(data.token);
      setUser(data.user);

      router.push("/dashboard");
     } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message;

      toast.error(msg, {
        id: toastId
      })
     }
  };

  return { handleOnChange, handleSubmit, form, errors };
};
