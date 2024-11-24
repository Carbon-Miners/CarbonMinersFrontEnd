import { Icon } from "./icon";

export function EmptyPage() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full">
			<Icon.inBox className="w-24 h-24" />
			<div className="text-2xl">No Data</div>
		</div>
	);
}
