import axios from "../../utilities/axios"

export default {
    state: {
        usersFilter: {},
        singleUser: {}
    },
    getters: {},
    mutations: {
        setUsers(state, users) {
            state.usersFilter = users;
        },
        setSingleUser(state, user) {
            state.singleUser = user;
        }
    },
    actions: {
        getUsers(context, {take, pageId}) {
            context.commit("setLoading", true);

            axios.get(`/api/user?pageId=${pageId}&take=${take}`).then(res => {
                context.commit("setUsers", res.data)
            }).catch(err => {

            }).finally(() => {
                context.commit("setLoading", false);
            });
        },
        getUserById(context, userId) {
            context.commit("setLoading", true);

            return axios.get(`/api/user/${userId}`).then(res => {
                if (res.status === 200)
                    context.commit("setSingleUser", res.data)
            }).catch(err => {

            }).finally(() => {
                context.commit("setLoading", false);
            });
        },
        addUser({commit}, user) {
            commit("setLoading", true);
            return axios.post("/api/user", user).finally(f => {
                commit("setLoading", false);
            });
        },
        editUser({commit}, user) {
            commit("setLoading", true);
            return axios.put("/api/user", user)
                .finally(f => {
                    commit("setLoading", false);
                });
        }
    },
}
