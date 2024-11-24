import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export function getImage(index: number) {
	const imageList = [
		"cb1",
		"cb2",
		"cb3",
		"cb4",
		"cb5",
		"cb6",
		"cb7",
		"cb8",
		"cb9",
		"cb10",
		"cb11",
		"cb12",
		"cb13",
		"cb14",
		"cb15",
		"cb16",
		"cb17",
		"cb18",
		"cb19",
		"cb20",
	];
	const length = imageList.length;
	return imageList[index % length];
}
