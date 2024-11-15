
import VideoCall from '@/components/video-call'
import React from 'react'

interface Props {
    params: Promise<{
        roomId: string
    }>
}

const RoomPage = async ({ params }: Props) => {
    const { roomId } = await params;

    if (!roomId) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center ">
                    <h1 className="text-2xl font-semibold">
                        Room Id is required!
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Corrected syntax for passing props */}
            <VideoCall roomId={roomId} />
        </div>
    );
};

export default RoomPage;
