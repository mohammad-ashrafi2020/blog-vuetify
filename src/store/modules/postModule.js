import axios from "../../utilities/axios"
import {useToast} from "vue-toastification";

const toast = useToast();
export default {
    state: {
        postsFilter: {}
    },
    getters: {},
    mutations: {
        setPostFilter(state, postFilter) {
            state.postsFilter = postFilter;
        }
    },
    actions: {
        getPostById(context, id) {
            context.commit("setLoading", true);
            return axios.get(`/api/post/${id}`)
                .catch(err => {
                    toast.error("عملیات با شکست مواجه شد");
                }).finally(() => {
                    context.commit("setLoading", false);
                });
        },
        getPostBySlug(context, slug) {
            context.commit("setLoading", true);
            return axios.get(`/api/post/getBySlug/${slug}`)
                .catch(err => {
                    toast.error("عملیات با شکست مواجه شد");
                }).finally(() => {
                    context.commit("setLoading", false);
                });
        },
        getPostByFilter(context, {pageId, take, title}) {
            context.commit("setLoading", true);
            return axios.get(`/api/post`, {params: {pageId, take, title}})
                .then(res => {
                    if (res.status === 200) {
                        context.commit("setPostFilter", res.data)
                    }
                })
                .catch(err => {
                    toast.error("عملیات با شکست مواجه شد");
                }).finally(() => {
                    context.commit("setLoading", false);
                });
        },
        addPost(context, post) {
            context.commit("setLoading", true);
            return axios.post(`/api/post`,post)
                .catch(err => {
                    toast.error("عملیات با شکست مواجه شد");
                }).finally(() => {
                    context.commit("setLoading", false);
                });
        },
        editPost(context, post) {
            context.commit("setLoading", true);
            return axios.put(`/api/post`,post)
                .catch(err => {
                    if(err.response.data){
                        toast.error(err.response.data);
                    }else{
                        toast.error("عملیات با شکست مواجه شد");
                    }
                }).finally(() => {
                    context.commit("setLoading", false);
                });
        },
        deletePost(context, id) {
            context.commit("setLoading", true);
            return axios.delete(`/api/post/${id}`)
                .catch(err => {
                    toast.error("عملیات با شکست مواجه شد");
                }).finally(() => {
                    context.commit("setLoading", false);
                });
        }
    }
}
