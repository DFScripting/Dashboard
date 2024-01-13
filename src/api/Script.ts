import type { AstroGlobal } from "astro";
import API from "./API";
import type { ArgumentType } from "./Actiondump";

export const api = new API();

export interface APIScriptResponse {
    id: number;
    name: string;
    description: string;
    version: number;
    approved: boolean;
    headers: header[]
}

export interface header {
    type:string,
    event:string
    snippet: snippet
}

export interface snippet {
    hidden: boolean
    parts: part[]
}

export type part = actionPart|branchPart;

export interface actionPart {
    type: "action"
    action: string
    arguments: argument[]
}
export interface branchPart {
    type: "branch",
    condition: {
        condition: string,
        type: "condition",
        inverted: boolean,
    }
    true: snippet,
    false?: snippet,
    hasElse: boolean,
    arguments: argument[]
    
}

export interface argument {
    type: ArgumentType
    value: string
}

export default async function getScript(Astro: AstroGlobal, id: string) {
	let header = new Headers();
	header.append('X-Token', Astro.cookies.get("access_token").value);
	header.append('X-Script', id);

	return await api.get<APIScriptResponse>(`dfscript/web/script/`, {
		headers: header
	});
}