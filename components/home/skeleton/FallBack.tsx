"use client";

import DataTable from "@/components/DataTable";

type TrendingSkeletonRow = {
  id: number;
};

const trendingRows: TrendingSkeletonRow[] = Array.from(
  { length: 6 },
  (_, id) => ({ id }),
);

const trendingColumns: DataTableColumn<TrendingSkeletonRow>[] = [
  {
    header: "Name",
    cellClassName: "name-cell",
    cell: () => (
      <div className="name-link">
        <div className="name-image skeleton" />
        <div className="name-line skeleton" />
      </div>
    ),
  },
  {
    header: "24h Change",
    cellClassName: "change-cell",
    cell: () => (
      <div className="flex items-center gap-1">
        <div className="change-icon skeleton" />
        <div className="change-line skeleton" />
      </div>
    ),
  },
  {
    header: "Price",
    cellClassName: "price-cell",
    cell: () => <div className="price-line skeleton" />,
  },
];

export const CoinOverViewFallback = () => (
  <div
    id="coin-overview-fallback"
    role="status"
    aria-label="Loading coin overview"
  >
    <div className="header pt-2">
      <div className="header-image skeleton" />
      <div className="info">
        <div className="header-line-sm skeleton" />
        <div className="header-line-lg skeleton" />
      </div>
    </div>
    <div className="chart">
      <div className="chart-skeleton skeleton" />
    </div>
  </div>
);

export const TrendingCoinFallback = () => (
  <div
    id="trending-coins-fallback"
    role="status"
    aria-label="Loading trending coins"
  >
    <h4>Trending Coins</h4>
    <DataTable
      columns={trendingColumns}
      data={trendingRows}
      rowKey={(row) => row.id}
      tableClassName="trending-coins-table"
      headerCellClassName="py-3!"
      bodyCellClassName="py-2!"
    />
  </div>
);
