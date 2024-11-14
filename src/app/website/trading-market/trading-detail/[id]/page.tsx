import CardDetails from "@/components/TradingMarket/CardDetails";

const TradingDetail = ({ params: { tradeID = '' } }) => {
  return (
    <CardDetails tradeID={tradeID} />
  );
};
export default TradingDetail;