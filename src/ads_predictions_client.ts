/* Adsgram monetization, Sponsors + RFS Bonus, Friendly Ad Gates, Telegram Leaderboard Identity, Multi-Market Matchday Predictions League, and National Team Proposals */

interface AppBridge {
  api: (path: string, body?: any) => Promise<any>;
  act: (fn: () => Promise<any>, okMsg?: string | ((d: any) => string)) => Promise<any>;
  e: (s: any) => string;
  toast: (msg: string, isErr?: boolean) => void;
  modal: (html: string, mount?: (el: HTMLElement, close: () => void) => void) => void;
  S: { tok: string; code: string; me: any; st: any };
  teamName: (id: string) => string;
  teamLogo: (id: string) => string;
  compName: (id: string) => string;
  pgClub: (app: HTMLElement) => Promise<void>;
  pgNational: (app: HTMLElement) => Promise<void>;
  pgAdmin: (app: HTMLElement) => Promise<void>;
  getClubTid: () => string;
}

declare global {
  interface Window {
    __RPL_APP__?: AppBridge;
    __TG_USER__?: {
      tgId?: string;
      displayName?: string;
      username?: string;
      photoUrl?: string;
      verified?: boolean;
      linkedTeamId?: string | null;
    } | null;
    Adsgram?: {
      init: (opts: { blockId: string }) => {
        show: () => Promise<{ done?: boolean; state?: string; description?: string }>;
      };
    };
    Telegram?: any;
    __RPL_EXT__?: any;
  }
}

function ensureExtStyles() {
  if (typeof document === 'undefined') return;
  let st = document.getElementById('rpl_ext_styles') as HTMLStyleElement | null;
  if (!st) {
    st = document.createElement('style');
    st.id = 'rpl_ext_styles';
    document.head.appendChild(st);
  }
  st.textContent = `
    .pred-hero{
      background:linear-gradient(135deg,#0b281c 0%,#123d2b 100%);
      color:#ffffff;
      border-radius:14px;
      padding:18px 20px;
      margin-bottom:14px;
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      justify-content:space-between;
      gap:16px;
      border:1px solid #1d583e;
    }
    .pred-hero-title{
      font:700 22px Unbounded,sans-serif;
      margin:0 0 4px;
      color:#ffffff;
      letter-spacing:-0.01em;
    }
    .pred-hero-sub{
      font-size:13px;
      color:#cde2d4;
      line-height:1.4;
    }
    .pred-hero-right{
      display:flex;
      align-items:center;
      gap:14px;
      flex-wrap:wrap;
    }
    .pred-wallet{
      background:rgba(255,255,255,0.08);
      border:1px solid rgba(255,255,255,0.16);
      border-radius:10px;
      padding:8px 14px;
      text-align:right;
      font-variant-numeric:tabular-nums;
    }
    .pred-wallet-lbl{
      font-size:11px;
      color:#b8d4c2;
    }
    .pred-wallet-val{
      font:700 18px Unbounded,sans-serif;
      color:#f0c419;
      margin-top:1px;
    }
    .pred-tg-user{
      display:flex;
      align-items:center;
      gap:9px;
      font-size:13px;
      color:#e8f2ec;
    }
    .pred-tg-ava{
      width:32px;
      height:32px;
      border-radius:50%;
      object-fit:cover;
      border:1.5px solid rgba(255,255,255,0.35);
      flex-shrink:0;
    }
    .pred-ads-panel{
      position:relative;
      overflow:hidden;
      background:linear-gradient(180deg,#ffffff 0%,#f2f8f4 100%);
      border:1px solid #c3d8cb;
      border-top:3px solid #166534;
      border-radius:14px;
      padding:14px 16px;
      margin-bottom:14px;
      box-shadow:0 4px 16px rgba(13,47,33,0.05);
    }
    .pred-ads-head{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      flex-wrap:wrap;
      margin-bottom:12px;
    }
    .pred-ads-title-wrap{
      display:flex;
      align-items:center;
      gap:10px;
    }
    .pred-ads-title-ico{
      width:30px;
      height:30px;
      border-radius:8px;
      background:#0d2f21;
      color:#f0c419;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
      border:1px solid #1f5c3f;
    }
    .pred-ads-title{
      font:700 14.5px Unbounded,Onest,sans-serif;
      color:#0d2f21;
      letter-spacing:-0.01em;
    }
    .pred-ads-sub{
      font-size:12px;
      color:#536b5d;
      margin-top:1px;
    }
    .pred-ads-grid{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:10px;
    }
    .sp-cards-grid{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:12px;
    }
    .coin-offer-btn{
      appearance:none;
      -webkit-appearance:none;
      position:relative;
      overflow:hidden;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      gap:10px;
      width:100%;
      min-height:88px;
      text-align:left;
      background:linear-gradient(160deg,#ffffff 0%,#f3f9f5 100%);
      color:#10261c;
      border:1.5px solid #c6dacd;
      border-radius:12px;
      padding:12px 13px 11px;
      cursor:pointer;
      transition:border-color .16s ease,background .16s ease,transform .14s ease,box-shadow .16s ease;
    }
    .coin-offer-btn::after{
      content:'';
      position:absolute;
      right:-22px;
      bottom:-22px;
      width:74px;
      height:74px;
      border-radius:50%;
      border:2px solid rgba(22,101,52,0.08);
      pointer-events:none;
    }
    .coin-offer-btn.featured{
      background:linear-gradient(155deg,#0d2f21 0%,#144530 100%);
      border-color:#1e5f43;
      color:#ffffff;
    }
    .coin-offer-btn.featured::after{
      border-color:rgba(240,196,25,0.14);
    }
    .coin-offer-btn:hover:not(:disabled){
      border-color:#15803d;
      background:linear-gradient(160deg,#ffffff 0%,#e9f6ee 100%);
      transform:translateY(-2px);
      box-shadow:0 6px 16px rgba(13,47,33,0.09);
    }
    .coin-offer-btn.featured:hover:not(:disabled){
      border-color:#f0c419;
      background:linear-gradient(155deg,#103828 0%,#195239 100%);
      box-shadow:0 8px 18px rgba(13,47,33,0.18);
    }
    .coin-offer-btn:disabled{
      opacity:.56;
      cursor:not-allowed;
    }
    .coin-offer-top{
      position:relative;
      z-index:1;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      width:100%;
    }
    .coin-offer-left{
      display:flex;
      align-items:center;
      gap:10px;
      min-width:0;
      flex:1;
    }
    .coin-offer-ico{
      width:38px;
      height:38px;
      border-radius:10px;
      background:#0d2f21;
      color:#f0c419;
      border:1px solid #1e5b3f;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
    }
    .coin-offer-btn.featured .coin-offer-ico{
      background:rgba(240,196,25,0.15);
      border-color:rgba(240,196,25,0.38);
      color:#f0c419;
    }
    .coin-offer-name{
      font:700 13.5px Onest,system-ui,sans-serif;
      color:#0d2f21;
      line-height:1.25;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .coin-offer-btn.featured .coin-offer-name{
      color:#ffffff;
    }
    .coin-offer-meta{
      font-size:11.5px;
      color:#556e60;
      margin-top:2px;
      font-variant-numeric:tabular-nums;
    }
    .coin-offer-btn.featured .coin-offer-meta{
      color:#c3ddd0;
    }
    .coin-offer-reward{
      display:inline-flex;
      align-items:center;
      gap:5px;
      padding:6px 10px;
      border-radius:9px;
      background:#0d2f21;
      color:#f0c419;
      font:700 13px Unbounded,sans-serif;
      white-space:nowrap;
      flex-shrink:0;
      font-variant-numeric:tabular-nums;
      border:1px solid #1c553b;
    }
    .coin-offer-btn.featured .coin-offer-reward{
      background:#f0c419;
      color:#0d2f21;
      border-color:#ffd747;
    }
    .coin-offer-foot{
      position:relative;
      z-index:1;
      display:flex;
      align-items:center;
      gap:10px;
      width:100%;
    }
    .coin-offer-track{
      flex:1;
      height:6px;
      border-radius:99px;
      background:#dfebe3;
      overflow:hidden;
    }
    .coin-offer-btn.featured .coin-offer-track{
      background:rgba(255,255,255,0.16);
    }
    .coin-offer-fill{
      height:100%;
      border-radius:99px;
      background:linear-gradient(90deg,#166534 0%,#22c55e 100%);
      transition:width .25s ease;
    }
    .coin-offer-btn.featured .coin-offer-fill{
      background:linear-gradient(90deg,#eab308 0%,#fde047 100%);
    }
    .coin-offer-count{
      font-size:11px;
      font-weight:700;
      color:#4b6456;
      white-space:nowrap;
      font-variant-numeric:tabular-nums;
    }
    .coin-offer-btn.featured .coin-offer-count{
      color:#d5eae0;
    }
    .pred-toolbar{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
      flex-wrap:wrap;
      margin-bottom:14px;
      border-bottom:2px solid var(--line);
      padding-bottom:8px;
    }
    .pred-tabs{
      display:flex;
      gap:6px;
      flex-wrap:wrap;
    }
    .pred-tabs button{
      background:transparent;
      border:0;
      padding:8px 13px;
      min-height:40px;
      border-radius:8px;
      cursor:pointer;
      font-weight:600;
      font-size:13.5px;
      color:var(--muted);
      transition:background .12s,color .12s;
      white-space:nowrap;
    }
    .pred-tabs button:hover{
      color:var(--ink);
      background:#eef4f0;
    }
    .pred-tabs button.on{
      background:#0d2f21;
      color:#ffffff;
    }
    .pred-stake-bar{
      display:flex;
      align-items:center;
      gap:6px;
      flex-wrap:wrap;
    }
    .pred-stake-lbl{
      font-size:12.5px;
      font-weight:600;
      color:#5b7064;
      margin-right:2px;
    }
    .pred-stake-btn{
      min-width:38px;
      min-height:36px;
      padding:4px 10px;
      border-radius:7px;
      border:1px solid #c7d6cc;
      background:#ffffff;
      color:#10261c;
      font-weight:700;
      font-size:13px;
      font-variant-numeric:tabular-nums;
      cursor:pointer;
      transition:all .12s;
    }
    .pred-stake-btn:hover{
      border-color:#1b5c3f;
    }
    .pred-stake-btn.on{
      background:#1b5c3f;
      border-color:#1b5c3f;
      color:#ffffff;
    }
    .pred-grid{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:14px;
    }
    .pred-card{
      background:#ffffff;
      border:1px solid #d1ded5;
      border-radius:12px;
      padding:15px 16px;
      display:flex;
      flex-direction:column;
      gap:12px;
    }
    .pred-card-head{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:8px;
      font-size:12px;
      color:#5b7064;
      font-variant-numeric:tabular-nums;
    }
    .pred-teams{
      display:grid;
      grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);
      align-items:center;
      gap:10px;
    }
    .pred-team{
      display:flex;
      align-items:center;
      gap:8px;
      min-width:0;
    }
    .pred-team.away{
      justify-content:flex-end;
      text-align:right;
    }
    .pred-team-logo{
      width:28px;
      height:28px;
      object-fit:contain;
      flex-shrink:0;
    }
    .pred-team-name{
      font:700 14.5px Onest,system-ui,sans-serif;
      color:#0d2f21;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .pred-vs{
      font-size:12px;
      font-weight:700;
      color:#85998d;
    }
    .pred-sec-lbl{
      font-size:11.5px;
      font-weight:600;
      color:#5b7064;
      margin-bottom:5px;
      display:flex;
      justify-content:space-between;
      align-items:center;
    }
    .pred-line-3{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:6px;
    }
    .pred-line-2{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:6px;
    }
    .pred-quick-split{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:10px;
      padding-top:10px;
      border-top:1px solid #ebf1ed;
    }
    .pred-odd-btn{
      appearance:none;
      -webkit-appearance:none;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:6px;
      width:100%;
      min-height:42px;
      padding:7px 10px;
      border-radius:8px;
      border:1px solid #d0ddd4;
      background:#f7faf8;
      color:#10261c;
      font-size:13px;
      font-weight:500;
      cursor:pointer;
      transition:border-color .12s,background .12s,color .12s;
      text-align:left;
    }
    .pred-odd-btn:hover:not(:disabled){
      border-color:#1b5c3f;
      background:#edf6f0;
    }
    .pred-odd-btn.on{
      background:#0d2f21;
      border-color:#0d2f21;
      color:#ffffff;
    }
    .pred-odd-btn.betted{
      background:#f0fdf4;
      border-color:#86efac;
      color:#166534;
      cursor:default;
    }
    .pred-odd-k{
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .pred-odd-v{
      font-variant-numeric:tabular-nums;
      font-weight:700;
      font-size:13px;
      color:#0d2f21;
      flex-shrink:0;
    }
    .pred-odd-btn.on .pred-odd-v{
      color:#f0c419;
    }
    .pred-odd-btn.betted .pred-odd-v{
      color:#15803d;
    }
    .pred-more-btn{
      appearance:none;
      -webkit-appearance:none;
      width:100%;
      min-height:40px;
      padding:8px 12px;
      border-radius:8px;
      border:1px dashed #c2d3c8;
      background:#fbfdfb;
      color:#1b5c3f;
      font-size:12.5px;
      font-weight:600;
      display:flex;
      align-items:center;
      justify-content:space-between;
      cursor:pointer;
      transition:background .12s,border-color .12s;
    }
    .pred-more-btn:hover{
      background:#f1f7f3;
      border-color:#1b5c3f;
    }
    .pred-more-panel{
      padding-top:10px;
      border-top:1px solid #e5eee8;
      display:flex;
      flex-direction:column;
      gap:10px;
    }
    .pred-es-grid{
      display:grid;
      grid-template-columns:repeat(4,minmax(0,1fr));
      gap:6px;
    }
    .pred-es-custom{
      display:flex;
      align-items:center;
      gap:6px;
      margin-top:6px;
      flex-wrap:wrap;
    }
    .pred-inline-input{
      width:48px !important;
      padding:5px 6px !important;
      text-align:center;
      font-variant-numeric:tabular-nums;
    }
    .pred-slip{
      background:#0d2f21;
      color:#ffffff;
      border-radius:10px;
      padding:11px 13px;
      display:flex;
      flex-direction:column;
      gap:9px;
    }
    .pred-slip-top{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      flex-wrap:wrap;
    }
    .pred-slip-cta{
      background:#f0c419;
      color:#0d2f21;
      border:0;
      border-radius:7px;
      padding:8px 15px;
      min-height:38px;
      font-weight:700;
      font-size:13px;
      cursor:pointer;
      white-space:nowrap;
    }
    .pred-slip-cta:hover{
      background:#ffd43b;
    }
    .pred-active-bets{
      border-top:1px solid #e5eee8;
      padding-top:8px;
      display:flex;
      flex-direction:column;
      gap:4px;
      font-size:12.5px;
      font-variant-numeric:tabular-nums;
    }
    .pred-active-row{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:8px;
      color:#166534;
    }
    .pred-prob-wrap{
      display:flex;
      flex-direction:column;
      gap:4px;
    }
    .pred-prob-bar{
      height:5px;
      border-radius:999px;
      overflow:hidden;
      display:flex;
      background:#e7efea;
    }
    .pred-prob-1{ background:#1b5c3f; }
    .pred-prob-x{ background:#9fb3a7; }
    .pred-prob-2{ background:#2b6cb0; }
    .pred-prob-meta{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:8px;
      font-size:11px;
      color:#5b7064;
      font-variant-numeric:tabular-nums;
      flex-wrap:wrap;
    }
    .pred-mkt-tabs{
      display:flex;
      gap:5px;
      flex-wrap:wrap;
      padding-bottom:6px;
      border-bottom:1px solid #e5eee8;
    }
    .pred-mkt-tab{
      appearance:none;
      -webkit-appearance:none;
      background:#f2f6f3;
      border:1px solid #d5e1d9;
      border-radius:7px;
      padding:5px 10px;
      font-size:12px;
      font-weight:600;
      color:#3d5347;
      cursor:pointer;
      transition:all .12s;
    }
    .pred-mkt-tab:hover{
      border-color:#1b5c3f;
      color:#0d2f21;
    }
    .pred-mkt-tab.on{
      background:#0d2f21;
      border-color:#0d2f21;
      color:#ffffff;
    }
    .pred-filter-row{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      flex-wrap:wrap;
      margin-bottom:14px;
    }
    .pred-comp-pills{
      display:flex;
      gap:6px;
      flex-wrap:wrap;
    }
    .pred-comp-pill{
      appearance:none;
      background:#ffffff;
      border:1px solid #cddad1;
      border-radius:8px;
      padding:6px 11px;
      font-size:12.5px;
      font-weight:600;
      color:#3d5347;
      cursor:pointer;
    }
    .pred-comp-pill.on{
      background:#1b5c3f;
      border-color:#1b5c3f;
      color:#ffffff;
    }
    .pred-search-input{
      min-width:200px;
      max-width:260px;
      padding:7px 11px !important;
      font-size:13px !important;
    }
    .pred-coupon-dock{
      position:fixed;
      right:18px;
      bottom:16px;
      width:min(430px, calc(100vw - 24px));
      background:#0d2f21;
      color:#ffffff;
      border-radius:14px;
      box-shadow:0 14px 36px rgba(9,32,22,0.38);
      border:1px solid rgba(255,255,255,0.14);
      z-index:1200;
      overflow:hidden;
    }
    .pred-coupon-head{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      padding:11px 14px;
      background:#092419;
      cursor:pointer;
    }
    .pred-coupon-body{
      max-height:54vh;
      overflow-y:auto;
      padding:10px 12px;
      display:flex;
      flex-direction:column;
      gap:8px;
    }
    .pred-coupon-item{
      background:rgba(255,255,255,0.08);
      border:1px solid rgba(255,255,255,0.12);
      border-radius:10px;
      padding:9px 10px;
      display:flex;
      flex-direction:column;
      gap:7px;
    }
    .pred-coupon-item-top{
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:8px;
    }
    .pred-coupon-stake-row{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:8px;
      flex-wrap:wrap;
      font-variant-numeric:tabular-nums;
    }
    .pred-coupon-qty{
      display:flex;
      align-items:center;
      gap:4px;
    }
    .pred-coupon-qty button{
      min-width:28px;
      height:28px;
      border-radius:6px;
      border:1px solid rgba(255,255,255,0.22);
      background:rgba(255,255,255,0.12);
      color:#ffffff;
      font-weight:700;
      font-size:12.5px;
      cursor:pointer;
      padding:0 6px;
    }
    .pred-coupon-qty button:hover{
      background:rgba(255,255,255,0.22);
    }
    .pred-coupon-qty input{
      width:52px !important;
      height:28px !important;
      padding:2px 5px !important;
      border-radius:6px !important;
      border:1px solid rgba(255,255,255,0.28) !important;
      background:#ffffff !important;
      color:#0d2f21 !important;
      font-weight:700 !important;
      text-align:center !important;
      font-size:13px !important;
    }
    .pred-coupon-foot{
      padding:10px 14px 12px;
      background:#092419;
      border-top:1px solid rgba(255,255,255,0.12);
      display:flex;
      flex-direction:column;
      gap:8px;
    }
    .pred-coupon-presets{
      display:flex;
      align-items:center;
      gap:5px;
      flex-wrap:wrap;
      font-size:11.5px;
      color:#b9d4c4;
    }
    .pred-coupon-presets button{
      border:1px solid rgba(255,255,255,0.24);
      background:rgba(255,255,255,0.10);
      color:#ffffff;
      border-radius:6px;
      padding:3px 8px;
      font-size:11.5px;
      font-weight:700;
      cursor:pointer;
    }
    .pred-coupon-presets button:hover{
      background:rgba(255,255,255,0.22);
    }
    .pred-line-4{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:6px;
    }
    @media (max-width:860px){
      .pred-grid{ grid-template-columns:1fr; }
    }
    @media (max-width:640px){
      .pred-ads-grid{ grid-template-columns:1fr; }
      .sp-cards-grid{ grid-template-columns:1fr; }
      .pred-coupon-dock{ right:10px; left:10px; bottom:10px; width:auto; }
    }
    @media (max-width:560px){
      .pred-hero{ padding:14px 15px; }
      .pred-hero-title{ font-size:18px; }
      .pred-quick-split{ grid-template-columns:1fr; gap:8px; }
      .pred-es-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); }
      .pred-line-4{ grid-template-columns:repeat(2,minmax(0,1fr)); }
    }
  `;
}

