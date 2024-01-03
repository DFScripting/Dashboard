export interface APIErrorResponse { readonly error: string };

export default class API {
	static APIBase = "https://api.techstreet.tech";

	static handleFetchErr(reason: any): APIErrorResponse {
		return { error: (reason.error || reason.message || reason) as string } as const;
	}

	static didError<T extends object>(res: T | APIErrorResponse): res is APIErrorResponse {
		if ("exists" in res && !res["exists"]) return true;
		return "error" in res;
	}

	async useEndpoint<T extends object>(endpointPath: string, init: RequestInit): Promise<T | APIErrorResponse> {
		const res = await fetch(`${API.APIBase}/${endpointPath}`, init).catch(API.handleFetchErr);
		if("error" in res) return res;
		const out = await res.json().catch(API.handleFetchErr);
		if("error" in out) return out;
		return out;
	}

	async get<T extends object>(endpointPath: string, init?: Pick<RequestInit, "credentials" | "headers">) {
		return await this.useEndpoint<T>(endpointPath, {method: "GET", ...init});
	}
}