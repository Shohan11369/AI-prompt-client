import DashboardHeading from "@/components/DashboardHeading";
import TicketsTable from "@/components/TicketsTable";
import { fethMyBooking } from "@/lib/api/bookings/data";
import { getUser } from "@/lib/api/session";


const AttendeeTicketsPage = async () => {
    const user = await getUser();

    const bookings = await fethMyBooking(user?.email);
    // console.log(bookings);

    return (
        <div>
            <DashboardHeading
                title="My Booked Tickets"
                description="All the booked tickets"
            />
            <TicketsTable tickets={bookings} />
        </div>
    );
};

export default AttendeeTicketsPage;