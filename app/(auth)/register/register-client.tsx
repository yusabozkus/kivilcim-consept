"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatPhoneNumber, RegisterValidation } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  Check,
  CheckCircle,
  ChevronDownIcon,
  ChevronsUpDown,
  Handshake,
  Lock,
  Mail,
  Phone,
  School,
  Star,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { provinces } from "@/constants";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/actions/auth-actions";
import { Spinner } from "@/components/ui/spinner";

const steps = [
  {
    id: 0,
    icon: Handshake,
    fields: [],
  },
  {
    id: 1,
    icon: User,
    fields: ["name", "birthDate"],
  },
  {
    id: 2,
    icon: Phone,
    fields: ["phoneNumber", "email", "password", "confirmPassword"],
  },
  {
    id: 3,
    icon: Briefcase,
    fields: ["profession", "department"],
  },
  {
    id: 4,
    icon: Star,
    fields: ["skills", "reason", "city"],
  },
];

export default function RegisterClient() {
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterValidation>>({
    resolver: zodResolver(RegisterValidation),
    defaultValues: {
      name: "",
      birthDate: "",
      phoneNumber: "",
      profession: "",
      department: "",
      email: "",
      password: "",
      confirmPassword: "",
      skills: "",
      city: "",
      reason: "",
    },
  });

  const handleRegister = async (user: z.infer<typeof RegisterValidation>) => {
    setIsLoading(true);
    try {
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name
      )}&background=random&color=fff`;

      const extra = {
        birthDate: user.birthDate,
        phoneNumber: user.phoneNumber.replace(/\s/g, ""),
        profession: user.profession,
        department: user.department,
        skills: user.skills,
        reason: user.reason,
        city: user.city,
      };

      const result = await signUp(
        user.email,
        user.password,
        user.name,
        avatarUrl,
        extra
      );

      if (result) {
   
      }

      if ("user" in result) {
        setIsSuccess(true);
        toast.success("Your application has been submitted.");
        // window.location.href = "/dashboard";
      } else {
        toast.error("Something went wrong while submitting your application.");
      }
    } catch (error: any) {
      toast.error(error.message || "Unable to submit your application");
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const stepIndicatorVariants = {
    inactive: {
      scale: 1,
      backgroundColor: "#e4e4e7",
      color: "#a1a1aa",
    },
    active: {
      scale: 1.1,
      backgroundColor: "var(--primary)",
      color: "#ffffff",
    },
    completed: {
      scale: 1,
      backgroundColor: "var(--primary)",
      color: "#ffffff",
    },
  };

  const progressVariants = {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    },
    tap: {
      scale: 0.95,
    },
  };

  const renderComponentForStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-extrabold text-primary"
            >
              Welcome to Kıvılcım
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-600"
            >
              A place to meet curious people and build useful things together.
              Complete a few short steps to introduce yourself.
            </motion.p>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="step-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="space-y-3"
                    >
                      <Label className="font-semibold text-base">
                        Full name
                      </Label>

                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="relative"
                      >
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
                        <Input
                          {...field}
                          type="text"
                          placeholder="Alex Morgan"
                          className="border-zinc-400 bg-white py-6 pl-12 !text-base font-bold placeholder:font-medium text-black transition-all focus:shadow-lg"
                        />
                      </motion.div>
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Label className="font-semibold text-base">
                      Birth year
                    </Label>
                  </motion.div>
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="border-zinc-400 bg-white py-6 !text-base font-bold placeholder:font-medium text-black w-full justify-between text-left transition-all hover:shadow-lg"
                        >
                          {field.value
                            ? new Date(field.value).toLocaleDateString()
                            : "Select a year"}
                          <motion.div
                            animate={{ rotate: open ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDownIcon />
                          </motion.div>
                        </Button>
                      </PopoverTrigger>
                      <AnimatePresence>
                        {open && (
                          <PopoverContent
                            className="w-full overflow-hidden p-0"
                            align="start"
                            asChild
                          >
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                  field.onChange(date?.toISOString());
                                  setOpen(false);
                                }}
                              />
                            </motion.div>
                          </PopoverContent>
                        )}
                      </AnimatePresence>
                    </Popover>
                  </motion.div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="space-y-3"
                    >
                      <Label className="font-semibold text-base">
                        Phone number
                      </Label>

                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="relative"
                      >
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
                        <Input
                          {...field}
                          type="tel"
                          placeholder="5XX XXX XX XX"
                          className="border-zinc-400 bg-white py-6 pl-12 !text-base font-bold placeholder:font-medium text-black transition-all focus:shadow-lg"
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            field.onChange(formatted);
                          }}
                          onKeyDown={(e) => {
                            const allowedKeys = [
                              "Backspace",
                              "Delete",
                              "Tab",
                              "Escape",
                              "Enter",
                              "ArrowLeft",
                              "ArrowRight",
                              "ArrowUp",
                              "ArrowDown",
                            ];

                            if (
                              !allowedKeys.includes(e.key) &&
                              !/\d/.test(e.key)
                            ) {
                              e.preventDefault();
                            }
                          }}
                          maxLength={13}
                        />
                      </motion.div>
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="space-y-3"
                    >
                      <Label className="font-semibold text-base">
                        Email address
                      </Label>

                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="relative"
                      >
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="example@demo.com"
                          className="border-zinc-400 bg-white py-6 pl-12 !text-base font-bold placeholder:font-medium text-black transition-all focus:shadow-lg"
                        />
                      </motion.div>
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-base font-semibold">Password</Label>
                    <FormControl>
                      <div className="relative mt-3">
                        <Lock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="At least 8 characters"
                          className="border-zinc-400 bg-white py-6 pl-12 !text-base font-bold text-black"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-base font-semibold">Confirm password</Label>
                    <FormControl>
                      <div className="relative mt-3">
                        <Lock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password again"
                          className="border-zinc-400 bg-white py-6 pl-12 !text-base font-bold text-black"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="space-y-3"
                    >
                      <Label className="font-semibold text-base">
                        Profession
                      </Label>

                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="relative"
                      >
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
                        <Input
                          {...field}
                          type="text"
                          placeholder="Software engineer"
                          className="border-zinc-400 bg-white py-6 pl-12 !text-base font-bold placeholder:font-medium text-black transition-all focus:shadow-lg"
                        />
                      </motion.div>
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="space-y-3"
                    >
                      <Label className="font-semibold text-base">
                        Field of study
                      </Label>

                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="relative"
                      >
                        <School className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
                        <Input
                          {...field}
                          type="text"
                          placeholder="Computer science"
                          className="border-zinc-400 bg-white py-6 pl-12 !text-base font-bold placeholder:font-medium text-black transition-all focus:shadow-lg"
                        />
                      </motion.div>
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="space-y-3"
                    >
                      <Label className="font-semibold text-base">
                        Skills and interests
                      </Label>

                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="relative"
                      >
                        <Textarea
                          {...field}
                          placeholder="Software, visual design, photography..."
                          className="border-zinc-400 bg-white h-[100px] !text-base font-bold placeholder:font-medium text-black transition-all focus:shadow-lg"
                        />
                      </motion.div>
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="space-y-3"
                    >
                      <Label className="font-semibold text-base">
                        What would you like to build or learn with us?
                      </Label>

                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="relative"
                      >
                        <Textarea
                          {...field}
                          placeholder="Tell us about your interests, ideas, and what you hope to contribute..."
                          className="border-zinc-400 bg-white h-[100px] !text-base font-bold placeholder:font-medium text-black transition-all focus:shadow-lg"
                        />
                      </motion.div>
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="space-y-3"
                    >
                      <Label className="font-semibold text-base">
                        City
                      </Label>
                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                      >
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="border-zinc-400 bg-white py-6 !text-base font-bold placeholder:font-medium text-black w-full justify-between text-left transition-all hover:shadow-lg"
                            >
                              {field.value ? field.value : "Select a city"}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search cities..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No city found.</CommandEmpty>
                                <CommandGroup>
                                  {Object.entries(provinces).map(
                                    ([key, name]) => (
                                      <CommandItem
                                        key={key}
                                        value={name}
                                        onSelect={(currentValue) => {
                                          field.onChange(currentValue);
                                          setOpen(false);
                                        }}
                                      >
                                        {name}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            field.value === name
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    )
                                  )}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </motion.div>
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        );

      default:
        return <div>Not Found</div>;
    }
  };

  const validateCurrentStep = async () => {
    const currentStepConfig = steps[currentStep];
    const fieldsToValidate = currentStepConfig.fields;

    if (fieldsToValidate.length === 0) {
      return true;
    }

    const validationResults = await Promise.all(
      fieldsToValidate.map((field) =>
        form.trigger(field as keyof z.infer<typeof RegisterValidation>)
      )
    );

    return validationResults.every((result) => result === true);
  };

  const handleNext = async () => {
    const isStepValid = await validateCurrentStep();

    if (!isStepValid) {
      return;
    }

    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      const isFormValid = await form.trigger();
      if (isFormValid) {
        form.handleSubmit(handleRegister)();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  if (isSuccess) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-orange-100 via-[#f7f4ed] to-violet-100 px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#ffffff40,_transparent_60%),radial-gradient(circle_at_bottom_right,_#e0e7ff60,_transparent_60%)] blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-pulse mb-6">
              <CheckCircle className="w-14 h-14 text-green-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
              Application received
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Thanks for your interest in Kıvılcım. Our team will review your
              application and reach out when we find a strong project match.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mt-12 text-gray-700">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-red-700">
                Build together
              </h3>
              <p className="text-sm leading-relaxed">
                We bring different disciplines together around a shared problem.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-700">
                Learn in the open
              </h3>
              <p className="text-sm leading-relaxed">
                We grow by sharing the process, the lessons, and the wrong turns.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-green-700">
                Make real impact
              </h3>
              <p className="text-sm leading-relaxed">
                We test ideas early and grow the work that proves useful.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <button
              onClick={() => router.push("/")}
              className="bg-primary text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Back to home
            </button>
          </div>

          <div className="mt-10 text-sm text-gray-500">
            <p>
              Questions? Email us at{" "}
              <a
                href="mailto:hello@kivilcim.community"
                className="text-blue-600 hover:underline"
              >
                hello@kivilcim.community
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative h-screen flex flex-col justify-center items-center overflow-hidden">
      <div
        className="absolute top-10 sm:top-20 left-0 right-0 mx-auto 
                flex flex-col w-full max-w-[470px] "
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
                overflow-x-scroll sm:overflow-x-visible px-4 sm:px-0
                scrollbar-none flex flex-row w-full"
        >
          {steps.map((item, index) => (
            <div key={item.id} className="flex flex-row items-center">
              <motion.div
                variants={stepIndicatorVariants}
                animate={
                  item.id < currentStep
                    ? "completed"
                    : item.id === currentStep
                    ? "active"
                    : "inactive"
                }
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                className="p-3 rounded-xl cursor-pointer"
              >
                <motion.div
                  animate={{
                    rotate: item.id === currentStep ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon />
                </motion.div>
              </motion.div>
              {item.id !== steps.length - 1 && (
                <div className="mx-2 w-[40px] relative overflow-hidden rounded-full">
                  <div className="w-full h-2 bg-zinc-200 rounded-full" />
                  <motion.div
                    variants={progressVariants}
                    initial="initial"
                    animate={item.id < currentStep ? "animate" : "initial"}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute top-0 left-0 h-2 bg-primary rounded-full origin-left"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
          className="flex flex-row items-center justify-center gap-4 mt-10"
        >
          <Logo className="!size-5" />
          <h1 className="text-xl font-black tracking-[0.16em]">KIVILCIM</h1>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center w-full max-w-[460px] px-4 sm:px-0 sm:ml-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)} className="w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                className="w-full"
              >
                {renderComponentForStep(currentStep)}
              </motion.div>
            </AnimatePresence>
          </form>
        </Form>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-10 sm:bottom-20 left-0 right-0 mx-auto flex flex-row w-full gap-4 max-w-[464px] px-4 sm:px-0"
      >
        <AnimatePresence mode="popLayout">
          {currentStep > 0 && (
            <motion.div
              key="back-button"
              initial={{ opacity: 0, x: -50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.8 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              className="flex-1"
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex-1"
              >
                <Button
                  disabled={isLoading}
                  className="w-full py-6 rounded-lg text-base font-bold transition-all duration-300"
                  onClick={handleBack}
                >
                  {isLoading && <Spinner />}
                  Back
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          layout
          transition={{
            layout: { duration: 0.3, type: "spring", stiffness: 200 },
          }}
          className="flex-1"
        >
          <Button
            disabled={isLoading}
            className={`${
              currentStep === 0 ? "" : ""
            } py-6 rounded-lg w-full text-base font-bold transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary flex flex-row items-center gap-2`}
            onClick={handleNext}
          >
            {isLoading && <Spinner />}
            <motion.span
              key={
                currentStep === 0
                  ? "start"
                  : currentStep === steps.length - 1
                  ? "submit"
                  : "next"
              }
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 0
                ? "Start"
                : currentStep === steps.length - 1
                ? "Submit application"
                : "Continue"}
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
