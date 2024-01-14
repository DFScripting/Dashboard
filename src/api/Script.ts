import type { AstroGlobal } from "astro";
import API from "./API";
import { ArgumentTypes as DumpArgumentTypes } from "./Actiondump";

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

export const ArgumentTypes = {...DumpArgumentTypes, CLIENT_VALUE: {
    icon: "name_tag",
    name: "Client Value"
}} as const
export type ArgumentType = keyof typeof ArgumentTypes;
export type argument = text | num | bool | value | variable
export interface arg {
    type: ArgumentType,
    value: any,
}
export interface text extends arg {
    type: 'TEXT',
    value: string
}
export interface num extends arg {
    type: 'NUMBER',
    value: number
}
export interface bool extends arg {
    type: 'BOOL',
    value: boolean
}
export interface value extends arg {
    type: 'CLIENT_VALUE',
    value: string
}
export interface variable extends arg {
    type: 'VARIABLE',
    value: string,
    scope: "SCRIPT" // idk the other ones yet
}

export default async function getScript(Astro: AstroGlobal, id: string) {
	let header = new Headers();
	header.append('X-Token', Astro.cookies.get("access_token").value);
	header.append('X-Script', id);

	return await api.get<APIScriptResponse>(`dfscript/web/script/`, {
		headers: header
	});
}