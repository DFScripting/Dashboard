import type { AstroGlobal } from "astro";
import API from "./API";

export const api = new API();

export interface APIUninstallResponse {
    msg: string;
}

export default async function uninstallScript(Astro: AstroGlobal, id: string) {
	let header = new Headers();
	header.append('X-Token', Astro.cookies.get("access_token").value);
	header.append('X-Id', id);

	return await api.get<APIUninstallResponse>(`dfscript/web/uninstall/`, {
		headers: header
	});
}