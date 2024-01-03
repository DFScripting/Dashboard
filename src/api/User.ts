import type { AstroGlobal } from "astro";
import API, { APIErrorResponse } from "./API";

export const api = new API();

export async function getUserData(Astro: AstroGlobal) : Promise<APIUserResponse | APIErrorResponse> {
	let userData: APIUserResponse | APIErrorResponse;
	if (Astro.cookies.has("astronoSession")) {
		const rawData = Astro.cookies.get("astronoSession").value;
		userData = JSON.parse(String(rawData))
	} else {
		let rawData = Astro.cookies.get("discord").value;
		if (rawData == undefined) rawData = '{"error": "not logged in", "id":"unknown"}'
		const parsedData = JSON.parse(String(rawData))
		userData = await getUser(parsedData.id)
		if (API.didError(userData) && userData.error == "log out") {
			Astro.redirect("/discord/logout/");
			return userData;
		}
		
		const moment = new Date();
		moment.setSeconds(moment.getDate() + 2);
		Astro.cookies.set("astronoSession", JSON.stringify(userData), {
			expires: moment, secure: true, path: "/", sameSite: "lax"
		});
	}

	return userData;
}

export interface APIUserResponse {
	status: string;
	token: string;

	discordId: number;

	avatar: string;
	username: string;
	uuid: string;

	admin: number;
	dev: number;
	mod: number;
	builder: number;
	artist: number;
	tester: number;
	donor: number;
	
	pack: string;
	servers: {
		name: string;
		serverId: string;
		type: string;
		channel: string;

		playerCount: number;
		max_players: number;

		ram: number;
		max_ram: number;

		online: number;
		ip: number;
		port: string;
		restart: string;
	}[];
	
	reports: {
		reporter: string;
		reported: string;
		reason: string;
		timeReported: number;
	}[];
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