ensureExtStyles();

function getClientUid(): string {
  try {
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tgUser?.id) {
      const id = `tg_${tgUser.id}`;
      localStorage.setItem('rpl_client_uid', id);
      return id;
    }
    if (window.__TG_USER__?.tgId) {
      const id = `tg_${window.__TG_USER__.tgId}`;
      localStorage.setItem('rpl_client_uid', id);
      return id;
    }
    let uid = localStorage.getItem('rpl_client_uid') || '';
    if (!uid) {
      uid = 'u_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem('rpl_client_uid', uid);
    }
    return uid;
  } catch {
    return 'u_browser';
  }
}

function getTgUserMeta(): { id: string; name: string; username: string; photo: string } {
  try {
    const u = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (u?.id) {
      const name = [u.first_name, u.last_name].filter(Boolean).join(' ').trim() || (u.username ? `@${u.username}` : '');
      const photo = typeof u.photo_url === 'string' ? u.photo_url : '';
      return {
        id: String(u.id),
        name,
        username: String(u.username || ''),
        photo,
      };
    }
    const cached = window.__TG_USER__;
    if (cached?.tgId) {
      return {
        id: String(cached.tgId),
        name: String(cached.displayName || ''),
        username: String(cached.username || ''),
        photo: String(cached.photoUrl || ''),
      };
    }
    return { id: '', name: '', username: '', photo: '' };
  } catch {
    return { id: '', name: '', username: '', photo: '' };
  }
}

export function getClientHeaders(): Record<string, string> {
  const meta = getTgUserMeta();
  const h: Record<string, string> = { 'X-Client-Id': getClientUid() };
  if (meta.id) h['X-Tg-Id'] = meta.id;
  if (meta.name) h['X-Tg-Name'] = encodeURIComponent(meta.name);
  if (meta.username) h['X-Tg-Username'] = encodeURIComponent(meta.username);
  if (meta.photo) h['X-Tg-Photo'] = meta.photo;
  return h;
}

export async function syncTelegramAuth(): Promise<any | null> {
  try {
    const wa = window.Telegram?.WebApp;
    const initData = typeof wa?.initData === 'string' ? wa.initData : '';
    const user = wa?.initDataUnsafe?.user || null;
    if (!initData && !user?.id) return null;
    if (user?.id) {
      try {
        localStorage.setItem('rpl_client_uid', `tg_${user.id}`);
      } catch {}
    }
    const res = await B().api('/auth/telegram', { initData, user });
    if (res?.telegramUser) {
      window.__TG_USER__ = {
        ...res.telegramUser,
        linkedTeamId: res.linkedTeamId || null,
      };
    }
    return res;
  } catch {
    return null;
  }
}

function B(): AppBridge {
  return window.__RPL_APP__!;
}

function fmtEuro(n: number): string {
  const v = Math.round(Number(n) || 0);
  return v < 0 ? '-€' + Math.abs(v).toLocaleString('ru-RU') : '€' + v.toLocaleString('ru-RU');
}

function fmtCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map((x) => String(x).padStart(2, '0')).join(':');
}

