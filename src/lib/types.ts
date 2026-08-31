export interface Coin {
  sym: string;
  name: string;
  price: number;
  chg: number;
  vol: string;
  color: string;
  cap: string;
  high24h: number;
  low24h: number;
}

export interface Corridor {
  region: 'af' | 'as';
  code: string;
  name: string;
  rate: string;
  chg: number;
}

export interface AlertItem {
  id: number;
  sym: string;
  cond: 'above' | 'below';
  target: number;
  active: boolean;
}

export interface EarnProduct {
  sym: string;
  apy: number;
  color: string;
  note: string;
}

export interface P2PMerchant {
  id: string;
  name: string;
  rate: number;
  trades: number;
  price: number;
  currency: string;
  min: string;
  max: string;
  pay: string[];
}

export interface OTCOffer {
  id: string;
  name: string;
  asset: string;
  side: 'buy' | 'sell';
  price: number;
  size: string;
  min: string;
  max: string;
  settle: string;
}

export interface WalletAsset {
  sym: string;
  name: string;
  color: string;
  balance: number;
  available: number;
  inOrders: number;
  price: number;
}

export interface OpenTradeOrder {
  id: string;
  pair: string;
  type: string;
  side: 'Buy' | 'Sell';
  price: number;
  amt: number;
  filled: string;
  total: number;
  time: string;
}

export interface ExploreCategory {
  title: string;
  desc: string;
  items: {
    ic: string;
    name: string;
    desc: string;
  }[];
}

/* Legacy & Auxiliary Support Types */
export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Position {
  id: string;
  symbol: string;
  side: 'Long' | 'Short';
  leverage: number;
  size: number;
  entryPrice: number;
  markPrice: number;
  liqPrice: number;
  margin: number;
  unrealizedPnl: number;
  roe: number;
  tp?: number;
  sl?: number;
}

export interface OpenOrder {
  id: string;
  symbol: string;
  type: 'Limit' | 'Market' | 'Stop-Limit' | 'Trailing-Stop';
  side: 'Buy' | 'Sell';
  price: number;
  amount: number;
  filled: number;
  total: number;
  status: 'Open' | 'Partially Filled' | 'Cancelled' | 'Filled';
  timestamp: string;
}

export interface OrderHistoryItem {
  id: string;
  symbol: string;
  type: string;
  side: 'Buy' | 'Sell';
  avgPrice: number;
  amount: number;
  filled: number;
  status: 'Filled' | 'Cancelled';
  timestamp: string;
}

export interface TradeHistoryItem {
  id: string;
  symbol: string;
  side: 'Buy' | 'Sell';
  execPrice: number;
  execQty: number;
  fee: number;
  feeAsset: string;
  role: 'Maker' | 'Taker';
  timestamp: string;
}

export interface ClosedPositionItem {
  id: string;
  symbol: string;
  side: 'Long' | 'Short';
  leverage: number;
  closeType: 'Market' | 'Limit' | 'TP/SL' | 'Liquidation';
  entryPrice: number;
  exitPrice: number;
  closedQty: number;
  realizedPnl: number;
  timestamp: string;
}

export interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
  percentage: number;
}

export interface RecentTrade {
  id: string;
  price: number;
  size: number;
  side: 'buy' | 'sell';
  time: string;
}
