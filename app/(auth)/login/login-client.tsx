"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninValidation } from "@/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import Image from "next/image";
import Logo from "@/components/Logo";
import { signIn } from "@/lib/actions/auth-actions";

export default function LoginClient() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

 const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
  setIsLoading(true);
  
  try {
    const result = await signIn(user.email, user.password);
    console.log(result);

    if (!result.success) {
      toast.error(result.error || "Giriş işlemi başarısız oldu");
      return;
    }

    toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");
    router.push("/dashboard");
    
  } catch (err) {
    console.log(err);
    const errorMessage = err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu";
    toast.error(`Giriş hatası: ${errorMessage}`);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-[#f5f5f5]">
      <div className="flex-1 flex items-center justify-center">
        <div className="absolute top-10 left-10 flex flex-row items-center gap-6">
          <Logo />
          <h1 className="text-2xl font-bold">Türk'ün Kanadı</h1>
        </div>
        <div className="max-w-xl w-full">
          <div className="space-y-20">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold">
                Türk'ün Kanadı'na Hoş Geldiniz
              </h1>
              <p className="text-zinc-500 text-base">
                Birlik ve dayanışmanın parçası olun. Topluluğumuza katılmak için
                hesabınıza giriş yapın.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignin)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-3">
                          <Label className="font-semibold text-base">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
                            <Input
                              {...field}
                              type="email"
                              placeholder="example@demo.com"
                              className="border-zinc-400 bg-white py-6 pl-12 !text-base font-bold placeholder:font-medium text-black"
                              disabled={isLoading}
                            />
                          </div>
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
                      <FormControl>
                        <div className="space-y-3">
                          <Label className="font-semibold text-base">
                            Parola
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
                            <Input
                              {...field}
                              type="password"
                              placeholder="••••••••••••"
                              className="border-zinc-400 bg-white py-6 pl-12 !text-base font-bold placeholder:font-medium text-black"
                              disabled={isLoading}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="remember_me"
                      className="bg-white size-4 border-zinc-400"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked as boolean)
                      }
                      disabled={isLoading}
                    />
                    <Label htmlFor="remember_me" className="text-sm">
                      Beni Hatırla
                    </Label>
                  </div>
                  <Link
                    href={"/forgot-password"}
                    className="text-sm underline text-primary hover:text-primary/80 transition-colors"
                  >
                    Parolamı Unuttum
                  </Link>
                </div>

                <div className="flex justify-end mt-10">
                  <Button
                    type="submit"
                    className="px-10 py-6 w-full font-bold text-base"
                    disabled={isLoading || !form.formState.isValid}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Giriş yapılıyor...
                      </div>
                    ) : (
                      "Giriş Yap"
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            <div className="text-sm font-medium">
              <p>
                Henüz bir hesabın yok mu?{" "}
                <Link
                  href={"/register"}
                  className="text-primary underline hover:text-primary/80 transition-colors"
                >
                  Kayıt Ol
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 relative h-screen">
        <Image
          src="https://wallpaperset.com/w/full/f/a/5/220358.jpg"
          alt="nature"
          fill
          className="object-top-left object-cover"
          priority
        />
      </div>
    </div>
  );
}
