const BASE_URL: string = "http://localhost:5226";

const createRequestConfig = (method: "GET" | "POST" | "DELETE" | "PUT") => {
    const token = localStorage.getItem("access_token");
    return {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
}

export {BASE_URL, createRequestConfig};