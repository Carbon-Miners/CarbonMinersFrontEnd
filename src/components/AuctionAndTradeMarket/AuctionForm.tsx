import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { type BaseError, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useToast } from "@/hooks/use-toast";
import { wagmiConfig } from "@/utils/wagmi-config";
import { carbonTraderAbi } from "~/carbonTrader";
import { carbonTraderAddress } from "@/config";
import { useStartAuction } from "@/utils/react-query/userApi";
import useStore from "@/store";
import { calcTime } from "@/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface IProps {
	close: () => void;
}

const formSchema = z.object({
	tradeID: z.string(),
	sellAmount: z.string({
		required_error: "sellAmount is required",
	}),
	minimumBidAmount: z.string({
		required_error: "minimumBidAmount is required",
	}),
	initPriceUnit: z.string({
		required_error: "initPriceUnit is required",
	}),
	startTime: z.date({
		required_error: "startTime is required",
	}),
	endTime: z.date({
		required_error: "endTime is required",
	}),
});

const AuctionForm = ({ close: handleClose }: IProps) => {
	const { addressConnect } = useStore();
	const { toast } = useToast();
	const { mutateAsync: startAuction } = useStartAuction();
	const [isLoading, setIsLoading] = useState(false);

	const { writeContract } = useWriteContract({
		mutation: {
			onSuccess: async (hash, variables) => {
				const listReceipt = await waitForTransactionReceipt(wagmiConfig, {
					hash,
				});
				if (listReceipt.status === "success") {
					startAuctionMethod(hash);
				}
			},
			onError: (error) => {
				toast({
					description:
						"Error: " + ((error as BaseError).shortMessage || error.message),
				});
			},
		},
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			tradeID: new Date().getTime().toString(),
		},
	});

	const startAuctionMethod = async (hash: string) => {
		const getFormValues = form.getValues();
		const combineData = {
			...getFormValues,
			publicKey: addressConnect!,
			hash: hash,
			startTime: calcTime(new Date(getFormValues.startTime).getTime(), true),
			endTime: calcTime(new Date(getFormValues.endTime).getTime(), true),
		};
		const auctionRes = await startAuction(combineData);
		if (auctionRes) {
			setIsLoading(false);
			handleClose();
			toast({
				description: "Your auction has been posted!",
			});
		}
	};

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		writeContract({
			abi: carbonTraderAbi,
			address: carbonTraderAddress,
			functionName: "startAuctionTrade",
			args: [
				BigInt(data.tradeID),
				BigInt(data.sellAmount),
				BigInt(new Date(data.startTime).getTime()),
				BigInt(new Date(data.endTime).getTime()),
				BigInt(data.minimumBidAmount),
				BigInt(data.initPriceUnit),
			],
		});
	};

	const handleTimeChange = (
		type: "hour" | "minute",
		value: string,
		field: "start" | "end"
	) => {
		const flag = field === "start" ? "startTime" : "endTime";
		const currentDate = form.getValues(flag) || new Date();
		const newDate = new Date(currentDate);

		if (type === "hour") {
			const hour = parseInt(value, 10);
			newDate.setHours(hour);
		} else if (type === "minute") {
			newDate.setMinutes(parseInt(value, 10));
		}

		form.setValue(flag, newDate);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="sellAmount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sell Amount</FormLabel>
							<FormControl>
								<Input placeholder="Enter Sell Amount" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="minimumBidAmount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Minimum Bid Amount</FormLabel>
							<FormControl>
								<Input placeholder="Enter Minimum Bid Amount" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="initPriceUnit"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Init Price Unit</FormLabel>
							<FormControl>
								<Input placeholder="Enter Init Price Unit" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="startTime"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Start Time</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-full pl-3 text-left font-normal",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value ? (
												format(field.value, "MM/dd/yyyy HH:mm")
											) : (
												<span>Select Start Time</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<div className="flex">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											fromDate={new Date()}
											initialFocus
										/>
										<div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
											<ScrollArea className="w-64 sm:w-auto">
												<div className="flex sm:flex-col p-2">
													{Array.from({ length: 24 }, (_, i) => i)
														.reverse()
														.map((hour) => (
															<Button
																key={hour}
																size="icon"
																variant={
																	field.value && field.value.getHours() === hour
																		? "default"
																		: "ghost"
																}
																className="sm:w-full shrink-0 aspect-square"
																onClick={() =>
																	handleTimeChange(
																		"hour",
																		hour.toString(),
																		"start"
																	)
																}
															>
																{hour}
															</Button>
														))}
												</div>
												<ScrollBar
													orientation="horizontal"
													className="sm:hidden"
												/>
											</ScrollArea>
											<ScrollArea className="w-64 sm:w-auto">
												<div className="flex sm:flex-col p-2">
													{Array.from({ length: 12 }, (_, i) => i * 5).map(
														(minute) => (
															<Button
																key={minute}
																size="icon"
																variant={
																	field.value &&
																	field.value.getMinutes() === minute
																		? "default"
																		: "ghost"
																}
																className="sm:w-full shrink-0 aspect-square"
																onClick={() =>
																	handleTimeChange(
																		"minute",
																		minute.toString(),
																		"start"
																	)
																}
															>
																{minute.toString().padStart(2, "0")}
															</Button>
														)
													)}
												</div>
												<ScrollBar
													orientation="horizontal"
													className="sm:hidden"
												/>
											</ScrollArea>
										</div>
									</div>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="endTime"
					render={({ field }) => (
						<FormItem>
							<FormLabel>End Time</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-full pl-3 text-left font-normal",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value ? (
												format(field.value, "MM/dd/yyyy HH:mm")
											) : (
												<span>Select End Time</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<div className="flex">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											fromDate={new Date()}
											initialFocus
										/>
										<div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
											<ScrollArea className="w-64 sm:w-auto">
												<div className="flex sm:flex-col p-2">
													{Array.from({ length: 24 }, (_, i) => i)
														.reverse()
														.map((hour) => (
															<Button
																key={hour}
																size="icon"
																variant={
																	field.value && field.value.getHours() === hour
																		? "default"
																		: "ghost"
																}
																className="sm:w-full shrink-0 aspect-square"
																onClick={() =>
																	handleTimeChange(
																		"hour",
																		hour.toString(),
																		"end"
																	)
																}
															>
																{hour}
															</Button>
														))}
												</div>
												<ScrollBar
													orientation="horizontal"
													className="sm:hidden"
												/>
											</ScrollArea>
											<ScrollArea className="w-64 sm:w-auto">
												<div className="flex sm:flex-col p-2">
													{Array.from({ length: 12 }, (_, i) => i * 5).map(
														(minute) => (
															<Button
																key={minute}
																size="icon"
																variant={
																	field.value &&
																	field.value.getMinutes() === minute
																		? "default"
																		: "ghost"
																}
																className="sm:w-full shrink-0 aspect-square"
																onClick={() =>
																	handleTimeChange(
																		"minute",
																		minute.toString(),
																		"end"
																	)
																}
															>
																{minute.toString().padStart(2, "0")}
															</Button>
														)
													)}
												</div>
												<ScrollBar
													orientation="horizontal"
													className="sm:hidden"
												/>
											</ScrollArea>
										</div>
									</div>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="w-full flex justify-end gap-2">
					<Button
						type="submit"
						className="w-full bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]"
					>
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
};
export default AuctionForm;
