"use client"

import { useEffect, useState } from "react"

import { CardModal } from "@/components/modals/card-modal"
import { ProModal } from "../modals/card-modal/pro-modal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null;
    }

    return (
        <>
            <CardModal />
            <ProModal />
        </>
    )
}