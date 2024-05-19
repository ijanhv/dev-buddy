"use server";

import { db } from "@/db";
import { room, Room } from "@/db/schema";
import { getSession } from "@/lib/auth";

import { revalidatePath } from "next/cache";



export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {

  const session = await getSession();

  if (!session) {
        throw new Error("you must be logged in to create this room");
      }

      const newRoom = await db.insert(room).values({
        
          ...roomData,
          userId: session.user.id,

      });


      revalidatePath("/");
      return newRoom;

}