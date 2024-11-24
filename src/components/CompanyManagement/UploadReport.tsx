"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import useStore from "@/store";
import { useGetReportInfo, useSubmitReport } from "@/utils/react-query/userApi";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
	report: z.string().min(10, {
		message: "report must be at least 10 characters.",
	}),
});

const UploadReport = () => {
	const { addressConnect } = useStore();
	const { toast } = useToast();
	const { mutateAsync: uploadReport } = useSubmitReport();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	const { data } = useGetReportInfo(addressConnect);

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		const res = await uploadReport({
			publicKey: addressConnect!,
			report: data.report,
		});
		if (res) {
			toast({
				description: "Report Success!",
			});
		}
	};

	return (
		<div className="grid grid-cols-2 m-5 gap-10">
			<div className="w-full h-[270px] flex flex-col gap-6 p-10 bg-[#242731] rounded-[6px]">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-6"
					>
						<FormField
							control={form.control}
							name="report"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[#FFFFFF] text-xl mb-2">
										Report
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Report Your Company Report"
											className="resize-none w-[100%] h-[100px] bg-[#242731] border-[1px] border-gray-200 rounded-[6px] text-[#FFFFFF] pl-2"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="w-full flex justify-end ">
							<Button
								// variant={"outline"}
								type="submit"
								className="bg-[--button-bg] text-[--basic-text]"
							>
								Submit
							</Button>
						</div>
					</form>
				</Form>{" "}
			</div>
			<div className="w-full h-[270px] flex flex-col gap-6 bg-[#242731] rounded-[6px]">
				<div className="flex flex-col p-10">
					<span className="text-[#FFFFFF] text-xl mb-2">Your Report：</span>
					<p className="text-[--secondry-text]">
						{(data && data.data.report) || "暂无"}
					</p>
				</div>
			</div>
		</div>
	);
};
export default UploadReport;
