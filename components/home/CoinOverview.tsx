import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { CoinOverViewFallback } from "./skeleton/FallBack";
import CandleStickChart from "../CandleStickChart";

const CoinOverview = async () => {
  let data: [CoinDetailsData, OHLCData[]] | undefined = undefined;

  try {
    data = await Promise.all([
      fetcher<CoinDetailsData>("coins/bitcoin", {
        dex_pair_format: "symbol",
      }),

      fetcher<OHLCData[]>("coins/bitcoin/ohlc", {
        vs_currency: "usd",
        days: 1,
        // interval: "hourly",  not working cause API plan
        precision: "full",
      }),
    ]);
  } catch (error) {
    console.error("Failed to fetch coin overview:", error);
  }

  if (!data) {
    return <CoinOverViewFallback />;
  }

  const [coin, coinOHLCData] = data;

  return (
    <div id="coin-overview">
      <CandleStickChart data={coinOHLCData} coinId={coin.id}>
        <div className="header pt-2">
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={56}
            height={56}
          />
          <div className="info">
            <p>
              {coin.name} / {coin.symbol.toUpperCase()}
            </p>
            <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
          </div>
        </div>
      </CandleStickChart>
    </div>
  );
};

export default CoinOverview;
