import { roleValidator } from "@/lib/api/session";

const AttendentLayout = async ({ children }) => {
    await roleValidator("attendee")
    return children
};

export default AttendentLayout;
