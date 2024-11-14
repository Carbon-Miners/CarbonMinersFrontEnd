import Image from "next/image";
import Link from "next/link";
import { AuctionRsp } from "@/types";
import { Card, CardContent } from "../ui/card";
import { calcTime, formatAddress } from "@/utils";
import { cn } from "@/lib/utils";

interface IProps {
  cardInfo: AuctionRsp;
}
const ListCard = ({ cardInfo }: IProps) => {

  const calcStatus = (startTime: string, endTime: string) => {
    const nowDate = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    const status = {
      trading: start <= nowDate && nowDate <= end,
      notStart: nowDate <= start,
      finished: nowDate >= end,
    };
    return (
      <div
        className={cn(`${status.trading ? 'bg-green-300' : status.notStart ? 'bg-red-300' : 'bg-gray-300'}`, "rounded-xl px-2 py-1 font-bold")}
      >
        {status.trading ? "Trading" : status.notStart ? "Not Start" : "Finished"}
      </div>
    );
  }

  return (
    <Link href={`/website/trading-market/trading-detail/${cardInfo.tradeID}`} className="cursor-pointer hover:scale-105">
      <Card>
        <CardContent className="grid gap-4 pt-2">

          <Image src="/carbon.png" alt="carbon" width={256} height={192}></Image>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span>{cardInfo.sellAmount}</span>
              {
                calcStatus(cardInfo.startTime, cardInfo.endTime)
              }
            </div>
            <div
              className="flex justify-start items-center"
            >
              <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-3" />
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  init price unit: {cardInfo.initPriceUnit}
                </p>
              </div>
            </div>
            <div
              className="flex justify-start items-center"
            >
              <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-3" />
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  minimum bid amount: {cardInfo.minimumBidAmount}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <span>{calcTime(cardInfo.startTime)}</span>
              <span>{calcTime(cardInfo.endTime)}</span>
            </div>
            <div
              className="flex justify-start items-center"
            >
              <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-3" />
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  seller: {formatAddress(cardInfo.seller)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

  );
};
export default ListCard;