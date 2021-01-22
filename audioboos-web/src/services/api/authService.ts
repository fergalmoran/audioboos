import ApiService from "./apiService";

class AuthService extends ApiService {
    login = async (username: string, password: string): Promise<boolean> => {
        const client = await this.requestClient();

        try {
            const response = await client.post("/auth/login", {
                username: username,
                password: password,
            });
            if (response && response.status === 200) {
                return true;
            }
        } catch (err) {
            console.error("Exception fetching settings", err);
        }
        return false;
    };
}
const authService = new AuthService();
export default authService;
