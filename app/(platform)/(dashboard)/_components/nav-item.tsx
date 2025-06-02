import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { Activity, CreditCard, Layout, Settings } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";


export type Organization = {
    id: string;
    slug: string;
    imageUrl: string;
    name: string;
}

interface NavItemProps {
    isActive: boolean;
    isExpanded: boolean;
    organization: Organization;
    onExpand: (id: string) => void;
}

export const NavItem = ({ isActive, isExpanded, organization, onExpand }: NavItemProps) => {

    const pathname = usePathname();
    const router = useRouter();

    const routes = [
        {
            label: "Boards",
            icon: <Layout className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}`,
        },
        {
            label: "Activity",
            icon: <Activity className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/activity`,
        },
        {
            label: "Settings",
            icon: <Settings className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/settings`,
        },
        {
            label: "Billing",
            icon: <CreditCard className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/billing`,
        },
    ]

    const onClick = (href: string) => {
        router.push(href);
    }

    return (
        <AccordionItem 
            value={organization.id}
            className="border-none"
        >
            <AccordionTrigger
                onClick={() => onExpand(organization.id)}
                className={cn(
                    "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
                    isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
                )}
            >
                <div className="flex items-center gap-x-2">
                    <div className="w-7 h-7 relative">
                        <Image 
                            src={organization.imageUrl}
                            alt="Organization"
                            fill
                            className="rounded-md"
                        />
                    </div>
                    <span className="font-medium text-sm">
                        {organization.name}
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 text-neutral-700">
                {routes.map((route) => (
                    <Button 
                        key={route.href}
                        onClick={() => onClick(route.href)}
                        size="sm"
                        variant="ghost"
                        className={cn(
                            "w-full justify-start font-normal",
                            pathname === route.href && "bg-sky-500/10 text-sky-700"
                        )}
                    >
                        {route.icon}
                        <span>
                            {route.label}
                        </span>
                    </Button>
                ))}
            </AccordionContent>
        </AccordionItem>
    )
}

NavItem.Skeleton = function SkeletonNaveItem() {
    return (
        <div className="flex items-center gap-x-2">
            <div className="w-10 h-10 relative shrink-0">
               <Skeleton className="h-full w-full absolute" />
            </div>
            
            <Skeleton className="h-10 w-full" />
        </div>
    )
}