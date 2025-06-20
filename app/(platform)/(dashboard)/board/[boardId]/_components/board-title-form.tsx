"use client"

import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input";

import { updateBoard } from "@/actions/update-board";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";


interface BoardTitleFormProps { 
    data: Board;
}

export const BoardTitleForm = ({ data } : BoardTitleFormProps) => {
    const { execute } = useAction(updateBoard, {
        onSuccess: (data) => {
            toast.success(`Board ${data.title} updated!`)
            setTitle(data.title)
            disableEditing()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const [title, setTitle] = useState(data.title)
    const [isEditing, setIsEditing] = useState(false)

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string

        execute({
            id: data.id,
            title
        })
    } 

    const onBlur = () => {
        formRef.current?.requestSubmit()
    }

    if(isEditing){
        return (
            <form className="flex items-center gap-x-2" ref={formRef} action={onSubmit}>
                <FormInput 
                    ref={inputRef}
                    id="title"
                    onBlur={onBlur}
                    defaultValue={title}
                    className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
                />
            </form>
        )
    }

    return (
        <Button
            className="font-bold text-lg h-auto w-auto p-1 px-2"
            variant="transparent"
            onClick={enableEditing}
        >
            {title}
        </Button>
    )
}