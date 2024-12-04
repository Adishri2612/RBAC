import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form, FormInput
} from "@/components";
import { useZodForm } from "@/hooks";
import { loginSchema } from "@/schema";
import { useAuthStore } from "@/store";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

const users = [
  {
    email: "superadmin@email.in",
    password: "superadmin",
    role: "superadmin"
  },
  {
    email: "admin@email.in",
    password: "admin",
    role: "admin",
  },
  {
    email: "user@email.in",
    password: "user",
    role: "user",
  },
] as const

const { updateCreds } = useAuthStore.getState()

export function LoginForm() {
  const navigate = useNavigate()
  const form = useZodForm({
    schema: loginSchema,
    defaultValues: users[0]
  })

  const onSubmit = form.handleSubmit((values) => {
    const foundUser = users.find((user) => user.email === values.email)

    if (foundUser === undefined) {
      toast.error("User Not Found")
      return
    }

    if (foundUser?.password !== values.password) {
      toast.error("Incorrect Password")
      return
    }

    const { email, role } = foundUser

    updateCreds({
      email,
      role,
      authState: "logged-in",
    })
    toast.success("Logged In Successfully")
    navigate({
      to: ".."
    })
  })

  return (
    <Card className="mx-auto max-w-md w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={onSubmit} {...form} >
          <FormInput type="email" name="email" label="Email" placeholder="user@email.in" />
          <FormInput type="password" name="password" label="Password" placeholder="*** ***" />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
