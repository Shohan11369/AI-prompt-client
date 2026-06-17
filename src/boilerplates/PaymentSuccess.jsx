
import Link from "next/link";
import { Card, CardHeader, CardContent as CardBody, CardFooter, Button } from "@heroui/react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

export default async function PaymentSuccessPage() {


    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#080c16] px-6 py-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 -z-10" />

            <Card className="w-full max-w-lg border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4">


                <>
                    <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
                        <div className="p-3 bg-green-500/10 rounded-full text-green-500 border border-green-500/20 mb-2">
                            <FaCheckCircle size={48} className="animate-bounce" />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-green-400 bg-clip-text text-transparent">
                            Payment Successful!
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Your seats are reserved. Here are your booking details.
                        </p>
                    </CardHeader>

                    <CardBody className="gap-6 bg-slate-900/40 p-6 rounded-2xl border border-white/5">
                        <div className="space-y-3">
                            <h3 className="text-white font-bold text-lg line-clamp-1"></h3>
                            <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>Attendee Email:</span>
                                <span className="text-white font-semibold"></span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>Reserved Seats:</span>
                                <span className="text-white font-semibold"> Ticket(s)</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>Total Amount Paid:</span>
                                <span className="text-green-400 font-extrabold"></span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>Transaction ID:</span>
                                <span className="text-indigo-400 font-semibold truncate max-w-[200px]"></span>
                            </div>
                        </div>
                    </CardBody>

                    <CardFooter className="flex flex-col sm:flex-row gap-3 pt-8 justify-center">
                        <Link href="/dashboard/attendee/tickets">
                            <Button
                                as={Link}
                                href="/dashboard/attendee/tickets"
                                className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
                                radius="lg"
                                endContent={<FaArrowRight />}
                            >
                                View My Tickets
                            </Button>
                        </Link>
                        <Link href="/events">
                            <Button
                                as={Link}
                                href="/events"
                                variant="bordered"
                                className="w-full sm:w-auto border-white/10 hover:bg-white/5 text-white font-semibold h-11 px-6"
                                radius="lg"
                            >
                                Browse More Events
                            </Button>
                        </Link>
                    </CardFooter>
                </>

            </Card>
        </div>
    );
}
