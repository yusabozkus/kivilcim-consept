"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import z from "zod";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SigninValidation } from "@/validations";
import { signIn } from "@/lib/actions/auth-actions";

export default function LoginClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: { email: "", password: "" },
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    setIsLoading(true);
    try {
      const result = await signIn(user.email, user.password);
      if (!result.success) {
        toast.error(result.error || "Unable to sign in");
        return;
      }
      toast.success("Opening the studio...");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-[#090d18] lg:grid-cols-[.9fr_1.1fr]">
      <section className="flex min-h-screen flex-col px-5 py-6 text-white sm:px-10 lg:px-14">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <span className="font-black tracking-[0.18em]">KIVILCIM</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-white/50 hover:text-white">
            <ArrowLeft className="size-4" /> Back to site
          </Link>
        </div>

        <div className="my-auto w-full max-w-lg self-center py-16">
          <p className="section-kicker text-primary">Admin workspace</p>
          <h1 className="mt-5 text-5xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl">
            Studio login
          </h1>
          <p className="mt-5 max-w-md leading-7 text-white/45">
            Sign in with your admin account to manage projects, journal stories,
            and collective applications.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignin)} className="mt-10 space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-sm font-bold text-white/70">Email</Label>
                    <FormControl>
                      <div className="relative mt-2">
                        <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/30" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="admin@kivilcim.community"
                          disabled={isLoading}
                          className="h-14 rounded-xl border-white/10 bg-white/5 pl-11 text-base text-white placeholder:text-white/25 focus-visible:ring-primary"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-sm font-bold text-white/70">Password</Label>
                    <FormControl>
                      <div className="relative mt-2">
                        <Lock className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/30" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••••••"
                          disabled={isLoading}
                          className="h-14 rounded-xl border-white/10 bg-white/5 pl-11 text-base text-white placeholder:text-white/25 focus-visible:ring-primary"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="h-14 w-full rounded-xl text-base font-black"
              >
                {isLoading ? "Signing in..." : "Enter the studio"}
              </Button>
            </form>
          </Form>

          <p className="mt-8 text-center text-sm text-white/40">
            Want to join the collective?{" "}
            <Link href="/register" className="font-bold text-primary hover:underline">
              Start an application
            </Link>
          </p>
        </div>
      </section>

      <section className="relative m-4 ml-0 hidden overflow-hidden rounded-[28px] bg-primary p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute -right-20 -top-20 size-96 rounded-full border-[64px] border-[#101522]/15" />
        <div className="relative z-10 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
          <span>Kıvılcım / Studio OS</span>
          <span>Private access</span>
        </div>
        <div className="relative z-10">
          <p className="text-[clamp(4rem,7vw,7rem)] font-black leading-[0.82] tracking-[-0.07em]">
            MAKE<br />TEST<br /><span className="text-[#101522]">SHARE.</span>
          </p>
        </div>
        <p className="relative z-10 max-w-lg text-3xl font-black leading-tight">
          Every project starts with a small question—and grows through shared work.
        </p>
      </section>
    </main>
  );
}
