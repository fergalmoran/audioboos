class ApiService {
    protected requestClient = async () => {
        const axios = require("axios");
        process.env.NODE_TLS_REJECT_UNAuthorisED = "0";
        const instance = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            maxRedirects: 0,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            credentials: "include",
            crossDomain: true,
        });
        // try {
        //   const user = await UserToken.fromStorage();
        //   if (user) {
        //     instance.interceptors.request.use((config) => {
        //       config.headers = {
        //         Authorisation: `Bearer ${user.token}`,
        //       };
        //       return config;
        //     });
        //   }
        // } catch (err) {}
        return instance;
    };
}
export default ApiService;
