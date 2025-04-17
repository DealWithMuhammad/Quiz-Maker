"use client";

import { createAuthCookie } from "@/actions/auth.action";
import { LoginSchema } from "@/helpers/schemas";
import type { LoginFormType } from "@/helpers/types";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Image,
  Spinner,
} from "@nextui-org/react";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { LockIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";

export const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Static credentials
  const STATIC_EMAIL = "elsystem@elsystem.org";
  const STATIC_PASSWORD = "11221122";

  const initialValues: LoginFormType = {
    email: "",
    password: "",
  };

  const handleLogin = async (values: LoginFormType) => {
    setIsLoading(true);

    // Check credentials
    if (values.email === STATIC_EMAIL && values.password === STATIC_PASSWORD) {
      await createAuthCookie(); // optional, if you want to simulate auth
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md shadow-xl backdrop-blur-md">
      <CardHeader className="flex flex-col gap-1 w-full items-center justify-center pt-10 pb-0">
        <Image
          alt="ELS Logo"
          radius="none"
          src="/logo.png"
          className="mb-2 h-28 sm:h-20 max-w-52 w-full"
        />
        <p className="text-xl font-semibold text-default-500 text-center">
          Sign in to manage your quizzes
        </p>
      </CardHeader>

      <CardBody className="px-8 py-6">
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                variant="bordered"
                label="Email"
                placeholder="Enter your email"
                type="email"
                startContent={
                  <MailIcon className="text-default-400" size={18} />
                }
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
                classNames={{
                  inputWrapper: "bg-default-100",
                }}
              />

              <Input
                variant="bordered"
                label="Password"
                placeholder="Enter your password"
                type="password"
                startContent={
                  <LockIcon className="text-default-400" size={18} />
                }
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
                classNames={{
                  inputWrapper: "bg-default-100",
                }}
              />

              <Button
                type="submit"
                className="mt-2 font-medium bg-blue-700 text-white"
                fullWidth
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? <Spinner color="white" size="sm" /> : "Sign In"}
              </Button>
            </form>
          )}
        </Formik>
      </CardBody>

      <Divider />

      <CardFooter className="flex flex-col px-8 py-4">
        <p className="text-center text-sm text-blue-700 italic font-medium">
          "Empowering learning through smart assessments"
        </p>
        <p className="text-center text-xs text-default-500">
          ELS Quiz Maker © 2025
        </p>
      </CardFooter>
    </Card>
  );
};
