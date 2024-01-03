import API from "../API";

export const api = new API();

export interface APIEaster2023Response {
	eggs: {
		id: string;
		texture: string;
		signature: string;
		rarity: string;
	}[];

	collections: {
		id: string;
		time: number;
		rarity: string;
	}[];
}

export default async function getUser(code: string) {
	return await api.get<APIEaster2023Response>(`event/easter2023/${code}`);
}