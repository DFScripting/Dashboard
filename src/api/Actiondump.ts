import type { AstroGlobal } from "astro";
import API from "./API";

export const api = new API();

export interface APIActiondumpResponse {
    actions: {
        identifier: string
        name: string
        icon: string
        description: string
        category: string
        arguments: {
            type_icon: string
            type_name: string
            plural: boolean
            name: string
            optional: boolean
            type: string
        }[]
    }[]
    events: {
        identifier: string
        name: string
        icon: string
        description: string
    }[]
    client_values: {
        identifier: string
        name: string
        description: string
        icon: string
        type_icon: string
        type_name: string
        type: string
    }[]
}

export default async function getActiondump(Astro: AstroGlobal) {
    let header = new Headers();
	header.append('X-Token', Astro.cookies.get("access_token").value);

	return await api.get<APIActiondumpResponse>(`dfscript/web/actiondump/`, {
		headers: header
	});
}