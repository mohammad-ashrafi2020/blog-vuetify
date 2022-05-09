import axios from "axios";

axios.defaults.baseURL = "https://blog-api.codeyad-project.ir";
//axios.defaults.baseURL = "https://localhost:5001";

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}
