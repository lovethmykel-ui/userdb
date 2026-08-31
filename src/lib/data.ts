import { 
  Coin, 
  Corridor, 
  AlertItem, 
  EarnProduct, 
  P2PMerchant, 
  OTCOffer, 
  ExploreCategory 
} from './types';

export const initialCoins: Coin[] = [
  { sym: "BTC", name: "Bitcoin", price: 67214.50, chg: 2.14, vol: "1.2B", color: "#F7931A", cap: "$1.32T", high24h: 68102.00, low24h: 65340.00 },
  { sym: "ETH", name: "Ethereum", price: 3542.18, chg: -1.02, vol: "842M", color: "#627EEA", cap: "$425.6B", high24h: 3620.00, low24h: 3490.50 },
  { sym: "USDT", name: "Tether", price: 1.00, chg: 0.01, vol: "3.1B", color: "#26A17B", cap: "$118.9B", high24h: 1.001, low24h: 0.999 },
  { sym: "SOL", name: "Solana", price: 178.34, chg: 5.62, vol: "612M", color: "#14F195", cap: "$83.2B", high24h: 182.40, low24h: 169.20 },
  { sym: "BNB", name: "BNB", price: 612.90, chg: 0.84, vol: "210M", color: "#F3BA2F", cap: "$91.0B", high24h: 625.00, low24h: 605.10 },
  { sym: "XRP", name: "XRP", price: 0.6120, chg: -2.31, vol: "340M", color: "#23292F", cap: "$34.8B", high24h: 0.6350, low24h: 0.5980 },
  { sym: "OKN", name: "OKNexus", price: 0.4187, chg: 4.20, vol: "18.4M", color: "#8B5CF6", cap: "$172.7M", high24h: 0.4420, low24h: 0.3980 },
  { sym: "ADA", name: "Cardano", price: 0.4520, chg: 1.18, vol: "98M", color: "#0033AD", cap: "$16.1B", high24h: 0.4680, low24h: 0.4410 },
  { sym: "DOGE", name: "Dogecoin", price: 0.1284, chg: -0.55, vol: "210M", color: "#C2A633", cap: "$18.9B", high24h: 0.1340, low24h: 0.1240 },
  { sym: "TON", name: "Toncoin", price: 5.62, chg: 3.02, vol: "88M", color: "#0098EA", cap: "$14.2B", high24h: 5.85, low24h: 5.42 },
];

export const initialCorridors: Corridor[] = [
  { region: "af", code: "NGN", name: "Nigerian Naira", rate: "1,612.40", chg: 0.4 },
  { region: "af", code: "KES", name: "Kenyan Shilling", rate: "129.85", chg: -0.2 },
  { region: "af", code: "GHS", name: "Ghanaian Cedi", rate: "15.62", chg: 1.1 },
  { region: "af", code: "ZAR", name: "South African Rand", rate: "18.24", chg: 0.3 },
  { region: "as", code: "IDR", name: "Indonesian Rupiah", rate: "16,240.0", chg: -0.1 },
  { region: "as", code: "PHP", name: "Philippine Peso", rate: "58.90", chg: 0.6 },
  { region: "as", code: "VND", name: "Vietnamese Dong", rate: "25,410", chg: 0.2 },
  { region: "as", code: "INR", name: "Indian Rupee", rate: "87.12", chg: -0.4 },
];

export const initialAlerts: AlertItem[] = [
  { id: 1, sym: "BTC", cond: "above", target: 70000, active: true },
  { id: 2, sym: "ETH", cond: "below", target: 3200, active: true },
];

export const initialEarnProducts: EarnProduct[] = [
  { sym: "USDT", apy: 8.4, color: "#26A17B", note: "Redeem anytime · daily payout" },
  { sym: "BTC", apy: 2.1, color: "#F7931A", note: "Redeem anytime · daily payout" },
  { sym: "ETH", apy: 2.8, color: "#627EEA", note: "Redeem anytime · daily payout" },
  { sym: "SOL", apy: 5.6, color: "#14F195", note: "Redeem anytime · daily payout" },
  { sym: "OKN", apy: 14.2, color: "#8B5CF6", note: "Redeem anytime · boosted VIP rate" },
  { sym: "BNB", apy: 3.4, color: "#F3BA2F", note: "Redeem anytime · daily payout" },
];

