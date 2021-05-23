import {instance, TResponse} from "./api";
import {TIncomingDataProfile, TProfilePhotos} from "../redux/ProfileReducer";

export const ProfileAPI = {
    getCurrentProfile(userId: number) {
        return (
            instance.get<TIncomingDataProfile>(`profile/${userId}`).then(response => response.data)
        )
    },
    getCurrentProfileStatus(userId: number) {
        return (
            instance.get<string>(`profile/status/${userId}`).then(response => response.data)
        )
    },
    sendToUpdateStatus(status: string) {
        return (
            instance.put<TResponse>(`profile/status`, {status}).then(response => response.data.resultCode)
        )
    },
    sendToUpdateProfileData(formData: number) {
        return (
            instance.put<TResponse>(`profile`, formData).then(response => response.data)
        )
    },
    sendToUpdateProfilePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return (
            instance.put<TResponse<TProfilePhotos>>(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => response.data)
        )
    }
}