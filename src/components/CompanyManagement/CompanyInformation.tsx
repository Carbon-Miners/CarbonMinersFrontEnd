import { Card, CardContent } from "../ui/card";

const CompanyInformation = () => {
  return (
    <Card>
      <CardContent className="flex flex-wrap justify-between gap-6 pt-3">
        <div className="flex flex-col gap-2 w-2/5">
          <h2 className="text-[--basic-text] text-lg font-bold">Company Profile</h2>
          <div className="flex flex-col gap-2 text-[--secondry-text] text-sm">
            <div className="flex justify-between">
              <span>Company Name</span>
              <span>Fake Name</span>
            </div>
            <div className="flex justify-between">
              <span>Registration Number</span>
              <span>Fake Name</span>
            </div>
            <div className="flex justify-between">
              <span>Company Representative</span>
              <span>Fake Name</span>
            </div>
            <div className="flex justify-between">
              <span>Company Address</span>
              <span>Fake Name</span>
            </div>
            <div className="flex justify-between">
              <span>Contact Email</span>
              <span>Fake Name</span>
            </div>
            <div className="flex justify-between">
              <span>Contact Number</span>
              <span>Fake Name</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-2/5">
          <h2 className="text-[--basic-text] text-lg font-bold">Carbon Emission Information</h2>
          <div className="flex flex-col gap-2 text-[--secondry-text] text-sm">
            <div className="flex justify-between">
              <span>Emission Data</span>
              <span>Fake Name</span>
            </div>
            <div className="flex justify-between">
              <span>Reduction Strategy</span>
              <span>Fake Name</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-2/5">
          <h2 className="text-[--basic-text] text-lg font-bold">Others</h2>
          <div className="flex flex-col gap-2 text-[--secondry-text] text-sm">
            <div className="flex justify-between">
              <span>Apply Status</span>
              <span>Fake Name</span>
            </div>
            <div className="flex justify-between">
              <span>Allowance</span>
              <span>Fake Name</span>
            </div>
            <div className="flex justify-between">
              <span>Frozen Allowance</span>
              <span>Fake Name</span>
            </div>
            <div className="flex justify-between">
              <span>Balance Of Token</span>
              <span>Fake Name</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-2/5">
          <h2 className="text-[--basic-text] text-lg font-bold">Carbon Emission Report</h2>
          <div className="flex flex-col gap-2 text-[--secondry-text] text-sm">
            <div className="flex justify-between">
              <span>Emission Report</span>
              <span>Fake Name</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default CompanyInformation;