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
import { useStartAuction, useStartTrade } from "@/utils/react-query/userApi";
import useStore from "@/store";
import { calcTime } from "@/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface IProps {
	close: () => void;
}

const formSchema = z.object({
	tradeID: z.string(),
	amount: z.string({
		required_error: "amount is required",
	}),
	priceOfUint: z.string({
		required_error: "price of unit is required",
	}),
});

const TradeForm = ({ close: handleTradeFormClose }: IProps) => {
	const { addressConnect } = useStore();
	const { toast } = useToast();
	const { mutateAsync: startTrade } = useStartTrade();
	const [isLoading, setIsLoading] = useState(false);

	const { writeContract } = useWriteContract({
		mutation: {
			onSuccess: async (hash, variables) => {
				const listReceipt = await waitForTransactionReceipt(wagmiConfig, {
					hash,
				});
				if (listReceipt.status === "success") {
					startTradeMethod(hash);
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

	const startTradeMethod = async (hash: string) => {
		const getFormValues = form.getValues();
		const combineData = {
			...getFormValues,
			publicKey: addressConnect!,
			hash: hash,
			amount: Number(getFormValues.amount),
			priceOfUint: Number(getFormValues.priceOfUint),
		};
		const auctionRes = await startTrade(combineData);
		if (auctionRes) {
			setIsLoading(false);
			handleTradeFormClose();
			toast({
				description: "Your trade has been posted!",
			});
		}
	};

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		writeContract({
			abi: carbonTraderAbi,
			address: carbonTraderAddress,
			functionName: "createMarketTrade",
			args: [
				BigInt(data.tradeID),
				BigInt(data.amount),
				BigInt(data.priceOfUint),
			],
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input placeholder="Enter Amount" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="priceOfUint"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price of Unit</FormLabel>
							<FormControl>
								<Input placeholder="Enter price of unit" {...field} />
							</FormControl>
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
export default TradeForm;
