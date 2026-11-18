import type { Express, Request, Response } from 'express';
import crypto from 'crypto';

export interface AdsgramBlockDef {
  key: string;
  label: string;
  category: 'sponsors' | 'friendly' | 'predictions' | 'national' | 'interview';
  format: 'long' | 'short' | 'banner' | 'click_long';
  durationSec: number;
  requiresClick: boolean;
  defaultBlockId: string;
  maxPerCycle: number;
}

export const ADSGRAM_BLOCKS: AdsgramBlockDef[] = [
  {
    key: 'sponsor_long',
    label: 'Спонсор 1 (Газпром Нефть) — Длинная реклама (30с, €750)',
    category: 'sponsors',
    format: 'long',
    durationSec: 30,
    requiresClick: false,
    defaultBlockId: 'int-sponsor-long',
    maxPerCycle: 10,
  },
  {
    key: 'sponsor_short',
    label: 'Спонсор 2 (Т-Банк) — Короткая реклама (5с, €500)',
    category: 'sponsors',
    format: 'short',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-sponsor-short',
    maxPerCycle: 10,
  },
  {
    key: 'sponsor_banner',
    label: 'Спонсор 3 (Аэрофлот) — Баннерная реклама (€250)',
    category: 'sponsors',
    format: 'banner',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-sponsor-banner',
    maxPerCycle: 10,
  },
  {
    key: 'rfs_bonus',
    label: 'Бонус от РФС — Премиум-реклама (€1 000 после 30/30)',
    category: 'sponsors',
    format: 'long',
    durationSec: 15,
    requiresClick: false,
    defaultBlockId: 'int-rfs-bonus',
    maxPerCycle: 30,
  },
  {
    key: 'friendly_request',
    label: 'Товарищеский матч — Подать заявку (большая реклама + клик)',
    category: 'friendly',
    format: 'click_long',
    durationSec: 30,
    requiresClick: true,
    defaultBlockId: 'int-friendly-req',
    maxPerCycle: 9,
  },
  {
    key: 'friendly_accept',
    label: 'Товарищеский матч — Принять приглашение (РПЛ)',
    category: 'friendly',
    format: 'short',
    durationSec: 10,
    requiresClick: false,
    defaultBlockId: 'int-friendly-acc',
    maxPerCycle: 30,
  },
  {
    key: 'coins_short',
    label: 'Прогнозы — Короткая реклама 5с (+1 монета)',
    category: 'predictions',
    format: 'short',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-coins-short',
    maxPerCycle: 30,
  },
  {
    key: 'coins_banner',
    label: 'Прогнозы — Баннерная реклама (+2 монеты)',
    category: 'predictions',
    format: 'banner',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-coins-banner',
    maxPerCycle: 30,
  },
  {
    key: 'coins_long',
    label: 'Прогнозы — Длинная реклама 30с (+3 монеты)',
    category: 'predictions',
    format: 'long',
    durationSec: 30,
    requiresClick: false,
    defaultBlockId: 'int-coins-long',
    maxPerCycle: 30,
  },
  {
    key: 'nt_propose_player',
    label: 'Сборная России — Предложить игрока в сборную',
    category: 'national',
    format: 'short',
    durationSec: 10,
    requiresClick: false,
    defaultBlockId: 'int-nt-prop-player',
    maxPerCycle: 30,
  },
  {
    key: 'nt_vote_player',
    label: 'Сборная России — Голосовать за игрока в сборную',
    category: 'national',
    format: 'short',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-nt-vote-player',
    maxPerCycle: 30,
  },
  {
    key: 'nt_propose_opp',
    label: 'Сборная России — Предложить соперника на матч',
    category: 'national',
    format: 'short',
    durationSec: 10,
    requiresClick: false,
    defaultBlockId: 'int-nt-prop-opp',
    maxPerCycle: 30,
  },
  {
    key: 'nt_vote_opp',
    label: 'Сборная России — Голосовать за соперника сборной',
    category: 'national',
    format: 'short',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-nt-vote-opp',
    maxPerCycle: 30,
  },
  {
    key: 'interview_ask',
    label: 'Интервью после матча — Задать вопрос игроку',
    category: 'interview',
    format: 'short',
    durationSec: 5,
    requiresClick: false,
    defaultBlockId: 'int-interview-ask',
    maxPerCycle: 50,
  },
];

export interface SponsorConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  blockKey: 'sponsor_long' | 'sponsor_short' | 'sponsor_banner';
  formatLabel: string;
  rewardEur: number;
  maxViews: number;
  approvalRate: number;
  accentColor: string;
}

export const SPONSORS: SponsorConfig[] = [
  {
    id: 'gazprom_neft',
    name: 'Газпром Нефть',
    tagline: 'Генеральный энергетический партнёр',
    description: 'Крупный спонсорский транш за просмотр длинной рекламы. Высокая выплата при одобрении заявки.',
    blockKey: 'sponsor_long',
    formatLabel: 'Длинная реклама (30с)',
    rewardEur: 750,
    maxViews: 10,
    approvalRate: 0.95,
    accentColor: '#0284c7',
  },
  {
    id: 'tbank',
    name: 'Т-Банк',
    tagline: 'Официальный финансовый партнёр',
    description: 'Быстрое финансирование клуба за короткую 5-секундную рекламу. Оптимально по времени.',
    blockKey: 'sponsor_short',
    formatLabel: 'Короткая реклама (5с)',
    rewardEur: 500,
    maxViews: 10,
    approvalRate: 0.95,
  accentColor: '#ca8a04',
  },
  {
    id: 'aeroflot',
    name: 'Аэрофлот',
    tagline: 'Официальный авиаперевозчик лиги',
    description: 'Базовая спонсорская поддержка за просмотр рекламного баннера перед выездными матчами.',
    blockKey: 'sponsor_banner',
    formatLabel: 'Баннерная реклама',
    rewardEur: 250,
    maxViews: 10,
    approvalRate: 0.95,
    accentColor: '#1d4ed8',
  },
];

const CYCLE_MS = 24 * 60 * 60 * 1000;
const FRIENDLY_BREAK_LIMIT = 9;
const STARTER_COINS = 5;

const SEASON_PRIZES = [
  {
    place: 1,
    label: '1 место',
    prizeEur: 1_250_000,
    prizeCoins: 10,
    hasCup: true,
    cupTitle: 'Кубок победителя Лиги прогнозов',
    badge: '🏆 Кубок победителя Лиги прогнозов',
  },
  {
    place: 2,
    label: '2 место',
    prizeEur: 500_000,
    prizeCoins: 5,
    hasCup: false,
    cupTitle: '',
    badge: '🥈 2 место Лиги прогнозов',
  },
  {
    place: 3,
    label: '3 место',
    prizeEur: 250_000,
    prizeCoins: 3,
    hasCup: false,
    cupTitle: '',
    badge: '🥉 3 место Лиги прогнозов',
  },
];

export interface AdServerContext {
  getDb: () => any;
  save: () => void;
  S: () => string;
  team: (id: string) => any;
  tn: (id: string) => string;
  teamLogo: (id: string) => string;
  player: (id: string) => any;
  getMatch?: (id: string) => any;
  uid: () => string;
  needClub: (req: Request, res: Response, next: () => void) => void;
  admin: (req: Request, res: Response, next: () => void) => void;
  fail: (res: Response, msg: string, code?: number) => void;
  cleanTxt: (v: any, max?: number) => string;
  ensureNationalTeam: () => any;
  ensureInitialBudgets: () => void;
  compName: (id: string) => string;
}

export interface PredictionMarketOption {
  pick: string;
  label: string;
  shortLabel: string;
  odd: number;
  basePts: number;
}

export interface PredictionMarketDef {
  id: string;
  title: string;
  subtitle: string;
  options: PredictionMarketOption[];
}

export const PREDICTION_MARKETS: PredictionMarketDef[] = [
  {
    id: 'outcome',
    title: 'Исход матча',
    subtitle: 'Основное время (П1 / Ничья / П2)',
    options: [
      { pick: '1', label: 'П1 (Хозяева)', shortLabel: 'П1', odd: 2.0, basePts: 3 },
      { pick: 'X', label: 'Ничья (Х)', shortLabel: 'Х', odd: 3.0, basePts: 4 },
      { pick: '2', label: 'П2 (Гости)', shortLabel: 'П2', odd: 2.2, basePts: 3 },
    ],
  },
  {
    id: 'double_chance',
    title: 'Двойной шанс',
    subtitle: 'Перестраховка исхода',
    options: [
      { pick: '1X', label: '1Х (Хозяева не проиграют)', shortLabel: '1Х', odd: 1.4, basePts: 2 },
      { pick: '12', label: '12 (Без ничьей)', shortLabel: '12', odd: 1.35, basePts: 2 },
      { pick: 'X2', label: 'Х2 (Гости не проиграют)', shortLabel: 'Х2', odd: 1.45, basePts: 2 },
    ],
  },
  {
    id: 'total_goals',
    title: 'Тотал голов',
    subtitle: 'Суммарно забито в матче',
    options: [
      { pick: 'over_2_5', label: 'Тотал больше 2.5 (ТБ 2.5)', shortLabel: 'ТБ 2.5', odd: 1.9, basePts: 3 },
      { pick: 'under_2_5', label: 'Тотал меньше 2.5 (ТМ 2.5)', shortLabel: 'ТМ 2.5', odd: 1.9, basePts: 3 },
    ],
  },
  {
    id: 'btts',
    title: 'Обе забьют',
    subtitle: 'Забьют ли обе команды',
    options: [
      { pick: 'yes', label: 'Обе забьют: Да', shortLabel: 'ОЗ Да', odd: 1.85, basePts: 3 },
      { pick: 'no', label: 'Обе забьют: Нет', shortLabel: 'ОЗ Нет', odd: 1.95, basePts: 3 },
    ],
  },
  {
    id: 'yellow_cards',
    title: 'Жёлтые карточки',
    subtitle: 'Предупреждения в матче',
    options: [
      { pick: 'over_3_5', label: 'ЖК больше 3.5', shortLabel: 'ЖК > 3.5', odd: 1.95, basePts: 3 },
      { pick: 'under_3_5', label: 'ЖК меньше 3.5', shortLabel: 'ЖК < 3.5', odd: 1.85, basePts: 3 },
    ],
  },
  {
    id: 'corners',
    title: 'Угловые',
    subtitle: 'Количество подач с угла поля',
    options: [
      { pick: 'over_8_5', label: 'Угловых больше 8.5', shortLabel: 'Угл > 8.5', odd: 1.9, basePts: 3 },
      { pick: 'under_8_5', label: 'Угловых меньше 8.5', shortLabel: 'Угл < 8.5', odd: 1.9, basePts: 3 },
    ],
  },
  {
    id: 'specials',
    title: 'События матча',
    subtitle: 'Специальные игровые ситуации',
    options: [
      { pick: 'penalty_yes', label: 'Будет назначен пенальти', shortLabel: 'Пенальти', odd: 3.2, basePts: 5 },
      { pick: 'red_yes', label: 'Будет удаление (КК)', shortLabel: 'Красная', odd: 4.0, basePts: 6 },
      { pick: 'goal_75_plus', label: 'Гол на 75+ минуте', shortLabel: 'Гол 75+', odd: 2.3, basePts: 4 },
      { pick: 'ht_draw', label: 'Ничья в 1-м тайме', shortLabel: 'Ничья 1Т', odd: 2.2, basePts: 4 },
    ],
  },
  {
    id: 'exact_score',
    title: 'Точный счёт',
    subtitle: 'Угадайте итоговый счёт',
    options: [
      { pick: 'exact', label: 'Точный счёт', shortLabel: 'Точн. счёт', odd: 6.0, basePts: 10 },
    ],
  },
];

function findMarketOption(market: string, pick: string): { marketDef: PredictionMarketDef; option: PredictionMarketOption } | null {
  const m = PREDICTION_MARKETS.find((x) => x.id === market);
  if (!m) return null;
  const opt = m.options.find((o) => o.pick === pick);
  if (!opt) return null;
  return { marketDef: m, option: opt };
}

