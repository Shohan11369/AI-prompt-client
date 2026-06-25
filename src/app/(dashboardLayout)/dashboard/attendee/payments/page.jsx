import DashboardHeading from "@/components/DashboardHeading";
import PaymentsTable from "@/components/PaymentsTable";
import { fethMyPayments } from "@/lib/api/payments/data";
import { getUser } from "@/lib/api/session";

const AttendeePayments = async () => {
    const user = await getUser();
    const payments = await fethMyPayments(user?.email);

    return (
        <div>
            <DashboardHeading
                title="My Payment Overview"
                description="All payments of user"
            />
            <PaymentsTable payments={payments} />
        </div>
    );
};

export default AttendeePayments;
