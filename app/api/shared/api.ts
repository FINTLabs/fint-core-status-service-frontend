import process from "process";
import {toEnvKey} from "~/api/BackendConst";
import {backendRoutesMap} from "~/api/backendRoutes";
import {HeaderProperties} from "~/components/root/HeaderProperties";

export type ReturnType = 'text' | 'json';

export type IMiniAdapter = { name: string };


const PROFILE = process.env.PROFILE;
const LOCAL_URL = process.env.PUBLIC_API_URL;
console.log("PROFILE:", PROFILE);

function isErrorWithStatusAndBody(err: unknown): err is { status: number; body: string } {
    return (
        typeof err === 'object' && err !== null && 'status' in err && 'body' in err && true && true
    );
}

export async function request<T = unknown>(
    URL: string,
    functionName: string,
    requestMethod = 'GET',
    returnType: ReturnType = 'json',
    data?: T
) {
    try {
        const requestOptions: RequestInit = {
            method: requestMethod,
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        switch (requestMethod) {
            case 'GET':
                return await getRequest(URL, functionName, requestOptions, returnType);
            case 'POST':
                if (data) {
                    return await postRequest(URL, functionName, requestOptions, data);
                }
                break;
            case 'PUT':
                return await putRequest(URL, functionName, requestOptions, data);
            case 'DELETE':
                return await postRequest(URL, functionName, requestOptions, data);
            default:
                throw new Response(`Unsupported request method: ${requestMethod}`, {
                    status: 404,
                    statusText: 'Something went wrong!',
                });
        }
    } catch (err) {
        if (isErrorWithStatusAndBody(err)) {
            const errorStatus = err.status;
            const errorBody = err.body;
            logStatus(errorStatus, functionName, errorBody);
            throw new Response(`${errorBody}`, {
                status: errorStatus,
            });
        } else {
            logStatus(500, functionName, 'Internal Server Error');
            throw new Response("500 Internal Server Error ( Error: Couldn't connect to server)", {
                status: 500,
                statusText: 'Something went wrong!',
            });
        }
    }
}

export async function putRequest<T = unknown>(
    URL: string,
    functionName: string,
    requestOptions: RequestInit,
    data?: T
) {
    if (data) {
        requestOptions = {
            ...requestOptions,
            body: JSON.stringify(data),
        };
    }

    const response = await fetch(URL, requestOptions);
    logStatus(response.status, functionName);
    return response;
}

export async function postRequest<T = unknown>(
    URL: string,
    functionName: string,
    requestOptions: RequestInit,
    data?: T
) {
    if (data) {
        requestOptions = {
            ...requestOptions,
            body: JSON.stringify(data),
        };
    }

    const response = await fetch(URL, requestOptions);
    logStatus(response.status, functionName);
    return response;
}

async function getRequest(
    URL: string,
    functionName: string,
    requestOptions: RequestInit,
    returnType: ReturnType
) {
    const response = await fetch(URL, requestOptions);
    logStatus(response.status, functionName);

    if (response.ok) {
        return returnType === 'json' ? await response.json() : await response.text();
    } else {
        const errorData = await response.json();
        const errorMessage = `Error ${errorData.status} (${errorData.error}): Får ikke tilgang ${errorData.path}`;

        throw {
            status: response.status,
            body: `${errorMessage}`,
        };
    }
}

function logStatus(status: number, functionName: string, errorMessage?: string) {
    if (status >= 200 && status < 300) {
        console.log(`🟢--> Result: ${functionName} ${status}`);
    } else {
        console.log(`🔴--> Result: ${functionName} ${status}`);
        if (errorMessage) {
            console.log(`Error Message: ${errorMessage}`);
        }
    }
}

export async function getResponse<T>(env: string, uri: string): Promise<T> {
    const response =
      PROFILE != null && PROFILE === "local"
        ? await performLocalRequest(uri)
        : await performRequest(env, uri);

    console.log("URL", uri);
    console.log("RESPONSE:", response);
    const json = await response.json();
    return json as T;
}

export async function performLocalRequest(uri: string) {
    return await fetch(`${LOCAL_URL}/${uri}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
            "Content-Type": "application/json",
        },
    });
}


export async function performRequest(env: string, uri: string) {
    const envKey = toEnvKey(env);

    if (!envKey) {
        throw new Error(`Invalid environment: ${env}`);
    }

    const baseUrl = backendRoutesMap[envKey];
    const normalizedUri = uri.startsWith("/") ? uri.slice(1) : uri;
    const requestUrl = `${baseUrl}/${normalizedUri}`;
    console.log("Requesting to: ", requestUrl);
    console.log("Env: ", env.toLowerCase());

    return await fetch(requestUrl, {
        method: "GET",
        headers: {
            Authorization: `${HeaderProperties.getBearerToken()}`,
            "Content-Type": "application/json",
        },
    });
}