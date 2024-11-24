export function ComingSoon() {
	return (
		<div className="h-full relative flex flex-col  place-items-center justify-center">
			<h2 className="text-center font-heading m-10 text-6xl sm:text-7xl lg:text-8xl leading-[5rem] sm:leading-[7rem] lg:leading-[7rem] font-black	 ">
				<span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
					{"Coming Soon..."}
				</span>
				<span className="">⏳</span>
			</h2>
		</div>
	);
}
