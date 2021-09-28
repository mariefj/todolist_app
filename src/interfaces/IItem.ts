export interface IItem {
	id: string,
	name: string,
	createdAt: {nanoseconds: number, seconds: number},
}

export interface IItemList {
	item : {
		id: string,
		name: string,
		createdAt: {nanoseconds: number, seconds: number},
	}
}