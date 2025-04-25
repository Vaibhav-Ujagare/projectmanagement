class ApiClient {
    constructor() {
        this.baseURL = "http://localhost:3000/api/v1";
        this.defaultHeaders = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };
    }

    async customFetch(endpoint, options = {}) {
        try {
            const url = `${this.baseURL}/${endpoint}`;
            const headers = { ...this.defaultHeaders, ...options.headers };
            const config = {
                ...options,
                headers,
                credentials: "include",
            };
            console.log(`Fetching url ${url}`);
            const response = await fetch(url, config);
            console.log(response);
            const data = await response.json();
            console.log("response data:", data.data);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    //Auth endpoints
    async signup(username, email, password) {
        return this.customFetch("users/register", {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
        });
    }

    async login(email, password) {
        return this.customFetch("users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
    }

    async getProfile() {
        return this.customFetch("users/profile", {
            method: "GET",
        });
    }
}

const apiClient = new ApiClient();

export default apiClient;
