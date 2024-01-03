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
        type:string,
        event:string
        snippet: {
            hidden: boolean
            parts: {
                action: string
                type: string
                arguments: {
                    type: string
                    value: string
                }[]
            }[]
        }
    }[]
}

export default async function getScript(Astro: AstroGlobal, id: string) {
	let header = new Headers();
	header.append('X-Token', Astro.cookies.get("access_token").value);
	header.append('X-Script', id);

	return await api.get<APIScriptResponse>(`dfscript/web/script/`, {
		headers: header
	});
}