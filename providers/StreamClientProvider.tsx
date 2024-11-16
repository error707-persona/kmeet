'use client';
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
  } from '@stream-io/video-react-sdk';
import Error from 'next/error';
import { ReactNode, useEffect, useState } from 'react';
  
  const apiKey = 'tybnyz8rqh6b';
  const userId = 'user-id';
  const token = 'authentication-token';
  const user: User = { id: userId };
  
//   const client = new StreamVideoClient({ apiKey, user, token });
//   const call = client.call('default', 'my-first-call');
//   call.join({ create: true });
  
  const StreamVideoProvider = ({children}:{children:ReactNode}) => {
    const [videoClient, setvideoClient] = useState<StreamVideoClient>();
    const {user, isLoaded} = useUser();
    useEffect(()=>{
        if (!isLoaded || !user) return;
        if (!apiKey) console.error("Stream api key missing");

        const client = new StreamVideoClient({
            apiKey,
            user:{
                id:user?.id,
                name:user.username || user?.id,
                image:user?.imageUrl
            },
            // token:'',
            tokenProvider
        })

        setvideoClient(client);
    }, [user, isLoaded]);

    if (!videoClient) return <Loader/>
    return (
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    );
  };
  
  export default StreamVideoProvider;