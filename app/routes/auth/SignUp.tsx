import { Link } from "@remix-run/react";
import { z } from "zod";
import { Form } from "@/lib/form";
import { formAction } from "@/form-action";
import { makeDomainFunction } from "domain-functions";
import type { ActionFunction } from "@remix-run/node";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const mutation = makeDomainFunction(SignupSchema)(async (values) =>
  console.log(values)
);

export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema: SignupSchema,
    mutation,
    successPath: "/success",
  });

const SignupForm = () => {
  return (
    <div className="sm:w-420 flex-center flex-col">
      <h2 className="h3-bold md:h2-bold pt-5">Create a new account</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">
        To use Snaply, please enter your details
      </p>

      <Form schema={SignupSchema} className="flex flex-col gap-5 w-full mt-4">
        {({ Field, Errors, register }) => (
          <>
            <Field name="name" label="Name">
              {({ Label, Errors }) => (
                <div className="w-full">
                  <Label htmlFor="name" className="shad-form_label">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    {...register("name")}
                    className="shad-input"
                  />
                  <Errors className="shad-form_message" />
                </div>
              )}
            </Field>

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

            <Button className="shad-button_primary">Sign Up</Button>

            <Errors />
          </>
        )}
      </Form>

      {/* Link to Login Route */}
      <p className="text-small-regular text-light-2 text-center mt-2">
        Already have an account?
        <Link
          to="/auth/login"
          className="text-primary-500 text-small-semibold ml-1"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
