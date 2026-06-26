"use client";

import Link from "next/link";

import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form, Select, SelectTrigger, SelectValue, SelectIndicator, SelectPopover, ListBox, ListBoxItem } from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { uploadImage } from "@/utils/uploadImage";
import { redirect } from "next/navigation";


export default function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();




    const onSubmit = async (data) => {
        // Upload image to imgbb
        console.log(data);

        const imageFile = data.image[0];
        const imageUrl = await uploadImage(imageFile)
        // console.log(imageUrl);


        const { data: signUpData, error: signUpError } = await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
            image: imageUrl,
            role: data.role
        })

        // console.log(signUpData, signUpError);
        console.log("SignUp Error:", signUpError);

        if (signUpError) {
            toast.error(signUpError.message || "Registration not succeed...")
        }
        else {
            redirect("/")
        }


    }
    console.log(errors);

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-background bg-gradient-to-r from-[#f4e8ee]/20 via-[#dce6ef]/15 to-transparent text-brand-text py-10">
            <Card className="w-full max-w-lg border border-white/5  backdrop-blur-xl shadow-2xl p-4 mx-auto">
                <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
                    <Logo />
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent">
                        Create an Account
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Sign up to explore manage your own AI prompt collection.
                    </p>
                </CardHeader>
                <CardBody className="gap-4">
                    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <Label htmlFor="name" className="text-sm font-medium text-slate-300">Full Name</Label>
                        <Input
                            {...register("name", { required: "Name is Required" })}
                            id="name"
                            placeholder="John Doe"
                            labelPlacement="outside"
                            startContent={<FaUser className="text-slate-400 text-sm" />}
                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 rounded-lg"
                        />
                        {
                            errors.name && <p className="text-red-500">{errors.name.message}</p>
                        }
                        <Label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</Label>
                        <Input
                            {...register("email", { required: "Email is Required" })}
                            id="email"
                            placeholder="john@example.com"
                            type="email"
                            labelPlacement="outside"
                            startContent={<FaEnvelope className="text-slate-400 text-sm" />}
                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 rounded-lg"
                        />
                        {
                            errors.email && <p className="text-red-500">{errors.email.message}</p>
                        }
                        <Label htmlFor="image" className="text-sm font-medium text-slate-300">Profile Image</Label>

                        <Input
                            {...register("image", { required: "image is Required" })}
                            type="file"
                            accept="image/*"
                            id="image"
                            labelPlacement="outside"
                            startContent={<FaImage className="text-slate-400 text-sm" />}
                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 rounded-lg"
                        />
                        {
                            errors.image && <p className="text-red-500">{errors.image.message}</p>
                        }

                        <Label htmlFor="password" className="text-sm font-medium text-slate-300">Password</Label>
                        <Input
                            {...register("password", {
                                required: "Password is required",
                            })}
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            labelPlacement="outside"
                            startContent={<FaLock className="text-slate-400 text-sm" />}
                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 rounded-lg"
                        />
                        {
                            errors.password && <p className="text-red-500">{errors.password.message}</p>
                        }

                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="role" className="text-sm font-medium text-slate-300">Select Role</Label>
                            <select
                                id="role"
                                {...register("role", { required: "Role is required" })} className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3 rounded-lg text-slate-300">
                                <option value="attendee">
                                    Attendee
                                </option>
                                <option value="organizer">
                                    Organizer
                                </option>
                            </select>
                            {
                                errors.role && <p className="text-red-500">{errors.role.message}</p>
                            }
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
                            radius="lg"
                        >
                            Create Account
                        </Button>
                    </Form>

                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-white/5" />
                        <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">Or Sign Up With</span>
                        <div className="flex-grow border-t border-white/5" />
                    </div>

                    <Button
                        variant="bordered"
                        className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-11"
                        radius="lg"
                        startContent={<FaGoogle className="text-pink-500" />}
                    >
                        Google OAuth
                    </Button>

                    <p className="text-center text-sm text-slate-400 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-pink-500 hover:text-pink-400 font-semibold hover:underline">
                            Log In
                        </Link>
                    </p>
                </CardBody>
            </Card>
        </div>
    );
}
