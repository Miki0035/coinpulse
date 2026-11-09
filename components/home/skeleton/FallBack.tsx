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

type CategorySkeletonRow = {
  id: number;
};

const categoryRows: CategorySkeletonRow[] = Array.from(
  { length: 10 },
  (_, id) => ({ id }),
);

const categoryColumns: DataTableColumn<CategorySkeletonRow>[] = [
  {
    header: "Category",
    cellClassName: "category-cell",
    cell: () => <div className="category-skeleton skeleton" />,
  },
  {
    header: "Top Gainers",
    cellClassName: "top-gainers-cell",
    cell: () => (
      <>
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="coin-skeleton skeleton" />
        ))}
      </>
    ),
  },
  {
    header: "24h Change",
    cellClassName: "change-header-cell",
    cell: () => (
      <div className="change-cell">
        <div className="change-icon skeleton" />
        <div className="value-skeleton-sm skeleton" />
      </div>
    ),
  },
  {
    header: "Market cap",
    cellClassName: "market-cap-cell",
    cell: () => <div className="value-skeleton-lg skeleton" />,
  },
  {
    header: "24h Volume",
    cellClassName: "volume-cell",
    cell: () => <div className="value-skeleton-md skeleton" />,
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

export const CategoriesFallback = () => (
  <div id="categories-fallback" role="status" aria-label="Loading categories">
    <h4>Top categories</h4>
    <DataTable
      columns={categoryColumns}
      data={categoryRows}
      rowKey={(row) => row.id}
      tableClassName="mt-3"
    />
  </div>
);

export const LiveDataFallback = () => (
  <section
    id="live-data-wrapper"
    role="status"
    aria-label="Loading live coin data"
  >
    <div className="flex items-center gap-3">
      <div className="skeleton h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <div className="skeleton h-4 w-28 rounded" />
        <div className="skeleton h-7 w-40 rounded" />
      </div>
    </div>

    <div className="divider" />

    <div className="trend">
      <div id="candlestick-chart" className="mt-5 rounded-lg bg-dark-500 p-3">
        <div className="chart-header">
          <div className="skeleton h-6 w-40 rounded" />
          <div className="button-group">
            <div className="skeleton h-8 w-24 rounded" />
            <div className="skeleton h-8 w-32 rounded" />
          </div>
        </div>
        <div className="chart h-90 skeleton rounded" />
      </div>
    </div>

    <div className="divider" />
  </section>
);

export const HeaderFallback = () => (
  <header role="status" aria-label="Loading navigation" aria-busy="true">
    <div className="main-container inner">
      <div className="skeleton h-10 w-[132px] rounded" />
      <nav aria-hidden="true">
        <div className="skeleton h-10 w-16 rounded" />
        <div className="skeleton h-10 w-20 rounded" />
      </nav>
    </div>
  </header>
);