function clampNum(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function roundBookieOdd(raw: number): number {
  const clamped = clampNum(raw, 1.12, 35.0);
  if (clamped < 1.5) return Math.round(clamped * 50) / 50;
  if (clamped < 3.0) return Math.round(clamped * 20) / 20;
  if (clamped < 6.0) return Math.round(clamped * 10) / 10;
  return Math.round(clamped * 2) / 2;
}

function oddFromProb(prob: number, margin = 1.06, minOdd = 1.12, maxOdd = 35.0): number {
  const p = clampNum(prob, 0.02, 0.92);
  return roundBookieOdd(clampNum(1 / (p * margin), minOdd, maxOdd));
}

function poissonP(k: number, lambda: number): number {
  let res = Math.exp(-lambda);
  for (let i = 1; i <= k; i++) res = (res * lambda) / i;
  return res;
}

function getTeamFormAndStrength(ctx: AdServerContext, teamId: string): { ovr: number; attOvr: number; defOvr: number; formDelta: number; style: string; compTier: number } {
  const db = ctx.getDb();
  const t = ctx.team(teamId);
  const comp = String(t?.comp || 'rpl');
  const compTier = comp === 'rpl' ? 0 : comp === 'fnl' ? -5.5 : -7.5;

  const players = (Array.isArray(db.players) ? db.players : []).filter((p: any) => p.teamId === teamId && !p.archived);
  const ovrs = players
    .map((p: any) => Number(p.ovr || p.rating || 70))
    .filter((n: number) => Number.isFinite(n) && n > 0)
    .sort((a: number, b: number) => b - a)
    .slice(0, 14);
  const fallbackOvr = comp === 'rpl' ? 76.5 : 70.5;
  const ovr = ovrs.length ? ovrs.reduce((s: number, x: number) => s + x, 0) / ovrs.length : fallbackOvr;

  const attPositions = new Set(['ЦФ', 'ЛВ', 'ПВ', 'АП', 'ST', 'CF', 'LW', 'RW', 'CAM']);
  const defPositions = new Set(['ВР', 'ЦЗ', 'ЛЗ', 'ПЗ', 'ОП', 'GK', 'CB', 'LB', 'RB', 'CDM']);
  const attList = players
    .filter((p: any) => attPositions.has(String(p.pos || '')))
    .map((p: any) => Number(p.ovr || p.rating || ovr))
    .sort((a: number, b: number) => b - a)
    .slice(0, 5);
  const defList = players
    .filter((p: any) => defPositions.has(String(p.pos || '')))
    .map((p: any) => Number(p.ovr || p.rating || ovr))
    .sort((a: number, b: number) => b - a)
    .slice(0, 6);
  const attOvr = attList.length ? attList.reduce((s: number, x: number) => s + x, 0) / attList.length : ovr;
  const defOvr = defList.length ? defList.reduce((s: number, x: number) => s + x, 0) / defList.length : ovr;

  // Compute season form from completed fixtures
  const season = ctx.S();
  const done = (Array.isArray(db.fixtures) ? db.fixtures : []).filter(
    (fx: any) => (fx.season || season) === season && fx.status === 'done' && (fx.home === teamId || fx.away === teamId)
  );
  let pts = 0;
  let gd = 0;
  for (const fx of done) {
    const isH = fx.home === teamId;
    const gf = Number(isH ? fx.hg : fx.ag) || 0;
    const ga = Number(isH ? fx.ag : fx.hg) || 0;
    gd += gf - ga;
    if (gf > ga) pts += 3;
    else if (gf === ga) pts += 1;
  }
  const n = done.length;
  const ppg = n > 0 ? pts / n : 1.35;
  const gdpm = n > 0 ? gd / n : 0;
  const weight = Math.min(1, n / 6);
  const formDelta = weight * ((ppg - 1.35) * 2.0 + gdpm * 1.0);

  const style = String(db.tactics?.[teamId]?.style || 'balanced');
  return { ovr, attOvr, defOvr, formDelta, style, compTier };
}

export function computeFixtureMarkets(ctx: AdServerContext, f: any): {
  markets: PredictionMarketDef[];
  quickScores: Array<{ h: number; a: number; score: string; odd: number }>;
  calcExactOdd: (eh: number, ea: number) => number;
  expectedGoals: { home: number; away: number };
} {
  const db = ctx.getDb();
  const home = getTeamFormAndStrength(ctx, f.home);
  const away = getTeamFormAndStrength(ctx, f.away);
  const isDerby = !!(Array.isArray(db.derbies) && db.derbies.some((d: any) => (d.a === f.home && d.b === f.away) || (d.a === f.away && d.b === f.home)));
  const isNeutral = !!f.neutralField || f.comp === 'supercup';

  const homeAdv = isNeutral ? 0 : 1.05;
  const rawDiff = (home.ovr + home.formDelta + home.compTier + homeAdv) - (away.ovr + away.formDelta + away.compTier);
  const diff = clampNum(rawDiff, -12, 12);

  // Attacking vs opposing defensive edge influences total goal tempo cleanly per pairing
  const tempoShiftH = clampNum((home.attOvr - away.defOvr) * 0.025, -0.14, 0.14);
  const tempoShiftA = clampNum((away.attOvr - home.defOvr) * 0.025, -0.14, 0.14);

  const styleTempo = (s: string, opp: string) => {
    let m = 1.0;
    if (s === 'attack') m *= 1.13;
    else if (s === 'press') m *= 1.07;
    else if (s === 'bus') m *= 0.85;
    if (opp === 'attack') m *= 1.1;
    else if (opp === 'bus') m *= 0.87;
    if (isDerby) m *= 0.95;
    return m;
  };

  const baseGoal = isNeutral ? 1.24 : 1.29;
  const lambdaH = clampNum(baseGoal * Math.exp(0.075 * diff) * (1 + tempoShiftH) * styleTempo(home.style, away.style), 0.55, 2.75);
  const lambdaA = clampNum(baseGoal * Math.exp(-0.075 * diff) * (1 + tempoShiftA) * styleTempo(away.style, home.style), 0.48, 2.55);
  const totalLambda = lambdaH + lambdaA;

  // Build normalized 7x7 Poisson score matrix with mild Dixon-Coles low-score draw adjustment
  const grid: number[][] = [];
  let sumGrid = 0;
  for (let h = 0; h <= 6; h++) {
    grid[h] = [];
    for (let a = 0; a <= 6; a++) {
      let p = poissonP(h, lambdaH) * poissonP(a, lambdaA);
      if (h === 0 && a === 0) p *= 1.10;
      else if (h === 1 && a === 1) p *= 1.08;
      else if ((h === 1 && a === 0) || (h === 0 && a === 1)) p *= 0.97;
      grid[h][a] = p;
      sumGrid += p;
    }
  }
  for (let h = 0; h <= 6; h++) {
    for (let a = 0; a <= 6; a++) grid[h][a] /= sumGrid;
  }

  let p1 = 0, pX = 0, p2 = 0, pOver25 = 0, pBtts = 0;
  for (let h = 0; h <= 6; h++) {
    for (let a = 0; a <= 6; a++) {
      const p = grid[h][a];
      if (h > a) p1 += p;
      else if (h === a) pX += p;
      else p2 += p;
      if (h + a >= 3) pOver25 += p;
      if (h >= 1 && a >= 1) pBtts += p;
    }
  }

  const odd1 = oddFromProb(p1);
  const oddX = oddFromProb(pX);
  const odd2 = oddFromProb(p2);

  const odd1X = oddFromProb(p1 + pX, 1.05, 1.12, 3.8);
  const odd12 = oddFromProb(p1 + p2, 1.05, 1.12, 2.6);
  const oddX2 = oddFromProb(pX + p2, 1.05, 1.12, 4.2);

  const oddOver25 = oddFromProb(pOver25, 1.05, 1.35, 3.4);
  const oddUnder25 = oddFromProb(1 - pOver25, 1.05, 1.35, 3.4);

  const oddBttsYes = oddFromProb(pBtts, 1.05, 1.40, 3.2);
  const oddBttsNo = oddFromProb(1 - pBtts, 1.05, 1.40, 3.2);

  // Yellow cards > 3.5 probability
  const pressBoost = (home.style === 'press' ? 0.06 : 0) + (away.style === 'press' ? 0.06 : 0);
  const busBoost = (home.style === 'bus' ? 0.03 : 0) + (away.style === 'bus' ? 0.03 : 0);
  const derbyCardBoost = isDerby ? 0.14 : 0;
  const pYcOver = clampNum(0.46 + pressBoost + busBoost + derbyCardBoost, 0.34, 0.72);
  const oddYcOver = oddFromProb(pYcOver, 1.06, 1.40, 2.8);
  const oddYcUnder = oddFromProb(1 - pYcOver, 1.06, 1.40, 2.8);

  // Corners > 8.5 probability (driven by expected attack & style)
  const attackBoost = (home.style === 'attack' || home.style === 'possession' ? 0.05 : 0) + (away.style === 'attack' || away.style === 'possession' ? 0.05 : 0);
  const pCoOver = clampNum(0.44 + (totalLambda - 2.35) * 0.10 + attackBoost, 0.34, 0.70);
  const oddCoOver = oddFromProb(pCoOver, 1.06, 1.42, 2.75);
  const oddCoUnder = oddFromProb(1 - pCoOver, 1.06, 1.42, 2.75);

  // Specials
  const pPen = clampNum(0.24 + (totalLambda - 2.35) * 0.04 + (isDerby ? 0.04 : 0), 0.18, 0.38);
  const pRed = clampNum(0.14 + (isDerby ? 0.07 : 0) + pressBoost * 0.35, 0.11, 0.28);
  const pLate75 = clampNum(1 - Math.exp(-0.23 * totalLambda), 0.34, 0.56);
  const htLambdaH = lambdaH * 0.44;
  const htLambdaA = lambdaA * 0.44;
  let pHtDraw = 0;
  for (let k = 0; k <= 4; k++) pHtDraw += poissonP(k, htLambdaH) * poissonP(k, htLambdaA);
  pHtDraw = clampNum(pHtDraw, 0.32, 0.52);

  const calcExactOdd = (eh: number, ea: number) => {
    const h = clampNum(Math.round(eh), 0, 15);
    const a = clampNum(Math.round(ea), 0, 15);
    let p: number;
    if (h <= 6 && a <= 6) {
      p = grid[h][a];
    } else {
      p = Math.max(0.004, poissonP(Math.min(h, 8), lambdaH) * poissonP(Math.min(a, 8), lambdaA));
    }
    return roundBookieOdd(clampNum(1 / (p * 1.10), 4.5, 35.0));
  };

  const quickCandidates: Array<[number, number]> = [
    [1, 0], [2, 0], [2, 1], [1, 1], [0, 0], [0, 1], [1, 2], [2, 2],
  ];
  const quickScores = quickCandidates.map(([h, a]) => ({
    h,
    a,
    score: `${h}:${a}`,
    odd: calcExactOdd(h, a),
  }));

  const mk = (id: string, title: string, subtitle: string, opts: Array<{ pick: string; label: string; shortLabel: string; odd: number }>): PredictionMarketDef => ({
    id,
    title,
    subtitle,
    options: opts.map((o) => ({ ...o, basePts: Math.max(2, Math.round(o.odd * 1.5)) })),
  });

  const markets: PredictionMarketDef[] = [
    mk('outcome', 'Исход матча', 'Основное время (П1 / Х / П2)', [
      { pick: '1', label: `П1 (${ctx.tn(f.home)})`, shortLabel: 'П1', odd: odd1 },
      { pick: 'X', label: 'Ничья (Х)', shortLabel: 'Х', odd: oddX },
      { pick: '2', label: `П2 (${ctx.tn(f.away)})`, shortLabel: 'П2', odd: odd2 },
    ]),
    mk('double_chance', 'Двойной шанс', 'Перестраховка исхода', [
      { pick: '1X', label: '1Х (Хозяева не проиграют)', shortLabel: '1Х', odd: odd1X },
      { pick: '12', label: '12 (Без ничьей)', shortLabel: '12', odd: odd12 },
      { pick: 'X2', label: 'Х2 (Гости не проиграют)', shortLabel: 'Х2', odd: oddX2 },
    ]),
    mk('total_goals', 'Тотал голов 2.5', 'Суммарно забито в матче', [
      { pick: 'over_2_5', label: 'Тотал больше 2.5', shortLabel: 'ТБ 2.5', odd: oddOver25 },
      { pick: 'under_2_5', label: 'Тотал меньше 2.5', shortLabel: 'ТМ 2.5', odd: oddUnder25 },
    ]),
    mk('btts', 'Обе забьют', 'Голы обеих команд', [
      { pick: 'yes', label: 'Обе забьют: Да', shortLabel: 'ОЗ Да', odd: oddBttsYes },
      { pick: 'no', label: 'Обе забьют: Нет', shortLabel: 'ОЗ Нет', odd: oddBttsNo },
    ]),
    mk('yellow_cards', 'Жёлтые карточки 3.5', 'Всего предупреждений', [
      { pick: 'over_3_5', label: 'ЖК больше 3.5', shortLabel: 'ЖК Б 3.5', odd: oddYcOver },
      { pick: 'under_3_5', label: 'ЖК меньше 3.5', shortLabel: 'ЖК М 3.5', odd: oddYcUnder },
    ]),
    mk('corners', 'Угловые 8.5', 'Подачи с угла поля', [
      { pick: 'over_8_5', label: 'Угловых больше 8.5', shortLabel: 'Угл Б 8.5', odd: oddCoOver },
      { pick: 'under_8_5', label: 'Угловых меньше 8.5', shortLabel: 'Угл М 8.5', odd: oddCoUnder },
    ]),
    mk('specials', 'События матча', 'Игровые ситуации', [
      { pick: 'penalty_yes', label: 'Будет пенальти', shortLabel: 'Пенальти', odd: oddFromProb(pPen, 1.07, 2.2, 5.5) },
      { pick: 'red_yes', label: 'Будет удаление (КК)', shortLabel: 'Удаление', odd: oddFromProb(pRed, 1.08, 2.8, 8.5) },
      { pick: 'goal_75_plus', label: 'Гол на 75+ мин', shortLabel: 'Гол 75+', odd: oddFromProb(pLate75, 1.06, 1.65, 2.8) },
      { pick: 'ht_draw', label: 'Ничья в 1-м тайме', shortLabel: 'Ничья 1Т', odd: oddFromProb(pHtDraw, 1.06, 1.80, 2.75) },
    ]),
    {
      id: 'exact_score',
      title: 'Точный счёт',
      subtitle: 'Итоговый счёт матча',
      options: [{ pick: 'exact', label: 'Точный счёт', shortLabel: 'Точн. счёт', odd: quickScores[0]?.odd || 7.0, basePts: 12 }],
    },
  ];

  return {
    markets,
    quickScores,
    calcExactOdd,
    expectedGoals: { home: Math.round(lambdaH * 100) / 100, away: Math.round(lambdaA * 100) / 100 },
  };
}

interface PendingAdSession {
  token: string;
  blockKey: string;
  actorKey: string;
  startedAt: number;
  requiresClick: boolean;
  clicked: boolean;
  verified: boolean;
  consumed: boolean;
}

const adSessions = new Map<string, PendingAdSession>();

function pruneAdSessions() {
  const now = Date.now();
  for (const [k, v] of adSessions.entries()) {
    if (now - v.startedAt > 30 * 60 * 1000) adSessions.delete(k);
  }
}

export function getAdsgramBlocks(db: any): Record<string, string> {
  db.settings ||= {};
  const saved = db.settings.adsgramBlocks && typeof db.settings.adsgramBlocks === 'object' ? db.settings.adsgramBlocks : {};
  const out: Record<string, string> = {};
  for (const b of ADSGRAM_BLOCKS) {
    out[b.key] = String(saved[b.key] || b.defaultBlockId).trim() || b.defaultBlockId;
  }
  return out;
}

function cleanClientId(raw: any): string {
  const s = String(raw || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
  return s || 'anon';
}

export function resolveActor(req: any): {
  actorKey: string;
  type: 'club' | 'admin' | 'user';
  teamId: string | null;
  clientId: string;
} {
  const cid = cleanClientId(req.headers?.['x-client-id'] || req.body?.clientId || req.query?.clientId);
  if (req.me?.role === 'club' && req.me.teamId) {
    return { actorKey: `club:${req.me.teamId}`, type: 'club', teamId: req.me.teamId, clientId: cid };
  }
  if (req.me?.role === 'admin') {
    const qTid = String(req.body?.teamId || req.query?.teamId || '').trim();
    if (qTid) {
      return { actorKey: `club:${qTid}`, type: 'club', teamId: qTid, clientId: cid };
    }
    return { actorKey: `admin:${cid}`, type: 'admin', teamId: null, clientId: cid };
  }
  return { actorKey: `user:${cid}`, type: 'user', teamId: null, clientId: cid };
}

function ensureSponsorState(db: any, teamId: string) {
  db.sponsorCycles ||= {};
  const now = Date.now();
  let st = db.sponsorCycles[teamId];
  if (!st || typeof st !== 'object') {
    st = {
      cycleStartedAt: 0,
      views: { gazprom_neft: 0, tbank: 0, aeroflot: 0 },
      approved: { gazprom_neft: 0, tbank: 0, aeroflot: 0 },
      declined: { gazprom_neft: 0, tbank: 0, aeroflot: 0 },
      earnedEur: 0,
      rfsClaimed: false,
      rfsExtraViews: 0,
      rfsEarnedEur: 0,
      history: [],
    };
    db.sponsorCycles[teamId] = st;
  }
  if (st.cycleStartedAt > 0 && now - st.cycleStartedAt >= CYCLE_MS) {
    st.cycleStartedAt = 0;
    st.views = { gazprom_neft: 0, tbank: 0, aeroflot: 0 };
    st.approved = { gazprom_neft: 0, tbank: 0, aeroflot: 0 };
    st.declined = { gazprom_neft: 0, tbank: 0, aeroflot: 0 };
    st.earnedEur = 0;
    st.rfsClaimed = false;
    st.rfsExtraViews = 0;
    st.rfsEarnedEur = 0;
  }
  st.views ||= { gazprom_neft: 0, tbank: 0, aeroflot: 0 };
  st.approved ||= { gazprom_neft: 0, tbank: 0, aeroflot: 0 };
  st.declined ||= { gazprom_neft: 0, tbank: 0, aeroflot: 0 };
  st.history ||= [];
  return st;
}

export function buildSponsorSummary(ctx: AdServerContext, teamId: string) {
  const db = ctx.getDb();
  const st = ensureSponsorState(db, teamId);
  const blocks = getAdsgramBlocks(db);
  const now = Date.now();
  const totalViews = SPONSORS.reduce((acc, s) => acc + Math.min(s.maxViews, Number(st.views[s.id] || 0)), 0);
  const totalRequired = SPONSORS.reduce((acc, s) => acc + s.maxViews, 0);
  const resetAt = st.cycleStartedAt > 0 ? st.cycleStartedAt + CYCLE_MS : null;
  const remainingMs = resetAt ? Math.max(0, resetAt - now) : 0;
  const rfsUnlocked = totalViews >= totalRequired;

  return {
    cycleStartedAt: st.cycleStartedAt || null,
    resetAt,
    remainingMs,
    totalViews,
    totalRequired,
    rfsUnlocked,
    rfsClaimed: !!st.rfsClaimed,
    rfsExtraViews: Number(st.rfsExtraViews || 0),
    rfsMaxViews: 30,
    rfsRewardPerAd: 1000,
    rfsEarnedEur: Number(st.rfsEarnedEur || 0),
    earnedEurCycle: Number(st.earnedEur || 0),
    rfsBlockId: blocks.rfs_bonus,
    sponsors: SPONSORS.map((s) => ({
      ...s,
      blockId: blocks[s.blockKey],
      views: Math.min(s.maxViews, Number(st.views[s.id] || 0)),
      approvedCount: Number(st.approved[s.id] || 0),
      declinedCount: Number(st.declined[s.id] || 0),
      remaining: Math.max(0, s.maxViews - Number(st.views[s.id] || 0)),
    })),
    history: (st.history || []).slice(0, 15),
  };
}

export function verifyAndParseTelegramAuth(
  db: any,
  initData: string | undefined,
  fallbackUser: any,
  headers?: any
): {
  ok: boolean;
  verified: boolean;
  tgId: string;
  displayName: string;
  username: string;
  photoUrl: string;
} | null {
  const botToken = String(process.env.TG_BOT_TOKEN || db?.settings?.tgToken || '').trim();
  let parsedUser: any = null;
  let verified = false;

  if (initData && typeof initData === 'string' && initData.includes('user=')) {
    try {
      const params = new URLSearchParams(initData);
      const userJson = params.get('user');
      const hash = params.get('hash');
      if (userJson) parsedUser = JSON.parse(userJson);
      if (botToken && hash) {
        const entries: string[] = [];
        params.forEach((v, k) => {
          if (k !== 'hash') entries.push(`${k}=${v}`);
        });
        entries.sort();
        const dataCheckString = entries.join('\n');
        const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
        const calcHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
        if (calcHash === hash) {
          verified = true;
        }
      }
    } catch {
      parsedUser = null;
    }
  }

  if (!parsedUser && fallbackUser && typeof fallbackUser === 'object' && fallbackUser.id) {
    parsedUser = fallbackUser;
  }

  if (!parsedUser && headers?.['x-tg-id']) {
    parsedUser = {
      id: headers['x-tg-id'],
      first_name: decodeHeaderTxt(headers['x-tg-name']),
      username: decodeHeaderTxt(headers['x-tg-username']),
      photo_url: decodeHeaderTxt(headers['x-tg-photo']),
    };
  }

  if (!parsedUser || !parsedUser.id) return null;
  const tgId = String(parsedUser.id).replace(/[^0-9]/g, '').slice(0, 32);
  if (!tgId) return null;

  const first = String(parsedUser.first_name || '').trim();
  const last = String(parsedUser.last_name || '').trim();
  const username = String(parsedUser.username || '').replace(/^@/, '').trim().slice(0, 48);
  const fullName = [first, last].filter(Boolean).join(' ').trim() || (username ? `@${username}` : `Болельщик #${tgId.slice(-4)}`);
  const rawPhoto = String(parsedUser.photo_url || '').trim();
  const photoUrl = /^https?:\/\//i.test(rawPhoto) ? rawPhoto.slice(0, 500) : '';

  return { ok: true, verified, tgId, displayName: fullName.slice(0, 60), username, photoUrl };
}

function decodeHeaderTxt(raw: any): string {
  if (!raw) return '';
  const s = String(raw);
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export function extractTgHintsFromReq(ctx: AdServerContext, req: any): {
  tgId?: string;
  username?: string;
  name?: string;
  photo?: string;
} {
  const db = ctx.getDb();
  const tgParsed = verifyAndParseTelegramAuth(db, req.body?.tgInitData, req.body?.tgUser, req.headers);
  if (tgParsed) {
    return {
      tgId: tgParsed.tgId,
      username: tgParsed.username,
      name: tgParsed.displayName,
      photo: tgParsed.photoUrl,
    };
  }
  const hName = ctx.cleanTxt(decodeHeaderTxt(req.headers?.['x-tg-name']), 60);
  const hPhoto = String(req.headers?.['x-tg-photo'] || '').trim();
  const cid = cleanClientId(req.headers?.['x-client-id']);
  const tgIdFromCid = cid.startsWith('tg_') ? cid.slice(3) : '';
  const stored = tgIdFromCid ? db.telegramUsers?.[`tg_${tgIdFromCid}`] : null;
  return {
    tgId: tgIdFromCid || stored?.tgId || undefined,
    username: stored?.username || undefined,
    name: hName || stored?.displayName || undefined,
    photo: /^https?:\/\//i.test(hPhoto) ? hPhoto : stored?.photoUrl || undefined,
  };
}

export function ensureOwnerProfile(
  ctx: AdServerContext,
  actorKey: string,
  hintName?: string,
  hintPhoto?: string,
  hintTg?: { tgId?: string; username?: string }
) {
  const db = ctx.getDb();
  db.ownerProfiles ||= {};
  const isClub = actorKey.startsWith('club:');
  const isAdmin = actorKey.startsWith('admin:');
  const profileKind: 'owner' | 'spectator' | 'admin' = isClub ? 'owner' : isAdmin ? 'admin' : 'spectator';
  const teamId = isClub ? actorKey.slice(5) : null;
  const t = teamId ? ctx.team(teamId) : null;

  // Also check stored Telegram user record if this is a user:tg_... actor or linked club
  const tgKeyFromActor = actorKey.startsWith('user:tg_') ? actorKey.slice(5) : hintTg?.tgId ? `tg_${hintTg.tgId}` : '';
  const tgRec = tgKeyFromActor ? db.telegramUsers?.[tgKeyFromActor] : null;
  const effName = hintName || tgRec?.displayName || undefined;
  const effPhoto = hintPhoto || tgRec?.photoUrl || undefined;
  const effTgId = hintTg?.tgId || tgRec?.tgId || undefined;
  const effTgUsername = hintTg?.username || tgRec?.username || undefined;

  let prof = db.ownerProfiles[actorKey];
  if (!prof) {
    prof = {
      actorKey,
      type: isClub ? 'club' : 'user',
      profileKind,
      teamId: teamId || null,
      favoriteTeamId: null,
      telegramId: effTgId || null,
      telegramUsername: effTgUsername || '',
      displayName: effName || (t ? `Владелец ФК «${t.name}»` : isAdmin ? 'Администратор лиги' : 'Зритель РПЛ'),
      photoUrl: effPhoto || '',
      bio: '',
      career: isClub && t ? `Руководство клубом «${t.name}» в лиге ${ctx.compName(t.comp || 'rpl')}.` : '',
      trophies: [],
      customName: false,
      customPhoto: false,
      updatedAt: new Date().toISOString(),
    };
    db.ownerProfiles[actorKey] = prof;
  } else {
    prof.profileKind = profileKind;
    if (effTgId) prof.telegramId = effTgId;
    if (effTgUsername) prof.telegramUsername = effTgUsername;
    if (effName && !prof.customName) {
      prof.displayName = effName;
    }
    if (effPhoto && !prof.customPhoto) {
      prof.photoUrl = effPhoto;
    }
    if (teamId && !prof.teamId) prof.teamId = teamId;
  }
  prof.trophies ||= [];
  return prof;
}

export function linkTelegramToClub(
  ctx: AdServerContext,
  teamId: string,
  req: any
) {
  const db = ctx.getDb();
  const hints = extractTgHintsFromReq(ctx, req);
  if (hints.tgId) {
    const tgKey = `tg_${hints.tgId}`;
    db.telegramClubLinks ||= {};
    db.telegramClubLinks[tgKey] = teamId;
    db.telegramUsers ||= {};
    if (!db.telegramUsers[tgKey] && hints.name) {
      db.telegramUsers[tgKey] = {
        tgId: hints.tgId,
        displayName: hints.name,
        username: hints.username || '',
        photoUrl: hints.photo || '',
        updatedAt: new Date().toISOString(),
      };
    }
  }
  if (teamId) {
    ensureOwnerProfile(ctx, `club:${teamId}`, hints.name, hints.photo, {
      tgId: hints.tgId,
      username: hints.username,
    });
  }
}

export function ensureWallet(db: any, actorKey: string) {
  db.predictionWallets ||= {};
  let w = db.predictionWallets[actorKey];
  const now = Date.now();
  if (!w) {
    w = {
      coins: STARTER_COINS,
      totalEarnedCoins: STARTER_COINS,
      cycleStartedAt: 0,
      adCounts: { coins_short: 0, coins_banner: 0, coins_long: 0 },
    };
    db.predictionWallets[actorKey] = w;
  }
  if (w.cycleStartedAt > 0 && now - w.cycleStartedAt >= CYCLE_MS) {
    w.cycleStartedAt = 0;
    w.adCounts = { coins_short: 0, coins_banner: 0, coins_long: 0 };
  }
  w.adCounts ||= { coins_short: 0, coins_banner: 0, coins_long: 0 };
  return w;
}

export function verifyAndConsumeAdProof(
  adProof: string | undefined,
  expectedBlockKey: string,
  actorKey: string,
  requireClick = false
): { ok: true } | { ok: false; error: string } {
  if (!adProof) return { ok: false, error: 'Необходимо просмотреть рекламу Adsgram перед выполнением действия.' };
  const s = adSessions.get(String(adProof));
  if (!s) return { ok: false, error: 'Рекламная сессия не найдена или истекла. Посмотрите рекламу заново.' };
  if (s.consumed) return { ok: false, error: 'Этот просмотр рекламы уже использован.' };
  if (!s.verified) return { ok: false, error: 'Просмотр рекламы не завершён.' };
  if (s.blockKey !== expectedBlockKey) return { ok: false, error: 'Несоответствие рекламного блока Adsgram.' };
  if (s.actorKey !== actorKey) return { ok: false, error: 'Сессия рекламы принадлежит другому пользователю.' };
  if (requireClick && !s.clicked) {
    return { ok: false, error: 'Для подачи заявки на товарищеский матч необходимо не только посмотреть рекламу, но и кликнуть по ней.' };
  }
  s.consumed = true;
  return { ok: true };
}

export function getFriendlyBreakUsage(db: any, teamId: string): Record<string, number> {
  db.friendlyAdUsage ||= {};
  const rec = db.friendlyAdUsage[teamId];
  return rec && typeof rec === 'object' ? { ...rec } : {};
}

export function checkAndConsumeFriendlyRequestAd(
  db: any,
  teamId: string,
  breakId: string,
  actorKey: string,
  adProof?: string
): { ok: true; used: number; limit: number } | { ok: false; error: string } {
  db.friendlyAdUsage ||= {};
  db.friendlyAdUsage[teamId] ||= {};
  const used = Number(db.friendlyAdUsage[teamId][breakId] || 0);
  if (used >= FRIENDLY_BREAK_LIMIT) {
    return {
      ok: false,
      error: `Достигнут лимит заявок на товарищеские матчи за этот перерыв на сборные (${FRIENDLY_BREAK_LIMIT}/${FRIENDLY_BREAK_LIMIT}).`,
    };
  }
  const v = verifyAndConsumeAdProof(adProof, 'friendly_request', actorKey, true);
  if (!v.ok) return v;
  db.friendlyAdUsage[teamId][breakId] = used + 1;
  return { ok: true, used: used + 1, limit: FRIENDLY_BREAK_LIMIT };
}

export function checkAndConsumeFriendlyAcceptAd(
  actorKey: string,
  adProof?: string
): { ok: true } | { ok: false; error: string } {
  return verifyAndConsumeAdProof(adProof, 'friendly_accept', actorKey, false);
}

function extractFixtureMatchSummary(ctx: AdServerContext, f: any) {
  const hg = Number(f.hg);
  const ag = Number(f.ag);
  const st = f.st || null;
  const matchObj = ctx.getMatch ? ctx.getMatch(f.id) : null;
  const events: any[] = Array.isArray(matchObj?.events) ? matchObj.events : [];
  const hasStats = !!(st && st.teams && st.teams.home && st.teams.away);
  const hasEvents = events.length > 0;

  let totalYc: number | null = null;
  let totalCorners: number | null = null;
  let totalPenalties: number | null = null;
  let totalRed: number | null = null;
  let lateGoal75: boolean | null = null;
  let htDraw: boolean | null = null;

  if (hasStats) {
    totalYc = Number(st.teams.home.yc || 0) + Number(st.teams.away.yc || 0);
    totalCorners = Number(st.teams.home.co || 0) + Number(st.teams.away.co || 0);
    totalPenalties = Number(st.teams.home.penF || 0) + Number(st.teams.away.penF || 0);
    totalRed = Number(st.teams.home.rc || 0) + Number(st.teams.away.rc || 0);
  } else if (hasEvents) {
    totalYc = events.filter((e) => e.type === 'yellow').length;
    totalCorners = events.filter((e) => e.type === 'corner').length;
    totalPenalties = events.filter((e) => e.type === 'penalty').length;
    totalRed = events.filter((e) => e.type === 'red').length;
  }

  if (typeof f.lateGoal75 === 'boolean') {
    lateGoal75 = f.lateGoal75;
  } else if (hasEvents) {
    lateGoal75 = events.some((e) => (e.type === 'goal' || e.type === 'own_goal') && Number(e.min || 0) >= 75);
  }

  if (Array.isArray(f.ht) && f.ht.length >= 2) {
    htDraw = Number(f.ht[0]) === Number(f.ht[1]);
  } else if (hasEvents) {
    let htH = 0;
    let htA = 0;
    for (const ev of events) {
      if (ev.type === 'halftime') break;
      if (Number(ev.min || 0) > 45 && !events.some((x) => x.type === 'halftime')) break;
      if (ev.type === 'goal' || ev.type === 'own_goal') {
        if (ev.team === 'home') htH++;
        else if (ev.team === 'away') htA++;
      }
    }
    htDraw = htH === htA;
  }

  return { hg, ag, totalYc, totalCorners, totalPenalties, totalRed, lateGoal75, htDraw, hasStats };
}

export function settlePredictionsForFixture(ctx: AdServerContext, f: any): number {
  if (!f || f.status !== 'done') return 0;
  const db = ctx.getDb();
  if (!Array.isArray(db.predictions) || !db.predictions.length) return 0;
  const hg = Number(f.hg);
  const ag = Number(f.ag);
  if (!Number.isFinite(hg) || !Number.isFinite(ag)) return 0;
  const sum = extractFixtureMatchSummary(ctx, f);
  const actual: '1' | 'X' | '2' = hg > ag ? '1' : hg < ag ? '2' : 'X';
  let settledCount = 0;
  const nowIso = new Date().toISOString();

  const detailBits: string[] = [`${hg}:${ag}`];
  if (sum.totalYc !== null) detailBits.push(`ЖК ${sum.totalYc}`);
  if (sum.totalCorners !== null) detailBits.push(`Угл ${sum.totalCorners}`);
  if (sum.totalPenalties !== null && sum.totalPenalties > 0) detailBits.push(`Пен ${sum.totalPenalties}`);
  if (sum.totalRed !== null && sum.totalRed > 0) detailBits.push(`КК ${sum.totalRed}`);
  const statSummaryText = detailBits.join(' · ');

  for (const p of db.predictions) {
    if (p.fixtureId !== f.id || p.status !== 'pending') continue;
    const stake = Math.max(1, Number(p.stake || 1));
    const market = String(p.market || 'outcome');
    const found = findMarketOption(market, p.pick);
    const odd = Number(p.odd || found?.option.odd || 2.0);
    const basePts = Number(p.basePts || Math.max(2, Math.round(odd * 1.5)) || found?.option.basePts || 3);

    let outcomeState: 'won' | 'lost' | 'void' = 'lost';
    let exactBonus = false;

    if (market === 'outcome') {
      outcomeState = p.pick === actual ? 'won' : 'lost';
      if (
        outcomeState === 'won' &&
        p.exactHome !== null &&
        p.exactHome !== undefined &&
        p.exactAway !== null &&
        p.exactAway !== undefined &&
        Number(p.exactHome) === hg &&
        Number(p.exactAway) === ag
      ) {
        exactBonus = true;
      }
    } else if (market === 'double_chance') {
      const ok =
        (p.pick === '1X' && (actual === '1' || actual === 'X')) ||
        (p.pick === '12' && (actual === '1' || actual === '2')) ||
        (p.pick === 'X2' && (actual === 'X' || actual === '2'));
      outcomeState = ok ? 'won' : 'lost';
    } else if (market === 'total_goals') {
      const tot = hg + ag;
      outcomeState = p.pick === 'over_2_5' ? (tot > 2 ? 'won' : 'lost') : tot <= 2 ? 'won' : 'lost';
    } else if (market === 'btts') {
      const both = hg > 0 && ag > 0;
      outcomeState = p.pick === 'yes' ? (both ? 'won' : 'lost') : !both ? 'won' : 'lost';
    } else if (market === 'exact_score') {
      const eh = Number(p.exactHome);
      const ea = Number(p.exactAway);
      outcomeState = Number.isFinite(eh) && Number.isFinite(ea) && eh === hg && ea === ag ? 'won' : 'lost';
    } else if (market === 'yellow_cards') {
      if (sum.totalYc === null) outcomeState = 'void';
      else outcomeState = p.pick === 'over_3_5' ? (sum.totalYc >= 4 ? 'won' : 'lost') : sum.totalYc <= 3 ? 'won' : 'lost';
    } else if (market === 'corners') {
      if (sum.totalCorners === null) outcomeState = 'void';
      else outcomeState = p.pick === 'over_8_5' ? (sum.totalCorners >= 9 ? 'won' : 'lost') : sum.totalCorners <= 8 ? 'won' : 'lost';
    } else if (market === 'specials') {
      if (p.pick === 'penalty_yes') {
        outcomeState = sum.totalPenalties === null ? 'void' : sum.totalPenalties > 0 ? 'won' : 'lost';
      } else if (p.pick === 'red_yes') {
        outcomeState = sum.totalRed === null ? 'void' : sum.totalRed > 0 ? 'won' : 'lost';
      } else if (p.pick === 'goal_75_plus') {
        outcomeState = sum.lateGoal75 === null ? 'void' : sum.lateGoal75 ? 'won' : 'lost';
      } else if (p.pick === 'ht_draw') {
        outcomeState = sum.htDraw === null ? 'void' : sum.htDraw ? 'won' : 'lost';
      }
    }

    p.status = outcomeState;
    p.actualOutcome = actual;
    p.actualScore = `${hg}:${ag}`;
    p.statSummary = statSummaryText;
    p.settledAt = nowIso;

    if (outcomeState === 'won') {
      const pts = basePts * stake + (exactBonus ? 5 : 0);
      const coinsBack = Math.max(1, Math.round(stake * odd)) + (exactBonus ? 2 : 0);
      p.pointsAwarded = pts;
      p.coinsWon = coinsBack;
      p.exactHit = exactBonus || market === 'exact_score';
      const w = ensureWallet(db, p.actorKey);
      w.coins = Number(w.coins || 0) + coinsBack;
      w.totalEarnedCoins = Number(w.totalEarnedCoins || 0) + coinsBack;
    } else if (outcomeState === 'void') {
      p.pointsAwarded = 0;
      p.coinsWon = stake;
      p.exactHit = false;
      const w = ensureWallet(db, p.actorKey);
      w.coins = Number(w.coins || 0) + stake;
    } else {
      p.pointsAwarded = 0;
      p.coinsWon = 0;
      p.exactHit = false;
    }
    settledCount++;
  }
  return settledCount;
}

export function computePredictionLeaderboard(ctx: AdServerContext, season: string, filterMembers?: Set<string>) {
  const db = ctx.getDb();
  const preds = (Array.isArray(db.predictions) ? db.predictions : []).filter((p: any) => p.season === season);
  const wallets = db.predictionWallets || {};
  const profiles = db.ownerProfiles || {};

  const map = new Map<string, any>();
  const ensureEntry = (actorKey: string) => {
    if (map.has(actorKey)) return map.get(actorKey);
    const prof = ensureOwnerProfile(ctx, actorKey);
    const tid = prof.teamId || (actorKey.startsWith('club:') ? actorKey.slice(5) : null);
    const t = tid ? ctx.team(tid) : null;
    const favT = prof.favoriteTeamId ? ctx.team(prof.favoriteTeamId) : null;
    const profileKind = prof.profileKind || (actorKey.startsWith('club:') ? 'owner' : actorKey.startsWith('admin:') ? 'admin' : 'spectator');
    const cupCount = (Array.isArray(db.predictionSeasonAwards) ? db.predictionSeasonAwards : []).filter((aw: any) =>
      Array.isArray(aw?.winners) && aw.winners.some((w: any) => w.actorKey === actorKey && (w.hasCup || w.place === 1))
    ).length;
    const entry = {
      actorKey,
      profileKind,
      displayName: prof.displayName || (t ? `Владелец ФК «${t.name}»` : 'Зритель РПЛ'),
      photoUrl: prof.photoUrl || '',
      telegramUsername: prof.telegramUsername || '',
      teamId: tid,
      teamName: t?.name || null,
      teamLogo: tid ? ctx.teamLogo(tid) : null,
      favoriteTeamName: favT?.name || null,
      cups: cupCount,
      correct: 0,
      wrong: 0,
      pending: 0,
      exactHits: 0,
      total: 0,
      kpd: 0,
      points: 0,
      coinsWon: 0,
      coins: Number(wallets[actorKey]?.coins ?? STARTER_COINS),
    };
    map.set(actorKey, entry);
    return entry;
  };

  for (const key of Object.keys(wallets)) {
    if (!filterMembers || filterMembers.has(key)) ensureEntry(key);
  }
  for (const key of Object.keys(profiles)) {
    if (!filterMembers || filterMembers.has(key)) ensureEntry(key);
  }
  if (filterMembers) {
    for (const key of filterMembers) ensureEntry(key);
  }

  for (const p of preds) {
    if (filterMembers && !filterMembers.has(p.actorKey)) continue;
    const row = ensureEntry(p.actorKey);
    if (p.status === 'won') {
      row.correct++;
      row.total++;
      row.points += Number(p.pointsAwarded || 0);
      row.coinsWon += Number(p.coinsWon || 0);
      if (p.exactHit) row.exactHits++;
    } else if (p.status === 'lost') {
      row.wrong++;
      row.total++;
    } else if (p.status === 'pending') {
      row.pending++;
    }
  }

  const list = Array.from(map.values()).map((r) => ({
    ...r,
    kpd: r.total > 0 ? Math.round((r.correct / r.total) * 1000) / 10 : 0,
  }));

  list.sort(
    (a, b) =>
      b.points - a.points ||
      b.correct - a.correct ||
      b.kpd - a.kpd ||
      a.wrong - b.wrong ||
      a.displayName.localeCompare(b.displayName, 'ru')
  );

  return list.map((r, idx) => ({ ...r, rank: idx + 1 }));
}

export function awardSeasonPredictionPrizes(ctx: AdServerContext, season?: string) {
  const db = ctx.getDb();
  const targetSeason = season || ctx.S();
  db.predictionSeasonAwards ||= [];
  if (db.predictionSeasonAwards.some((a: any) => a.season === targetSeason)) {
    return { alreadyAwarded: true, season: targetSeason, winners: [] };
  }
  ctx.ensureInitialBudgets();
  const board = computePredictionLeaderboard(ctx, targetSeason).filter((r) => r.total > 0 || r.points > 0);
  const top3 = board.slice(0, 3);
  if (!top3.length) {
    return { alreadyAwarded: false, season: targetSeason, winners: [] };
  }
  const nowIso = new Date().toISOString();
  const winners: any[] = [];

  top3.forEach((row, idx) => {
    const prize = SEASON_PRIZES[idx];
    const w = ensureWallet(db, row.actorKey);
    w.coins = Number(w.coins || 0) + prize.prizeCoins;
    w.totalEarnedCoins = Number(w.totalEarnedCoins || 0) + prize.prizeCoins;

    let awardedEur = 0;
    if (row.teamId) {
      const t = ctx.team(row.teamId);
      if (t) {
        t.budget = Number(t.budget || 0) + prize.prizeEur;
        awardedEur = prize.prizeEur;
        if (prize.hasCup) {
          t.predictionCups ||= [];
          t.predictionCups.unshift({
            id: 'pcup_' + ctx.uid(),
            season: targetSeason,
            title: prize.cupTitle,
            winnerName: row.displayName,
            date: nowIso.slice(0, 10),
          });
        }
        db.budgetHistory ||= [];
        db.budgetHistory.push({
          id: 'bh_' + ctx.uid(),
          teamId: t.id,
          amount: prize.prizeEur,
          type: 'prediction_prize',
          typeLabel: 'Приз Лиги прогнозов',
          description: `${prize.badge} (Сезон ${targetSeason}): +€${prize.prizeEur.toLocaleString('ru-RU')}, +${prize.prizeCoins} мон.${prize.hasCup ? ' + Кубок победителя' : ''}`,
          date: nowIso,
        });
      }
    }

    const prof = ensureOwnerProfile(ctx, row.actorKey);
    prof.trophies ||= [];
    prof.trophies.unshift({
      id: 'tr_' + ctx.uid(),
      title: `${prize.badge} — Сезон ${targetSeason}`,
      detail: `Очки: ${row.points} · Угадано: ${row.correct}/${row.total} · КПД: ${row.kpd}%${prize.hasCup ? ' · Награда: Кубок победителя' : ''}`,
      date: nowIso.slice(0, 10),
    });

    winners.push({
      place: prize.place,
      badge: prize.badge,
      hasCup: !!prize.hasCup,
      cupTitle: prize.cupTitle || '',
      actorKey: row.actorKey,
      displayName: row.displayName,
      teamId: row.teamId,
      teamName: row.teamName,
      points: row.points,
      correct: row.correct,
      wrong: row.wrong,
      kpd: row.kpd,
      prizeEur: awardedEur,
      prizeCoins: prize.prizeCoins,
    });
  });

  const record = { season: targetSeason, awardedAt: nowIso, winners };
  db.predictionSeasonAwards.unshift(record);
  ctx.save();
  return { alreadyAwarded: false, ...record };
}

export function getNationalProposals(ntCurrent: any) {
  ntCurrent.playerProposals ||= [];
  ntCurrent.opponentProposals ||= [];
  return {
    playerProposals: ntCurrent.playerProposals as Array<{
      pid: string;
      proposedBy: string;
      proposedByTeamId: string | null;
      proposedByName: string;
      note: string;
      votes: number;
      voters: string[];
      createdAt: string;
    }>,
    opponentProposals: ntCurrent.opponentProposals as Array<{
      id: string;
      opponent: string;
      comment: string;
      proposedBy: string;
      proposedByName: string;
      votes: number;
      voters: string[];
      createdAt: string;
    }>,
  };
}

/**
 * Applies fan/club proposal vote priority to the national team pool:
 * - Good-form players receive a bounded tie-breaker bonus proportional to votes
 *   so 4 votes beats 1 vote when both played well.
 * - Terrible-form players (matches > 0 and rating < 5.9) get ZERO vote boost so
 *   a terribly performing player with 4 votes will still lose to a solid player with 1 vote.
 */
export function scoreNationalCandidateWithVotes(p: any, votesMap: Map<string, number>): number {
  const rating = Number(p.rating || 0);
  const goals = Number(p.goals || 0);
  const assists = Number(p.assists || 0);
  const ovr = Number(p.ovr || 70);
  const matches = Number(p.matches || 0);
  const baseScore = rating * 10 + goals * 3 + assists * 2 + ovr * 0.2;
  const votes = votesMap.get(p.id) || 0;
  if (votes <= 0) return baseScore;
  const terribleForm = matches > 0 && rating > 0 && rating < 5.9;
  if (terribleForm) return baseScore;
  const voteBonus = Math.min(votes, 15) * 2.5;
  return baseScore + voteBonus;
}

export function buildNationalProposalAiLines(ntCurrent: any): {
  votesMap: Map<string, number>;
  notesByPid: Map<string, string>;
  aiInstructionSuffix: string;
} {
  const { playerProposals } = getNationalProposals(ntCurrent);
  const votesMap = new Map<string, number>();
  const notesByPid = new Map<string, string>();
  for (const prop of playerProposals) {
    votesMap.set(prop.pid, Number(prop.votes || 1));
    if (prop.note) notesByPid.set(prop.pid, prop.note);
  }
  const aiInstructionSuffix = playerProposals.length
    ? ' Клубы и болельщики предложили часть кандидатов через голосование (указано [ПРЕДЛОЖЕН: X гол.]). Если два игрока показывают сопоставимые хорошие результаты и осталось спорное место в заявке — отдавай приоритет игроку с большим числом голосов (например 4 голоса важнее 1). Но если игрок с высоким числом голосов играет откровенно плохо (низкий рейтинг < 5.9 или провальная форма), бери достойно играющего кандидата даже с 1 голосом.'
    : '';
  return { votesMap, notesByPid, aiInstructionSuffix };
}

export function registerAdsAndPredictionsRoutes(app: Express, ctx: AdServerContext) {
  // ─── Adsgram Config & Ad Session Lifecycle ────────────────────────────────────
  app.get('/api/ads/config', (req, res) => {
    const db = ctx.getDb();
    res.json({
      blocks: getAdsgramBlocks(db),
      defs: ADSGRAM_BLOCKS,
      sponsors: SPONSORS,
      seasonPrizes: SEASON_PRIZES,
    });
  });

  app.post('/api/ads/start', (req, res) => {
    pruneAdSessions();
    const blockKey = String(req.body?.blockKey || '').trim();
    const def = ADSGRAM_BLOCKS.find((b) => b.key === blockKey);
    if (!def) return ctx.fail(res, 'Неизвестный рекламный блок Adsgram');
    const actor = resolveActor(req);
    const token = 'ad_' + crypto.randomBytes(14).toString('hex');
    adSessions.set(token, {
      token,
      blockKey,
      actorKey: actor.actorKey,
      startedAt: Date.now(),
      requiresClick: def.requiresClick,
      clicked: false,
      verified: false,
      consumed: false,
    });
    const blocks = getAdsgramBlocks(ctx.getDb());
    res.json({
      ok: 1,
      sessionToken: token,
      blockKey,
      blockId: blocks[blockKey],
      format: def.format,
      durationSec: def.durationSec,
      requiresClick: def.requiresClick,
    });
  });

  app.post('/api/ads/complete', (req, res) => {
    const token = String(req.body?.sessionToken || '').trim();
    const clicked = !!req.body?.clicked;
    const s = adSessions.get(token);
    if (!s) return ctx.fail(res, 'Рекламная сессия не найдена');
    const actor = resolveActor(req);
    if (s.actorKey !== actor.actorKey) return ctx.fail(res, 'Сессия не принадлежит текущему пользователю');
    if (s.requiresClick && !clicked) {
      return ctx.fail(res, 'Необходимо кликнуть по рекламному предложению во время показа.');
    }
    s.clicked = clicked;
    s.verified = true;
    res.json({ ok: 1, adProof: token, blockKey: s.blockKey, clicked: s.clicked });
  });

  // ─── Club Sponsors & RFS Bonus ────────────────────────────────────────────────
  app.get('/api/club/sponsors', ctx.needClub, (req: any, res) => {
    res.json(buildSponsorSummary(ctx, req.tid));
  });

  app.post('/api/club/sponsors/request', ctx.needClub, (req: any, res) => {
    const db = ctx.getDb();
    const sponsorId = String(req.body?.sponsorId || '').trim();
    const sp = SPONSORS.find((x) => x.id === sponsorId);
    if (!sp) return ctx.fail(res, 'Спонсор не найден');
    const actor = resolveActor(req);
    const st = ensureSponsorState(db, req.tid);
    const currentViews = Number(st.views[sp.id] || 0);
    if (currentViews >= sp.maxViews) {
      return ctx.fail(res, `Лимит показов у спонсора «${sp.name}» исчерпан (${sp.maxViews}/${sp.maxViews}) в этом 24-часовом цикле.`);
    }
    const v = verifyAndConsumeAdProof(req.body?.adProof, sp.blockKey, actor.actorKey, false);
    if (!v.ok) return ctx.fail(res, v.error);

    if (!st.cycleStartedAt) st.cycleStartedAt = Date.now();
    st.views[sp.id] = currentViews + 1;

    // 95% approve, 5% decline
    const approved = Math.random() < sp.approvalRate;
    const t = ctx.team(req.tid);
    ctx.ensureInitialBudgets();
    const nowIso = new Date().toISOString();

    if (approved) {
      st.approved[sp.id] = Number(st.approved[sp.id] || 0) + 1;
      st.earnedEur = Number(st.earnedEur || 0) + sp.rewardEur;
      if (t) {
        t.budget = Number(t.budget || 0) + sp.rewardEur;
        db.budgetHistory ||= [];
        db.budgetHistory.push({
          id: 'bh_' + ctx.uid(),
          teamId: t.id,
          amount: sp.rewardEur,
          type: 'sponsor_ad',
          typeLabel: `Спонсор: ${sp.name}`,
          description: `${sp.name} (${sp.formatLabel}): +€${sp.rewardEur.toLocaleString('ru-RU')}`,
          date: nowIso,
        });
      }
    } else {
      st.declined[sp.id] = Number(st.declined[sp.id] || 0) + 1;
    }

    st.history.unshift({
      id: 'sph_' + ctx.uid(),
      sponsorId: sp.id,
      sponsorName: sp.name,
      approved,
      amount: approved ? sp.rewardEur : 0,
      date: nowIso,
    });
    st.history = st.history.slice(0, 30);

    ctx.save();
    const summary = buildSponsorSummary(ctx, req.tid);
    res.json({
      ok: 1,
      approved,
      amount: approved ? sp.rewardEur : 0,
      newBudget: t?.budget || 0,
      message: approved
        ? `Спонсор «${sp.name}» одобрил заявку! Начислено +€${sp.rewardEur.toLocaleString('ru-RU')}.`
        : `Спонсор «${sp.name}» отклонил запрос на финансирование (шанс отказа 5%), но просмотр засчитан в прогресс к бонусу РФС!`,
      summary,
    });
  });

  app.post('/api/club/sponsors/rfs-claim', ctx.needClub, (req: any, res) => {
    const db = ctx.getDb();
    const actor = resolveActor(req);
    const st = ensureSponsorState(db, req.tid);
    const totalViews = SPONSORS.reduce((acc, s) => acc + Math.min(s.maxViews, Number(st.views[s.id] || 0)), 0);
    if (totalViews < 30) {
      return ctx.fail(res, `Сначала нужно просмотреть все 30 реклам у 3 спонсоров (сейчас ${totalViews}/30).`);
    }
    if (Number(st.rfsExtraViews || 0) >= 30) {
      return ctx.fail(res, 'Достигнут дневной лимит блока Adsgram для бонуса РФС (30/30). Дождитесь сброса 24-часового таймера.');
    }
    const v = verifyAndConsumeAdProof(req.body?.adProof, 'rfs_bonus', actor.actorKey, false);
    if (!v.ok) return ctx.fail(res, v.error);

    ctx.ensureInitialBudgets();
    const t = ctx.team(req.tid);
    const reward = 1000;
    const isActivation = !st.rfsClaimed;
    st.rfsClaimed = true;
    st.rfsExtraViews = Number(st.rfsExtraViews || 0) + 1;
    st.rfsEarnedEur = Number(st.rfsEarnedEur || 0) + reward;
    const nowIso = new Date().toISOString();

    if (t) {
      t.budget = Number(t.budget || 0) + reward;
      db.budgetHistory ||= [];
      db.budgetHistory.push({
        id: 'bh_' + ctx.uid(),
        teamId: t.id,
        amount: reward,
        type: 'rfs_bonus_ad',
        typeLabel: 'Бонус от РФС',
        description: isActivation
          ? `Бонус от РФС активирован (после 30/30 реклам): +€${reward.toLocaleString('ru-RU')}`
          : `Бонусная реклама РФС #${st.rfsExtraViews}: +€${reward.toLocaleString('ru-RU')}`,
        date: nowIso,
      });
    }

    st.history.unshift({
      id: 'sph_' + ctx.uid(),
      sponsorId: 'rfs',
      sponsorName: 'Бонус от РФС',
      approved: true,
      amount: reward,
      date: nowIso,
    });
    st.history = st.history.slice(0, 30);

    ctx.save();
    res.json({
      ok: 1,
      amount: reward,
      isActivation,
      newBudget: t?.budget || 0,
      message: isActivation
        ? 'Бонус от РФС получен! +€1 000 на счёт, теперь каждая следующая реклама РФС приносит €1 000 до сброса таймера!'
        : `Бонусная реклама РФС засчитана: +€1 000 в бюджет клуба!`,
      summary: buildSponsorSummary(ctx, req.tid),
    });
  });

  // ─── Telegram WebApp Auto-Auth & Owner/Spectator Profiles ─────────────────────
  app.post('/api/auth/telegram', (req: any, res) => {
    const db = ctx.getDb();
    const parsed = verifyAndParseTelegramAuth(db, req.body?.initData, req.body?.user, req.headers);
    if (!parsed) {
      return ctx.fail(res, 'Данные Telegram не переданы');
    }
    const tgKey = `tg_${parsed.tgId}`;
    db.telegramUsers ||= {};
    db.telegramUsers[tgKey] = {
      tgId: parsed.tgId,
      displayName: parsed.displayName,
      username: parsed.username,
      photoUrl: parsed.photoUrl,
      verified: parsed.verified,
      updatedAt: new Date().toISOString(),
    };

    // Always ensure spectator profile for this Telegram user
    const specProf = ensureOwnerProfile(ctx, `user:${tgKey}`, parsed.displayName, parsed.photoUrl, {
      tgId: parsed.tgId,
      username: parsed.username,
    });

    // If user is currently logged into a club, link Telegram and sync name/photo to Club Owner Profile
    db.telegramClubLinks ||= {};
    let activeTeamId: string | null = null;
    if (req.me?.role === 'club' && req.me.teamId) {
      activeTeamId = req.me.teamId;
      db.telegramClubLinks[tgKey] = activeTeamId;
      ensureOwnerProfile(ctx, `club:${activeTeamId}`, parsed.displayName, parsed.photoUrl, {
        tgId: parsed.tgId,
        username: parsed.username,
      });
    } else if (db.telegramClubLinks[tgKey]) {
      const linkedTid = db.telegramClubLinks[tgKey];
      if (ctx.team(linkedTid)) activeTeamId = linkedTid;
    }

    ctx.save();
    res.json({
      ok: 1,
      verified: parsed.verified,
      telegramUser: db.telegramUsers[tgKey],
      spectatorProfile: specProf,
      linkedTeamId: activeTeamId,
    });
  });

  app.get('/api/profile', (req: any, res) => {
    const actor = resolveActor(req);
    const db = ctx.getDb();
    const hints = extractTgHintsFromReq(ctx, req);
    const prof = ensureOwnerProfile(ctx, actor.actorKey, hints.name, hints.photo, {
      tgId: hints.tgId,
      username: hints.username,
    });
    const board = computePredictionLeaderboard(ctx, ctx.S());
    const stats = board.find((x) => x.actorKey === actor.actorKey) || {
      rank: null,
      correct: 0,
      wrong: 0,
      pending: 0,
      total: 0,
      kpd: 0,
      points: 0,
      coins: ensureWallet(db, actor.actorKey).coins,
    };
    const t = prof.teamId ? ctx.team(prof.teamId) : null;
    const favT = prof.favoriteTeamId ? ctx.team(prof.favoriteTeamId) : null;
    const tgKey = hints.tgId ? `tg_${hints.tgId}` : prof.telegramId ? `tg_${prof.telegramId}` : '';
    const tgRec = tgKey ? db.telegramUsers?.[tgKey] : null;
    res.json({
      profile: prof,
      profileKind: prof.profileKind || (actor.type === 'club' ? 'owner' : actor.type === 'admin' ? 'admin' : 'spectator'),
      stats,
      telegramUser: tgRec || (hints.tgId ? { tgId: hints.tgId, displayName: hints.name || '', username: hints.username || '', photoUrl: hints.photo || '' } : null),
      team: t ? { id: t.id, name: t.name, comp: t.comp, compName: ctx.compName(t.comp), logo: ctx.teamLogo(t.id), budget: t.budget || 0 } : null,
      favoriteTeam: favT ? { id: favT.id, name: favT.name, comp: favT.comp, logo: ctx.teamLogo(favT.id) } : null,
    });
  });

  app.get('/api/profile/:actorKey', (req, res) => {
    const targetKey = decodeURIComponent(String(req.params.actorKey || ''));
    if (!targetKey) return ctx.fail(res, 'Профиль не указан');
    const db = ctx.getDb();
    const prof = ensureOwnerProfile(ctx, targetKey);
    const board = computePredictionLeaderboard(ctx, ctx.S());
    const stats = board.find((x) => x.actorKey === targetKey) || {
      rank: null,
      correct: 0,
      wrong: 0,
      pending: 0,
      total: 0,
      kpd: 0,
      points: 0,
      coins: Number(db.predictionWallets?.[targetKey]?.coins ?? STARTER_COINS),
    };
    const t = prof.teamId ? ctx.team(prof.teamId) : null;
    const favT = prof.favoriteTeamId ? ctx.team(prof.favoriteTeamId) : null;
    res.json({
      profile: prof,
      profileKind: prof.profileKind || (targetKey.startsWith('club:') ? 'owner' : targetKey.startsWith('admin:') ? 'admin' : 'spectator'),
      stats,
      team: t ? { id: t.id, name: t.name, comp: t.comp, compName: ctx.compName(t.comp), logo: ctx.teamLogo(t.id), budget: t.budget || 0 } : null,
      favoriteTeam: favT ? { id: favT.id, name: favT.name, comp: favT.comp, logo: ctx.teamLogo(favT.id) } : null,
    });
  });

  app.post('/api/profile', (req: any, res) => {
    const actor = resolveActor(req);
    const db = ctx.getDb();
    const hints = extractTgHintsFromReq(ctx, req);
    const prof = ensureOwnerProfile(ctx, actor.actorKey, hints.name, hints.photo, {
      tgId: hints.tgId,
      username: hints.username,
    });

    if (req.body?.syncFromTelegram) {
      const tgKey = hints.tgId ? `tg_${hints.tgId}` : prof.telegramId ? `tg_${prof.telegramId}` : '';
      const tgRec = tgKey ? db.telegramUsers?.[tgKey] : null;
      const tgName = tgRec?.displayName || hints.name;
      const tgPhoto = tgRec?.photoUrl || hints.photo;
      if (!tgName && !tgPhoto) {
        return ctx.fail(res, 'Данные Telegram не обнаружены. Откройте приложение через Telegram-бота.');
      }
      if (tgName) {
        prof.displayName = tgName;
        prof.customName = false;
      }
      if (tgPhoto) {
        prof.photoUrl = tgPhoto;
        prof.customPhoto = false;
      }
      if (tgRec?.tgId || hints.tgId) prof.telegramId = tgRec?.tgId || hints.tgId;
      if (tgRec?.username || hints.username) prof.telegramUsername = tgRec?.username || hints.username;
      prof.updatedAt = new Date().toISOString();
      ctx.save();
      return res.json({ ok: 1, profile: prof, message: 'Имя и фото подтянуты из Telegram' });
    }

    const displayName = ctx.cleanTxt(req.body?.displayName, 60);
    const bio = ctx.cleanTxt(req.body?.bio, 400);
    const career = ctx.cleanTxt(req.body?.career, 800);
    const rawPhoto = String(req.body?.photoUrl || '').trim();
    if (displayName && displayName !== prof.displayName) {
      prof.displayName = displayName;
      prof.customName = true;
    }
    if (req.body?.bio !== undefined) prof.bio = bio;
    if (req.body?.career !== undefined && prof.profileKind !== 'spectator') prof.career = career;
    if (req.body?.favoriteTeamId !== undefined) {
      const ftid = String(req.body.favoriteTeamId || '').trim();
      prof.favoriteTeamId = ftid && ctx.team(ftid) ? ftid : null;
    }
    if (req.body?.photoUrl !== undefined) {
      if (!rawPhoto) {
        prof.photoUrl = '';
        prof.customPhoto = true;
      } else if (/^(https?:\/\/|data:image\/(png|jpeg|jpg|webp);base64,)/i.test(rawPhoto) && rawPhoto.length <= 220_000) {
        if (rawPhoto !== prof.photoUrl) prof.customPhoto = true;
        prof.photoUrl = rawPhoto;
      } else {
        return ctx.fail(res, 'Некорректное фото или слишком большой файл (макс. 200 КБ).');
      }
    }
    prof.updatedAt = new Date().toISOString();
    ctx.save();
    res.json({ ok: 1, profile: prof, message: prof.profileKind === 'spectator' ? 'Профиль зрителя обновлён' : 'Профиль владельца обновлён' });
  });

  // ─── Predictions Tab & Coin Economy ───────────────────────────────────────────
  app.get('/api/predictions', (req: any, res) => {
    const db = ctx.getDb();
    const season = ctx.S();

    // Ensure any recently finished matches settle pending predictions
    for (const f of db.fixtures || []) {
      if (f.status === 'done') settlePredictionsForFixture(ctx, f);
    }

    const hints = extractTgHintsFromReq(ctx, req);
    const actor = resolveActor(req);
    const profile = ensureOwnerProfile(ctx, actor.actorKey, hints.name, hints.photo, {
      tgId: hints.tgId,
      username: hints.username,
    });
    const wallet = ensureWallet(db, actor.actorKey);
    const blocks = getAdsgramBlocks(db);

    const openFixtures = (db.fixtures || [])
      .filter((f: any) => (f.season || season) === season && f.status === 'scheduled' && (f.comp === 'rpl' || f.comp === 'cup' || f.comp === 'supercup' || f.comp === 'friendly_match'))
      .sort((a: any, b: any) => String(a.date || '').localeCompare(String(b.date || '')) || String(a.time || '').localeCompare(String(b.time || '')))
      .slice(0, 32)
      .map((f: any) => {
        const fxLine = computeFixtureMarkets(ctx, f);
        return {
          id: f.id,
          comp: f.comp,
          compName: ctx.compName(f.comp),
          round: f.round,
          label: f.label || `Тур ${f.round || 1}`,
          date: f.gameDate || f.date,
          time: f.gameTime || f.time || '19:00',
          realDate: f.realDate || f.date,
          realTime: f.realTime || f.time || '19:00',
          homeId: f.home,
          awayId: f.away,
          homeName: ctx.tn(f.home),
          awayName: ctx.tn(f.away),
          homeLogo: ctx.teamLogo(f.home),
          awayLogo: ctx.teamLogo(f.away),
          markets: fxLine.markets,
          quickScores: fxLine.quickScores,
          expectedGoals: fxLine.expectedGoals,
        };
      });

    const allPreds = Array.isArray(db.predictions) ? db.predictions : [];
    const myPredictions = allPreds
      .filter((p: any) => p.actorKey === actor.actorKey && p.season === season)
      .slice(-60)
      .reverse()
      .map((p: any) => {
        const fxObj = (db.fixtures || []).find((f: any) => f.id === p.fixtureId);
        const market = p.market || 'outcome';
        const found = findMarketOption(market, p.pick);
        return {
          ...p,
          market,
          marketTitle: found?.marketDef.title || 'Исход матча',
          pickLabel: p.pickLabel || (market === 'exact_score' ? `Точный счёт ${p.exactHome}:${p.exactAway}` : found?.option.label || p.pick),
          homeName: fxObj ? ctx.tn(fxObj.home) : p.homeName || 'Хозяева',
          awayName: fxObj ? ctx.tn(fxObj.away) : p.awayName || 'Гости',
          label: fxObj?.label || p.label || '',
          date: fxObj?.date || p.date || '',
        };
      });

    const leaderboard = computePredictionLeaderboard(ctx, season);

    const leagues = (Array.isArray(db.predictionLeagues) ? db.predictionLeagues : []).map((lg: any) => {
      const memberSet = new Set<string>(Array.isArray(lg.members) ? lg.members : []);
      const board = computePredictionLeaderboard(ctx, season, memberSet);
      return {
        id: lg.id,
        name: lg.name,
        description: lg.description || '',
        code: lg.code,
        isPublic: lg.isPublic !== false,
        ownerKey: lg.ownerKey,
        isMember: memberSet.has(actor.actorKey),
        membersCount: memberSet.size,
        leaderboard: board,
      };
    });

    res.json({
      season,
      actorKey: actor.actorKey,
      profile,
      profileKind: profile.profileKind || (actor.type === 'club' ? 'owner' : actor.type === 'admin' ? 'admin' : 'spectator'),
      wallet: {
        coins: wallet.coins,
        totalEarnedCoins: wallet.totalEarnedCoins,
        adCounts: wallet.adCounts,
        resetAt: wallet.cycleStartedAt ? wallet.cycleStartedAt + CYCLE_MS : null,
      },
      coinOffers: [
        { blockKey: 'coins_short', blockId: blocks.coins_short, label: 'Короткая реклама', durationHint: '5 сек', rewardCoins: 1, maxViews: 30, views: Number(wallet.adCounts.coins_short || 0) },
        { blockKey: 'coins_banner', blockId: blocks.coins_banner, label: 'Баннерная реклама', durationHint: 'баннер', rewardCoins: 2, maxViews: 30, views: Number(wallet.adCounts.coins_banner || 0) },
        { blockKey: 'coins_long', blockId: blocks.coins_long, label: 'Длинная реклама', durationHint: '30 сек', rewardCoins: 3, maxViews: 30, views: Number(wallet.adCounts.coins_long || 0) },
      ],
      markets: PREDICTION_MARKETS,
      fixtures: openFixtures,
      myPredictions,
      leaderboard,
      leagues,
      teamsList: (db.teams || []).filter((t: any) => t.comp === 'rpl' || t.comp === 'fnl').map((t: any) => ({ id: t.id, name: t.name })),
      seasonPrizes: SEASON_PRIZES,
      seasonAwards: db.predictionSeasonAwards || [],
    });
  });

  app.post('/api/predictions/earn-coins', (req: any, res) => {
    const db = ctx.getDb();
    const blockKey = String(req.body?.blockKey || '').trim() as 'coins_short' | 'coins_banner' | 'coins_long';
    const rewardMap: Record<string, number> = { coins_short: 1, coins_banner: 2, coins_long: 3 };
    const reward = rewardMap[blockKey];
    if (!reward) return ctx.fail(res, 'Неверный тип рекламы для получения монет');

    const actor = resolveActor(req);
    const wallet = ensureWallet(db, actor.actorKey);
    const cur = Number(wallet.adCounts[blockKey] || 0);
    if (cur >= 30) {
      return ctx.fail(res, 'Достигнут лимит рекламного блока (30/30 за 24 часа). Выберите другой формат или дождитесь сброса.');
    }

    const v = verifyAndConsumeAdProof(req.body?.adProof, blockKey, actor.actorKey, false);
    if (!v.ok) return ctx.fail(res, v.error);

    if (!wallet.cycleStartedAt) wallet.cycleStartedAt = Date.now();
    wallet.adCounts[blockKey] = cur + 1;
    wallet.coins = Number(wallet.coins || 0) + reward;
    wallet.totalEarnedCoins = Number(wallet.totalEarnedCoins || 0) + reward;
    ctx.save();

    res.json({
      ok: 1,
      coinsAdded: reward,
      coins: wallet.coins,
      message: `Начислено +${reward} ${reward === 1 ? 'монета' : 'монеты'} за просмотр рекламы!`,
    });
  });

  app.post('/api/predictions/bet', (req: any, res) => {
    const db = ctx.getDb();
    const fixtureId = String(req.body?.fixtureId || '').trim();
    const market = String(req.body?.market || 'outcome').trim();
    const pick = String(req.body?.pick || '').trim();
    const stake = Math.max(1, Math.min(10, Math.round(Number(req.body?.stake || 1))));

    const found = findMarketOption(market, pick);
    if (!found) {
      return ctx.fail(res, 'Неизвестный тип прогноза или исход.');
    }

    const f = (db.fixtures || []).find((x: any) => x.id === fixtureId);
    if (!f) return ctx.fail(res, 'Матч не найден');
    if (f.status !== 'scheduled') return ctx.fail(res, 'Приём прогнозов на этот матч уже закрыт');

    const rawEh = req.body?.exactHome;
    const rawEa = req.body?.exactAway;
    const hasExact = rawEh !== '' && rawEh !== null && rawEh !== undefined && rawEa !== '' && rawEa !== null && rawEa !== undefined;
    const exactHome = hasExact ? Math.max(0, Math.min(20, Math.round(Number(rawEh)))) : null;
    const exactAway = hasExact ? Math.max(0, Math.min(20, Math.round(Number(rawEa)))) : null;
    if (market === 'exact_score' && (exactHome === null || exactAway === null)) {
      return ctx.fail(res, 'Укажите точный счёт хозяев и гостей (например, 2:1)');
    }

    const hints = extractTgHintsFromReq(ctx, req);
    const actor = resolveActor(req);
    ensureOwnerProfile(ctx, actor.actorKey, hints.name, hints.photo, { tgId: hints.tgId, username: hints.username });
    const wallet = ensureWallet(db, actor.actorKey);
    db.predictions ||= [];

    const season = f.season || ctx.S();
    const existing = db.predictions.find((p: any) =>
      p.fixtureId === fixtureId &&
      p.actorKey === actor.actorKey &&
      (p.market || 'outcome') === market
    );
    if (existing) {
      return ctx.fail(res, `Вы уже сделали прогноз в категории «${found.marketDef.title}» на этот матч.`);
    }
    if (Number(wallet.coins || 0) < stake) {
      return ctx.fail(res, `Недостаточно монет (нужно ${stake}, на балансе ${wallet.coins}). Посмотрите рекламу, чтобы заработать монеты!`);
    }

    const fxLine = computeFixtureMarkets(ctx, f);
    const fxMarket = fxLine.markets.find((m) => m.id === market);
    const fxOption = fxMarket?.options.find((o) => o.pick === pick) || found.option;
    const finalOdd = market === 'exact_score'
      ? fxLine.calcExactOdd(exactHome!, exactAway!)
      : Number(fxOption.odd || found.option.odd);
    const finalBasePts = market === 'exact_score'
      ? Math.max(8, Math.round(finalOdd * 1.4))
      : Number(fxOption.basePts || found.option.basePts || 3);

    const pickLabel =
      market === 'outcome'
        ? (pick === '1' ? `П1 (${ctx.tn(f.home)})` : pick === '2' ? `П2 (${ctx.tn(f.away)})` : 'Ничья (Х)')
        : market === 'exact_score'
          ? `Точный счёт ${exactHome}:${exactAway}`
          : fxOption.label;

    wallet.coins = Number(wallet.coins) - stake;
    const pred = {
      id: 'pr_' + ctx.uid(),
      season,
      actorKey: actor.actorKey,
      teamId: actor.teamId,
      fixtureId: f.id,
      homeName: ctx.tn(f.home),
      awayName: ctx.tn(f.away),
      label: f.label || `Тур ${f.round || 1}`,
      date: f.date,
      market,
      marketTitle: fxMarket?.title || found.marketDef.title,
      pick,
      pickLabel,
      odd: finalOdd,
      basePts: finalBasePts,
      exactHome,
      exactAway,
      stake,
      status: 'pending',
      pointsAwarded: 0,
      coinsWon: 0,
      createdAt: new Date().toISOString(),
    };
    db.predictions.push(pred);
    ctx.save();

    res.json({
      ok: 1,
      prediction: pred,
      coins: wallet.coins,
      message: `Прогноз «${pickLabel}» (×${finalOdd.toFixed(2)}) принят — ${stake} мон.!`,
    });
  });

  app.post('/api/predictions/league/create', (req: any, res) => {
    const db = ctx.getDb();
    const name = ctx.cleanTxt(req.body?.name, 50);
    if (name.length < 2) return ctx.fail(res, 'Введите название лиги (от 2 символов)');
    const description = ctx.cleanTxt(req.body?.description, 160);
    const isPublic = req.body?.isPublic !== false;
    const actor = resolveActor(req);
    ensureOwnerProfile(ctx, actor.actorKey);
    ensureWallet(db, actor.actorKey);

    db.predictionLeagues ||= [];
    const code = crypto.randomBytes(3).toString('hex').toUpperCase();
    const lg = {
      id: 'plg_' + ctx.uid(),
      name,
      description,
      code,
      isPublic,
      ownerKey: actor.actorKey,
      members: [actor.actorKey],
      createdAt: new Date().toISOString(),
    };
    db.predictionLeagues.unshift(lg);
    ctx.save();
    res.json({ ok: 1, league: lg, message: `Лига «${name}» создана! Код приглашения: ${code}` });
  });

  app.post('/api/predictions/league/join', (req: any, res) => {
    const db = ctx.getDb();
    const q = String(req.body?.codeOrId || '').trim();
    if (!q) return ctx.fail(res, 'Укажите код или ID лиги');
    const actor = resolveActor(req);
    ensureOwnerProfile(ctx, actor.actorKey);
    ensureWallet(db, actor.actorKey);

    db.predictionLeagues ||= [];
    const lg = db.predictionLeagues.find(
      (x: any) => x.id === q || String(x.code || '').toUpperCase() === q.toUpperCase()
    );
    if (!lg) return ctx.fail(res, 'Лига с таким кодом не найдена');
    lg.members ||= [];
    if (!lg.members.includes(actor.actorKey)) {
      lg.members.push(actor.actorKey);
      ctx.save();
    }
    res.json({ ok: 1, leagueId: lg.id, message: `Вы вступили в лигу «${lg.name}»!` });
  });

  app.post('/api/predictions/league/leave', (req: any, res) => {
    const db = ctx.getDb();
    const leagueId = String(req.body?.leagueId || '').trim();
    const actor = resolveActor(req);
    const lg = (db.predictionLeagues || []).find((x: any) => x.id === leagueId);
    if (!lg) return ctx.fail(res, 'Лига не найдена');
    lg.members = (lg.members || []).filter((m: string) => m !== actor.actorKey);
    ctx.save();
    res.json({ ok: 1, message: `Вы покинули лигу «${lg.name}»` });
  });

  app.post('/api/admin/predictions/award-season', ctx.admin, (req, res) => {
    const season = String(req.body?.season || ctx.S()).trim();
    const out = awardSeasonPredictionPrizes(ctx, season);
    if (out.alreadyAwarded) {
      return ctx.fail(res, `Призы за сезон ${season} уже были выданы.`);
    }
    if (!out.winners.length) {
      return ctx.fail(res, `Нет завершённых прогнозов за сезон ${season} для награждения.`);
    }
    res.json({ ok: 1, ...out, message: `Призы Топ-3 Лиги прогнозов за сезон ${season} успешно выданы!` });
  });

  // ─── National Team Proposals & Voting ─────────────────────────────────────────
  app.post('/api/national/propose-player', ctx.needClub, (req: any, res) => {
    const nt = ctx.ensureNationalTeam();
    const pid = String(req.body?.pid || '').trim();
    const note = ctx.cleanTxt(req.body?.note, 180);
    const p = ctx.player(pid);
    if (!p) return ctx.fail(res, 'Игрок не найден');
    if (req.me?.role !== 'admin' && p.teamId !== req.tid) {
      return ctx.fail(res, 'Предложить в сборную можно только игрока своего клуба.');
    }
    const isRus = !p.nat || p.nat === 'RUS' || p.nat === 'Россия' || p.nation === 'Россия';
    if (!isRus) {
      return ctx.fail(res, 'В сборную России можно предложить только игрока с российским гражданством.');
    }

    const actor = resolveActor(req);
    const { playerProposals } = getNationalProposals(nt.current);
    const existing = playerProposals.find((x) => x.pid === pid);
    if (existing) {
      return ctx.fail(res, 'Этот игрок уже предложен на текущий сбор — вы можете поддержать его голосом.');
    }

    const v = verifyAndConsumeAdProof(req.body?.adProof, 'nt_propose_player', actor.actorKey, false);
    if (!v.ok) return ctx.fail(res, v.error);

    const prof = ensureOwnerProfile(ctx, actor.actorKey);
    playerProposals.push({
      pid,
      proposedBy: actor.actorKey,
      proposedByTeamId: req.tid,
      proposedByName: `${ctx.tn(req.tid)} (${prof.displayName})`,
      note,
      votes: 1,
      voters: [actor.actorKey],
      createdAt: new Date().toISOString(),
    });
    ctx.save();
    res.json({ ok: 1, message: `${p.name} предложен в сборную России (1 голос)!` });
  });

  app.post('/api/national/vote-player', (req: any, res) => {
    const nt = ctx.ensureNationalTeam();
    const pid = String(req.body?.pid || '').trim();
    const actor = resolveActor(req);
    const { playerProposals } = getNationalProposals(nt.current);
    const prop = playerProposals.find((x) => x.pid === pid);
    if (!prop) return ctx.fail(res, 'Кандидат не найден среди предложенных');
    prop.voters ||= [];
    if (prop.voters.includes(actor.actorKey)) {
      return ctx.fail(res, 'Вы уже отдали свой голос за этого кандидата в текущем сборе.');
    }

    const v = verifyAndConsumeAdProof(req.body?.adProof, 'nt_vote_player', actor.actorKey, false);
    if (!v.ok) return ctx.fail(res, v.error);

    prop.voters.push(actor.actorKey);
    prop.votes = prop.voters.length;
    ctx.save();
    res.json({ ok: 1, votes: prop.votes, message: `Голос учтён! У кандидата теперь ${prop.votes} гол.` });
  });

  app.post('/api/national/propose-opponent', (req: any, res) => {
    const nt = ctx.ensureNationalTeam();
    const opponent = ctx.cleanTxt(req.body?.opponent, 60);
    const comment = ctx.cleanTxt(req.body?.comment, 160);
    if (opponent.length < 2) return ctx.fail(res, 'Укажите название сборной-соперника');

    const actor = resolveActor(req);
    const { opponentProposals } = getNationalProposals(nt.current);
    if (opponentProposals.some((x) => x.opponent.toLowerCase() === opponent.toLowerCase())) {
      return ctx.fail(res, `Сборная «${opponent}» уже есть в списке — проголосуйте за готовый вариант!`);
    }

    const v = verifyAndConsumeAdProof(req.body?.adProof, 'nt_propose_opp', actor.actorKey, false);
    if (!v.ok) return ctx.fail(res, v.error);

    const prof = ensureOwnerProfile(ctx, actor.actorKey);
    opponentProposals.push({
      id: 'ntop_' + ctx.uid(),
      opponent,
      comment,
      proposedBy: actor.actorKey,
      proposedByName: prof.teamId ? `${ctx.tn(prof.teamId)} · ${prof.displayName}` : prof.displayName,
      votes: 1,
      voters: [actor.actorKey],
      createdAt: new Date().toISOString(),
    });
    ctx.save();
    res.json({ ok: 1, message: `Соперник «${opponent}» предложен для голосования!` });
  });

  app.post('/api/national/vote-opponent', (req: any, res) => {
    const nt = ctx.ensureNationalTeam();
    const proposalId = String(req.body?.proposalId || '').trim();
    const actor = resolveActor(req);
    const { opponentProposals } = getNationalProposals(nt.current);
    const prop = opponentProposals.find((x) => x.id === proposalId);
    if (!prop) return ctx.fail(res, 'Вариант соперника не найден');
    prop.voters ||= [];
    if (prop.voters.includes(actor.actorKey)) {
      return ctx.fail(res, `Вы уже голосовали за сборную «${prop.opponent}».`);
    }

    const v = verifyAndConsumeAdProof(req.body?.adProof, 'nt_vote_opp', actor.actorKey, false);
    if (!v.ok) return ctx.fail(res, v.error);

    prop.voters.push(actor.actorKey);
    prop.votes = prop.voters.length;
    ctx.save();
    res.json({ ok: 1, votes: prop.votes, message: `Голос за матч со сборной «${prop.opponent}» учтён!` });
  });
}
