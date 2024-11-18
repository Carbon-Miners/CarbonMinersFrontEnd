import Image from "next/image";
import { ICompanyCard, ICompanyInfo, StatusEnum } from "@/types";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

interface IProps {
  cardInfo: ICompanyCard
}
const CompanyCard
  = ({ cardInfo }: IProps) => {
    const parseData: ICompanyInfo = JSON.parse(cardInfo.companyMsg);
    parseData.status = cardInfo.status;
    return (
      <Link href={`/manage/${cardInfo.publicKey}`} className="cursor-pointer hover:scale-105">
        <Card>
          <CardContent className="grid gap-4 pt-2">

            <Image src="/carbon.png" alt="carbon" width={256} height={192}></Image>

            <div className="flex flex-col gap-1">
              <div
                className="flex justify-start items-center"
              >
                <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-3" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    company name: {parseData.companyName}
                  </p>
                </div>
              </div>
              <div
                className="flex justify-start items-center"
              >
                <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-3" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    company representative: {parseData.companyRepresentative}
                  </p>
                </div>
              </div>
              <div
                className="flex justify-start items-center"
              >
                <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-3" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    contact number: {parseData.contactNumber}
                  </p>
                </div>
              </div>
              <div
                className="flex justify-start items-center"
              >
                <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-3" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    apply status: {parseData.status === StatusEnum.UNHANDLE ? "unapproved" : parseData.status === StatusEnum.PASSED ? "approved" : "rejected"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };
export default CompanyCard
  ;