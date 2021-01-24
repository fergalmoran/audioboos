import ApiService from "./apiService";

class AuthService extends ApiService {
    isAuthed = async (): Promise<boolean> => {
        const client = await this.requestClient();

        try {
            const response = await client.get("/auth/p");
            return response && response.status === 200 && response.data.success;
        } catch (err) {
            console.error("Exception fetching settings", err);
        }
        return false;
    };
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
    register = async (
        username: string,
        password: string,
        confirmPassword: string
    ): Promise<string> => {
        const client = await this.requestClient();

        try {
            const response = await client.post(
                "/auth/register",
                {
                    email: username,
                    password: password,
                    confirmPassword: confirmPassword,
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
