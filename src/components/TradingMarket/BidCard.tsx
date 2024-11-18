import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { calcTime, formatHash } from "@/utils";
import { IBidCard, BidEnum } from "@/types";
import { cn } from "@/lib/utils";

interface IProps {
  bidInfo: IBidCard
}

const BidCard = ({ bidInfo }: IProps) => {

  const calcStatus = (biddingStatus: number) => {
    const statusBg = ["bg-green-200", "bg-green-300", "bg-blue-300", "bg-yellow-300", "bg-gray-300"];
    return (
      <span className={cn(`${statusBg[biddingStatus]}`, "rounded-xl px-2 py-1 font-bold text-[--secondry-text]")}>
        {
          BidEnum[biddingStatus]
        }
      </span>
    )
  }

  return (
    <Link href={`/website/trading-market/bid-detail/${bidInfo.biddingID}-${bidInfo.auctionID}`} className="cursor-pointer hover:scale-105">
      <Card>
        <CardContent className="grid gap-4 pt-2">

          <Image src="/carbon.png" alt="carbon" width={256} height={192}></Image>

          <div className="flex flex-col gap-1">
            <div
              className="flex justify-center items-center"
            >
              {
                calcStatus(Number(bidInfo.biddingStatus))
              }
            </div>
            <div
              className="flex justify-center items-center"
            >
              <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-3" />
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  bid time: {calcTime(bidInfo.biddingTime, true)}
                </p>
              </div>
            </div>
            <div
              className="flex justify-center items-center"
            >
              <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-3" />
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  hash: {formatHash(bidInfo.hash)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
export default BidCard;