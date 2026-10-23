import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole } from "lucide-react";
import logo from "@/assets/mochris-logo.jpg";
import { Button } from "@/components/ui/button";
import { Field } from "./shared";
export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <img
          src={logo}
          alt="Mochris Ventures"
          className="mx-auto mb-7 h-24 w-24 rounded-md object-cover"
        />
        <h1 className="admin-heading text-center">Mochris Ventures</h1>
        <p className="mb-9 mt-2 text-center text-muted-foreground">Owner dashboard</p>
        <form
          className="admin-panel space-y-6 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            const next = {
              email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Enter a valid email address.",
              password: password.trim() ? "" : "Enter your password.",
            };
            setErrors(next);
            if (!next.email && !next.password) navigate({ to: "/admin" });
          }}
          noValidate
        >
          <h2 className="admin-subheading">Sign in</h2>
          <Field label="Email address" error={errors.email}>
            <input
              type="email"
              autoComplete="username"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email)}
            />
          </Field>
          <Field label="Password" error={errors.password}>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={Boolean(errors.password)}
            />
          </Field>
          <Button type="submit" className="w-full">
            Sign in
            <ArrowRight />
          </Button>
        </form>
        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <LockKeyhole className="size-3" />
          Demo sign-in · No real authentication
        </p>
      </div>
    </main>
  );
}