export const initialP2PMerchants: P2PMerchant[] = [
  { id: "1", name: "Ade_FX", rate: 99.8, trades: 2140, price: 1611.90, currency: "NGN", min: "50,000", max: "2,000,000", pay: ["Bank transfer", "Mobile money"] },
  { id: "2", name: "NairaKing", rate: 98.5, trades: 986, price: 1613.20, currency: "NGN", min: "20,000", max: "1,000,000", pay: ["Bank transfer"] },
  { id: "3", name: "CoinBridge_NG", rate: 99.2, trades: 5410, price: 1612.40, currency: "NGN", min: "10,000", max: "5,000,000", pay: ["Bank transfer", "M-Pesa"] },
  { id: "4", name: "JakartaSwap", rate: 97.9, trades: 640, price: 16255.0, currency: "IDR", min: "200,000", max: "20,000,000", pay: ["GCash", "Bank transfer"] },
  { id: "5", name: "ManilaCrypto_Fast", rate: 99.4, trades: 3120, price: 58.85, currency: "PHP", min: "5,000", max: "300,000", pay: ["GCash", "Maya", "Bank transfer"] }
];

export const initialOTCOffers: OTCOffer[] = [
  { id: "1", name: "Ade_FX", asset: "BTC", side: "buy", price: 67180.10, size: "250,000", min: "10,000", max: "1,000,000", settle: "~10 min" },
  { id: "2", name: "CoinBridge_NG", asset: "USDT", side: "buy", price: 1.001, size: "1,200,000", min: "50,000", max: "5,000,000", settle: "~15 min" },
  { id: "3", name: "NairaKing", asset: "ETH", side: "buy", price: 3184.40, size: "400,000", min: "20,000", max: "800,000", settle: "~20 min" },
  { id: "4", name: "JakartaSwap", asset: "BTC", side: "buy", price: 67155.60, size: "600,000", min: "100,000", max: "3,000,000", settle: "~12 min" },
  { id: "5", name: "Ade_FX", asset: "BTC", side: "sell", price: 67250.75, size: "180,000", min: "10,000", max: "900,000", settle: "~10 min" },
  { id: "6", name: "CoinBridge_NG", asset: "USDT", side: "sell", price: 0.999, size: "950,000", min: "50,000", max: "4,000,000", settle: "~15 min" },
  { id: "7", name: "NairaKing", asset: "ETH", side: "sell", price: 3196.10, size: "320,000", min: "20,000", max: "700,000", settle: "~20 min" },
  { id: "8", name: "JakartaSwap", asset: "BTC", side: "sell", price: 67290.30, size: "500,000", min: "100,000", max: "2,500,000", settle: "~12 min" },
];

export const exploreCategories: ExploreCategory[] = [
  {
    title: "Trade & earn more",
    desc: "New ways to find opportunity and put your assets to work.",
    items: [
      { ic: "📈", name: "Margin & Perpetual Trading", desc: "Trade with up to 125x leverage on top crypto assets with deep multi-chain liquidity." },
      { ic: "🤖", name: "AI Trading Agent", desc: "The trade bot scans the market around the clock and surfaces long and short opportunities with entry, target, stop and a confidence score." },
      { ic: "🪙", name: "Staking Pools", desc: "Earn passive income by delegating your tokens directly to secure proof-of-stake networks." },
      { ic: "🔮", name: "Prediction Markets", desc: "Browse live prediction markets across Polymarket and other protocols, filter by category, and track volume, liquidity and probability in real time." },
      { ic: "🚀", name: "Launchpad", desc: "List and launch new or existing tokens with a straightforward, audited path to market." },
    ]
  },
  {
    title: "Payments & spending",
    desc: "Move and spend digital assets as easily as everyday money.",
    items: [
      { ic: "🎁", name: "Gift Card Marketplace", desc: "Buy and sell gift cards securely within the platform, with the same protections as any other trade." },
      { ic: "💳", name: "Crypto Cards (Apple/Google Pay)", desc: "A modern way to spend digital assets in everyday transactions, wherever cards are accepted globally." },
      { ic: "🌍", name: "Borderless Corridors", desc: "Send and receive payments across Africa, Asia, and Latin America with sub-second settlement." },
    ]
  },
  {
    title: "Build & access",
    desc: "Take OKNexus with you and build on top of the ecosystem.",
    items: [
      { ic: "🧩", name: "Developer API & Webhooks", desc: "Build on top of the ecosystem — integrate trading, wallets, and real-time order books directly into your own products." },
      { ic: "📱", name: "Pro Mobile App (iOS / Android)", desc: "A native application featuring TradingView charts, biometric authorization, and instant push alerts." },
    ]
  },
];
