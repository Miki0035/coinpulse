import Converter from "@/components/Converter";
import { LiveDataFallback } from "@/components/home/skeleton/FallBack";
import LiveDataWraper from "@/components/LiveDataWraper";
import { fetcher, getPools } from "@/lib/coingecko.actions";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

async function CoinPageContent({
  params,
}: Omit<NextPageProps, "searchParams">) {
  const { id } = await params;

  const [coinData, coinOHLCData] = await Promise.all([
    fetcher<CoinDetailsData>(`coins/${id}`, {
      dex_pair_format: "contract_address",
    }),

    fetcher<OHLCData[]>(`coins/${id}/ohlc`, {
      vs_currency: "usd",
      days: 1,
      // interval: "hourly",
      precision: "full",
    }),
  ]);

  const coinDetails = [
    {
      label: "Market Cap",
      value: formatCurrency(coinData.market_data.market_cap.usd),
    },

    {
      label: "Market Cap Rank",
      value: `# ${coinData.market_cap_rank}`,
    },
    {
      label: "Total Volume",
      value: formatCurrency(coinData.market_data.total_volume.usd),
    },
    {
      label: "Website",
      value: `-`,
      link: coinData.links.homepage[0],
      linkText: "Homepage",
    },
    {
      label: "Explorer",
      value: "-",
      link: coinData.links.blockchain_site[0],
      linkText: "Explorer",
    },
    {
      label: "Community",
      value: "-",
      link:
        coinData.links.subreddit_url !== null
          ? coinData.links.subreddit_url[0]
          : "",
      linkText: "Community",
    },
  ];

  const platform = coinData.asset_platform_id
    ? coinData.detail_platforms?.[coinData.asset_platform_id]
    : null;

  const network = platform?.geckoterminal_url.split("/")[3] || null;
  const contractAddress = platform?.contract_address || null;

  const pool = await getPools(id, network, contractAddress);
  return (
    <main id="coin-details-page">
      <section className="primary">
        <Suspense fallback={<LiveDataFallback />}>
          <LiveDataWraper
            coinId={id}
            poolId={pool.id}
            coin={coinData}
            coinOHLCData={coinOHLCData}
          >
            {/* <h4>Exchange Listings</h4> */}
          </LiveDataWraper>
        </Suspense>
        {/* <h1 className="text-3xl font-bold">
          Coin <strong>{id}</strong>
        </h1>
        <p>Trend Overview</p>
        <p>Recent Trades</p>
        <p>Exchange Listings</p> */}
      </section>
      <section className="secondary">
        <Converter
          symbol={coinData.symbol}
          icon={coinData.image.small}
          priceList={coinData.market_data.current_price}
        />
        <div className="details">
          <h4>Coin details</h4>
          <ul className="details-grid">
            {coinDetails.map(({ label, value, link, linkText }, index) => (
              <li key={index}>
                <p className="label">{label}</p>
                {link ? (
                  <div className="link">
                    <Link href={link} target="_blank">
                      {linkText ?? label}
                    </Link>
                    <ArrowUpRight size={16} />
                  </div>
                ) : (
                  <p className="text-base font-medium">{value}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* <p>Top Gainers and Losers</p> */}
      </section>
    </main>
  );
}

const Page = async ({ params }: NextPageProps) => {
  return (
    <Suspense>
      <CoinPageContent params={params} />
    </Suspense>
  );
};

export default Page;
