import { OrgControl } from "./_componenets/org-control";

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
         <OrgControl />
         {children}
        </>
    )
}

export default OrganizationIdLayout;