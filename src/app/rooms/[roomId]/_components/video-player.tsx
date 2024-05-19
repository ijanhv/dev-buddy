"use client";
import "@stream-io/video-react-sdk/dist/css/styles.css";

import { Room } from "@/db/schema";
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { generateTokenAction } from "../actions";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
const userId = "user-id";
const user: User = { id: userId };


export function DevBuddyVideo({ room }: { room: Room} ) {
  const router = useRouter();
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    if(!room) {
      return;
    }
    if (!session.data) {
      return;
    }

    const userId = session.data.user.id;
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
      },
      tokenProvider: () => generateTokenAction(),
    });
    setClient(client);
    const call = client.call("default", room.id);
    call.join({ create: true });
    setCall(call);

    return () => {
      call.leave();
      client.disconnectUser();
    };
  }, [session, room]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls
            onLeave={() => {
              router.push("/");
            }}
          />
          <CallParticipantsList onClose={() => undefined} />
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
    )
  );
}
