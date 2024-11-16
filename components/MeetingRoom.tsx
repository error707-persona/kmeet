import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

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
                    <CallLayout/>
                </div>
                <div className={cn('h-[calc(100vh-86px)] hidden ml-2', {'show-block':showParticipants})}>
                    <CallParticipantsList onClose={()=>setshowParticipants(false)}/>
                </div>
            </div>
            <div className='fixed bottom-0 flex w-full items-center justify-center'>
                <CallControls/>
            </div>
        </section>
    )
}

export default MeetingRoom