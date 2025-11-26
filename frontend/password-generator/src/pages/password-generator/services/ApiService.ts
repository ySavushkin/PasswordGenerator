import { RoutePaths } from "../../../router/RoutePaths";

export class ApiService {
    baseUrl: string = ""

    async request(endpoint: string, options: RequestInit = {}) : Promise<any> {
        const headers = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
            credentials: "include"
        });

        if (response.status === 403) {
            console.error("403 Forbidden – no access");
            window.location.href = RoutePaths.LOGIN;
            throw new Error("Forbidden");
        }

        return response;
    }
}
