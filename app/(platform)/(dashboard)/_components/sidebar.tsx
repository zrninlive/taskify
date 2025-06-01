"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { NavItem, Organization } from "./nav-item";

interface SidebarProps {
    storageKey?: string;
}

export const Sidebar = ({ storageKey = 't-sidebar-state'}: SidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});

    const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization();

    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
        userMemberships: {
            infinite: true,
        }
    });

    const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc, key) => {
        if(expanded[key]) {
            acc.push(key);
        }

        return acc;
    }, [] as string[]);

    const onExpand = (id: string) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if(!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
                <Skeleton />
            </>
        )
    }

    return (
        <>
            <div className="font-medium text-xs flex items-center mb-1">
            <span className="pl-4">
                Workspaces
            </span>

            <Button 
                asChild
                variant="ghost"
                size="icon"
                className="ml-auto"
            >
                <Link href="/select-org">
                    <Plus className="h-4 w-4 mr-2" />
                </Link>
            </Button>
            </div>
            <Accordion 
                type="multiple"
                defaultValue={defaultAccordionValue}
                className="space-y-2"
            >
                {userMemberships.data?.map((org) => (
                   <NavItem 
                        key={org.organization.id}
                        isActive={activeOrganization?.id === org.organization.id}
                        isExpanded={expanded[org.organization.id]}
                        organization={org.organization as Organization}
                        onExpand={onExpand}
                   />
                ))}
            </Accordion>
        </>
    )
}