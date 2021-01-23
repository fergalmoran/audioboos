import ApiService from "./apiService";

const authServer = process.env.REACT_APP_API_URL;

class AuthService extends ApiService {
    login = async (username: string, password: string): Promise<string> => {
        const client = await this.requestClient();

        try {
            const response = await client.post(
                "/auth/login",
                {
                    email: username,
                    password: password,
                },
                {
                    withCredentials: true,
                    credentials: "include",
                    crossDomain: true,
                }
            );
            if (response && response.status === 200) {
                const token = response.data.id_token;
                return token || "";
            }
        } catch (err) {
            console.error("Exception fetching settings", err);
        }
        return "";
    };
}
const authService = new AuthService();
export default authService;
