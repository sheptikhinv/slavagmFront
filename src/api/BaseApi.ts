const BASE_URL: string = "http://localhost:5226";

const createRequestConfig = (method: "GET" | "POST" | "DELETE" | "PUT") => {
    return {
        method: method,
        headers: {
            "Content-Type": "application/json",
        }
    };
}

export {BASE_URL, createRequestConfig};