import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { z } from "zod";
import { Form } from "@/lib/form";
import { makeDomainFunction } from "domain-functions";
import { authenticator } from "@/lib/auth.server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@remix-run/react";

const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const mutation = makeDomainFunction(LoginSchema)(async (values) => {});

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
  return user;
};

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate("user-login", request, {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  });
};

const LoginForm = () => {
  const transition = useNavigation();
  const isLoading = transition.state;
  return (
    <div className="sm:w-420 flex-center flex-col">
      <h2 className="h3-bold md:h2-bold pt-5">Welcome Back!</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">
        Please enter your details to log in
      </p>

      <Form schema={LoginSchema} className="flex flex-col gap-5 w-full mt-4">
        {({ Field, Errors, register }) => (
          <>
            <Field name="email" label="E-mail">
              {({ Label, Errors }) => (
                <>
                  <Label htmlFor="email" className="shad-form_label">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="shad-input"
                  />
                  <Errors className="shad-form_message" />
                </>
              )}
            </Field>

            <Field name="password" label="Password">
              {({ Label, Errors }) => (
                <>
                  <Label htmlFor="password" className="shad-form_label">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className="shad-input"
                  />
                  <Errors className="shad-form_message" />
                </>
              )}
            </Field>

            <Button className="shad-button_primary">
              {isLoading === "submitting" ? "Loading..." : "Log In"}
            </Button>

            <Errors />
          </>
        )}
      </Form>

      <p className="text-small-regular text-light-2 text-center mt-2">
        Don't have an account?
        <Link
          to="/auth/signup"
          className="text-primary-500 text-small-semibold ml-1"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
