"use client";

import * as z from "zod";
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";
import { useApplyEntry } from "@/utils/react-query/userApi";
import useStore from "@/store";
import { CompanyEnum } from "@/types";

const formSchema = z.object({
	companyName: z.string({
		required_error: "companyName required",
	}),
	registrationNumber: z.string({
		required_error: "registrationNumber required",
	}),
	companyRepresentative: z.string({
		required_error: "companyRepresentative required",
	}),
	companyAddress: z.string({
		required_error: "companyAddress required",
	}),
	contactEmail: z
		.string({
			required_error: "contactEmail required",
		})
		.email(),
	contactNumber: z.string({
		required_error: "contactNumber required",
	}),
	emissionData: z.string({
		required_error: "emissionData required",
	}),
	reductionStrategy: z.string({
		required_error: "reductionStrategy required",
	}),
});

const ApplyForm = ({
	setTabValue,
}: {
	setTabValue: (value: CompanyEnum) => void;
}) => {
	const { addressConnect } = useStore();
	const { mutateAsync: companyApply } = useApplyEntry();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			companyName: "",
			registrationNumber: "",
			companyRepresentative: "",
			companyAddress: "",
			contactEmail: "",
			contactNumber: "",
			emissionData: "",
			reductionStrategy: "",
		},
	});

	const onSubmit = async () => {
		setIsLoading(true);
		const getFormValues = form.getValues();
		const combineData = {
			publicKey: addressConnect!,
			name: getFormValues.companyName,
			companyMsg: JSON.stringify(getFormValues),
		};
		const applyStatus = await companyApply(combineData);
		if (applyStatus) {
			setIsLoading(false);
			toast({
				description: "Apply Success!",
			});
			setTabValue(CompanyEnum.INFOS);
		}
	};

	return (
		<div className="relative flex flex-col p-10 m-5 bg-[#242731] rounded-[6px] overflow-auto">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="relative grid grid-cols-2 gap-8 pb-14 pt-6"
				>
					<FormField
						control={form.control}
						name="companyName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#FFFFFF] text-xl mb-2">
									Company Name
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter company name"
										{...field}
										className="w-[70%] h-10 bg-[#242731] border-[1px] border-gray-200 rounded-[6px] text-[#FFFFFF] pl-2"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="registrationNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#FFFFFF] text-xl mb-2">
									Registration Number
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter registration number"
										{...field}
										className="w-[70%] h-10 bg-[#242731] border-[1px] border-gray-200 rounded-[6px] text-[#FFFFFF] pl-2"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="companyRepresentative"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#FFFFFF] text-xl mb-2">
									Company Representative
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter company representative"
										{...field}
										className="w-[70%] h-10 bg-[#242731] border-[1px] border-gray-200 rounded-[6px] text-[#FFFFFF] pl-2"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="companyAddress"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#FFFFFF] text-xl mb-2">
									Company Address
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter company address"
										{...field}
										className="w-[70%] h-10 bg-[#242731] border-[1px] border-gray-200 rounded-[6px] text-[#FFFFFF] pl-2"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="contactEmail"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#FFFFFF] text-xl mb-2">
									Contact Email
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter contact email"
										{...field}
										className="w-[70%] h-10 bg-[#242731] border-[1px] border-gray-200 rounded-[6px] text-[#FFFFFF] pl-2"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="contactNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#FFFFFF] text-xl mb-2">
									Contact Number
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter contact Number"
										{...field}
										className="w-[70%] h-10 bg-[#242731] border-[1px] border-gray-200 rounded-[6px] text-[#FFFFFF] pl-2"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="emissionData"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#FFFFFF] text-xl mb-2">
									Emission Data
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter emission data"
										className="resize-none w-[70%] bg-[#242731] border-[1px] border-gray-200 rounded-[6px] text-[#FFFFFF] pl-2"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="reductionStrategy"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#FFFFFF] text-xl mb-2">
									Reduction Strategy
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Describe your company's carbon reduction plans and strategies"
										className="resize-none w-[70%] bg-[#242731] border-[1px] border-gray-200 rounded-[6px] text-[#FFFFFF] pl-2"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="absolute bottom-0 w-[300px] bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]"
					>
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Apply For Entry
					</Button>
					{/* </div> */}
				</form>
			</Form>
		</div>
	);
};

export default ApplyForm;
