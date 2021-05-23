import {instance, TGetItems, TResponse} from "./api";

export const UsersAPI = {
    getUsers(PageSize: number, CurrentPage: number) {
        return (
            instance.get<TGetItems>(`users?count=${PageSize}&page=${CurrentPage}`).then(response => {
                return {
                    data: response.data,
                    status: response.status
                }
            })
        )
    },

    ahrlistize(id: number) {
        return (
            instance.post<TResponse>(`follow/${id}`).then(response => response.data.resultCode)
        )
    },
    disahrlistize(id: number) {
        return (
            instance.delete<TResponse>(`follow/${id}`).then(response => response.data.resultCode)
        )
    }
}