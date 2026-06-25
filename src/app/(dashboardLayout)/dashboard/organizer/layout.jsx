import { roleValidator } from "@/lib/api/session";

const OrganizerLayout = async ({ children }) => {
    await roleValidator("organizer")
    return children
};

export default OrganizerLayout;
