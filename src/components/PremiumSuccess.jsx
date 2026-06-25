"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent as CardBody, CardFooter, Button, Spinner } from "@heroui/react";
import { FaCrown, FaCheckCircle, FaArrowRight } from "react-icons/fa";

export default function PremiumSuccessPage() {

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#080c16] px-6 py-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-secondary/20 via-brand-background to-brand-background -z-10" />

            <Card className="w-full max-w-lg border border-white/5 bg-brand-background/70 backdrop-blur-xl shadow-2xl p-4">
                <>
                    <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
                        <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-500 border border-yellow-500/20 mb-2">
                            <FaCrown size={48} className="animate-pulse" />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-yellow-200 to-yellow-500 bg-clip-text text-transparent">
                            Upgrade Successful!
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            You are now a Premium Organizer.
                        </p>
                    </CardHeader>

                    <CardBody className="gap-6 bg-brand-background/40 p-6 rounded-2xl border border-white/5 text-center">
                        <div className="space-y-4">
                            <FaCheckCircle className="text-green-500 mx-auto" size={40} />
                            <h3 className="text-white font-bold text-lg">Unlimited Hosting Unlocked</h3>
                            <p className="text-slate-400 text-xs leading-relaxed max-w-md mx-auto">
                                The event limit has been permanently removed from your account. You can now host unlimited events, manage ticket configurations, and track complex ticket sales stats in real time!
                            </p>
                        </div>
                    </CardBody>

                    <CardFooter className="flex pt-8 justify-center">
                        <Link href="/dashboard/organizer">
                            <Button
                                as={Link}
                                href="/dashboard/organizer"
                                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-brand-background font-extrabold h-11 px-8 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20"
                                radius="lg"
                                endContent={<FaArrowRight />}
                            >
                                Go to Dashboard
                            </Button>
                        </Link>
                    </CardFooter>
                </>
            </Card>
        </div>
    );
}

