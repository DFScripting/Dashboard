import type { AstroGlobal } from "astro";
import API, { APIErrorResponse } from "./API";

export const api = new API();

export interface APIUserResponse {
	username: string;
	uuid: string;
	scripts: {
		id: number;
		name: string;
		description: string;
		version: number;
		approved: boolean;
		approvedBy: string;
	}[]
}

export default async function getUser(Astro: AstroGlobal) {
	let header = new Headers();
	header.append('X-Token', Astro.cookies.get("access_token").value);

	const userData = await api.get<APIUserResponse>(`dfscript/web/user/`, {
		headers: header
	});


	if (API.didError(userData)) {
		const moment = new Date();
		moment.setUTCDate(moment.getDate()+15);
		Astro.cookies.set("access_token", "invalid", {
			expires: moment, secure: true, path: "/", sameSite: "lax"
		});
	}
	
	return userData;
}

export async function getUserWithoutCheck(Astro: AstroGlobal) {
	let header = new Headers();
	header.append('X-Token', Astro.cookies.get("access_token").value);

	const userData = await api.get<APIUserResponse>(`dfscript/web/user/`, {
		headers: header
	});

	return userData;
}

export async function getUserCheck(Astro: AstroGlobal) {
	let header = new Headers();
	header.append('X-Token', Astro.cookies.get("access_token").value);

	const userData = await api.get<APIUserResponse>(`dfscript/web/user/`, {
		headers: header
	});

	if (API.didError(userData)) {
		const moment = new Date();
		moment.setUTCDate(moment.getDate()+15);
		Astro.cookies.set("access_token", "invalid", {
			expires: moment, secure: true, path: "/", sameSite: "lax"
		});
	}
	
	return userData;
}