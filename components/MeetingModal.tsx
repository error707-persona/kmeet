import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Button } from './ui/button'

interface MeetingModalProps {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    className?: string,
    buttonText?: string,
    children?: ReactNode,
    handleClick?: () => void,
    image?: string,
    buttonIcon?: string
}
const MeetingModal = ({ isOpen, onClose, title, className, children, handleClick, buttonText, image, buttonIcon }: MeetingModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>

            <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
                <div className='flex flex-col gap=6'>
                    {image && (
                        <div>
                            <Image src={image} alt="image" width={72} height={72}/>
                        </div>
                    )}
                    <h1 className='font-bold text-2xl leading-[42px] text-center'>{title}</h1>
                    {children}
                    <Button className='bg-blue-1 rounded hover:bg-blue-900 mt-4' onClick={handleClick}>
                        {buttonIcon && (
                            <Image src={buttonIcon} alt="button icone" width={13} height={13}/>
                        ) }
                        {buttonText || 'Schedule meeting'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MeetingModal