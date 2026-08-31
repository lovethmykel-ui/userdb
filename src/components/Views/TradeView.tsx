'use client';

import React, { useState, useEffect, useRef } from 'react';
import { OpenTradeOrder } from '@/lib/types';
import { CryptoIcon } from '@/components/CryptoIcons/CryptoIcon';
import { 
  Crosshair, 
  TrendUp, 
  LineSegments, 
  Square, 
  TextT, 
  Ruler, 
  Trash, 
  ArrowsOut, 
  Camera, 
  SlidersHorizontal,
  ChartLineUp,
  ShieldCheck,
  CheckCircle
} from '@phosphor-icons/react';

interface TradeViewProps {
  currentPrice: number;
  openOrders: OpenTradeOrder[];
  onPlaceOrder: (order: OpenTradeOrder) => void;
  onCancelOrder: (id: string) => void;
  onShowToast: (msg: string) => void;
}

interface Candle {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

export const TradeView: React.FC<TradeViewProps> = ({
  currentPrice,
  openOrders,
  onPlaceOrder,
  onCancelOrder,
  onShowToast
}) => {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'limit' | 'market' | 'stop'>('limit');
  const [timeframe, setTimeframe] = useState<string>('1h');
  const [priceInput, setPriceInput] = useState<string>('67,214.50');
  const [amountInput, setAmountInput] = useState<string>('');
  const [leverage, setLeverage] = useState<number>(20);
  const [activeLedgerTab, setActiveLedgerTab] = useState<'open' | 'history' | 'trades'>('open');

  // TP / SL State
  const [enableTpSl, setEnableTpSl] = useState<boolean>(false);
  const [tpPrice, setTpPrice] = useState<string>('');
  const [slPrice, setSlPrice] = useState<string>('');
  const [postOnly, setPostOnly] = useState<boolean>(false);
  const [reduceOnly, setReduceOnly] = useState<boolean>(false);

  // Active Technical Indicators
  const [showBB, setShowBB] = useState<boolean>(true);
  const [showEMA, setShowEMA] = useState<boolean>(true);
  const [showMA7, setShowMA7] = useState<boolean>(true);
  const [showRSI, setShowRSI] = useState<boolean>(true);
  const [showMACD, setShowMACD] = useState<boolean>(false);
  const [activeTool, setActiveTool] = useState<string>('crosshair');

  // Chart Canvas Reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [candles, setCandles] = useState<Candle[]>([]);
  const [hoverData, setHoverData] = useState<{
    candle: Candle | null;
    bb?: { upper: number; mid: number; lower: number };
    rsi?: number;
    macd?: { macd: number; signal: number; hist: number };
  }>({ candle: null });

  // Web Audio Synthesizer for Tactile Feedback
  const playSound = (freq = 880, type: OscillatorType = 'sine', duration = 0.08) => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  // Generate Realistic High-Frequency Candle Data
  const generateCandles = (n: number, base: number, vol: number) => {
    const list: Candle[] = [];
    let p = base;
    const now = Date.now();
    for (let i = 0; i < n; i++) {
      const o = p;
      const c = o + (Math.random() - 0.49) * vol;
      const h = Math.max(o, c) + Math.random() * vol * 0.45;
      const l = Math.min(o, c) - Math.random() * vol * 0.45;
      list.push({
        t: now - (n - i) * 3600000,
        o,
        h,
        l,
        c,
        v: Math.random() * 45 + 10
      });
      p = c;
    }
    return list;
  };

  useEffect(() => {
    const tfMap: Record<string, [number, number, number]> = {
      '1s': [60, currentPrice, 6],
      '1m': [60, currentPrice, 18],
      '5m': [60, currentPrice, 45],
      '15m': [60, currentPrice, 90],
      '1h': [60, currentPrice, 150],
      '4h': [60, currentPrice, 380],
      '1d': [60, currentPrice, 950],
      '1w': [52, currentPrice, 2400]
    };
    const [n, base, vol] = tfMap[timeframe] || tfMap['1h'];
    setCandles(generateCandles(n, base, vol));
  }, [timeframe]);

  // Sync latest candle with live price tick
  useEffect(() => {
    if (candles.length === 0) return;
    setCandles((prev) => {
      const last = { ...prev[prev.length - 1] };
      last.c = currentPrice;
      last.h = Math.max(last.h, currentPrice);
      last.l = Math.min(last.l, currentPrice);
      return [...prev.slice(0, prev.length - 1), last];
    });
  }, [currentPrice]);

  // Technical Calculations
  const calculateSMA = (data: Candle[], period: number, idx: number) => {
    if (idx < period - 1) return null;
    let sum = 0;
    for (let i = idx - period + 1; i <= idx; i++) sum += data[i].c;
    return sum / period;
  };

  const calculateEMA = (data: Candle[], period: number) => {
    const k = 2 / (period + 1);
    const emaValues: (number | null)[] = [];
    let prevEma: number | null = null;
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) {
        emaValues.push(null);
      } else if (i === period - 1) {
        let sum = 0;
        for (let j = 0; j < period; j++) sum += data[j].c;
        prevEma = sum / period;
        emaValues.push(prevEma);
      } else {
        prevEma = data[i].c * k + (prevEma as number) * (1 - k);
        emaValues.push(prevEma);
      }
    }
    return emaValues;
  };

  const calculateBollingerBands = (data: Candle[], period = 20, multiplier = 2) => {
    return data.map((d, i) => {
      const mid = calculateSMA(data, period, i);
      if (mid === null) return null;
      let sumSq = 0;
      for (let j = i - period + 1; j <= i; j++) {
        sumSq += Math.pow(data[j].c - mid, 2);
      }
      const stdev = Math.sqrt(sumSq / period);
      return {
        upper: mid + multiplier * stdev,
        mid,
        lower: mid - multiplier * stdev
      };
    });
  };

  const calculateRSI = (data: Candle[], period = 14) => {
    const rsiValues: (number | null)[] = [];
    let gains = 0;
    let losses = 0;

    for (let i = 1; i < data.length; i++) {
      const diff = data[i].c - data[i - 1].c;
      if (i <= period) {
        if (diff >= 0) gains += diff;
        else losses += Math.abs(diff);
        if (i === period) {
          const avgGain = gains / period;
          const avgLoss = losses / period;
          const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
          rsiValues.push(100 - 100 / (1 + rs));
        } else {
          rsiValues.push(null);
        }
      } else {
        const currentGain = diff >= 0 ? diff : 0;
        const currentLoss = diff < 0 ? Math.abs(diff) : 0;
        gains = (gains * (period - 1) + currentGain) / period;
        losses = (losses * (period - 1) + currentLoss) / period;
        const rs = losses === 0 ? 100 : gains / losses;
        rsiValues.push(100 - 100 / (1 + rs));
      }
    }
    return [null, ...rsiValues];
  };

  const calculateMACD = (data: Candle[]) => {
    const ema12 = calculateEMA(data, 12);
    const ema26 = calculateEMA(data, 26);
    const macdLine: (number | null)[] = [];

    for (let i = 0; i < data.length; i++) {
      if (ema12[i] !== null && ema26[i] !== null) {
        macdLine.push((ema12[i] as number) - (ema26[i] as number));
      } else {
        macdLine.push(null);
      }
    }

    // Signal Line: EMA(9) of MACD Line
    const validMacd = macdLine.filter((v): v is number => v !== null);
    const signalLine: (number | null)[] = [];
    const k = 2 / (9 + 1);
    let prevSignal: number | null = null;

    let validCount = 0;
    for (let i = 0; i < macdLine.length; i++) {
      const v = macdLine[i];
      if (v === null) {
        signalLine.push(null);
      } else {
        validCount++;
        if (validCount < 9) {
          signalLine.push(null);
        } else if (validCount === 9) {
          let sum = 0;
          for (let j = 0; j < 9; j++) sum += validMacd[j];
          prevSignal = sum / 9;
          signalLine.push(prevSignal);
        } else {
          prevSignal = v * k + (prevSignal as number) * (1 - k);
          signalLine.push(prevSignal);
        }
      }
    }

    return macdLine.map((m, i) => {
      const s = signalLine[i];
      const hist = m !== null && s !== null ? m - s : null;
      return { macd: m, signal: s, hist };
    });
  };

  // Draw Full Canvas with Indicators
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || candles.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width || 600;
    const H = 460;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    // Layout partition
    const subChartH = showRSI || showMACD ? 90 : 0;
    const volH = 50;
    const mainH = H - volH - subChartH - 24;
    const padTop = 14;
    const padRight = 68;

    ctx.clearRect(0, 0, W, H);

    // Compute range
    const highs = candles.map((d) => d.h);
    const lows = candles.map((d) => d.l);
    const bb = calculateBollingerBands(candles);

    if (showBB) {
      bb.forEach((b) => {
        if (b) {
          highs.push(b.upper);
          lows.push(b.lower);
        }
      });
    }

    const max = Math.max(...highs);
    const min = Math.min(...lows);
    const range = max - min || 1;
    const cw = (W - padRight) / candles.length;
    const y = (v: number) => padTop + (1 - (v - min) / range) * mainH;

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillStyle = 'var(--text-faint)';

    for (let i = 0; i <= 4; i++) {
      const gy = padTop + (mainH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(W - padRight, gy);
      ctx.stroke();

      const val = max - (range / 4) * i;
      ctx.fillText(val.toFixed(1), W - padRight + 8, gy + 3);
    }

    // 1. Bollinger Bands Shading & Lines
    if (showBB) {
      // Area Fill
      ctx.beginPath();
      let firstUpper = true;
      candles.forEach((_, i) => {
        const b = bb[i];
        if (!b) return;
        const x = i * cw + cw / 2;
        if (firstUpper) {
          ctx.moveTo(x, y(b.upper));
          firstUpper = false;
        } else {
          ctx.lineTo(x, y(b.upper));
        }
      });
      for (let i = candles.length - 1; i >= 0; i--) {
        const b = bb[i];
        if (!b) continue;
        const x = i * cw + cw / 2;
        ctx.lineTo(x, y(b.lower));
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(56, 189, 248, 0.05)';
      ctx.fill();

      // Upper & Lower Lines
      const drawBandLine = (accessor: 'upper' | 'lower' | 'mid', color: string, width = 1) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        let started = false;
        candles.forEach((_, i) => {
          const b = bb[i];
          if (!b) return;
          const x = i * cw + cw / 2;
          const yy = y(b[accessor]);
          if (!started) {
            ctx.moveTo(x, yy);
            started = true;
          } else {
            ctx.lineTo(x, yy);
          }
        });
        ctx.stroke();
      };

      drawBandLine('upper', 'rgba(56, 189, 248, 0.6)', 1.2);
      drawBandLine('lower', 'rgba(56, 189, 248, 0.6)', 1.2);
      drawBandLine('mid', 'rgba(56, 189, 248, 0.35)', 1);
    }

    // 2. Candlesticks
    candles.forEach((d, i) => {
      const x = i * cw + cw / 2;
      const up = d.c >= d.o;
      ctx.strokeStyle = up ? '#2FBD8E' : '#F1667A';
      ctx.fillStyle = up ? '#2FBD8E' : '#F1667A';

      ctx.beginPath();
      ctx.moveTo(x, y(d.h));
      ctx.lineTo(x, y(d.l));
      ctx.stroke();

      const bodyTop = y(Math.max(d.o, d.c));
      const bodyBot = y(Math.min(d.o, d.c));
      ctx.fillRect(x - cw * 0.34, bodyTop, cw * 0.68, Math.max(bodyBot - bodyTop, 1.2));
    });

    // 3. Moving Averages
    const drawLineSeries = (vals: (number | null)[], color: string, width = 1.6) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      let started = false;
      vals.forEach((v, i) => {
        if (v === null) return;
        const x = i * cw + cw / 2;
        const yy = y(v);
        if (!started) {
          ctx.moveTo(x, yy);
          started = true;
        } else {
          ctx.lineTo(x, yy);
        }
      });
      ctx.stroke();
    };

    if (showMA7) {
      const ma7 = candles.map((_, i) => calculateSMA(candles, 7, i));
      drawLineSeries(ma7, '#F0A83A', 1.5);
    }

    if (showEMA) {
      const ema20 = calculateEMA(candles, 20);
      const ema50 = calculateEMA(candles, 50);
      drawLineSeries(ema20, '#A78BFA', 1.6);
      drawLineSeries(ema50, '#8B5CF6', 1.6);
    }

    // 4. Volume Bars (Bottom Sub-chart)
    const volMax = Math.max(...candles.map((d) => d.v));
    const volBaseY = mainH + volH + padTop;
    candles.forEach((d, i) => {
      const x = i * cw + cw / 2;
      const up = d.c >= d.o;
      const vh = (d.v / volMax) * (volH - 10);
      ctx.fillStyle = up ? 'rgba(47, 189, 142, 0.4)' : 'rgba(241, 102, 122, 0.4)';
      ctx.fillRect(x - cw * 0.32, volBaseY - vh, cw * 0.64, vh);
    });

    // 5. RSI Sub-chart Panel
    if (showRSI) {
      const rsiTop = H - subChartH + 8;
      const rsiH = subChartH - 20;

      // Background partition
      ctx.fillStyle = 'rgba(10, 14, 19, 0.6)';
      ctx.fillRect(0, rsiTop - 4, W - padRight, rsiH + 12);

      // 70 & 30 Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.setLineDash([4, 4]);

      const y70 = rsiTop + rsiH * 0.3;
      const y30 = rsiTop + rsiH * 0.7;

      ctx.beginPath();
      ctx.moveTo(0, y70);
      ctx.lineTo(W - padRight, y70);
      ctx.moveTo(0, y30);
      ctx.lineTo(W - padRight, y30);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'var(--text-faint)';
      ctx.fillText('70', W - padRight + 8, y70 + 3);
      ctx.fillText('30', W - padRight + 8, y30 + 3);

      // RSI Line
      const rsiData = calculateRSI(candles, 14);
      ctx.beginPath();
      ctx.strokeStyle = '#C084FC';
      ctx.lineWidth = 1.8;
      let started = false;
      rsiData.forEach((v, i) => {
        if (v === null) return;
        const x = i * cw + cw / 2;
        const yy = rsiTop + (1 - v / 100) * rsiH;
        if (!started) {
          ctx.moveTo(x, yy);
          started = true;
        } else {
          ctx.lineTo(x, yy);
        }
      });
      ctx.stroke();
    }
  }, [candles, showBB, showEMA, showMA7, showRSI, showMACD]);

  // Order Calculation
  const numPrice = parseFloat(priceInput.replace(/,/g, '')) || currentPrice;
  const numAmt = parseFloat(amountInput) || 0;
  const total = numPrice * numAmt;
  const fee = total * 0.0025;
  const requiredMargin = (total / leverage);

  const handlePercentage = (pct: number) => {
    playSound(700, 'triangle', 0.05);
    const avail = side === 'buy' ? 10540.22 : 0.1842;
    if (side === 'buy') {
      const calculated = ((avail * leverage * pct) / numPrice);
      setAmountInput(calculated.toFixed(4));
    } else {
      setAmountInput((avail * pct).toFixed(4));
    }
  };

  const handleSubmitOrder = () => {
    if (!numAmt || numAmt <= 0) {
      onShowToast('Please specify a valid order size');
      return;
    }

    playSound(1050, 'sine', 0.15);

    const newOrder: OpenTradeOrder = {
      id: Date.now().toString(),
      pair: 'BTC/USDT',
      type: `${orderType.toUpperCase()} ${leverage}x`,
      side: side === 'buy' ? 'Buy' : 'Sell',
      price: numPrice,
      amt: numAmt,
      filled: '0%',
      total: total,
      time: 'Just now'
    };

    onPlaceOrder(newOrder);
    setAmountInput('');
    onShowToast(`✓ Open ${side === 'buy' ? 'Long' : 'Short'} limit order filled at $${numPrice.toLocaleString()}`);
  };

  return (
    <section className="view active" id="view-trade">
      <div className="trade-grid">
        {/* Left: Interactive Trading Chart */}
        <div className="trade-panel flex flex-col">
          {/* Pair Bar Strip */}
          <div className="pair-bar">
            <div className="pair-select">
              <CryptoIcon sym="BTC" size={24} />
              <span>BTC/USDT</span>
              <span className="pill pill-brand" style={{ fontSize: '10px' }}>100x UTA</span>
              <span className="chev">▾</span>
            </div>

            <div className="pair-price up mono font-bold">
              ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>

            <div className="stat-block">
              <span className="l">24h Change</span>
              <span className="v up font-bold">+2.14% (+$1,408.00)</span>
            </div>

            <div className="stat-block">
              <span className="l">24h High</span>
              <span className="v text-white font-mono">$68,102.00</span>
            </div>

            <div className="stat-block">
              <span className="l">24h Low</span>
              <span className="v text-white font-mono">$65,340.00</span>
            </div>

            <div className="stat-block">
              <span className="l">Funding / Countdown</span>
              <span className="v text-purple font-mono font-bold">+0.0100% · 05:41:20</span>
            </div>
          </div>

          {/* Timeframe & Indicator Switcher */}
          <div className="chart-toolbar">
            <div className="tf-group">
              {(['1s', '1m', '5m', '15m', '1h', '4h', '1d', '1w'] as const).map((tf) => (
                <button
                  key={tf}
                  className={`tf-btn ${timeframe === tf ? 'active' : ''}`}
                  onClick={() => {
                    setTimeframe(tf);
                    playSound(650, 'sine', 0.04);
                  }}
                >
                  {tf.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="chart-tools" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                className={`chip ${showBB ? 'active' : ''}`}
                style={{ fontSize: '11px', padding: '4px 8px' }}
                onClick={() => setShowBB(!showBB)}
              >
                BB(20,2)
              </button>
              <button
                className={`chip ${showEMA ? 'active' : ''}`}
                style={{ fontSize: '11px', padding: '4px 8px' }}
                onClick={() => setShowEMA(!showEMA)}
              >
                EMA 20/50
              </button>
              <button
                className={`chip ${showMA7 ? 'active' : ''}`}
                style={{ fontSize: '11px', padding: '4px 8px' }}
                onClick={() => setShowMA7(!showMA7)}
              >
                MA 7
              </button>
              <button
                className={`chip ${showRSI ? 'active' : ''}`}
                style={{ fontSize: '11px', padding: '4px 8px' }}
                onClick={() => setShowRSI(!showRSI)}
              >
                RSI(14)
              </button>
            </div>
          </div>

          {/* Chart Wrapper with Vertical Drawing Tools */}
          <div style={{ display: 'flex', position: 'relative', width: '100%', minHeight: '460px' }}>
            {/* Drawing Tools Sidebar */}
            <div style={{
              width: '38px',
              borderRight: '1px solid var(--border-soft)',
              background: 'var(--bg-elevated)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '8px 0',
              gap: '6px'
            }}>
              {[
                { id: 'crosshair', icon: <Crosshair size={16} />, title: 'Crosshair' },
                { id: 'trend', icon: <TrendUp size={16} />, title: 'Trend Line' },
                { id: 'ray', icon: <LineSegments size={16} />, title: 'Horizontal Ray' },
                { id: 'rect', icon: <Square size={16} />, title: 'Support/Resistance Box' },
                { id: 'text', icon: <TextT size={16} />, title: 'Annotation' },
                { id: 'measure', icon: <Ruler size={16} />, title: 'Measurement Tool' },
              ].map((tool) => (
                <button
                  key={tool.id}
                  className={`icon-btn ${activeTool === tool.id ? 'active' : ''}`}
                  style={{ width: '28px', height: '28px', background: activeTool === tool.id ? 'var(--surface-2)' : 'transparent' }}
                  title={tool.title}
                  onClick={() => {
                    setActiveTool(tool.id);
                    playSound(800, 'sine', 0.03);
                  }}
                >
                  {tool.icon}
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <button
                className="icon-btn"
                style={{ width: '28px', height: '28px', color: 'var(--text-faint)' }}
                title="Clear Drawings"
                onClick={() => onShowToast('✓ Drawings cleared')}
              >
                <Trash size={14} />
              </button>
            </div>

            {/* Candlestick Canvas */}
            <div style={{ flex: 1, position: 'relative' }}>
              <canvas ref={canvasRef} id="priceChart" style={{ width: '100%', height: '460px' }} />
            </div>
          </div>

          {/* Bottom Open Orders Ledger */}
          <div className="orders-panel">
            <div className="orders-tabs">
              <button
                className={`tab ${activeLedgerTab === 'open' ? 'active' : ''}`}
                onClick={() => setActiveLedgerTab('open')}
              >
                Active Orders ({openOrders.length})
              </button>
              <button
                className={`tab ${activeLedgerTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveLedgerTab('history')}
              >
                Order History
              </button>
              <button
                className={`tab ${activeLedgerTab === 'trades' ? 'active' : ''}`}
                onClick={() => setActiveLedgerTab('trades')}
              >
                Execution Tape
              </button>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Type / Leverage</th>
                    <th>Side</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Filled</th>
                    <th>Notional</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeLedgerTab === 'open' ? (
                    openOrders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="empty-state">
                          No active limit orders — submit a trade on the console to test matching engine execution.
                        </td>
                      </tr>
                    ) : (
                      openOrders.map((o) => (
                        <tr key={o.id}>
                          <td className="font-bold">{o.pair}</td>
                          <td>
                            <span className="pill pill-neutral">{o.type}</span>
                          </td>
                          <td className={o.side === 'Buy' ? 'up font-bold' : 'down font-bold'}>{o.side}</td>
                          <td className="mono">${o.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                          <td className="mono font-bold text-white">{o.amt} BTC</td>
                          <td className="mono">{o.filled}</td>
                          <td className="mono text-purple font-bold">${o.total.toFixed(2)}</td>
                          <td>
                            <button
                              style={{ color: 'var(--sell)', cursor: 'pointer', fontSize: '12px' }}
                              onClick={() => {
                                onCancelOrder(o.id);
                                onShowToast('✓ Order cancelled');
                              }}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))
                    )
                  ) : (
                    <tr>
                      <td colSpan={8} className="empty-state">
                        Matching engine sub-millisecond execution logs for 2026.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Center: Real-Time Order Book & Tape */}
        <div className="trade-panel">
          <div className="orderbook-head">
            <span>Order Book</span>
            <span className="ob-precision">Precision 0.1 ▾</span>
          </div>

          <div className="ob-cols">
            <span>Price (USDT)</span>
            <span>Size (BTC)</span>
            <span>Cumulative</span>
          </div>

          {/* Asks (Red) */}
          <div>
            {[
              { p: currentPrice + 16.5, amt: 0.5201, depth: 80 },
              { p: currentPrice + 12.0, amt: 0.9400, depth: 65 },
              { p: currentPrice + 8.5, amt: 1.3400, depth: 50 },
              { p: currentPrice + 5.0, amt: 0.2800, depth: 32 },
              { p: currentPrice + 2.0, amt: 0.4500, depth: 16 },
            ].map((r, idx) => (
              <div key={idx} className="ob-row ask">
                <div className="depth" style={{ width: `${r.depth}%` }} />
                <span className="down font-mono font-bold">${r.p.toFixed(1)}</span>
                <span className="font-mono text-white">{r.amt.toFixed(4)}</span>
                <span className="font-mono text-dim">${(r.p * r.amt).toFixed(0)}</span>
              </div>
            ))}
          </div>

          {/* Mid Price & Spread */}
          <div className="ob-mid">
            <span className="p up font-mono font-bold">
              ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span style={{ color: 'var(--text-faint)', fontSize: '11px' }}>
              Spread 0.5 (0.0007%)
            </span>
          </div>

          {/* Bids (Green) */}
          <div>
            {[
              { p: currentPrice - 2.5, amt: 0.6200, depth: 22 },
              { p: currentPrice - 5.0, amt: 1.1500, depth: 38 },
              { p: currentPrice - 8.5, amt: 0.9200, depth: 56 },
              { p: currentPrice - 11.0, amt: 1.6400, depth: 72 },
              { p: currentPrice - 14.5, amt: 2.3500, depth: 88 },
            ].map((r, idx) => (
              <div key={idx} className="ob-row bid">
                <div className="depth" style={{ width: `${r.depth}%` }} />
                <span className="up font-mono font-bold">${r.p.toFixed(1)}</span>
                <span className="font-mono text-white">{r.amt.toFixed(4)}</span>
                <span className="font-mono text-dim">${(r.p * r.amt).toFixed(0)}</span>
              </div>
            ))}
          </div>

          {/* Live Trades Stream */}
          <div className="trades-head">
            <span>Price (USDT)</span>
            <span>Size (BTC)</span>
            <span>Time</span>
          </div>

          <div className="scrollhide" style={{ maxHeight: '180px', overflowY: 'auto' }}>
            {[
              { p: currentPrice + 0.5, amt: 0.1245, up: true, time: '16:04:12' },
              { p: currentPrice - 0.2, amt: 0.0520, up: false, time: '16:04:09' },
              { p: currentPrice + 1.1, amt: 0.4500, up: true, time: '16:04:05' },
              { p: currentPrice + 0.3, amt: 0.8900, up: true, time: '16:04:01' },
              { p: currentPrice - 0.8, amt: 0.2100, up: false, time: '16:03:57' },
              { p: currentPrice + 0.9, amt: 0.3400, up: true, time: '16:03:52' },
            ].map((t, idx) => (
              <div key={idx} className="trade-row">
                <span className={`font-mono font-bold ${t.up ? 'up' : 'down'}`}>${t.p.toFixed(1)}</span>
                <span className="font-mono text-white">{t.amt.toFixed(4)}</span>
                <span className="font-mono text-dim text-xs">{t.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Institutional Unified Order Console */}
        <div className="trade-panel">
          <div className="order-entry">
            {/* Margin Mode & Leverage Selector */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span className="pill pill-neutral font-bold">Cross Margin</span>
                <span className="pill pill-brand font-bold">{leverage}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={leverage}
                onChange={(e) => setLeverage(parseInt(e.target.value))}
                style={{ width: '110px', accentColor: 'var(--brand)' }}
              />
            </div>

            {/* Buy / Sell Tabs */}
            <div className="oe-tabs">
              <button
                className={`oe-side-btn buy ${side === 'buy' ? 'active' : ''}`}
                onClick={() => {
                  setSide('buy');
                  playSound(900, 'sine', 0.05);
                }}
              >
                Open Long
              </button>
              <button
                className={`oe-side-btn sell ${side === 'sell' ? 'active' : ''}`}
                onClick={() => {
                  setSide('sell');
                  playSound(600, 'sine', 0.05);
                }}
              >
                Open Short
              </button>
            </div>

            {/* Order Types */}
            <div className="oe-type-tabs">
              {(['limit', 'market', 'stop'] as const).map((ot) => (
                <button
                  key={ot}
                  className={`oe-type ${orderType === ot ? 'active' : ''}`}
                  onClick={() => setOrderType(ot)}
                >
                  {ot.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Available Balance */}
            <div className="field-row">
              <div className="field-label">
                <span>Available Margin</span>
                <span className="mono text-white font-bold">10,540.22 USDT</span>
              </div>
            </div>

            {/* Price Input */}
            <div className="field-row">
              <div className="field-label"><span>Order Price</span></div>
              <div className="input-suffix">
                <input
                  type="text"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                />
                <span>USDT</span>
              </div>
            </div>

            {/* Amount Input */}
            <div className="field-row">
              <div className="field-label"><span>Order Size</span></div>
              <div className="input-suffix">
                <input
                  type="text"
                  placeholder="0.00"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                />
                <span>BTC</span>
              </div>
            </div>

            {/* Percentage Quick Selector */}
            <div className="pct-row">
              {[0.25, 0.5, 0.75, 1.0].map((pct) => (
                <button
                  key={pct}
                  className="pct-btn"
                  onClick={() => handlePercentage(pct)}
                >
                  {pct * 100}%
                </button>
              ))}
            </div>

            {/* TP / SL Toggle Option */}
            <div style={{ marginTop: '10px', padding: '10px', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 600 }}>TP / SL Trigger Protection</span>
                <div
                  className={`toggle ${enableTpSl ? 'on' : ''}`}
                  onClick={() => setEnableTpSl(!enableTpSl)}
                />
              </div>

              {enableTpSl && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                  <div>
                    <span style={{ fontSize: '10.5px', color: 'var(--buy)' }}>Take Profit (USDT)</span>
                    <input
                      placeholder="72,000"
                      value={tpPrice}
                      onChange={(e) => setTpPrice(e.target.value)}
                      style={{ width: '100%', marginTop: '2px', padding: '6px' }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '10.5px', color: 'var(--sell)' }}>Stop Loss (USDT)</span>
                    <input
                      placeholder="64,500"
                      value={slPrice}
                      onChange={(e) => setSlPrice(e.target.value)}
                      style={{ width: '100%', marginTop: '2px', padding: '6px' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Execution Rules Checkboxes */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '10px', fontSize: '11.5px', color: 'var(--text-dim)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={postOnly}
                  onChange={(e) => setPostOnly(e.target.checked)}
                />
                Post-Only
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={reduceOnly}
                  onChange={(e) => setReduceOnly(e.target.checked)}
                />
                Reduce-Only
              </label>
            </div>

            {/* Required Margin & Fee Summary */}
            <div className="oe-summary" style={{ marginTop: '12px' }}>
              <span>Required Margin</span>
              <span className="mono text-white font-bold">${requiredMargin.toFixed(2)} USDT</span>
            </div>
            <div className="oe-summary">
              <span>Trading Fee (0.25%)</span>
              <span className="mono text-white">${fee.toFixed(2)} USDT</span>
            </div>
            <div className="oe-summary">
              <span>Estimated Notional</span>
              <span className="mono text-purple font-bold">${total.toFixed(2)} USDT</span>
            </div>

            {/* Submit Button */}
            <button
              className={`oe-submit ${side === 'buy' ? 'btn-buy' : 'btn-sell'}`}
              onClick={handleSubmitOrder}
            >
              {side === 'buy' ? `Open Long ${leverage}x BTC` : `Open Short ${leverage}x BTC`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
