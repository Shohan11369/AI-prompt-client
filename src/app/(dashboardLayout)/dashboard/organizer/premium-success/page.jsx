import { baseURL } from '@/lib/api/baseUrl';
import { stripe } from '@/lib/stripe';
import { Button, Card, CardFooter, CardHeader } from '@heroui/react';
import Link from 'next/link';
import { redirect } from 'next/navigation'
import { FaArrowRight, FaCheckCircle, FaCrown } from 'react-icons/fa';
export default async function PremiumSuccess({ searchParams }) {
    const { session_id } = await searchParams
    // console.log(session_id);

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })
    console.log(session);
    // userEmail: email,
    // amount,
    // transactionId,
    // paymentStatus,
    // paymentType,
    // paidAt: new Date(),
    const paymentData = {
        userEmail: session?.customer_email,
        transactionId: session?.subscription,
        paymentStatus: session?.payment_status,
        paymentType: "subscription",
        amount: session?.amount_total / 100
    }


    const res = await fetch(`${baseURL}/api/users/upgrade-premium/${session?.customer_email}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
    })
    const data = await res.json();
    console.log(data);



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
                            {session?.customer_email} You are now a Premium Organizer.
                        </p>
                    </CardHeader>

                    <div className="gap-6 bg-brand-background/40 p-6 rounded-2xl border border-white/5 text-center">
                        <div className="space-y-4">
                            <FaCheckCircle className="text-green-500 mx-auto" size={40} />
                            <h3 className="text-white font-bold text-lg">Unlimited Hosting Unlocked</h3>
                            <p className="text-slate-400 text-xs leading-relaxed max-w-md mx-auto">
                                The event limit has been permanently removed from your account. You can now host unlimited events, manage ticket configurations, and track complex ticket sales stats in real time!
                            </p>
                        </div>
                    </div>

                    <CardFooter className="flex pt-8 justify-center">
                        <Link href="/dashboard/organizer">
                            <Button

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
    )
}
