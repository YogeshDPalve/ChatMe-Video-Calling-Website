'use client'
import React, {useEffect, useRef} from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSearchParams } from 'next/navigation'


interface Props {
    roomId: string;
}
const VideoCall = ({ roomId }: Props) => {
    const zegoRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const searchParams = useSearchParams();
    const username = searchParams.get('username') || 'Anonymous';

    useEffect(() => {
        const appId = parseInt(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID!)
        const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET!;

        if (!appId || !serverSecret || !containerRef.current) {
            alert('Missing configuration or container');
            return;
        }

        const userId = username.toLowerCase().replace(/[^a-z0-9]/g, "") + Math.floor(Math.random() * 1000).toString();

        try {
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appId,
                serverSecret,
                roomId,
                userId,
                username,
                720,

            );
            zegoRef.current = ZegoUIKitPrebuilt.create(kitToken);

            zegoRef.current.joinRoom({
                container: containerRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,

                },
                sharedLink: [
                    {
                        name: 'Sharable Link',
                        url: `${window.location.protocol}//${window.location.host}${window.location.pathname}`
                    }
                ]
            })
        } catch (error) {
            alert('Error joining room');
        };

        return () => {
            if (zegoRef.current) {
                zegoRef.current.destroy();
                zegoRef.current = null;
            }
        }
    }, [roomId, username]);

    return (
        <div ref = {containerRef} className='h-screen w-full' /> 
    )
}

export default VideoCall