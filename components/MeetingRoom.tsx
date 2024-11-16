import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';

type CallLaoutType = 'grid' | 'speaker-left' | 'speaker-right'
const MeetingRoom = () => {
    const [layout, setlayout] = useState('speaker-left');
    const [showParticipants, setshowParticipants] = useState(false);
    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />
            default:
                return <SpeakerLayout participantsBarPosition="right" />
        }
    }
    return (
        <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
            <div className="relative flex size-full items-center justify-center">
                <div className="flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div className={cn('h-[calc(100vh-86px)] hidden ml-2', { 'show-block': showParticipants })}>
                    <CallParticipantsList onClose={() => setshowParticipants(false)} />
                </div>
            </div>
            <div className='fixed bottom-0 flex w-full items-center justify-center'>
                <CallControls />
                <DropdownMenu>
                    <div className='flex items-center'>
                        <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg[#4c535b]">
                            <LayoutList size={20} className='text-white' />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className='border-none'>
                        {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem className='cursor-pointer bg-dark-1 rounded hover:bg-gray-600 text-white' onClick={() => setlayout(item.toLowerCase() as CallLaoutType)}>
                                    {item}
                                </DropdownMenuItem>
                            </div>
                        ))}
                        <DropdownMenuSeparator />

                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton/>
                        <button onClick={()=>setshowParticipants((prev)=>!prev)}>
                            <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg[#4c535b]'>
                                <Users size={20} className='text-white'/>
                            </div>
                        </button>
            </div>
        </section>
    )
}

export default MeetingRoom