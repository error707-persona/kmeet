'use client';
import React, { useState } from 'react'
import Image from 'next/image';
import HomeCards from './HomeCards';
import { Router } from 'next/router';
import Link from 'next/link';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"
import { StreamClient } from '@stream-io/node-sdk';
// or
// const { StreamClient } = require("@stream-io/node-sdk");


const MeetingTypeList = () => {
    const { user } = useUser();
    const router = useRouter();
    const { toast } = useToast()
    // const client = useStreamVideoClient();
    const [callDetails, setcallDetails] = useState<Call>()
    const client = useStreamVideoClient();


    const [values, setvalues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    });
    const createMeeting = async () => {

        console.log('Inside create Meeting');
        if (!client || !user) return;

        try {
            if (!values.dateTime) {
                toast({
                    title: "Please select a date and time",
                })
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error('Failed to create call');

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setcallDetails(call);
            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }
            console.log("meeting created")
            toast({
                title: "Meeting created",
            })
        }
        catch (error) {
            console.log(error);
            toast({
                title: "Failed to create meeting",
            })
        }

    }
    const [meetingState, setmeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCards
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start an instant meeting"
                handleClick={() => setmeetingState('isInstantMeeting')}
                className="bg-blue-1" />
            <HomeCards
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Plan your meeting meeting"
                handleClick={() => setmeetingState('isScheduleMeeting')}
                className="bg-purple-1" />
            <HomeCards
                img="/icons/recordings.svg"
                title="View Recordings"
                description="Check out your recordings"
                handleClick={() => <Link href="/recordings"></Link>}
                className="bg-yellow-1" />
            <HomeCards
                img="/icons/join-meeting.svg"
                title="Join Meeting"
                description="Via invitation link"
                handleClick={() => setmeetingState('isJoiningMeeting')}
                className="bg-orange-1" />
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setmeetingState(undefined)}
                title="Start a New Meeting?"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    )
}

export default MeetingTypeList