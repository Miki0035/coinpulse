import { fetcher } from "@/lib/coingecko.actions";
import DataTable from "../DataTable";

const TrendingCoins = async () => {
  const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
    "search/trending",
    undefined,
    300,
  );
  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <div id="trending-coins">
        <DataTable
          columns={[]}
          data={trendingCoins.coins.slice(0, 6) || []}
          rowKey={(coin) => coin.item.id}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  );
};

export default TrendingCoins;
