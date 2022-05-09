import axios from "../utilities/axios"
import {useToast} from "vue-toastification";

const toast = useToast();
export const GetPopularPosts = () => {
    return axios.get('/api/post/popular').catch(err => {
        toast.error("عملیات با شکست مواجه شد")
    });
}
export const getPostBySlug = (slug) => {
    return axios.get(`/api/post/getBySlug/${slug}`).catch(err => {
        toast.error("عملیات با شکست مواجه شد")
    });
}
