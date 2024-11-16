'use client';
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setissetupComplete}:{setissetupComplete:(value:boolean)=>void}) => {
    const [isMicCamToggleOn, setisMicCamToggleOn] = useState(false);
    const call = useCall()

    if (!call) {
        throw new Error('usecall must be used within StreamCall component')
    }
    useEffect(() => {
        if (!isMicCamToggleOn) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isMicCamToggleOn, call?.camera, call?.microphone])
    return (
        <div className='flex items-center justify-center'>
        <div className='flex h-screen w-full md:h-1/3 md:w-1/2 flex-col items-center justify-center gap-3 text-white'>
            <h1 className='text-2xl font-bold'>Setup</h1>
            <VideoPreview />

            <div className='flex h-16 items-center justify-center gap-2 font-medium'>
                <label className="" htmlFor="mic-cam-checkbox">
                    <input type="checkbox" id='mic-cam-checkbox' className='mr-2' checked={isMicCamToggleOn} onChange={(e) => setisMicCamToggleOn(e.target.checked)} />
                    Join with mic and camera on
                </label>
                <DeviceSettings/>
            </div>
            <Button className='rounded bg-green-500 hover:bg-green-950 px-4 py-2.5' onClick={()=> {
                call.join();
                setissetupComplete(true);
            }}>
                Join Meeting
            </Button>
        </div>
        </div>
    )
}

export default MeetingSetup