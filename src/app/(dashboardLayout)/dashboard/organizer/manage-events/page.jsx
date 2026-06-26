
import DashboardHeading from "@/components/DashboardHeading";
import ManageEventClient from "./ManageEventClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { myEvents } from "@/lib/api/events/data";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";


const ManageEvent = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const events = await myEvents(session?.user?.email)

    console.log("Events from API:", events);



    return (
        <div>
            <DashboardHeading
                title="Manage AI Prompts"
                description="Manage Prompts"
            />
            
            <Suspense fallback={<Spinner />}>
                <ManageEventClient events={events} />
            </Suspense>

        </div>
    );
};

export default ManageEvent;
