"use client";
import { Separator } from "./ui/separator";
import CandleStickChart from "./CandleStickChart";
import { useCoinGeckoWebSocket } from "@/hooks/useCoinGeckoWebSocket";
import { formatCurrency, timeAgo } from "@/lib/utils";
import DataTable from "./DataTable";

const LiveDataWraper = ({
  children,
  coinId,
  poolId,
  coin,
  coinOHLCData,
}: LiveDataProps) => {
  const { trades } = useCoinGeckoWebSocket({ coinId, poolId });

  const tradeColumns: DataTableColumn<Trade>[] = [
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (trade) => (trade.price ? formatCurrency(trade.price) : "-"),
    },
    {
      header: "Amount",
      cellClassName: "amount-cell",
      cell: (trade) => trade.amount?.toFixed(4) ?? "-",
    },
    {
      header: "Value",
      cellClassName: "value-cell",
      cell: (trade) => (trade.value ? formatCurrency(trade.value) : "-"),
    },
    {
      header: "Buy/Sell",
      cellClassName: "type-cell",
      cell: (trade) => (
        <span
          className={trade.type === "b" ? "text-green-500" : "text-red-500"}
        >
          {trade.type === "b" ? "Buy" : "Sell"}
        </span>
      ),
    },
    {
      header: "Time",
      cellClassName: "time-cell",
      cell: (trade) => (trade.timestamp ? timeAgo(trade.timestamp) : "-"),
    },
  ];

  return (
    <section id="live-data-wrapper">
      <p>{coinId}</p>
      <Separator className={"divider"} />
      <div className="trend">
        <CandleStickChart coinId={coinId} data={coinOHLCData}>
          <h4>Trend Overview</h4>
        </CandleStickChart>
      </div>
      <Separator className={"divider"} />
      {tradeColumns && (
        <div className="trades">
          <h4>Recent trades</h4>
          <DataTable
            columns={tradeColumns}
            data={trades}
            rowKey={(_, index) => index}
            tableClassName="trades-table"
          />
        </div>
      )}
    </section>
  );
};

export default LiveDataWraper;