function fmtShortCooldown(ms: number): string {
  if (ms <= 0) return '00:00';
  const totalSec = Math.ceil(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Executes an Adsgram ad block:
 * - Uses native window.Adsgram.init({ blockId }).show() when SDK is available & real numeric/task blockId is configured.
 * - Falls back to an interactive Adsgram Ad Player modal in web/preview environments, enforcing duration & optional click-through.
 */
export async function runAdsgramBlock(
  blockKey: string,
  title: string,
  subtitle?: string
): Promise<{ adProof: string; blockKey: string; clicked: boolean } | null> {
  const { api, e, toast, modal } = B();
  let session: any;
  try {
    session = await api('/ads/start', { blockKey });
  } catch (err: any) {
    toast(err?.message || 'Не удалось запустить рекламный блок', true);
    return null;
  }

  const blockId = String(session.blockId || '');
  const requiresClick = !!session.requiresClick;
  const isRealAdsgramBlock = typeof window.Adsgram?.init === 'function' && (/^\d+$/.test(blockId) || blockId.startsWith('task-'));

  if (isRealAdsgramBlock) {
    try {
      const controller = window.Adsgram!.init({ blockId });
      const res = await controller.show();
      const completed = await api('/ads/complete', {
        sessionToken: session.sessionToken,
        clicked: requiresClick ? true : !!res?.done,
        sdkCompleted: true,
      });
      return { adProof: completed.adProof, blockKey, clicked: !!completed.clicked };
    } catch (err: any) {
      toast(err?.description || err?.message || 'Просмотр рекламы Adsgram отменён', true);
      return null;
    }
  }

  const previewSec = session.format === 'long' || session.format === 'click_long' ? 6 : 4;
  return new Promise((resolve) => {
    let resolved = false;
    let timerId: any = null;
    let remaining = previewSec;
    let clickedAd = false;

    let observer: MutationObserver | null = null;

    const finishResolve = (val: { adProof: string; blockKey: string; clicked: boolean } | null) => {
      if (resolved) return;
      resolved = true;
      if (timerId) clearInterval(timerId);
      if (observer) observer.disconnect();
      resolve(val);
    };

    const html = `
      <div style="max-width:460px;margin:0 auto">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px">
          <div style="font-size:12px;font-weight:700;color:#5b7064">Adsgram Network · Блок <code>${e(blockId)}</code></div>
          <span id="ad_timer_badge" style="font-variant-numeric:tabular-nums;font-size:12px;font-weight:700;color:#0d2f21;background:#fef3c7;padding:3px 9px;border-radius:6px">${remaining} сек</span>
        </div>
        <h3 style="margin:0 0 6px;font-size:17px">${e(title)}</h3>
        ${subtitle ? `<div class="small muted" style="margin-bottom:12px">${e(subtitle)}</div>` : ''}
        <div style="background:linear-gradient(135deg,#0d2f21 0%,#1b5c3f 100%);color:#fff;border-radius:10px;padding:18px;margin-bottom:12px;border:1px solid #2f7d55">
          <div style="font-size:11px;color:#cfe3d6;margin-bottom:6px">${session.format === 'banner' ? 'Рекламный баннер' : session.format === 'click_long' ? 'Большой рекламный ролик (требуется переход)' : session.format === 'long' ? 'Длинный видеоролик (30с)' : 'Короткий видеоролик (5с)'}</div>
          <div style="font-weight:700;font-size:16px;margin-bottom:6px">Официальная реклама партнёров лиги</div>
          <div style="font-size:13px;color:#e8eee9;line-height:1.45;margin-bottom:12px">
            ${requiresClick
              ? 'Для подачи заявки на товарищеский матч дождитесь окончания таймера и обязательно нажмите на рекламное предложение ниже.'
              : 'Дождитесь завершения просмотра рекламного блока, чтобы получить награду.'}
          </div>
          <div style="height:6px;background:rgba(255,255,255,0.2);border-radius:99px;overflow:hidden;margin-bottom:${requiresClick ? '12px' : '0'}">
            <div id="ad_prog_bar" style="height:100%;width:0%;background:#f0c419;transition:width 0.35s linear"></div>
          </div>
          ${requiresClick ? `
            <button type="button" id="ad_click_cta" class="btn" style="width:100%;background:#f0c419;color:#0d2f21;font-weight:700;min-height:44px">
              Перейти по рекламе (обязательный клик)
            </button>
            <div id="ad_click_status" style="font-size:12px;color:#fef08a;margin-top:6px;text-align:center">Клик по рекламе ещё не выполнен</div>
          ` : ''}
        </div>
        <div class="row" style="gap:8px;justify-content:flex-end">
          <button type="button" id="ad_cancel_btn" class="btn alt sm" style="min-height:42px">Отмена</button>
          <button type="button" id="ad_done_btn" class="btn sm" disabled style="min-height:42px;opacity:0.55">Подождите (${remaining}с)</button>
        </div>
        <div class="small muted" style="margin-top:8px;font-size:11px">В Telegram Mini App здесь запускается нативный контроллер Adsgram с Block ID «${e(blockId)}».</div>
      </div>
    `;

    modal(html, (el, close) => {
      const closeModal = typeof close === 'function' ? close : () => el.remove();
      const timerBadge = el.querySelector('#ad_timer_badge') as HTMLElement;
      const progBar = el.querySelector('#ad_prog_bar') as HTMLElement;
      const doneBtn = el.querySelector('#ad_done_btn') as HTMLButtonElement;
      const cancelBtn = el.querySelector('#ad_cancel_btn') as HTMLButtonElement;
      const ctaBtn = el.querySelector('#ad_click_cta') as HTMLButtonElement | null;
      const clickStatus = el.querySelector('#ad_click_status') as HTMLElement | null;

      const syncDoneState = () => {
        const timerReady = remaining <= 0;
        const clickReady = !requiresClick || clickedAd;
        if (timerReady && clickReady) {
          doneBtn.disabled = false;
          doneBtn.style.opacity = '1';
          doneBtn.textContent = 'Подтвердить просмотр';
        } else if (timerReady && !clickReady) {
          doneBtn.disabled = true;
          doneBtn.style.opacity = '0.55';
          doneBtn.textContent = 'Нажмите по рекламе выше';
        } else {
          doneBtn.disabled = true;
          doneBtn.style.opacity = '0.55';
          doneBtn.textContent = `Подождите (${remaining}с)`;
        }
      };

      if (ctaBtn) {
        ctaBtn.onclick = () => {
          clickedAd = true;
          ctaBtn.textContent = 'Переход выполнен ✓';
          ctaBtn.style.background = '#bbf7d0';
          if (clickStatus) {
            clickStatus.textContent = 'Клик по рекламе подтверждён ✓';
            clickStatus.style.color = '#86efac';
          }
          syncDoneState();
        };
      }

      const updateProgress = () => {
        const pct = Math.min(100, Math.round(((previewSec - remaining) / previewSec) * 100));
        if (progBar) progBar.style.width = `${pct}%`;
        if (timerBadge) timerBadge.textContent = remaining > 0 ? `${remaining} сек` : 'Готово';
        syncDoneState();
      };

      updateProgress();
      timerId = setInterval(() => {
        remaining = Math.max(0, remaining - 1);
        updateProgress();
        if (remaining <= 0) {
          clearInterval(timerId);
          timerId = null;
        }
      }, 1000);

      cancelBtn.onclick = () => {
        closeModal();
        finishResolve(null);
      };

      doneBtn.onclick = async () => {
        doneBtn.disabled = true;
        doneBtn.textContent = 'Проверка…';
        try {
          const completed = await api('/ads/complete', {
            sessionToken: session.sessionToken,
            clicked: clickedAd,
            sdkCompleted: false,
          });
          closeModal();
          finishResolve({ adProof: completed.adProof, blockKey, clicked: !!completed.clicked });
        } catch (err: any) {
          toast(err?.message || 'Ошибка подтверждения рекламы', true);
          doneBtn.disabled = false;
          syncDoneState();
        }
      };

      observer = new MutationObserver(() => {
        if (!document.body.contains(el)) {
          finishResolve(null);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  });
}

export async function runAdsgramBotBlock(
  blockKey: 'bot_sponsor' | 'bot_coins',
  title: string,
  subtitle?: string
): Promise<{ adProof?: string; blockKey: string; clicked: boolean; alreadyCredited?: boolean; creditResult?: any } | null> {
  const { api, e, toast, modal } = B();
  let startRes: any;
  try {
    startRes = await api('/ads/bot/start', { blockKey });
  } catch (err: any) {
    toast(err?.message || 'Не удалось запустить рекламу в боте', true);
    return null;
  }

  if (startRes?.needsBotStart) {
    const botUser = String(startRes.botUsername || '').replace(/^@/, '');
    const botUrl = botUser ? `https://t.me/${botUser}?start=ads` : '';
    return new Promise((resolve) => {
      let done = false;
      const fin = (val: any) => {
        if (done) return;
        done = true;
        resolve(val);
      };
      modal(
        `<div style="max-width:440px;margin:0 auto">
          <h3 style="margin:0 0 8px">Запустите Telegram-бота</h3>
          <p class="small" style="line-height:1.45;margin:0 0 12px">${e(startRes.error || 'Сначала откройте переписку с ботом и нажмите «Запустить» (/start).')}</p>
          <div class="row" style="gap:8px;flex-wrap:wrap;justify-content:flex-end">
            ${botUrl ? `<a href="${e(botUrl)}" target="_blank" rel="noopener" class="btn sm" style="min-height:40px;display:inline-flex;align-items:center">Открыть @${e(botUser)}</a>` : ''}
            <button type="button" id="bot_start_retry" class="btn alt sm" style="min-height:40px">Повторить отправку</button>
            <button type="button" id="bot_start_cancel" class="btn alt sm" style="min-height:40px">Закрыть</button>
          </div>
        </div>`,
        (el, close) => {
          const closeModal = typeof close === 'function' ? close : () => el.remove();
          (el.querySelector('#bot_start_cancel') as HTMLElement).onclick = () => { closeModal(); fin(null); };
          (el.querySelector('#bot_start_retry') as HTMLElement).onclick = async () => {
            closeModal();
            const retryVal = await runAdsgramBotBlock(blockKey, title, subtitle);
            fin(retryVal);
          };
        }
      );
    });
  }

  if (startRes?.mode === 'bot_sent') {
    const botUser = String(startRes.botUsername || '').replace(/^@/, '');
    const botUrl = botUser ? `https://t.me/${botUser}` : '';
    const sessionToken = String(startRes.sessionToken || '');
    return new Promise((resolve) => {
      let resolved = false;
      let pollId: any = null;
      let observer: MutationObserver | null = null;
      const finish = (val: any) => {
        if (resolved) return;
        resolved = true;
        if (pollId) clearInterval(pollId);
        if (observer) observer.disconnect();
        resolve(val);
      };

      const html = `
        <div style="max-width:460px;margin:0 auto">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px">
            <span style="font-size:12px;font-weight:700;color:#0369a1">Telegram-бот · Adsgram Блок <code>${e(startRes.blockId || '')}</code></span>
            <span id="bot_wait_badge" style="font-size:12px;font-weight:700;color:#0d2f21;background:#dbeafe;padding:3px 9px;border-radius:6px">Ожидание перехода…</span>
          </div>
          <h3 style="margin:0 0 6px;font-size:17px">${e(title)}</h3>
          ${subtitle ? `<div class="small muted" style="margin-bottom:10px">${e(subtitle)}</div>` : ''}
          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:14px;margin-bottom:12px;font-size:13.5px;line-height:1.5;color:#0c4a6e">
            <b>Рекламный пост отправлен в личные сообщения Telegram-бота!</b>
            <ol style="margin:8px 0 0;padding-left:18px">
              <li>Откройте чат с ботом${botUser ? ` (@${e(botUser)})` : ''}.</li>
              <li>Нажмите на первую рекламную кнопку в сообщении.</li>
              <li>Вернитесь к сообщению и нажмите кнопку подтверждения награды.</li>
            </ol>
          </div>
          <div class="row" style="gap:8px;flex-wrap:wrap;justify-content:flex-end">
            ${botUrl ? `<a href="${e(botUrl)}" target="_blank" rel="noopener" class="btn sm" style="min-height:42px;display:inline-flex;align-items:center">Открыть чат с ботом</a>` : ''}
            <button type="button" id="bot_check_now" class="btn alt sm" style="min-height:42px">Проверить статус</button>
            <button type="button" id="bot_wait_cancel" class="btn alt sm" style="min-height:42px">Закрыть</button>
          </div>
        </div>
      `;

      modal(html, (el, close) => {
        const closeModal = typeof close === 'function' ? close : () => el.remove();
        const badge = el.querySelector('#bot_wait_badge') as HTMLElement | null;
        const checkBtn = el.querySelector('#bot_check_now') as HTMLButtonElement;
        const cancelBtn = el.querySelector('#bot_wait_cancel') as HTMLButtonElement;

        const checkStatus = async (manual = false) => {
          try {
            const st = await api(`/ads/bot/status?sessionToken=${encodeURIComponent(sessionToken)}`);
            if (st?.consumed && st?.creditResult) {
              closeModal();
              finish({ blockKey, clicked: true, alreadyCredited: true, creditResult: st.creditResult });
              return true;
            }
            if (st?.expired) {
              if (badge) badge.textContent = 'Истекло';
              toast('Срок ожидания рекламного сообщения истёк.', true);
              closeModal();
              finish(null);
              return true;
            }
            if (manual) {
              toast('Переход и подтверждение награды в боте ещё не зафиксированы.', true);
            }
          } catch {}
          return false;
        };

        pollId = setInterval(() => { checkStatus(false); }, 2500);
        checkBtn.onclick = () => { checkStatus(true); };
        cancelBtn.onclick = () => { closeModal(); finish(null); };

        observer = new MutationObserver(() => {
          if (!document.body.contains(el)) finish(null);
        });
        observer.observe(document.body, { childList: true, subtree: true });
      });
    });
  }

  // Preview mode (when bot token / publisher token / numeric block ID / tgId is not active yet)
  const sessionToken = String(startRes?.sessionToken || '');
  const blockId = String(startRes?.blockId || blockKey);
  return new Promise((resolve) => {
    let resolved = false;
    let timerId: any = null;
    let remaining = 3;
    let clickedAd = false;
    let observer: MutationObserver | null = null;
    const finishResolve = (val: any) => {
      if (resolved) return;
      resolved = true;
      if (timerId) clearInterval(timerId);
      if (observer) observer.disconnect();
      resolve(val);
    };

    const html = `
      <div style="max-width:460px;margin:0 auto">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px">
          <div style="font-size:12px;font-weight:700;color:#0369a1">Adsgram Бот · Блок <code>${e(blockId)}</code></div>
          <span id="bot_pv_timer" style="font-variant-numeric:tabular-nums;font-size:12px;font-weight:700;color:#0d2f21;background:#fef3c7;padding:3px 9px;border-radius:6px">${remaining} сек</span>
        </div>
        <h3 style="margin:0 0 6px;font-size:17px">${e(title)}</h3>
        ${subtitle ? `<div class="small muted" style="margin-bottom:12px">${e(subtitle)}</div>` : ''}
        <div style="background:linear-gradient(135deg,#0c4a6e 0%,#0f766e 100%);color:#fff;border-radius:12px;padding:16px;margin-bottom:12px;border:1px solid #38bdf8">
          <div style="font-size:11px;color:#bae6fd;margin-bottom:6px">Предпросмотр сообщения в Telegram-боте</div>
          <div style="font-weight:700;font-size:15.5px;margin-bottom:6px">Партнёрский пост в личных сообщениях бота</div>
          <div style="font-size:13px;color:#e0f2fe;line-height:1.45;margin-bottom:12px">
            В реальном Telegram-боте сообщение приходит с защитой от пересылки и двумя кнопками: сначала переход по рекламе, затем кнопка получения награды.
          </div>
          <button type="button" id="bot_pv_click" class="btn" style="width:100%;background:#f0c419;color:#0d2f21;font-weight:700;min-height:42px;margin-bottom:8px">
            1. Перейти по рекламной ссылке
          </button>
          <div id="bot_pv_status" style="font-size:12px;color:#fef08a;text-align:center">Сначала выполните переход по кнопке выше</div>
        </div>
        <div class="row" style="gap:8px;justify-content:flex-end">
          <button type="button" id="bot_pv_cancel" class="btn alt sm" style="min-height:42px">Отмена</button>
          <button type="button" id="bot_pv_done" class="btn sm" disabled style="min-height:42px;opacity:0.55">Подождите (${remaining}с)</button>
        </div>
        <div class="small muted" style="margin-top:8px;font-size:11px">Чтобы отправлять реальные посты в Telegram, укажите Publisher Token, числовой Block ID и подключите Webhook в Админке → Настройки.</div>
      </div>
    `;

    modal(html, (el, close) => {
      const closeModal = typeof close === 'function' ? close : () => el.remove();
      const timerBadge = el.querySelector('#bot_pv_timer') as HTMLElement;
      const clickBtn = el.querySelector('#bot_pv_click') as HTMLButtonElement;
      const statusEl = el.querySelector('#bot_pv_status') as HTMLElement;
      const doneBtn = el.querySelector('#bot_pv_done') as HTMLButtonElement;
      const cancelBtn = el.querySelector('#bot_pv_cancel') as HTMLButtonElement;

      const syncState = () => {
        if (remaining <= 0 && clickedAd) {
          doneBtn.disabled = false;
          doneBtn.style.opacity = '1';
          doneBtn.textContent = '2. Получить награду';
        } else if (remaining <= 0 && !clickedAd) {
          doneBtn.disabled = true;
          doneBtn.style.opacity = '0.55';
          doneBtn.textContent = 'Нажмите кнопку перехода выше';
        } else {
          doneBtn.disabled = true;
          doneBtn.style.opacity = '0.55';
          doneBtn.textContent = `Подождите (${remaining}с)`;
        }
      };

      clickBtn.onclick = () => {
        clickedAd = true;
        clickBtn.textContent = '1. Переход выполнен ✓';
        clickBtn.style.background = '#bbf7d0';
        statusEl.textContent = 'Кнопка награды активирована ✓';
        statusEl.style.color = '#86efac';
        syncState();
      };

      timerId = setInterval(() => {
        remaining = Math.max(0, remaining - 1);
        if (timerBadge) timerBadge.textContent = remaining > 0 ? `${remaining} сек` : 'Готово';
        syncState();
        if (remaining <= 0) {
          clearInterval(timerId);
          timerId = null;
        }
      }, 1000);

      cancelBtn.onclick = () => {
        closeModal();
        finishResolve(null);
      };

      doneBtn.onclick = async () => {
        doneBtn.disabled = true;
        doneBtn.textContent = 'Проверка…';
        try {
          const completed = await api('/ads/bot/complete', { sessionToken, clicked: clickedAd });
          closeModal();
          if (completed?.alreadyCredited) {
            finishResolve({ blockKey, clicked: true, alreadyCredited: true, creditResult: completed.creditResult });
          } else {
            finishResolve({ adProof: completed.adProof, blockKey, clicked: true });
          }
        } catch (err: any) {
          toast(err?.message || 'Ошибка подтверждения бот-рекламы', true);
          doneBtn.disabled = false;
          syncState();
        }
      };

      observer = new MutationObserver(() => {
        if (!document.body.contains(el)) finishResolve(null);
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  });
}

// ─── Club Tab: Sponsors + RFS Bonus ───────────────────────────────────────────
let sponsorTimerHandle: any = null;

export function renderClubSponsorsTab(cb: HTMLElement, c: any, reloadClub: () => void) {
  const { api, e, toast, S, getClubTid } = B();
  const sp = c.sponsors;
  if (!sp) {
    cb.innerHTML = '<div class="panel">Данные спонсоров недоступны.</div>';
    return;
  }
  const teamParam = S.me?.role === 'admin' ? { teamId: getClubTid() } : {};
  const pct = Math.min(100, Math.round((sp.totalViews / sp.totalRequired) * 100));

  const nowSp = Date.now();
  const sponsorCards = sp.sponsors
    .map((s: any) => {
      const done = s.views >= s.maxViews;
      const cdTarget = Number(s.nextAvailableAt || 0);
      const inCd = !done && cdTarget > nowSp;
      const btnDisabled = done || inCd;
      return `
      <div class="panel" style="margin-bottom:0;display:flex;flex-direction:column;justify-content:space-between;border-top:3px solid ${s.accentColor}">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:6px">
            <div>
              <div style="font:700 16px Unbounded,sans-serif">${e(s.name)}</div>
              <div class="small muted">${e(s.tagline)}</div>
            </div>
            <div style="font-variant-numeric:tabular-nums;font-weight:700;font-size:15px;color:#15803d;white-space:nowrap">+${fmtEuro(s.rewardEur)}</div>
          </div>
          <div class="small" style="margin-bottom:10px;line-height:1.4">${e(s.description)}</div>
          <div class="small muted" style="margin-bottom:10px;font-variant-numeric:tabular-nums">
            ${e(s.formatLabel)} · Одобрение 95/5 · Блок: <code>${e(s.blockId)}</code>
          </div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:4px;font-variant-numeric:tabular-nums">
            <span>Показы за сутки</span>
            <span>${s.views} / ${s.maxViews} (одобрено: ${s.approvedCount}${s.declinedCount ? `, отказ: ${s.declinedCount}` : ''})</span>
          </div>
          <div style="height:7px;background:var(--soft);border-radius:99px;overflow:hidden;margin-bottom:12px">
            <div style="height:100%;width:${Math.round((s.views / s.maxViews) * 100)}%;background:${s.accentColor}"></div>
          </div>
          <button class="btn" data-sp-ask="${e(s.id)}" data-sp-block="${e(s.blockKey)}" data-sp-name="${e(s.name)}" ${btnDisabled ? 'disabled' : ''} style="width:100%;min-height:44px;font-variant-numeric:tabular-nums;${btnDisabled ? 'opacity:0.6' : ''}">
            ${done
              ? `Лимит ${s.maxViews}/${s.maxViews} выполнен`
              : inCd
                ? `<span data-sp-cd="${cdTarget}">Перерыв ${fmtShortCooldown(cdTarget - nowSp)}</span>`
                : `Попросить деньги (${fmtEuro(s.rewardEur)})`}
          </button>
        </div>
      </div>`;
    })
    .join('');

  const rfsCdTarget = Number(sp.rfsNextAvailableAt || 0);
  const rfsInCd = sp.rfsUnlocked && sp.rfsExtraViews < sp.rfsMaxViews && rfsCdTarget > nowSp;
  const rfsDisabled = !sp.rfsUnlocked || sp.rfsExtraViews >= sp.rfsMaxViews || rfsInCd;

  cb.innerHTML = `
    <div class="panel">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px">
        <div>
          <h2 style="margin:0 0 4px">Спонсорская программа клуба</h2>
          <div class="small muted">Запросите финансирование у 4 спонсоров (одобрение 95/5). Комбо из 35 показов (10 + 10 + 10 + 5) открывает бонус от РФС. Перерыв между показами — 2 мин.</div>
        </div>
        <div style="text-align:right;font-variant-numeric:tabular-nums">
          <div class="small muted">Общий сброс (24 часа)</div>
          <div id="sp_reset_timer" style="font:700 18px Unbounded,sans-serif;color:var(--deep)">${sp.resetAt ? fmtCountdown(sp.remainingMs) : 'Цикл не начат'}</div>
        </div>
      </div>

      <div style="background:var(--soft);border-radius:10px;padding:12px 14px;border:1px solid var(--line);margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;margin-bottom:6px;font-variant-numeric:tabular-nums">
          <span>Прогресс до бонуса РФС</span>
          <span>${sp.totalViews} / ${sp.totalRequired} реклам · Заработано за сутки: ${fmtEuro(sp.earnedEurCycle + sp.rfsEarnedEur)}</span>
        </div>
        <div style="height:10px;background:#dce6de;border-radius:99px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:var(--green);transition:width 0.3s"></div>
        </div>
        <div class="small muted" style="margin-top:6px">
          Важно: если не успеть посмотреть все ${sp.totalRequired} реклам за 24 часа с момента первого просмотра (даже если не хватило 1 рекламы), прогресс сбросится на 0/${sp.totalRequired}.
        </div>
      </div>

      <div class="sp-cards-grid">${sponsorCards}</div>
    </div>

    <div class="panel" style="border:1.5px solid ${sp.rfsUnlocked ? '#15803d' : 'var(--line)'};background:${sp.rfsUnlocked ? '#f0fdf4' : 'var(--panel)'}">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px">
        <div style="flex:1;min-width:240px">
          <h3 style="margin:0 0 4px">Бонус от РФС — Премиум-финансирование</h3>
          <div class="small" style="line-height:1.45">
            ${sp.rfsUnlocked
              ? `Все ${sp.totalRequired} реклам просмотрены! ${sp.rfsClaimed
                  ? `Бонус активирован. Каждая дополнительная реклама в этом блоке приносит +€1 000 в бюджет клуба (просмотрено: ${sp.rfsExtraViews}/${sp.rfsMaxViews}, заработано: ${fmtEuro(sp.rfsEarnedEur)}).`
                  : 'Нажмите кнопку и посмотрите 1 бонусную рекламу РФС, чтобы получить +€1 000 и открыть режим выплат по €1 000 за каждый следующий показ до 24-часового сброса!'}`
              : `Откроется после просмотра всех ${sp.totalRequired} реклам у 4 спонсоров (осталось ${Math.max(0, sp.totalRequired - sp.totalViews)}). После активации каждая дополнительная реклама приносит по €1 000 до конца 24-часового цикла.`}
          </div>
          <div class="small muted" style="margin-top:4px">Рекламный блок Adsgram: <code>${e(sp.rfsBlockId)}</code> · Перерыв между показами: 2 мин</div>
        </div>
        <button class="btn" id="sp_rfs_btn" ${rfsDisabled ? 'disabled' : ''} style="min-height:46px;font-variant-numeric:tabular-nums;${rfsDisabled ? 'opacity:0.55' : ''}">
          ${!sp.rfsUnlocked
            ? `Заблокировано (${sp.totalViews}/${sp.totalRequired})`
            : sp.rfsExtraViews >= sp.rfsMaxViews
              ? 'Лимит блока 30/30 исчерпан'
              : rfsInCd
                ? `<span data-sp-cd="${rfsCdTarget}">Перерыв ${fmtShortCooldown(rfsCdTarget - nowSp)}</span>`
                : sp.rfsClaimed
                  ? 'Смотреть рекламу РФС (+€1 000)'
                  : 'Получить бонус от РФС (+€1 000)'}
        </button>
      </div>
    </div>

    <div class="panel">
      <h3 style="margin:0 0 10px">История обращений к спонсорам и РФС</h3>
      ${sp.history.length
        ? `<div class="wrap"><table><thead><tr><th class="l">Источник</th><th class="l">Решение</th><th>Сумма</th><th class="l">Время</th></tr></thead><tbody>
          ${sp.history.map((h: any) => `
            <tr>
              <td class="l"><b>${e(h.sponsorName)}</b></td>
              <td class="l">${h.approved ? '<span style="color:#15803d;font-weight:600">Одобрено</span>' : '<span style="color:#b91c1c;font-weight:600">Отказ (5%)</span>'}</td>
              <td style="font-variant-numeric:tabular-nums">${h.approved ? `+${fmtEuro(h.amount)}` : '€0'}</td>
              <td class="l small muted">${new Date(h.date).toLocaleString('ru-RU')}</td>
            </tr>`).join('')}
        </tbody></table></div>`
        : '<div class="small muted">Обращений в этом цикле пока нет.</div>'}
    </div>
  `;

  if (sponsorTimerHandle) clearInterval(sponsorTimerHandle);
  const hasSpCd = !!cb.querySelector('[data-sp-cd]');
  if (sp.resetAt || hasSpCd) {
    sponsorTimerHandle = setInterval(() => {
      const el = document.getElementById('sp_reset_timer');
      if (!el) {
        clearInterval(sponsorTimerHandle);
        return;
      }
      const nowTick = Date.now();
      let needReload = false;
      if (sp.resetAt) {
        const left = sp.resetAt - nowTick;
        if (left > 0) el.textContent = fmtCountdown(left);
        else {
          el.textContent = 'Сброс…';
          needReload = true;
        }
      }
      cb.querySelectorAll('[data-sp-cd]').forEach((cdEl) => {
        const target = Number((cdEl as HTMLElement).dataset.spCd || 0);
        const rem = target - nowTick;
        if (rem > 0) {
          cdEl.textContent = `Перерыв ${fmtShortCooldown(rem)}`;
        } else {
          needReload = true;
        }
      });
      if (needReload) {
        clearInterval(sponsorTimerHandle);
        setTimeout(() => reloadClub(), 500);
      }
    }, 1000);
  }

  cb.querySelectorAll('[data-sp-ask]').forEach((btn) => {
    (btn as HTMLButtonElement).onclick = async () => {
      const sponsorId = (btn as HTMLElement).dataset.spAsk!;
      const blockKey = (btn as HTMLElement).dataset.spBlock!;
      const spName = (btn as HTMLElement).dataset.spName!;
      const adRes = blockKey === 'bot_sponsor'
        ? await runAdsgramBotBlock('bot_sponsor', `Запрос к спонсору «${spName}»`, 'Перейдите по рекламе в сообщении бота (вероятность одобрения 95/5).')
        : await runAdsgramBlock(blockKey, `Запрос к спонсору «${spName}»`, 'После просмотра спонсор рассмотрит заявку (вероятность одобрения 95/5).');
      if (!adRes) return;
      if ((adRes as any).alreadyCredited && (adRes as any).creditResult) {
        const cr = (adRes as any).creditResult;
        toast(cr.message || 'Заявка спонсору обработана!', !cr.approved);
        reloadClub();
        return;
      }
      try {
        const res = await api('/club/sponsors/request', { ...teamParam, sponsorId, adProof: adRes.adProof });
        toast(res.message, !res.approved);
        reloadClub();
      } catch (err: any) {
        toast(err?.message || 'Ошибка обращения к спонсору', true);
      }
    };
  });

  const rfsBtn = document.getElementById('sp_rfs_btn') as HTMLButtonElement | null;
  if (rfsBtn && !rfsBtn.disabled) {
    rfsBtn.onclick = async () => {
      const adRes = await runAdsgramBlock('rfs_bonus', 'Бонус от РФС (+€1 000)', `Премиум-показ после выполнения ${sp.totalRequired}/${sp.totalRequired} реклам спонсоров.`);
      if (!adRes) return;
      try {
        const res = await api('/club/sponsors/rfs-claim', { ...teamParam, adProof: adRes.adProof });
        toast(res.message);
        reloadClub();
      } catch (err: any) {
        toast(err?.message || 'Ошибка получения бонуса РФС', true);
      }
    };
  }
}

// ─── Predictions Page (#/predictions) ─────────────────────────────────────────
let PRED_SUBTAB: 'matches' | 'leagues' | 'history' = 'matches';
let SELECTED_LEAGUE_ID = 'global';
let SELECTED_STAKE = 1;
let PRED_COMP_FILTER = 'all';
let PRED_SEARCH = '';
let COUPON_EXPANDED = true;
const OPEN_MARKETS_FIXTURES = new Set<string>();
const FIXTURE_ACTIVE_GROUP = new Map<string, string>();

interface CouponItem {
  key: string;
  fixtureId: string;
  matchLabel: string;
  market: string;
  marketTitle: string;
  pick: string;
  label: string;
  odd: number;
  stake: number;
  exactHome?: number;
  exactAway?: number;
}
let COUPON_ITEMS: CouponItem[] = [];

function fmtCoins(n: any): string {
  const num = Math.round(Number(n || 0) * 100) / 100;
  return Number.isInteger(num) ? String(num) : num.toFixed(2).replace(/\.?0+$/, '');
}

export async function renderPredictionsPage(app: HTMLElement) {
  ensureExtStyles();
  const { api, e, toast } = B();
  app.innerHTML = '<div class="panel">Загрузка линии прогнозов…</div>';
  let data: any;
  try {
    data = await api('/predictions');
  } catch (err: any) {
    app.innerHTML = `<div class="panel warn">${e(err?.message || 'Ошибка загрузки прогнозов')}</div>`;
    return;
  }

  const wallet = data.wallet;
  const prof = data.profile || {};
  const tgMeta = getTgUserMeta();
  const viewerName = tgMeta.name || prof.displayName || '';
  const viewerPhoto = tgMeta.photo || prof.photoUrl || '';

  // Map fixtureId -> list of placed predictions, and placed key set for O(1) lookup
  const myPredsByFixture = new Map<string, any[]>();
  const placedByKey = new Map<string, any>();
  for (const p of data.myPredictions || []) {
    if (!myPredsByFixture.has(p.fixtureId)) myPredsByFixture.set(p.fixtureId, []);
    myPredsByFixture.get(p.fixtureId)!.push(p);
    const mk = p.market || 'outcome';
    const key = mk === 'exact_score'
      ? `${p.fixtureId}|${mk}|${p.exactHome}:${p.exactAway}`
      : `${p.fixtureId}|${mk}|${p.pick}`;
    placedByKey.set(key, p);
  }

  // Prune coupon items for fixtures no longer open or already placed
  const openFixSet = new Set<string>((data.fixtures || []).map((f: any) => f.id));
  COUPON_ITEMS = COUPON_ITEMS.filter((it) => openFixSet.has(it.fixtureId) && !placedByKey.has(it.key));

  const couponKeySet = new Set<string>(COUPON_ITEMS.map((it) => it.key));

  const renderOddBtn = (
    fid: string,
    matchLabel: string,
    marketId: string,
    marketTitle: string,
    shortLbl: string,
    odd: number,
    pick: string,
    fullLabel: string
  ) => {
    const itemKey = `${fid}|${marketId}|${pick}`;
    const placed = placedByKey.get(itemKey);
    const inCoupon = couponKeySet.has(itemKey);
    return `
      <button type="button"
        class="pred-odd-btn ${placed ? 'betted' : inCoupon ? 'on' : ''}"
        ${placed ? 'disabled title="Ставка уже принята"' : ''}
        data-sel-bet="${e(fid)}"
        data-match-label="${e(matchLabel)}"
        data-market="${e(marketId)}"
        data-market-title="${e(marketTitle)}"
        data-pick="${e(pick)}"
        data-label="${e(fullLabel)}"
        data-odd="${odd}">
        <span class="pred-odd-k">${placed ? `✓ ${fmtCoins(placed.stake)}м · ` : ''}${e(shortLbl)}</span>
        <span class="pred-odd-v">${Number(odd).toFixed(2)}</span>
      </button>`;
  };

  const renderMarketBlock = (f: any, m: any, matchLabel: string) => {
    if (!m || !Array.isArray(m.options) || !m.options.length) return '';
    const colsClass = m.options.length === 2
      ? 'pred-line-2'
      : (m.id === 'combo_w_total' || m.id === 'combo_w_btts' || m.id === 'ht_ft')
        ? 'pred-line-4'
        : 'pred-line-3';
    return `
      <div>
        <div class="pred-sec-lbl">
          <span>${e(m.title)}</span>
          <span style="font-weight:400;font-size:11px;color:#7a9183">${e(m.subtitle || '')}</span>
        </div>
        <div class="${colsClass}">
          ${m.options.map((o: any) =>
            renderOddBtn(f.id, matchLabel, m.id, m.title, o.shortLabel, o.odd, o.pick, o.label)
          ).join('')}
        </div>
      </div>`;
  };

  const renderMatchesTab = () => {
    const allFx: any[] = data.fixtures || [];
    if (!allFx.length) {
      return '<div class="panel"><div class="empty">На данный момент нет открытых матчей для прогноза. Как только появятся новые туры РПЛ, Кубка или товарищеские матчи — они появятся здесь.</div></div>';
    }

    const q = PRED_SEARCH.trim().toLowerCase();
    const filtered = allFx.filter((f) => {
      if (PRED_COMP_FILTER !== 'all' && f.comp !== PRED_COMP_FILTER) return false;
      if (q) {
        const txt = `${f.homeName} ${f.awayName} ${f.label} ${f.compName}`.toLowerCase();
        if (!txt.includes(q)) return false;
      }
      return true;
    });

    const compCounts: Record<string, number> = { all: allFx.length };
    for (const f of allFx) compCounts[f.comp] = (compCounts[f.comp] || 0) + 1;
    const compPills = [
      { id: 'all', name: 'Все' },
      { id: 'rpl', name: 'РПЛ' },
      { id: 'cup', name: 'Кубок' },
      { id: 'supercup', name: 'Суперкубок' },
      { id: 'friendly_match', name: 'Товарищ.' },
    ].filter((cp) => cp.id === 'all' || (compCounts[cp.id] || 0) > 0);

    return `
      <div class="pred-filter-row">
        <div class="pred-comp-pills">
          ${compPills.map((cp) => `
            <button type="button" class="pred-comp-pill ${PRED_COMP_FILTER === cp.id ? 'on' : ''}" data-pred-comp="${e(cp.id)}">${e(cp.name)} (${compCounts[cp.id] || 0})</button>
          `).join('')}
        </div>
        <input id="pred_search_inp" class="pred-search-input" type="search" placeholder="Поиск команды…" value="${e(PRED_SEARCH)}">
      </div>

      ${!filtered.length
        ? '<div class="panel"><div class="empty">По выбранному фильтру матчей не найдено.</div></div>'
        : `<div class="pred-grid" style="${COUPON_ITEMS.length ? 'padding-bottom:130px' : ''}">
        ${filtered.map((f: any) => {
          const matchLabel = `${f.homeName} — ${f.awayName}`;
          const placedList = myPredsByFixture.get(f.id) || [];
          const fxMarkets: any[] = Array.isArray(f.markets) && f.markets.length ? f.markets : (data.markets || []);
          const byId = new Map<string, any>(fxMarkets.map((m) => [m.id, m]));

          const mOutcome = byId.get('outcome');
          const mDouble = byId.get('double_chance');
          const mHcp0 = byId.get('hcp_0');
          const mTotal25 = byId.get('total_goals');
          const mBtts = byId.get('btts');

          const quickScores: Array<{ h: number; a: number; score: string; odd: number }> = f.quickScores || [];
          const isExtraOpen = OPEN_MARKETS_FIXTURES.has(f.id);
          const activeGroup = FIXTURE_ACTIVE_GROUP.get(f.id) || 'main';
          const probs = f.probs || { p1: 36, pX: 28, p2: 36 };
          const totalOutcomesCount = fxMarkets.reduce((s, m) => s + (m.id === 'exact_score' || m.id === 'specials' ? 0 : (m.options?.length || 0)), 0) + quickScores.length;

          const groupTabs = [
            { id: 'main', label: 'Форы и Тоталы' },
            { id: 'goals', label: 'ИТ и Комбо' },
            { id: 'halves', label: 'Таймы' },
            { id: 'stats', label: 'Статистика и События' },
            { id: 'exact', label: 'Точный счёт' },
          ];

          const groupMarkets = fxMarkets.filter((m) =>
            m.group === activeGroup &&
            m.id !== 'exact_score' &&
            m.id !== 'specials' &&
            !(activeGroup === 'main' && (m.id === 'outcome' || m.id === 'double_chance' || m.id === 'total_goals' || m.id === 'btts'))
          );

          const customH = Math.max(0, Math.min(15, Number((document.getElementById(`es_h_${f.id}`) as HTMLInputElement)?.value ?? 1)));
          const customA = Math.max(0, Math.min(15, Number((document.getElementById(`es_a_${f.id}`) as HTMLInputElement)?.value ?? 1)));
          const customOdd = f.exactMatrix?.[customH]?.[customA] ?? (6.5 + (customH + customA) * 2.5);

          return `
          <div class="pred-card" data-fx-card="${e(f.id)}">
            <div class="pred-card-head">
              <span><b>${e(f.compName)}</b> · ${e(f.label)}</span>
              <span>${e(f.date)} · ${e(f.time)}</span>
            </div>

            <div class="pred-teams">
              <div class="pred-team">
                ${f.homeLogo ? `<img src="${e(f.homeLogo)}" alt="" class="pred-team-logo">` : ''}
                <span class="pred-team-name">${e(f.homeName)}</span>
              </div>
              <span class="pred-vs">vs</span>
              <div class="pred-team away">
                <span class="pred-team-name">${e(f.awayName)}</span>
                ${f.awayLogo ? `<img src="${e(f.awayLogo)}" alt="" class="pred-team-logo">` : ''}
              </div>
            </div>

            <div class="pred-prob-wrap">
              <div class="pred-prob-bar" title="Оценка шансов линии">
                <div class="pred-prob-1" style="width:${probs.p1}%"></div>
                <div class="pred-prob-x" style="width:${probs.pX}%"></div>
                <div class="pred-prob-2" style="width:${probs.p2}%"></div>
              </div>
              <div class="pred-prob-meta">
                <span>Шансы: П1 ${Math.round(probs.p1)}% · Х ${Math.round(probs.pX)}% · П2 ${Math.round(probs.p2)}%</span>
                <span>xG: ${Number(f.expectedGoals?.home || 1.2).toFixed(2)} – ${Number(f.expectedGoals?.away || 1.1).toFixed(2)}${f.refereeName ? ` · Судья: ${e(f.refereeName)}` : ''}</span>
              </div>
            </div>

            ${mOutcome ? `
              <div>
                <div class="pred-sec-lbl"><span>Основной исход (1 Х 2)</span></div>
                <div class="pred-line-3">
                  ${mOutcome.options.map((o: any) =>
                    renderOddBtn(f.id, matchLabel, 'outcome', 'Исход матча', o.shortLabel, o.odd, o.pick, o.label)
                  ).join('')}
                </div>
              </div>` : ''}

            ${mDouble ? `
              <div>
                <div class="pred-sec-lbl"><span>Двойной шанс</span></div>
                <div class="pred-line-3">
                  ${mDouble.options.map((o: any) =>
                    renderOddBtn(f.id, matchLabel, 'double_chance', 'Двойной шанс', o.shortLabel, o.odd, o.pick, o.label)
                  ).join('')}
                </div>
              </div>` : ''}

            <div class="pred-quick-split">
              ${mTotal25 ? `
                <div>
                  <div class="pred-sec-lbl"><span>Тотал 2.5</span></div>
                  <div class="pred-line-2">
                    ${mTotal25.options.map((o: any) =>
                      renderOddBtn(f.id, matchLabel, 'total_goals', 'Тотал 2.5', o.shortLabel, o.odd, o.pick, o.label)
                    ).join('')}
                  </div>
                </div>` : ''}
              ${mBtts ? `
                <div>
                  <div class="pred-sec-lbl"><span>Обе забьют</span></div>
                  <div class="pred-line-2">
                    ${mBtts.options.map((o: any) =>
                      renderOddBtn(f.id, matchLabel, 'btts', 'Обе забьют', o.shortLabel === 'ОЗ Да' ? 'Да' : 'Нет', o.odd, o.pick, o.label)
                    ).join('')}
                  </div>
                </div>` : ''}
            </div>

            ${mHcp0 ? `
              <div>
                <div class="pred-sec-lbl"><span>Фора (0) · возврат при ничьей</span></div>
                <div class="pred-line-2">
                  ${mHcp0.options.map((o: any) =>
                    renderOddBtn(f.id, matchLabel, 'hcp_0', 'Фора (0)', o.shortLabel, o.odd, o.pick, o.label)
                  ).join('')}
                </div>
              </div>` : ''}

            <button type="button" class="pred-more-btn" data-toggle-mk="${e(f.id)}">
              <span>Вся роспись БК (${totalOutcomesCount} пунктов: Форы, Тоталы, ИТ, Таймы, ЖК, Угловые, Счёт)</span>
              <span>${isExtraOpen ? 'Скрыть ▲' : 'Открыть ▼'}</span>
            </button>

            ${isExtraOpen ? `
              <div class="pred-more-panel">
                <div class="pred-mkt-tabs">
                  ${groupTabs.map((gt) => `
                    <button type="button" class="pred-mkt-tab ${activeGroup === gt.id ? 'on' : ''}" data-fx-group="${e(f.id)}" data-group="${e(gt.id)}">${e(gt.label)}</button>
                  `).join('')}
                </div>

                ${activeGroup !== 'exact'
                  ? groupMarkets.map((m) => renderMarketBlock(f, m, matchLabel)).join('')
                  : `<div>
                      <div class="pred-sec-lbl">
                        <span>Популярные счета</span>
                        <span style="font-weight:400;font-size:11px;color:#7a9183">Можно выбрать несколько вариантов</span>
                      </div>
                      <div class="pred-es-grid">
                        ${quickScores.map((qs) => {
                          const k = `${f.id}|exact_score|${qs.h}:${qs.a}`;
                          const placed = placedByKey.get(k);
                          const inCoupon = couponKeySet.has(k);
                          return `
                            <button type="button"
                              class="pred-odd-btn ${placed ? 'betted' : inCoupon ? 'on' : ''}"
                              ${placed ? 'disabled' : ''}
                              data-es-pick="${e(f.id)}"
                              data-match-label="${e(matchLabel)}"
                              data-eh="${qs.h}"
                              data-ea="${qs.a}"
                              data-odd="${qs.odd}">
                              <span class="pred-odd-k">${placed ? '✓ ' : ''}${qs.score}</span>
                              <span class="pred-odd-v">${Number(qs.odd).toFixed(2)}</span>
                            </button>`;
                        }).join('')}
                      </div>
                      <div class="pred-es-custom">
                        <span class="small muted">Свой счёт:</span>
                        <input id="es_h_${e(f.id)}" class="pred-inline-input" type="number" min="0" max="15" value="${customH}" data-es-inp="${e(f.id)}">
                        <b>:</b>
                        <input id="es_a_${e(f.id)}" class="pred-inline-input" type="number" min="0" max="15" value="${customA}" data-es-inp="${e(f.id)}">
                        <button type="button" class="btn alt sm" data-es-custom="${e(f.id)}" data-match-label="${e(matchLabel)}" style="min-height:36px">
                          В купон (<span id="es_odd_lbl_${e(f.id)}">×${Number(customOdd).toFixed(2)}</span>)
                        </button>
                      </div>
                    </div>`}
              </div>` : ''}

            ${placedList.length ? `
              <div class="pred-active-bets">
                <div class="small muted" style="font-weight:600;margin-bottom:2px">Ваши ставки на матч (${placedList.length}):</div>
                ${placedList.map((pr: any) => `
                  <div class="pred-active-row">
                    <span>✓ ${e(pr.pickLabel)}${pr.market === 'outcome' && pr.exactHome !== null && pr.exactAway !== null ? ` (бонус ${pr.exactHome}:${pr.exactAway})` : ''}</span>
                    <span><b>×${Number(pr.odd || 2).toFixed(2)}</b> · ${fmtCoins(pr.stake)} мон.</span>
                  </div>
                `).join('')}
              </div>` : ''}
          </div>`;
        }).join('')}
      </div>`}
    `;
  };

  const renderLeaguesTab = () => {
    const activeLeague = SELECTED_LEAGUE_ID === 'global'
      ? null
      : (data.leagues || []).find((l: any) => l.id === SELECTED_LEAGUE_ID);
    const board = activeLeague ? activeLeague.leaderboard : data.leaderboard;

    return `
      <div class="grid g2" style="margin-bottom:14px">
        <div class="panel" style="margin-bottom:0">
          <h3 style="margin:0 0 8px">Создать свою лигу пользователей</h3>
          <div class="row" style="gap:8px;flex-wrap:wrap">
            <input id="lg_name" placeholder="Название лиги (например: Друзья Спартака)" style="flex:1;min-width:190px">
            <button class="btn sm" id="lg_create_btn" style="min-height:42px">Создать лигу</button>
          </div>
          <input id="lg_desc" placeholder="Описание лиги (необязательно)" style="width:100%;margin-top:8px">
        </div>
        <div class="panel" style="margin-bottom:0">
          <h3 style="margin:0 0 8px">Вступить в лигу по коду</h3>
          <div class="row" style="gap:8px;flex-wrap:wrap">
            <input id="lg_join_code" placeholder="Код приглашения (например: A1B2C3)" style="flex:1;min-width:170px">
            <button class="btn alt sm" id="lg_join_btn" style="min-height:42px">Вступить</button>
          </div>
          <div class="small muted" style="margin-top:8px">Выберите лигу ниже для просмотра её таблицы:</div>
          <div class="row" style="gap:6px;flex-wrap:wrap;margin-top:6px">
            <button class="btn sm ${SELECTED_LEAGUE_ID === 'global' ? '' : 'alt'}" data-sel-lg="global">Общая лига (${data.leaderboard.length})</button>
            ${(data.leagues || []).map((lg: any) => `
              <button class="btn sm ${SELECTED_LEAGUE_ID === lg.id ? '' : 'alt'}" data-sel-lg="${e(lg.id)}">${e(lg.name)} (${lg.membersCount})</button>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="panel">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px">
          <div>
            <h3 style="margin:0">${activeLeague ? e(activeLeague.name) : 'Таблица лидеров Лиги прогнозов'}</h3>
            <div class="small muted">${activeLeague ? `Код приглашения: <b>${e(activeLeague.code)}</b>${activeLeague.description ? ' · ' + e(activeLeague.description) : ''}` : 'Имя и аватарка автоматически подтягиваются из вашего Telegram.'}</div>
          </div>
          ${activeLeague ? (activeLeague.isMember
            ? `<button class="btn alt sm" id="lg_leave_btn" data-lid="${e(activeLeague.id)}">Выйти из лиги</button>`
            : `<button class="btn sm" id="lg_join_direct" data-lid="${e(activeLeague.id)}">Вступить в лигу</button>`) : ''}
        </div>
        <div class="wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th class="l">Участник</th>
                <th>Угадал</th>
                <th>Не угадал</th>
                <th>КПД</th>
                <th>Очки</th>
              </tr>
            </thead>
            <tbody style="font-variant-numeric:tabular-nums">
              ${board.map((r: any) => {
                const subBits: string[] = [];
                if (r.teamName) subBits.push(r.teamName);
                if (r.telegramUsername) subBits.push(`@${r.telegramUsername}`);
                const subText = subBits.join(' · ') || 'Участник лиги';
                const isMe = r.actorKey === data.actorKey;
                return `
                <tr style="${isMe ? 'background:#f0fdf4;' : ''}">
                  <td><b>${r.rank <= 3 ? (r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : '🥉') : r.rank}</b></td>
                  <td class="l">
                    <div style="display:flex;align-items:center;gap:9px">
                      ${r.photoUrl
                        ? `<img src="${e(r.photoUrl)}" alt="" referrerpolicy="no-referrer" style="width:34px;height:34px;border-radius:50%;object-fit:cover;flex-shrink:0;border:1px solid var(--line)" onerror="this.style.display='none'">`
                        : r.teamLogo
                          ? `<img src="${e(r.teamLogo)}" alt="" style="width:30px;height:30px;object-fit:contain;flex-shrink:0">`
                          : `<div style="width:34px;height:34px;border-radius:50%;background:var(--deep);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${e((r.displayName || 'У').slice(0, 1).toUpperCase())}</div>`}
                      <div>
                        <div style="font-weight:600">${e(r.displayName)}${isMe ? ' (вы)' : ''}${r.cups > 0 ? ` <span title="Кубок победителя Лиги прогнозов" style="margin-left:4px">🏆${r.cups > 1 ? '×' + r.cups : ''}</span>` : ''}</div>
                        <div class="small muted">${e(subText)}</div>
                      </div>
                    </div>
                  </td>
                  <td style="color:#15803d;font-weight:700">${r.correct}</td>
                  <td style="color:#b91c1c">${r.wrong}</td>
                  <td><b>${r.kpd}%</b></td>
                  <td><b>${r.points}</b></td>
                </tr>`;
              }).join('') || '<tr><td colspan="6" class="empty">Участников пока нет</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  const renderHistoryTab = () => `
    <div class="panel">
      <h3 style="margin:0 0 10px">Мои ставки и прогнозы (${(data.myPredictions || []).length})</h3>
      ${(data.myPredictions || []).length
        ? `<div class="wrap"><table><thead><tr><th class="l">Матч</th><th class="l">Событие и выбор</th><th>Коэф.</th><th>Ставка</th><th class="l">Результат</th><th>Начисление</th></tr></thead><tbody style="font-variant-numeric:tabular-nums">
          ${data.myPredictions.map((p: any) => `
            <tr>
              <td class="l"><b>${e(p.homeName)} — ${e(p.awayName)}</b><div class="small muted">${e(p.label)} · ${e(p.date)}</div></td>
              <td class="l">
                <div style="font-weight:600">${e(p.pickLabel || p.pick)}${p.market === 'outcome' && p.exactHome !== null && p.exactAway !== null ? ` (бонус ${p.exactHome}:${p.exactAway})` : ''}</div>
                <div class="small muted">${e(p.marketTitle || 'Исход матча')}</div>
              </td>
              <td><b>×${Number(p.odd || 2).toFixed(2)}</b></td>
              <td>${fmtCoins(p.stake)} мон.</td>
              <td class="l">${
                p.status === 'won'
                  ? `<span style="color:#15803d;font-weight:700">Зашёл (${e(p.statSummary || p.actualScore || '')})</span>`
                  : p.status === 'lost'
                    ? `<span style="color:#b91c1c">Не зашёл (${e(p.statSummary || p.actualScore || '')})</span>`
                    : p.status === 'void'
                      ? `<span style="color:#b45309;font-weight:600">Возврат (${e(p.actualScore || 'нет статистики')})</span>`
                      : '<span class="muted">Ожидание матча</span>'
              }</td>
              <td>${
                p.status === 'won'
                  ? `+${p.pointsAwarded} очк. / +${fmtCoins(p.coinsWon)} мон.`
                  : p.status === 'void'
                    ? `+${fmtCoins(p.coinsWon)} мон.`
                    : '—'
              }</td>
            </tr>`).join('')}
        </tbody></table></div>`
        : '<div class="empty">Вы ещё не делали ставок в этом сезоне.</div>'}
    </div>
  `;

  const renderCouponHtml = () => {
    if (!COUPON_ITEMS.length || PRED_SUBTAB !== 'matches') return '';
    const totalStake = COUPON_ITEMS.reduce((s, it) => s + Math.max(1, Number(it.stake || 1)), 0);
    const totalReturn = COUPON_ITEMS.reduce((s, it) => s + Math.max(1, Number(it.stake || 1)) * Number(it.odd || 1), 0);
    const notEnough = totalStake > Number(wallet.coins || 0);

    return `
      <div class="pred-coupon-dock" id="pred_coupon_dock">
        <div class="pred-coupon-head" id="pred_coupon_toggle">
          <div>
            <div style="font-weight:700;font-size:14px">Купон ставок (${COUPON_ITEMS.length} ${COUPON_ITEMS.length === 1 ? 'пункт' : COUPON_ITEMS.length < 5 ? 'пункта' : 'пунктов'})</div>
            <div style="font-size:11.5px;color:#b8d4c2;font-variant-numeric:tabular-nums">
              К оплате: <b>${fmtCoins(totalStake)} мон.</b> · Макс. выплата: <b style="color:#f0c419">${fmtCoins(totalReturn)} мон.</b>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:12px;color:#cde2d4">${COUPON_EXPANDED ? 'Свернуть ▼' : 'Открыть ▲'}</span>
          </div>
        </div>
        ${COUPON_EXPANDED ? `
          <div class="pred-coupon-body">
            <div class="pred-coupon-presets">
              <span>На все пункты:</span>
              ${[1, 2, 3, 5, 10].map((v) => `<button type="button" data-cp-all="${v}">${v} м.</button>`).join('')}
              <button type="button" id="pred_cp_clear" style="margin-left:auto;border-color:rgba(255,140,140,0.4);color:#fecaca">Очистить</button>
            </div>
            ${COUPON_ITEMS.map((it, idx) => {
              const winCoins = Math.round(it.stake * it.odd * 100) / 100;
              const pts = Math.max(1, Math.round(it.stake * it.odd * 1.5));
              return `
                <div class="pred-coupon-item">
                  <div class="pred-coupon-item-top">
                    <div style="min-width:0;flex:1">
                      <div style="font-size:11px;color:#b8d4c2">${e(it.matchLabel)} · ${e(it.marketTitle)}</div>
                      <div style="font-weight:700;font-size:13px;margin-top:1px">${e(it.label)} <span style="color:#f0c419">×${Number(it.odd).toFixed(2)}</span></div>
                    </div>
                    <button type="button" data-cp-del="${idx}" title="Убрать пункт" style="background:none;border:0;color:#d1ded5;font-size:17px;line-height:1;cursor:pointer;padding:2px 4px">×</button>
                  </div>
                  <div class="pred-coupon-stake-row">
                    <div class="pred-coupon-qty">
                      <button type="button" data-cp-step="${idx}" data-delta="-1">−</button>
                      <input type="number" min="1" max="500" value="${it.stake}" data-cp-input="${idx}">
                      <button type="button" data-cp-step="${idx}" data-delta="1">+</button>
                      ${[2, 5, 10].map((q) => `<button type="button" data-cp-set="${idx}" data-val="${q}">${q}</button>`).join('')}
                    </div>
                    <div style="font-size:12px;color:#d6e9dd;text-align:right">
                      Выплата: <b style="color:#f0c419">${fmtCoins(winCoins)} м.</b> <span style="opacity:0.75">(+${pts} очк.)</span>
                    </div>
                  </div>
                </div>`;
            }).join('')}
          </div>
          <div class="pred-coupon-foot">
            ${notEnough
              ? `<div style="font-size:12px;color:#fecaca">Не хватает монет: нужно ${fmtCoins(totalStake)}, на балансе ${fmtCoins(wallet.coins)}. Уменьшите ставки или посмотрите рекламу выше.</div>`
              : ''}
            <button type="button" class="pred-slip-cta" id="pred_cp_submit" style="width:100%;min-height:42px;font-size:13.5px;${notEnough ? 'opacity:0.55;cursor:not-allowed' : ''}" ${notEnough ? 'disabled' : ''}>
              ${COUPON_ITEMS.length === 1
                ? `Поставить за ${fmtCoins(totalStake)} мон.`
                : `Поставить ${COUPON_ITEMS.length} ставок за ${fmtCoins(totalStake)} мон.`}
            </button>
          </div>` : ''}
      </div>`;
  };

  app.innerHTML = `
    <div class="pred-hero">
      <div style="min-width:220px;flex:1">
        <h1 class="pred-hero-title">Прогноз на тур</h1>
        <div class="pred-hero-sub">
          Сезон ${e(data.season)} · Призы Топ-3: 1 место — €1 250 000 + 10 мон. + 🏆 Кубок победителя · 2 место — €500 000 + 5 мон. · 3 место — €250 000 + 3 мон.
        </div>
      </div>
      <div class="pred-hero-right">
        ${viewerName ? `
          <div class="pred-tg-user">
            ${viewerPhoto ? `<img src="${e(viewerPhoto)}" alt="" referrerpolicy="no-referrer" class="pred-tg-ava" onerror="this.style.display='none'">` : ''}
            <div>
              <div style="font-weight:600">${e(viewerName)}</div>
              <div style="font-size:11px;color:#b8d4c2">Отображается в лиге</div>
            </div>
          </div>` : ''}
        <div class="pred-wallet">
          <div class="pred-wallet-lbl">Ваш баланс</div>
          <div class="pred-wallet-val">${fmtCoins(wallet.coins)} мон.</div>
        </div>
      </div>
    </div>

    <div class="pred-ads-panel">
      <div class="pred-ads-head">
        <div class="pred-ads-title-wrap">
          <span class="pred-ads-title-ico" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9.5"/>
              <polygon points="12,7.5 16,10.4 14.5,15 9.5,15 8,10.4"/>
              <line x1="12" y1="2.5" x2="12" y2="7.5"/>
              <line x1="21" y1="9.2" x2="16" y2="10.4"/>
              <line x1="17.8" y1="19.5" x2="14.5" y2="15"/>
              <line x1="6.2" y1="19.5" x2="9.5" y2="15"/>
              <line x1="3" y1="9.2" x2="8" y2="10.4"/>
            </svg>
          </span>
          <div>
            <div class="pred-ads-title">Игровая касса прогнозов</div>
            <div class="pred-ads-sub">5 монет на старте · Каждая ставка оплачивается монетами · Пополняйте баланс через Adsgram</div>
          </div>
        </div>
        <span class="small muted" style="font-weight:600;font-variant-numeric:tabular-nums">
          Сброс (24 ч): <b id="pred_reset_timer">${wallet.resetAt ? fmtCountdown(Math.max(0, wallet.resetAt - Date.now())) : '24:00:00'}</b> · Перерыв между рекламами: <b>2 мин</b>
        </span>
      </div>
      <div class="pred-ads-grid">
        ${data.coinOffers.map((o: any) => {
          const maxV = Number(o.maxViews || 30);
          const pct = Math.min(100, Math.round((Number(o.views || 0) / maxV) * 100));
          const maxed = Number(o.views || 0) >= maxV;
          const cdTarget = Number(o.nextAvailableAt || 0);
          const nowPr = Date.now();
          const inCd = !maxed && cdTarget > nowPr;
          const isFeatured = o.blockKey === 'coins_long';
          const footMeta = o.blockKey === 'coins_short'
            ? { title: 'Быстрый пас', sub: 'Короткий ролик · 5 сек' }
            : o.blockKey === 'coins_banner'
              ? { title: 'Щит у поля', sub: 'Баннер матча · бровка' }
              : o.blockKey === 'bot_coins'
                ? { title: 'Прямой репортаж', sub: 'Репортаж в боте · переход' }
                : { title: 'Перерыв матча', sub: 'Полный ролик · 30 сек' };
          const iconSvg = o.blockKey === 'coins_short'
            ? `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/><path d="M12 2v3"/></svg>`
            : o.blockKey === 'coins_banner'
              ? `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><line x1="12" y1="5" x2="12" y2="19"/><circle cx="12" cy="12" r="2.6"/><path d="M2.5 9.2h2.8v5.6H2.5"/><path d="M21.5 9.2h-2.8v5.6h2.8"/></svg>`
              : o.blockKey === 'bot_coins'
                ? `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 3.5 2.5 11l7 2.5L19 6l-7.5 9 6 4.5 4-16Z"/></svg>`
                : `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55-.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`;
          return `
          <button type="button" class="coin-offer-btn${isFeatured ? ' featured' : ''}" data-earn-coins="${e(o.blockKey)}" ${(maxed || inCd) ? 'disabled' : ''}>
            <div class="coin-offer-top">
              <div class="coin-offer-left">
                <span class="coin-offer-ico" aria-hidden="true">${iconSvg}</span>
                <div style="min-width:0">
                  <div class="coin-offer-name">${e(footMeta.title)}</div>
                  <div class="coin-offer-meta">${e(footMeta.sub)}</div>
                </div>
              </div>
              <span class="coin-offer-reward" ${inCd ? `data-pred-cd="${cdTarget}" style="background:#fef3c7;color:#92400e"` : ''}>${maxed ? 'Лимит' : inCd ? `⏳ ${fmtShortCooldown(cdTarget - nowPr)}` : `+${o.rewardCoins} мон.`}</span>
            </div>
            <div class="coin-offer-foot">
              <div class="coin-offer-track"><div class="coin-offer-fill" style="width:${pct}%"></div></div>
              <span class="coin-offer-count">${o.views}/${maxV}</span>
            </div>
          </button>`;
        }).join('')}
      </div>
    </div>

    <div class="pred-toolbar">
      <div class="pred-tabs">
        <button type="button" data-pred-tab="matches" class="${PRED_SUBTAB === 'matches' ? 'on' : ''}">Линия матчей (${data.fixtures.length})</button>
        <button type="button" data-pred-tab="leagues" class="${PRED_SUBTAB === 'leagues' ? 'on' : ''}">Таблица лидеров (${data.leaderboard.length})</button>
        <button type="button" data-pred-tab="history" class="${PRED_SUBTAB === 'history' ? 'on' : ''}">Мои ставки (${(data.myPredictions || []).length})</button>
      </div>
      ${PRED_SUBTAB === 'matches' ? `
        <div class="pred-stake-bar">
          <span class="pred-stake-lbl">Ставка по умолч.:</span>
          ${[1, 2, 3, 5, 10].map((v) => `
            <button type="button" class="pred-stake-btn ${SELECTED_STAKE === v ? 'on' : ''}" data-stake-val="${v}">${v}</button>
          `).join('')}
        </div>` : ''}
    </div>

    ${PRED_SUBTAB === 'matches' ? renderMatchesTab() : PRED_SUBTAB === 'leagues' ? renderLeaguesTab() : renderHistoryTab()}
    ${renderCouponHtml()}
  `;

  if ((window as any).__predTimerHandle) clearInterval((window as any).__predTimerHandle);
  const hasPredCd = !!app.querySelector('[data-pred-cd]');
  if (wallet.resetAt || hasPredCd) {
    (window as any).__predTimerHandle = setInterval(() => {
      const el = document.getElementById('pred_reset_timer');
      if (!el) {
        clearInterval((window as any).__predTimerHandle);
        return;
      }
      const nowTick = Date.now();
      let needReload = false;
      if (wallet.resetAt) {
        const left = wallet.resetAt - nowTick;
        if (left > 0) el.textContent = fmtCountdown(left);
        else {
          el.textContent = 'Сброс…';
          needReload = true;
        }
      }
      app.querySelectorAll('[data-pred-cd]').forEach((cdEl) => {
        const target = Number((cdEl as HTMLElement).dataset.predCd || 0);
        const rem = target - nowTick;
        if (rem > 0) {
          cdEl.textContent = `⏳ ${fmtShortCooldown(rem)}`;
        } else {
          needReload = true;
        }
      });
      if (needReload) {
        clearInterval((window as any).__predTimerHandle);
        setTimeout(() => renderPredictionsPage(app), 500);
      }
    }, 1000);
  }

  app.querySelectorAll('[data-pred-tab]').forEach((b) => {
    (b as HTMLElement).onclick = () => {
      PRED_SUBTAB = (b as HTMLElement).dataset.predTab as any;
      renderPredictionsPage(app);
    };
  });

  app.querySelectorAll('[data-earn-coins]').forEach((b) => {
    (b as HTMLButtonElement).onclick = async () => {
      const blockKey = (b as HTMLElement).dataset.earnCoins!;
      const label = blockKey === 'coins_short'
        ? '+1 монета (5 сек)'
        : blockKey === 'coins_banner'
          ? '+2 монеты (баннер)'
          : blockKey === 'bot_coins'
            ? '+2 монеты (Прямой репортаж)'
            : '+3 монеты (30 сек)';
      const adRes = blockKey === 'bot_coins'
        ? await runAdsgramBotBlock('bot_coins', `Прямой репортаж: ${label}`, 'Бот отправит рекламный пост в Telegram.')
        : await runAdsgramBlock(blockKey, `Пополнение баланса: ${label}`);
      if (!adRes) return;
      if ((adRes as any).alreadyCredited && (adRes as any).creditResult) {
        toast((adRes as any).creditResult.message || 'Начислено +2 монеты!');
        renderPredictionsPage(app);
        return;
      }
      try {
        const res = await api('/predictions/earn-coins', { blockKey, adProof: adRes.adProof });
        toast(res.message);
        renderPredictionsPage(app);
      } catch (err: any) {
        toast(err?.message || 'Ошибка начисления монет', true);
      }
    };
  });

  // Competition filter & search
  app.querySelectorAll('[data-pred-comp]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      PRED_COMP_FILTER = (b as HTMLElement).dataset.predComp || 'all';
      renderPredictionsPage(app);
    };
  });

  const searchInp = document.getElementById('pred_search_inp') as HTMLInputElement | null;
  if (searchInp) {
    searchInp.oninput = () => {
      PRED_SEARCH = searchInp.value;
      const pos = searchInp.selectionStart ?? PRED_SEARCH.length;
      renderPredictionsPage(app);
      const nextInp = document.getElementById('pred_search_inp') as HTMLInputElement | null;
      if (nextInp) {
        nextInp.focus();
        try { nextInp.setSelectionRange(pos, pos); } catch {}
      }
    };
  }

  // Global default stake switcher (applied to newly picked items)
  app.querySelectorAll('[data-stake-val]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      SELECTED_STAKE = Number((b as HTMLElement).dataset.stakeVal || 1);
      app.querySelectorAll('[data-stake-val]').forEach((btn) => {
        btn.classList.toggle('on', Number((btn as HTMLElement).dataset.stakeVal) === SELECTED_STAKE);
      });
    };
  });

  // Toggle any standard market odd button in/out of the multi-item coupon
  app.querySelectorAll('[data-sel-bet]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const ds = (b as HTMLElement).dataset;
      const fid = ds.selBet!;
      const matchLabel = ds.matchLabel || '';
      const market = ds.market!;
      const marketTitle = ds.marketTitle || '';
      const pick = ds.pick!;
      const label = ds.label || pick;
      const odd = Number(ds.odd || 2.0);
      const key = `${fid}|${market}|${pick}`;

      const idx = COUPON_ITEMS.findIndex((it) => it.key === key);
      if (idx >= 0) {
        COUPON_ITEMS.splice(idx, 1);
      } else {
        COUPON_ITEMS.push({
          key,
          fixtureId: fid,
          matchLabel,
          market,
          marketTitle,
          pick,
          label,
          odd,
          stake: SELECTED_STAKE,
        });
        COUPON_EXPANDED = true;
      }
      renderPredictionsPage(app);
    };
  });

  // Toggle quick exact-score odd button in/out of coupon
  app.querySelectorAll('[data-es-pick]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const ds = (b as HTMLElement).dataset;
      const fid = ds.esPick!;
      const matchLabel = ds.matchLabel || '';
      const eh = Number(ds.eh);
      const ea = Number(ds.ea);
      const odd = Number(ds.odd || 6.8);
      const key = `${fid}|exact_score|${eh}:${ea}`;

      const idx = COUPON_ITEMS.findIndex((it) => it.key === key);
      if (idx >= 0) {
        COUPON_ITEMS.splice(idx, 1);
      } else {
        COUPON_ITEMS.push({
          key,
          fixtureId: fid,
          matchLabel,
          market: 'exact_score',
          marketTitle: 'Точный счёт',
          pick: 'exact',
          label: `Точный счёт ${eh}:${ea}`,
          odd,
          stake: SELECTED_STAKE,
          exactHome: eh,
          exactAway: ea,
        });
        COUPON_EXPANDED = true;
      }
      renderPredictionsPage(app);
    };
  });

  // Live exact-score custom odd preview from server matrix
  app.querySelectorAll('[data-es-inp]').forEach((inp) => {
    (inp as HTMLInputElement).oninput = () => {
      const fid = (inp as HTMLElement).dataset.esInp!;
      const fxObj = (data.fixtures || []).find((x: any) => x.id === fid);
      const eh = Math.max(0, Math.min(15, Math.round(Number((document.getElementById(`es_h_${fid}`) as HTMLInputElement)?.value || 0))));
      const ea = Math.max(0, Math.min(15, Math.round(Number((document.getElementById(`es_a_${fid}`) as HTMLInputElement)?.value || 0))));
      const matOdd = fxObj?.exactMatrix?.[eh]?.[ea];
      const estOdd = matOdd || Math.min(50.0, Math.max(6.5, 6.0 + (eh + ea) * 2.8));
      const lbl = document.getElementById(`es_odd_lbl_${fid}`);
      if (lbl) lbl.textContent = `×${Number(estOdd).toFixed(2)}`;
    };
  });

  // Add custom exact score into coupon
  app.querySelectorAll('[data-es-custom]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const ds = (b as HTMLElement).dataset;
      const fid = ds.esCustom!;
      const matchLabel = ds.matchLabel || '';
      const eh = Math.max(0, Math.min(15, Math.round(Number((document.getElementById(`es_h_${fid}`) as HTMLInputElement)?.value || 0))));
      const ea = Math.max(0, Math.min(15, Math.round(Number((document.getElementById(`es_a_${fid}`) as HTMLInputElement)?.value || 0))));
      const fxObj = (data.fixtures || []).find((x: any) => x.id === fid);
      const matOdd = fxObj?.exactMatrix?.[eh]?.[ea];
      const estOdd = matOdd || Math.min(50.0, Math.max(6.5, 6.0 + (eh + ea) * 2.8));
      const key = `${fid}|exact_score|${eh}:${ea}`;
      if (placedByKey.has(key)) {
        toast(`Счёт ${eh}:${ea} уже поставлен в этом матче`, true);
        return;
      }
      if (!COUPON_ITEMS.some((it) => it.key === key)) {
        COUPON_ITEMS.push({
          key,
          fixtureId: fid,
          matchLabel,
          market: 'exact_score',
          marketTitle: 'Точный счёт',
          pick: 'exact',
          label: `Точный счёт ${eh}:${ea}`,
          odd: estOdd,
          stake: SELECTED_STAKE,
          exactHome: eh,
          exactAway: ea,
        });
        COUPON_EXPANDED = true;
      }
      renderPredictionsPage(app);
    };
  });

  // Coupon interactions
  const cpToggle = document.getElementById('pred_coupon_toggle');
  if (cpToggle) {
    cpToggle.onclick = () => {
      COUPON_EXPANDED = !COUPON_EXPANDED;
      renderPredictionsPage(app);
    };
  }
  const cpClear = document.getElementById('pred_cp_clear');
  if (cpClear) {
    cpClear.onclick = () => {
      COUPON_ITEMS = [];
      renderPredictionsPage(app);
    };
  }
  app.querySelectorAll('[data-cp-all]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const v = Math.max(1, Math.min(500, Number((b as HTMLElement).dataset.cpAll || 1)));
      COUPON_ITEMS.forEach((it) => { it.stake = v; });
      renderPredictionsPage(app);
    };
  });
  app.querySelectorAll('[data-cp-del]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const idx = Number((b as HTMLElement).dataset.cpDel);
      COUPON_ITEMS.splice(idx, 1);
      renderPredictionsPage(app);
    };
  });
  app.querySelectorAll('[data-cp-step]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const idx = Number((b as HTMLElement).dataset.cpStep);
      const delta = Number((b as HTMLElement).dataset.delta || 0);
      if (COUPON_ITEMS[idx]) {
        COUPON_ITEMS[idx].stake = Math.max(1, Math.min(500, COUPON_ITEMS[idx].stake + delta));
        renderPredictionsPage(app);
      }
    };
  });
  app.querySelectorAll('[data-cp-set]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const idx = Number((b as HTMLElement).dataset.cpSet);
      const val = Number((b as HTMLElement).dataset.val || 1);
      if (COUPON_ITEMS[idx]) {
        COUPON_ITEMS[idx].stake = Math.max(1, Math.min(500, val));
        renderPredictionsPage(app);
      }
    };
  });
  app.querySelectorAll('[data-cp-input]').forEach((inp) => {
    (inp as HTMLInputElement).onchange = () => {
      const idx = Number((inp as HTMLElement).dataset.cpInput);
      const val = Math.max(1, Math.min(500, Math.round(Number((inp as HTMLInputElement).value || 1))));
      if (COUPON_ITEMS[idx]) {
        COUPON_ITEMS[idx].stake = val;
        renderPredictionsPage(app);
      }
    };
  });

  const cpSubmit = document.getElementById('pred_cp_submit') as HTMLButtonElement | null;
  if (cpSubmit) {
    cpSubmit.onclick = async () => {
      if (!COUPON_ITEMS.length) return;
      cpSubmit.disabled = true;
      try {
        const res = await api('/predictions/bet-batch', {
          bets: COUPON_ITEMS.map((it) => ({
            fixtureId: it.fixtureId,
            market: it.market,
            pick: it.pick,
            stake: it.stake,
            exactHome: it.exactHome,
            exactAway: it.exactAway,
          })),
        });
        toast(res.message);
        COUPON_ITEMS = [];
        renderPredictionsPage(app);
      } catch (err: any) {
        toast(err?.message || 'Ошибка оформления купона', true);
        cpSubmit.disabled = false;
      }
    };
  }

  // Expand / Collapse full bookmaker rospis & switch category tabs
  app.querySelectorAll('[data-toggle-mk]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const fid = (b as HTMLElement).dataset.toggleMk!;
      if (OPEN_MARKETS_FIXTURES.has(fid)) OPEN_MARKETS_FIXTURES.delete(fid);
      else OPEN_MARKETS_FIXTURES.add(fid);
      renderPredictionsPage(app);
    };
  });

  app.querySelectorAll('[data-fx-group]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const ds = (b as HTMLElement).dataset;
      FIXTURE_ACTIVE_GROUP.set(ds.fxGroup!, ds.group || 'main');
      renderPredictionsPage(app);
    };
  });

  // League actions
  const lgCreate = document.getElementById('lg_create_btn');
  if (lgCreate) {
    lgCreate.onclick = async () => {
      try {
        const res = await api('/predictions/league/create', {
          name: (document.getElementById('lg_name') as HTMLInputElement).value.trim(),
          description: (document.getElementById('lg_desc') as HTMLInputElement).value.trim(),
        });
        toast(res.message);
        SELECTED_LEAGUE_ID = res.league.id;
        renderPredictionsPage(app);
      } catch (err: any) {
        toast(err?.message || 'Ошибка создания лиги', true);
      }
    };
  }

  const lgJoin = document.getElementById('lg_join_btn');
  if (lgJoin) {
    lgJoin.onclick = async () => {
      try {
        const res = await api('/predictions/league/join', {
          codeOrId: (document.getElementById('lg_join_code') as HTMLInputElement).value.trim(),
        });
        toast(res.message);
        SELECTED_LEAGUE_ID = res.leagueId;
        renderPredictionsPage(app);
      } catch (err: any) {
        toast(err?.message || 'Лига не найдена', true);
      }
    };
  }

  app.querySelectorAll('[data-sel-lg]').forEach((b) => {
    (b as HTMLElement).onclick = () => {
      SELECTED_LEAGUE_ID = (b as HTMLElement).dataset.selLg!;
      renderPredictionsPage(app);
    };
  });

  const lgLeave = document.getElementById('lg_leave_btn');
  if (lgLeave) {
    lgLeave.onclick = async () => {
      try {
        const res = await api('/predictions/league/leave', { leagueId: lgLeave.dataset.lid });
        toast(res.message);
        SELECTED_LEAGUE_ID = 'global';
        renderPredictionsPage(app);
      } catch (err: any) {
        toast(err?.message || 'Ошибка', true);
      }
    };
  }

  const lgJoinDirect = document.getElementById('lg_join_direct');
  if (lgJoinDirect) {
    lgJoinDirect.onclick = async () => {
      try {
        const res = await api('/predictions/league/join', { codeOrId: lgJoinDirect.dataset.lid });
        toast(res.message);
        renderPredictionsPage(app);
      } catch (err: any) {
        toast(err?.message || 'Ошибка', true);
      }
    };
  }
}

// ─── National Team Proposals & Voting Enhancement ─────────────────────────────
export async function renderNationalProposalsSection(
  container: HTMLElement,
  cur: any,
  isAdmin: boolean,
  reloadNational: () => void
) {
  const { api, e, toast, S } = B();
  const isClub = S.me?.role === 'club';
  let clubRoster: any[] = [];
  if (isClub) {
    try {
      const c = await api('/club');
      clubRoster = (c.roster || c.squad || []).filter(
        (p: any) => !p.nat || p.nat === 'RUS' || p.nat === 'Россия' || p.nation === 'Россия'
      );
    } catch {
      clubRoster = [];
    }
  }

  const playerProps = cur.playerProposals || [];
  const oppProps = cur.opponentProposals || [];

  container.innerHTML = `
    <div class="grid g2" style="margin-top:16px">
      <div class="panel" style="margin-bottom:0">
        <h3 style="margin:0 0 6px">Предложить игрока в сборную России</h3>
        <div class="small muted" style="margin-bottom:10px;line-height:1.45">
          За просмотр рекламы можно предложить своего российского игрока и голосовать за кандидатов. Больше голосов даёт приоритет при равной хорошей форме (например, 4 голоса важнее 1), но провально играющий игрок не займёт место сильного кандидата.
        </div>

        ${isClub && clubRoster.length
          ? `<div style="background:var(--soft);padding:10px;border-radius:8px;border:1px solid var(--line);margin-bottom:12px">
              <div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:8px">
                <select id="nt_prop_pid" style="flex:1;min-width:190px">
                  ${clubRoster.map((p: any) => `<option value="${e(p.id)}">${e(p.name)} (${e(p.pos)} · Рейт ${Number(p.rating || 0).toFixed(1)})</option>`).join('')}
                </select>
                <button class="btn sm" id="nt_prop_player_btn" style="min-height:42px">Предложить (реклама)</button>
              </div>
              <input id="nt_prop_note" maxlength="160" placeholder="Почему достоин вызова (необязательно)" style="width:100%">
            </div>`
          : !isClub && !isAdmin
            ? '<div class="small muted" style="margin-bottom:10px">Войдите по коду клуба, чтобы предложить игрока своего клуба. Голосовать за кандидатов могут все!</div>'
            : ''}

        ${playerProps.length
          ? `<div class="wrap"><table><thead><tr><th class="l">Кандидат</th><th>Стат.</th><th>Голоса</th><th></th></tr></thead><tbody style="font-variant-numeric:tabular-nums">
            ${playerProps.map((pr: any) => `
              <tr>
                <td class="l">
                  <b>${e(pr.playerName)}</b> <span class="small muted">(${e(pr.pos)}, ${e(pr.teamName)})</span>
                  <div class="small muted">
                    ${pr.inActiveSquad ? '<span style="color:#15803d;font-weight:700">В составе сборной</span>' : 'Кандидат'}
                    ${pr.note ? ' · ' + e(pr.note) : ''}
                  </div>
                </td>
                <td class="small">М:${pr.matches} Г:${pr.goals} Р:${Number(pr.rating || 0).toFixed(1)}</td>
                <td><b>${pr.votes}</b></td>
                <td><button class="btn alt sm" data-nt-vote-pl="${e(pr.pid)}" style="min-height:38px">+1 (реклама)</button></td>
              </tr>`).join('')}
          </tbody></table></div>`
          : '<div class="small muted">На этот сбор клубы ещё не предлагали кандидатов.</div>'}
      </div>

      <div class="panel" style="margin-bottom:0">
        <h3 style="margin:0 0 6px">Соперник для товарищеского матча сборной</h3>
        <div class="small muted" style="margin-bottom:10px;line-height:1.45">
          Предложите сборную-соперника за рекламу или проголосуйте за уже созданный вариант. Голосование открыто для всех пользователей.
        </div>

        <div style="background:var(--soft);padding:10px;border-radius:8px;border:1px solid var(--line);margin-bottom:12px">
          <div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:8px">
            <input id="nt_prop_opp_name" list="nat_list" maxlength="60" placeholder="Страна / Сборная (например: Сербия, Египет)" style="flex:1;min-width:190px">
            <button class="btn sm" id="nt_prop_opp_btn" style="min-height:42px">Предложить (реклама)</button>
          </div>
          <input id="nt_prop_opp_comment" maxlength="140" placeholder="Комментарий (например: матч на ВТБ Арене)" style="width:100%">
        </div>

        ${oppProps.length
          ? `<div class="wrap"><table><thead><tr><th class="l">Сборная</th><th>Голоса</th><th></th></tr></thead><tbody style="font-variant-numeric:tabular-nums">
            ${oppProps.map((op: any) => `
              <tr>
                <td class="l">
                  <b>${e(op.opponent)}</b>
                  <div class="small muted">От: ${e(op.proposedByName)}${op.comment ? ' · ' + e(op.comment) : ''}</div>
                </td>
                <td><b>${op.votes}</b></td>
                <td>
                  <div class="row" style="gap:4px;justify-content:flex-end">
                    <button class="btn alt sm" data-nt-vote-opp="${e(op.id)}" style="min-height:38px">Голос (реклама)</button>
                    ${isAdmin ? `<button class="btn sm" data-nt-pick-opp="${e(op.opponent)}" title="Подставить соперника в форму матча">Выбрать</button>` : ''}
                  </div>
                </td>
              </tr>`).join('')}
          </tbody></table></div>`
          : '<div class="small muted">Предложений соперника пока нет — будьте первым!</div>'}
      </div>
    </div>
  `;

  const propPlBtn = document.getElementById('nt_prop_player_btn');
  if (propPlBtn) {
    propPlBtn.onclick = async () => {
      const pid = (document.getElementById('nt_prop_pid') as HTMLSelectElement).value;
      const note = (document.getElementById('nt_prop_note') as HTMLInputElement).value.trim();
      if (!pid) return;
      const adRes = await runAdsgramBlock('nt_propose_player', 'Предложение игрока в сборную России');
      if (!adRes) return;
      try {
        const res = await api('/national/propose-player', { pid, note, adProof: adRes.adProof });
        toast(res.message);
        reloadNational();
      } catch (err: any) {
        toast(err?.message || 'Ошибка предложения игрока', true);
      }
    };
  }

  container.querySelectorAll('[data-nt-vote-pl]').forEach((b) => {
    (b as HTMLButtonElement).onclick = async () => {
      const pid = (b as HTMLElement).dataset.ntVotePl!;
      const adRes = await runAdsgramBlock('nt_vote_player', 'Голосование за игрока в сборную России');
      if (!adRes) return;
      try {
        const res = await api('/national/vote-player', { pid, adProof: adRes.adProof });
        toast(res.message);
        reloadNational();
      } catch (err: any) {
        toast(err?.message || 'Ошибка голосования', true);
      }
    };
  });

  const propOppBtn = document.getElementById('nt_prop_opp_btn');
  if (propOppBtn) {
    propOppBtn.onclick = async () => {
      const opponent = (document.getElementById('nt_prop_opp_name') as HTMLInputElement).value.trim();
      const comment = (document.getElementById('nt_prop_opp_comment') as HTMLInputElement).value.trim();
      if (opponent.length < 2) {
        toast('Укажите название сборной-соперника', true);
        return;
      }
      const adRes = await runAdsgramBlock('nt_propose_opp', `Предложить соперника: ${opponent}`);
      if (!adRes) return;
      try {
        const res = await api('/national/propose-opponent', { opponent, comment, adProof: adRes.adProof });
        toast(res.message);
        reloadNational();
      } catch (err: any) {
        toast(err?.message || 'Ошибка предложения соперника', true);
      }
    };
  }

  container.querySelectorAll('[data-nt-vote-opp]').forEach((b) => {
    (b as HTMLButtonElement).onclick = async () => {
      const proposalId = (b as HTMLElement).dataset.ntVoteOpp!;
      const adRes = await runAdsgramBlock('nt_vote_opp', 'Голосование за соперника сборной России');
      if (!adRes) return;
      try {
        const res = await api('/national/vote-opponent', { proposalId, adProof: adRes.adProof });
        toast(res.message);
        reloadNational();
      } catch (err: any) {
        toast(err?.message || 'Ошибка голосования', true);
      }
    };
  });

  container.querySelectorAll('[data-nt-pick-opp]').forEach((b) => {
    (b as HTMLButtonElement).onclick = () => {
      const inp = document.getElementById('nt_opp') as HTMLInputElement | null;
      if (inp) {
        inp.value = (b as HTMLElement).dataset.ntPickOpp!;
        inp.scrollIntoView({ behavior: 'smooth', block: 'center' });
        toast(`Соперник «${inp.value}» подставлен в форму матча`);
      }
    };
  });
}

// ─── Admin Settings Adsgram Block Panel ───────────────────────────────────────
export function renderAdminAdsSettingsHtml(ov: any, e: (s: any) => string): string {
  const defs = ov.settings?.adsgramBlockDefs || [];
  const blocks = ov.settings?.adsgramBlocks || {};
  if (!defs.length) return '';
  const baseUrl = String(ov.settings?.appBaseUrl || ov.settings?.siteUrl || (typeof location !== 'undefined' ? location.origin : '')).replace(/\/+$/, '');
  const rewardUrl = baseUrl ? `${baseUrl}/api/ads/bot-reward` : '/api/ads/bot-reward';
  const webhookUrl = baseUrl ? `${baseUrl}/api/telegram/bot-webhook` : '/api/telegram/bot-webhook';

  return `
    <div class="panel" style="margin-top:16px">
      <h3>Рекламная сеть Adsgram (отдельный Block ID для каждой кнопки)</h3>
      <p class="small muted" style="margin:0 0 10px">Укажите реальные Block ID из личного кабинета Adsgram для каждой кнопки. Для блоков Telegram-бота используйте числовой ID (или <code>bot-12345</code>). В предпросмотре при строковых ID работает интерактивная эмуляция.</p>
      <div class="grid g2">
        ${defs.map((d: any) => `
          <label class="small" style="display:block">${e(d.label)}
            <input id="ads_blk_${e(d.key)}" value="${e(blocks[d.key] || d.defaultBlockId)}" style="width:100%;margin-top:4px;font-family:monospace">
          </label>
        `).join('')}
      </div>

      <div style="margin-top:14px;padding:12px 14px;background:var(--soft);border:1px solid var(--line);border-radius:10px">
        <div style="font-weight:700;font-size:13.5px;margin-bottom:6px">Настройка рекламы в сообщениях Telegram-бота (Adsgram Bot)</div>
        <label class="small" style="display:block;margin-bottom:8px">Publisher Token из профиля Adsgram
          <input id="ads_bot_token" value="${e(ov.settings?.adsgramBotToken || '')}" placeholder="Скопируйте токен издателя из кабинета Adsgram" style="width:100%;margin-top:4px;font-family:monospace">
        </label>
        <div class="small muted" style="line-height:1.5;margin-bottom:8px">
          <b>Reward URL</b> (вставьте в поле Reward URL при создании блока «Бот» в Adsgram):<br>
          <code style="user-select:all;word-break:break-all">${e(rewardUrl)}</code>
        </div>
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px">
          <div class="small muted" style="word-break:break-all">Webhook бота: <code>${e(webhookUrl)}</code></div>
          <button type="button" class="btn alt sm" id="btn_tg_set_webhook">🔗 Подключить Webhook бота</button>
        </div>
      </div>

      <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
        <div class="small muted">Наградить Топ-3 Лиги прогнозов по итогам текущего сезона (€1 250 000 + 10 мон. + Кубок / €500 000 + 5 мон. / €250 000 + 3 мон.)</div>
        <button type="button" class="btn alt sm" id="btn_award_pred_season">Выдать призы Лиги прогнозов</button>
      </div>
    </div>
  `;
}

export function collectAdminAdsBlocks(ov: any): Record<string, string> {
  const defs = ov.settings?.adsgramBlockDefs || [];
  const out: Record<string, string> = {};
  for (const d of defs) {
    const inp = document.getElementById('ads_blk_' + d.key) as HTMLInputElement | null;
    if (inp && inp.value.trim()) out[d.key] = inp.value.trim();
  }
  return out;
}

export function collectAdminAdsBotToken(): string {
  const inp = document.getElementById('ads_bot_token') as HTMLInputElement | null;
  return inp ? inp.value.trim() : '';
}

window.__RPL_EXT__ = {
  getClientHeaders,
  syncTelegramAuth,
  runAdsgramBlock,
  runAdsgramBotBlock,
  renderClubSponsorsTab,
  renderPredictionsPage,
  renderNationalProposalsSection,
  renderAdminAdsSettingsHtml,
  collectAdminAdsBlocks,
  collectAdminAdsBotToken,
};
