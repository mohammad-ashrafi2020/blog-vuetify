import axios from "../utilities/axios"
import {useToast} from "vue-toastification";

const toast = useToast();
export const getComments = (postId) => {
    return axios.get(`/api/comment?postId=${postId}`);
}
export const addComment = (comment) => {
    return axios.post(`/api/comment`, comment);
}

export const deleteComment = (commentId) => {
    return axios.delete(`/api/comment/${commentId}`);
}
