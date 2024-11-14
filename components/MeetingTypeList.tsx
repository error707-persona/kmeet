"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import HomeCards from './HomeCards';
import { Router, useRouter } from 'next/router';
import Link from 'next/link';

const MeetingTypeList = () => {
    // const router = useRouter()
    const [meetingState, setmeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCards
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start an instant meeting"
                handleClick={() => setmeetingState('isJoiningMeeting')}
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

        </section>
    )
}

export default MeetingTypeList