import { UserStatusStore } from "./userStatusStore";
import { rabbitMQService } from "../services/RabbitMQService";
import { ApiError } from "./apiError";

const userStatusStore=UserStatusStore.getInstance()

export const handleMessageReceived=async(
    senderName: string,
    senderEmail: string,
    receiverId: string,
    messageContent: string,
)=>{
    try{
    const receiverIsOffline=!userStatusStore.isUserOnline(receiverId)

    if(receiverIsOffline){
        await rabbitMQService.notifyReceiver(
            receiverId,
            messageContent,
            senderEmail,
            senderName
        )
        console.log(`Notification sent to offline receiver ${receiverId}`)
    }
    }catch(error:any){
        console.error(`Failed to send message notification: ${error.message}`)
        throw new ApiError(500,"Failed to notify receiver", true)
    }
}