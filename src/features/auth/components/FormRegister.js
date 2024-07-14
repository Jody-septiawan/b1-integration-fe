import { SingleLineText } from "@/components/fields/SingleLineText";
import Link from "next/link";
import React from "react";
import { useRegister } from "../hooks/useRegister";

export const FormRegister = () => {
  const { handleOnChange, form, handleSubmit, errors } = useRegister();

  return (
    <div className="w-full flex flex-col gap-y-10">
      <h2 className="text-center text-xl text-primary font-bold">Register</h2>
      <div className="flex flex-col gap-y-3">
        <SingleLineText
          name="fullName"
          label="Full Name"
          placeholder="Input Full Name ..."
          onChange={handleOnChange}
          value={form?.fullName}
          error={errors.fullName}
        />
         <SingleLineText
          name="username"
          label="Username"
          placeholder="Input Username ..."
          onChange={handleOnChange}
          value={form?.username}
          error={errors.username}
        />
        <SingleLineText
          name="email"
          label="Email"
          placeholder="Input Email ..."
          onChange={handleOnChange}
          value={form?.email}
          error={errors.email}
        />
        <SingleLineText
          name="password"
          type="password"
          label="Password"
          placeholder="Input Password ..."
          onChange={handleOnChange}
          value={form?.password}
          error={errors.password}
        />
      </div>
      <div>
        <button
          className="btn btn-sm btn-primary w-full"
          onClick={handleSubmit}
        >
          Register
        </button>
        <p className="text-xs pt-2 text-center">
          Already have Account?{" "}
          <Link href="/login" className="cursor-pointer text-secondary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
