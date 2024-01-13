import type { AstroGlobal } from "astro";
import API from "./API";

export const api = new API();

export interface APIActiondumpResponse {
    conditions: Condition[]
    actions: Action[]
    events: Event[]
    client_values: ClientValue[]
}

export interface Argument {
    type_icon: (typeof ArgumentTypes)[ArgumentType]['icon']
    type_name: (typeof ArgumentTypes)[ArgumentType]['name']
    plural: boolean
    name: string
    optional: boolean
    type: ArgumentType
}

export type ArgumentType = keyof typeof ArgumentTypes
export const ArgumentTypes = {
    ANY: {
        icon: "ender_eye",
        name: "Any"
    },
    NUMBER: {
        icon: "slime_ball",
        name: "number"
    },
    TEXT: {
        icon: "book",
        name: "Text"
    },
    LIST: {
        icon: "chest",
        name: "List"
    },
    DICTIONARY: {
        icon: "chest_minecart",
        name: "Dictionary"
    },
    BOOL: {
        icon: "lever",
        name: "Boolean"
    },
    VARIABLE: {
        icon: "magma_cream",
        name: "Variable"
    },

} as const

export interface Condition {
    identifier: string,
    name: string,
    icon: string,
    description: string,
    arguments: Argument[]
}

export interface Action {
    identifier: string
    name: string
    icon: string
    description: string
    category: string
    arguments: Argument[]
}
export interface Event {
    identifier: string
    name: string
    icon: string
    description: string
}
export interface ClientValue {
    identifier: string
    name: string
    description: string
    icon: string
    type_icon: string
    type_name: string
    type: string
}

export default async function getActiondump(Astro: AstroGlobal) {
    let header = new Headers();
	header.append('X-Token', Astro.cookies.get("access_token").value);

	return await api.get<APIActiondumpResponse>(`dfscript/web/actiondump/`, {
		headers: header
	});
}