import { useState } from "react";
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils";
import { type BaseError, useAccount, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useToast } from "@/hooks/use-toast";
import { wagmiConfig } from "@/utils/wagmi-config";
import { carbonAuctionTradeAbi } from "~/carbon";
import { carbonTraderAddress } from "@/config";
import { useStartAuction } from "@/utils/react-query";

interface IProps {
  clsoseDialog: (value: boolean) => void;
}

const formSchema = z.object({
  tradeID: z.string(),
  sellAmount: z.string({
    required_error: "sellAmount is required",
  }),
  minimumBidAmount: z.string(
    {
      required_error: "minimumBidAmount is required",
    }
  ),
  initPriceUnit: z.string(
    {
      required_error: "initPriceUnit is required",
    }
  ),
  startTime: z.date({
    required_error: "startTime is required",
  }),
  endTime: z.date({
    required_error: "endTime is required",
  })
});

const AuctionForm = ({ clsoseDialog }: IProps) => {

  const { address } = useAccount();
  const { toast } = useToast();
  const { mutateAsync: startAuctio } = useStartAuction();
  const [isLoading, setIsLoading] = useState(false);

  const { writeContract } = useWriteContract({
    mutation: {
      onSuccess: async (hash, variables) => {
        const listReceipt = await waitForTransactionReceipt(wagmiConfig,
          { hash });
        if (listReceipt.status === "success") {
          startAuctionMethod(hash);
        }
      },
      onError: (error) => {
        toast({
          description: "Error: " + ((error as BaseError).shortMessage || error.message)
        });
      }
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tradeID: new Date().getTime().toString()
    }
  });

  const startAuctionMethod = async (hash: string) => {
    const getFormValues = form.getValues();
    const combineData = {
      publicKey: address!,
      hash: hash,
      ...getFormValues
    }
    const auctionRes = await startAuctio(combineData);
    if (auctionRes) {
      setIsLoading(false);
      clsoseDialog(false);
      toast({
        description: "Your auction has been posted!",
      });
    }



  }

  const onSubmit = async () => {
    const getFormValues = form.getValues();
    setIsLoading(true);
    writeContract({
      abi: carbonAuctionTradeAbi,
      address: carbonTraderAddress,
      functionName: 'startAuctionTrade',
      args: [
        BigInt(getFormValues.tradeID),
        BigInt(getFormValues.sellAmount),
        BigInt(new Date(getFormValues.startTime).getTime()),
        BigInt(new Date(getFormValues.endTime).getTime()),
        BigInt(getFormValues.minimumBidAmount),
        BigInt(getFormValues.initPriceUnit),
      ],
    })
  }

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
                        format(field.value, "PPP")
                      ) : (
                        <span>Select Start Time</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date <= new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
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
                        format(field.value, "PPP")
                      ) : (
                        <span>Select End Time</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date <= new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end gap-2">
          <Button type="submit" className="w-full bg-[--button-bg] text-[--basic-text] hover:bg-[--button-bg]">Submit</Button>
        </div>

      </form>
    </Form>
  );
};
export default AuctionForm;