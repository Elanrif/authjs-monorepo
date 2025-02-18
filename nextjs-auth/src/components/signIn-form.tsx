"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useEffect, useState} from "react";
import {signIn} from "next-auth/react";
import { useRouter } from "next/navigation"

type FormInput = {
  username: string;
  password: string;
}

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  /* userRouter from next/navigation when we use app model to next.js */
  const router = useRouter()
  const [formData, setFormData] = useState<FormInput>({
    username: "",
    password: "1234",
  })
  const [mount, setMount] = useState(false)

  useEffect(() => {
    setMount(true)
  }, []);

  if (!mount) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData((prev)=> ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
/*
* signIn('credentials', formData) --- sign.., {username: "", password: ""}
* signIn('credentials', {formData}) ---- sign.., { "formatData" : {username: "", password: ""}}
*
* signIn('credentials', ...formData) ---- ?
* signIn('credentials', {...formData} ---- signIn(.... , {username:"", password: ""})
* */

    const res = await signIn('credentials',{formData, redirect: false});
    if(res?.error) {
      alert("something went wrong!");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <form
        className={cn("flex flex-col gap-6", className)}
        {...props}
        onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Connectez-vous à votre compte</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Veuillez saisir votre email pour vous connectez
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email" className={"after:content-['*'] after:ml-1 after:text-red-600"}>Email</Label>
          <Input
              id="email"
              type="email"
              autoComplete={'username'}
              name={"username"}
              value={formData.username}
              onChange={handleChange}
              placeholder={"veuillez sasir votre email"}  required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className={"after:content-['*'] after:ml-1 after:text-red-600"}>Mot de passe</Label>
          <Input
              id="password"
              type="password"
              autoComplete={'password'}
              name={"password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="" required />
        </div>
        <Button type="submit" className="w-full">
          Se connecter
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Continuer avec
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Se connecter avec Github
        </Button>
      </div>
      <div className="text-center text-sm">
        Vous n&apos;avez pas de compte?{" "}
        <a href="/sign-up" className="underline underline-offset-4">
         Créer un compte
        </a>
      </div>
    </form>
  )
}
