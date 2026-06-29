
"use client";

import { useState } from "react";
import Link from "next/link";

import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form } from "@heroui/react";
import { FaEnvelope, FaLock, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const onSubmit = async (data) => {

        const { data: signInData, error: signInError } = await authClient.signIn.email({
            email: data.email,
            password: data.password,
        })

        console.log(signInData, signInError);

        if (signInError) {
            toast.error("Sign-in failed...")
        }
        else {
            router.push(callbackUrl || "/");
        }


    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f4e8ee]/20 via-[#dce6ef]/15 to-transparent text-brand-text">
            <Card className="w-full max-w-md border border-white/5  backdrop-blur-xl shadow-2xl p-4">
                <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
                    <Link href="/" className="text-sm text-slate-400 hover:text-pink-500 mb-2 flex items-center gap-1">
                        &larr; Back to Home
                    </Link>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-black via-slate-800 to-pink-500 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Sign in to continue exploring and managing your AI prompt .
                    </p>
                </CardHeader>
                <CardBody className="gap-4">
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 w-full">
                        <Label htmlFor="email" className="text-sm font-medium text-slate-300">
                            Email Address
                        </Label>
                        <Input
                            {...register("email", { required: "Email is required" })}
                            id="email"
                            placeholder="john@example.com"
                            type="email"
                            labelPlacement="outside"
                            startContent={<FaEnvelope className="text-slate-400 text-sm" />}
                            className="w-full bg-white border-white/10 text-black hover:border-pink-500/50 focus-within:!border-pink-500 rounded-lg"
                        />
                        <Label htmlFor="password" className="text-sm font-medium text-slate-300">
                            Password
                        </Label>
                        <div className="relative w-full">
                            <input
                                {...register("password", { required: "Password is required" })}
                                id="password"
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                                className="w-full bg-white border border-white/10 text-black hover:border-pink-500/50 focus:border-pink-500 rounded-lg p-2.5 pl-10 pr-10 text-sm outline-none transition-all"
                            />
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 cursor-pointer flex items-center justify-center p-1 z-10"
                            >
                                {showPassword ? (
                                    <FaEyeSlash size={16} />
                                ) : (
                                    <FaEye size={16} />
                                )}
                            </span>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
                            radius="lg"
                        >
                            Sign In
                        </Button>
                    </Form>

                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-white/5" />
                        <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">Or Login With</span>
                        <div className="flex-grow border-t border-white/5" />
                    </div>

                    <Button
                        variant="bordered"
                        className="w-full border-white/10 hover:bg-black/90 hover:border-white/20 text-white font-semibold h-11 bg-black"
                        radius="lg"
                        startContent={<FaGoogle className="text-pink-500" />}
                        onClick={async () => {
                            const { error } = await authClient.signIn.social({ 
                                provider: "google",
                                callbackURL: callbackUrl || "/"
                            });
                            if (error) {
                                toast.error(error.message || "Google login failed");
                            }
                        }}
                    >
                        Google Account
                    </Button>

                    <p className="text-center text-sm text-slate-400 mt-6">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-pink-500 hover:text-pink-400 font-semibold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </CardBody>
            </Card>
        </div>
    );
};

export default LoginPage;
