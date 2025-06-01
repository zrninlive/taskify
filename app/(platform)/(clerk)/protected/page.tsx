"use client";

import { useAuth, UserButton, useUser } from "@clerk/nextjs";

const ProtectedPage = () => {
    return <div>
        <UserButton 
            afterSignOutUrl="/"
        />
    </div>
};

export default ProtectedPage;