import type { AstroGlobal } from "astro";
import API, { APIErrorResponse } from "./API";

export const api = new API();

export interface APIPublicResponse {
	scripts: {
		id: number;
		name: string;
		description: string;
		version: number;
		owner: string;
		owner_username: string;
		approved: boolean;
		approvedBy: string;
		approvedBy_username: string;
		installed: boolean;
		self: boolean;
	}[]
}

export default async function getPublic(Astro: AstroGlobal) {
	let header = new Headers();
	header.append('X-Token', Astro.cookies.get("access_token").value);

	return await api.get<APIPublicResponse>(`dfscript/web/public/`, {
		headers: header
	});
}