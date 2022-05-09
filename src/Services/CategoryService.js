import axios from "../utilities/axios"
import {useToast} from "vue-toastification";

const toast = useToast();
export const GetCategories = () => {
    return axios.get('/api/category').catch(err => {
        toast.error("عملیات با شکست مواجه شد")
    });
}
