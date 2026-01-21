import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import useAuth from "@/hooks/api/useAuth";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(72, "Password must be at most 72 characters."),
});

export default function SignUpForm() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await register.mutateAsync(values);
      toast.success("Account created! You are now logged in.");
      navigate("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Could not create account.");
    }
  }

  return (
    <Card className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
      <CardHeader className="flex flex-col text-center">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email and password to create your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-signup-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-signup-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-signup-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-signup-password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button
            disabled={register.isPending}
            className="w-full"
            type="submit"
            form="form-signup"
          >
            {register.isPending ? "Creating account..." : "Sign Up"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
