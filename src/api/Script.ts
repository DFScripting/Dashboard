import type { AstroGlobal } from "astro";
import API from "./API";

export const api = new API();

export interface APIScriptResponse {
    id: number;
    name: string;
    description: string;
    version: number;
    approved: boolean;
    headers: {
        
    }
}

export default async function getScript(Astro: AstroGlobal, id: string) {
	let header = new Headers();
	header.append('X-Token', Astro.cookies.get("access_token").value);
	header.append('X-Script', id);

	return await api.get<APIScriptResponse>(`dfscript/web/script/`, {
		headers: header
	});
}