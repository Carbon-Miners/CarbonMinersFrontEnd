"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import useStore from "@/store"
import { useGetReportInfo, useSubmitReport } from "@/utils/react-query/userApi"
import { useToast } from "@/hooks/use-toast"

const FormSchema = z.object({
  report: z
    .string()
    .min(10, {
      message: "report must be at least 10 characters.",
    })
})

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
      report: data.report
    });
    if (res) {
      toast({
        description: "Report Success!",
      })
    }
  }

  return (
    <div className="w-full h-[100%] flex flex-col gap-6 items-start">
      <div className="flex flex-col">
        <span className="text-xl font-bold text-[--basic-text]">已提交报告：</span>
        <p className="text-[--secondry-text]">
          {data && data.data.report || "暂无"}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="report"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Report</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Report Your Company Report"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end">
            <Button variant={"outline"} type="submit">Submit</Button>

          </div>
        </form>
      </Form>
    </div>
  );
};
export default UploadReport;