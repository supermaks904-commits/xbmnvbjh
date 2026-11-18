// @ts-nocheck
/**
 * Foreign clubs and international transfer offers
 */

export const FOREIGN_CLUBS: any[] = [
  { id: 'besiktas', name: 'Бешикташ', country: 'Турция', flag: '🇹🇷', league: 'Суперлига', reputation: 78 },
  { id: 'galatasaray', name: 'Галатасарай', country: 'Турция', flag: '🇹🇷', league: 'Суперлига', reputation: 82 },
  { id: 'fenerbahce', name: 'Фенербахче', country: 'Турция', flag: '🇹🇷', league: 'Суперлига', reputation: 81 },
  { id: 'trabzonspor', name: 'Трабзонспор', country: 'Турция', flag: '🇹🇷', league: 'Суперлига', reputation: 76 },
  { id: 'crvena_zvezda', name: 'Црвена Звезда', country: 'Сербия', flag: '🇷🇸', league: 'Суперлига', reputation: 76 },
  { id: 'partizan', name: 'Партизан', country: 'Сербия', flag: '🇷🇸', league: 'Суперлига', reputation: 74 },
  { id: 'paok', name: 'ПАОК', country: 'Греция', flag: '🇬🇷', league: 'Суперлига', reputation: 77 },
  { id: 'olympiacos', name: 'Олимпиакос', country: 'Греция', flag: '🇬🇷', league: 'Суперлига', reputation: 79 },
  { id: 'aek_athens', name: 'АЕК Афины', country: 'Греция', flag: '🇬🇷', league: 'Суперлига', reputation: 76 },
  { id: 'monaco', name: 'Монако', country: 'Франция', flag: '🇫🇷', league: 'Лига 1', reputation: 84 },
  { id: 'marseille', name: 'Марсель', country: 'Франция', flag: '🇫🇷', league: 'Лига 1', reputation: 83 },
  { id: 'lyon', name: 'Лион', country: 'Франция', flag: '🇫🇷', league: 'Лига 1', reputation: 81 },
  { id: 'lehavre', name: 'Гавр', country: 'Франция', flag: '🇫🇷', league: 'Лига 1', reputation: 73 },
  { id: 'sociedad', name: 'Реал Сосьедад', country: 'Испания', flag: '🇪🇸', league: 'Ла Лига', reputation: 83 },
  { id: 'sevilla', name: 'Севилья', country: 'Испания', flag: '🇪🇸', league: 'Ла Лига', reputation: 80 },
  { id: 'girona', name: 'Жирона', country: 'Испания', flag: '🇪🇸', league: 'Ла Лига', reputation: 78 },
  { id: 'atalanta', name: 'Аталанта', country: 'Италия', flag: '🇮🇹', league: 'Серия А', reputation: 84 },
  { id: 'fiorentina', name: 'Фиорентина', country: 'Италия', flag: '🇮🇹', league: 'Серия А', reputation: 80 },
  { id: 'torino', name: 'Торино', country: 'Италия', flag: '🇮🇹', league: 'Серия А', reputation: 76 },
  { id: 'wolfsburg', name: 'Вольфсбург', country: 'Германия', flag: '🇩🇪', league: 'Бундеслига', reputation: 78 },
  { id: 'porto', name: 'Порту', country: 'Португалия', flag: '🇵🇹', league: 'Примейра-лига', reputation: 84 },
  { id: 'braga', name: 'Брага', country: 'Португалия', flag: '🇵🇹', league: 'Примейра-лига', reputation: 79 },
  { id: 'feyenoord', name: 'Фейеноорд', country: 'Нидерланды', flag: '🇳🇱', league: 'Эредивизи', reputation: 81 },
  { id: 'brugge', name: 'Брюгге', country: 'Бельгия', flag: '🇧🇪', league: 'Про-лига', reputation: 79 },
  { id: 'alhilal', name: 'Аль-Хиляль', country: 'Саудовская Аравия', flag: '🇸🇦', league: 'Про-лига', reputation: 83 },
  { id: 'alnasr', name: 'Аль-Наср', country: 'Саудовская Аравия', flag: '🇸🇦', league: 'Про-лига', reputation: 82 }
];

function collectPlayerSeasonScoutProfile(db: any, pid: string, currentFixture?: any, currentMatch?: any) {
  const targetSeason = db?.settings?.season || '2026/27';
  const allFx = Array.isArray(db?.fixtures) ? db.fixtures : [];
  const watchMap = (db.scoutWatchlist && typeof db.scoutWatchlist === 'object') ? db.scoutWatchlist : (db.scoutWatchlist = {});
  const watch = watchMap[pid] || (watchMap[pid] = { heat: 0, ratingsByFixture: {}, motmFixtures: {}, watchedClubId: null, updatedAt: '' });
  if (!watch.ratingsByFixture || typeof watch.ratingsByFixture !== 'object') watch.ratingsByFixture = {};
  if (!watch.motmFixtures || typeof watch.motmFixtures !== 'object') watch.motmFixtures = {};

  const officialDone = allFx
    .filter((f: any) =>
      f && f.status === 'done' &&
      f.comp !== 'friendly' &&
      (!f.season || f.season === targetSeason) &&
      f.st?.players?.[pid] &&
      ((Number(f.st.players[pid].min) || 0) > 0 || f.st.players[pid].started === true)
    )
    .sort((a: any, b: any) => String(a.date || '').localeCompare(String(b.date || '')) || String(a.time || '').localeCompare(String(b.time || '')));

  let games = 0, minutes = 0, goals = 0, assists = 0, saves = 0, cleanSheets = 0, tackles = 0, motmCount = 0;
  const ratingSeq: number[] = [];

  for (const f of officialDone) {
    const ps = f.st.players[pid] || {};
    games += 1;
    minutes += Number(ps.min || 0);
    goals += Number(ps.g || 0);
    assists += Number(ps.a || 0);
    saves += Number(ps.sv || 0);
    cleanSheets += Number(ps.cs || 0);
    tackles += Number(ps.tk || 0);

    let rVal = Number(watch.ratingsByFixture[f.id]);
    if (!Number.isFinite(rVal) || rVal <= 0) {
      if (currentFixture && currentFixture.id === f.id && Array.isArray(currentMatch?.ratings)) {
        const foundR = currentMatch.ratings.find((x: any) => (x.playerId || x.id) === pid);
        rVal = Number(foundR?.rating || 6.5);
      } else {
        rVal = 6.5;
      }
      watch.ratingsByFixture[f.id] = rVal;
    }

    const isFixtureMotm = Boolean(
      watch.motmFixtures[f.id] ||
      f.motm?.pid === pid ||
      f.motm?.playerId === pid ||
      (currentFixture?.id === f.id && (currentMatch?.motm?.pid === pid || currentMatch?.motm?.playerId === pid))
    );
    if (isFixtureMotm) {
      watch.motmFixtures[f.id] = true;
      motmCount += 1;
    }
    ratingSeq.push(rVal);
  }

  const avgRating = ratingSeq.length ? +(ratingSeq.reduce((s, v) => s + v, 0) / ratingSeq.length).toFixed(2) : 0;
  const last5 = ratingSeq.slice(-5);
  const last5AvgRating = last5.length ? +(last5.reduce((s, v) => s + v, 0) / last5.length).toFixed(2) : 0;
  const last5StrongCount = last5.filter((v) => v >= 7.1).length;
  const lastMatchRating = ratingSeq.length ? ratingSeq[ratingSeq.length - 1] : 0;

  return {
    season: targetSeason,
    games, minutes, goals, assists, saves, cleanSheets, tackles, motmCount,
    avgRating, last5AvgRating, last5StrongCount, lastMatchRating, recentRatings: last5
  };
}

function estimateFeeMln(player: any, offerType: 'transfer' | 'loan', seasonStats?: any): number {
  const ovr = Number(player?.ovr || player?.rating || 74);
  const age = Number(player?.age || 25);
  const mvRaw = Number(player?.marketValue || 0);
  let baseMln = 0;
  if (Number.isFinite(mvRaw) && mvRaw > 0) {
    baseMln = mvRaw >= 1000 ? mvRaw / 1e6 : mvRaw;
  } else {
    if (ovr >= 82) baseMln = 14 + (ovr - 82) * 3.5;
    else if (ovr >= 78) baseMln = 6.5 + (ovr - 78) * 1.9;
    else if (ovr >= 74) baseMln = 2.4 + (ovr - 74) * 1.0;
    else if (ovr >= 70) baseMln = 1.0 + (ovr - 70) * 0.35;
    else baseMln = 0.5 + Math.max(0, ovr - 65) * 0.1;
  }
  const ageMult = age <= 21 ? 1.28 : age <= 24 ? 1.15 : age <= 28 ? 1.0 : age <= 31 ? 0.8 : 0.6;
  let formMult = 1.0;
  if (seasonStats && seasonStats.games >= 3) {
    const avgR = Number(seasonStats.avgRating || 6.8);
    if (avgR >= 7.5) formMult += 0.22;
    else if (avgR >= 7.2) formMult += 0.12;
    if ((seasonStats.goals || 0) + (seasonStats.assists || 0) >= 6) formMult += 0.08;
  }
  let feeMln = baseMln * ageMult * formMult * (1.02 + Math.random() * 0.2);
  feeMln = offerType === 'loan' ? Math.max(0.3, Math.min(2.8, feeMln * 0.18)) : Math.max(0.5, Math.min(38, feeMln));
  return Math.round(feeMln * 10) / 10;
}

function pickForeignClub(player: any, preferredNameOrId?: string) {
  if (preferredNameOrId) {
    const key = String(preferredNameOrId).trim().toLowerCase();
    const found = FOREIGN_CLUBS.find((c) => c.id.toLowerCase() === key || c.name.toLowerCase() === key);
    if (found) return found;
  }
  const ovr = Number(player?.ovr || player?.rating || 74);
  const age = Number(player?.age || 25);
  let pool = ovr >= 80
    ? FOREIGN_CLUBS.filter((c) => c.reputation >= 80)
    : ovr >= 75
      ? FOREIGN_CLUBS.filter((c) => c.reputation >= 76 && c.reputation <= 83)
      : FOREIGN_CLUBS.filter((c) => c.reputation <= 78);
  if (age <= 22) {
    const talentLeagues = pool.filter((c) => ['Португалия', 'Нидерланды', 'Бельгия', 'Франция', 'Италия', 'Испания', 'Германия'].includes(c.country));
    if (talentLeagues.length) pool = talentLeagues;
  } else if (age >= 29) {
    const expLeagues = pool.filter((c) => ['Турция', 'Греция', 'Сербия', 'Саудовская Аравия'].includes(c.country));
    if (expLeagues.length) pool = expLeagues;
  }
  if (!pool.length) pool = FOREIGN_CLUBS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function formatSeasonSummaryText(pObj: any, st: any): string {
  if (!st || !st.games) return '';
  const isGk = pObj?.pos === 'ВР';
  const parts = [`${st.games} матчей`, `ср. оценка ${st.avgRating}`];
  if (isGk) {
    if (st.cleanSheets > 0) parts.push(`${st.cleanSheets} на ноль`);
    if (st.saves > 0) parts.push(`${st.saves} сейвов`);
  } else {
    if (st.goals > 0) parts.push(`${st.goals} гол.`);
    if (st.assists > 0) parts.push(`${st.assists} ассист.`);
    if (st.goals === 0 && st.assists === 0 && st.tackles > 0) parts.push(`${st.tackles} отборов`);
  }
  if (st.last5AvgRating >= 7.1 && st.games >= 4) parts.push(`${st.last5StrongCount} из 5 последних игр ≥ 7.1`);
  return parts.join(' · ');
}

export async function createForeignOfferWithAI(options: {
  player: any;
  club: any;
  performanceReason?: string;
  triggerReason?: string;
  preferLoan?: boolean;
  seasonStats?: any;
  preferredBuyerId?: string;
  llmJSON?: (sys: string, prompt: string, opts?: any) => Promise<any>;
}): Promise<any> {
  const player = options.player;
  const club = options.club;
  const ovr = Number(player?.ovr || player?.rating || 74);
  const age = Number(player?.age || 25);
  const st = options.seasonStats;
  let offerType: 'transfer' | 'loan' = options.preferLoan || (age <= 22 && ovr < 77 && Math.random() < 0.32) || Math.random() < 0.16 ? 'loan' : 'transfer';
  let buyer = pickForeignClub(player, options.preferredBuyerId);
  let feeAmount = estimateFeeMln(player, offerType, st);
  let wage = `€${Math.round(Math.max(10, Math.min(140, feeAmount * 7.5 + (ovr - 65) * 1.4)))} тыс./нед.`;
  const seasonStr = formatSeasonSummaryText(player, st);
  let triggerReason = options.triggerReason || (seasonStr ? `Стабильная игра по сезону: ${seasonStr}` : options.performanceReason) || `Уверенная игра и высокий рейтинг (${ovr}) в составе «${club?.name || 'клуба'}»`;
  let scoutReport = options.performanceReason || (seasonStr
    ? `Скауты клуба «${buyer.name}» вели ${player?.name || 'игрока'} на протяжении сезона (${seasonStr}) и считают его готовым усилением состава.`
    : `Международные скауты клуба «${buyer.name}» высоко оценили игру ${player?.name || 'футболиста'} (${player?.pos || 'ЦП'}, рейтинг ${ovr}) и видят в нём готовое усиление состава.`);

  if (typeof options.llmJSON === 'function') {
    try {
      const clubList = FOREIGN_CLUBS.map((c) => `${c.name} (${c.country}, ${c.league}, рейтинг ${c.reputation})`).join('; ');
      const sys = 'Ты — международный футбольный скаут. Сгенерируй реалистичное зарубежное трансферное предложение на основе формы игрока в текущем сезоне. Отвечай строго в JSON.';
      const prompt = `Игрок: ${player?.name || 'Игрок'}, позиция: ${player?.pos || 'ЦП'}, возраст: ${age}, OVR: ${ovr}, клуб: «${club?.name || 'Клуб'}».\nСезон: ${seasonStr || 'рейтинг'}.\nПовод: ${triggerReason}.\nБазовый расчёт: €${feeAmount}M.\nКлубы: ${clubList}.\nВерни JSON: {"buyerClub":"","type":"transfer|loan","feeAmount":0,"wage":"","triggerReason":"","scoutReport":""}`;
      const aiRes = await options.llmJSON(sys, prompt, { task: 'foreign-scout-offer', temp: 0.45, max: 600 });
      if (aiRes && typeof aiRes === 'object') {
        if (aiRes.buyerClub) buyer = pickForeignClub(player, aiRes.buyerClub);
        if (aiRes.type === 'loan' || aiRes.type === 'transfer') offerType = aiRes.type;
        const aiFee = Number(aiRes.feeAmount);
        if (Number.isFinite(aiFee) && aiFee >= 0.2 && aiFee <= 50) feeAmount = Math.round(aiFee * 10) / 10;
        if (aiRes.wage) wage = String(aiRes.wage).slice(0, 40);
        if (aiRes.triggerReason) triggerReason = String(aiRes.triggerReason).slice(0, 180);
        if (aiRes.scoutReport) scoutReport = String(aiRes.scoutReport).slice(0, 350);
      }
    } catch {
    }
  }

  const feeNum = Math.round(feeAmount * 1e6);
  const fee = feeAmount < 1 ? `€${Math.round(feeAmount * 1000)}K` : `€${feeAmount.toFixed(1)}M`;
  return {
    id: `fo_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    pid: player?.id,
    playerId: player?.id,
    playerName: player?.name || 'Игрок',
    pos: player?.pos || 'ЦП',
    clubId: club?.id,
    clubName: club?.name || '',
    buyerClub: buyer.name,
    buyerCountry: buyer.country,
    buyerLeague: buyer.league,
    buyerFlag: buyer.flag || '🌍',
    buyerLogo: '',
    type: offerType,
    fee,
    feeAmount,
    feeNum,
    wage,
    triggerReason,
    scoutReport,
    seasonStats: st || null,
    status: 'pending',
    date: new Date().toISOString()
  };
}

export async function checkForeignInterestAfterMatch(db: any, match: any, fixture: any): Promise<any[]> {
  if (!db || !match || !fixture || fixture.comp === 'friendly') return [];
  if (!Array.isArray(db.foreignOffers)) db.foreignOffers = [];
  if (!Array.isArray(db.transfers)) db.transfers = [];
  if (!db.scoutWatchlist || typeof db.scoutWatchlist !== 'object') db.scoutWatchlist = {};

  const ratings = Array.isArray(match.ratings) ? match.ratings : [];
  if (!ratings.length) return [];

  const motmId = match.motm?.playerId || match.motm?.id || null;
  const recentRejectedCutoff = Date.now() - 14 * 864e5;
  const readyCandidates: any[] = [];

  for (const r of ratings) {
    const pid = r.playerId || r.id;
    if (!pid) continue;
    const pObj = (db.players || []).find((x: any) => x.id === pid);
    if (!pObj || (pObj.teamId !== fixture.home && pObj.teamId !== fixture.away)) continue;
    const clubObj = (db.teams || []).find((x: any) => x.id === pObj.teamId);
    if (!clubObj) continue;
    if (!['rpl', 'fnl', 'cup', 'supercup'].includes(fixture.comp) && !['rpl', 'fnl'].includes(clubObj.comp)) continue;

    const st = collectPlayerSeasonScoutProfile(db, pid, fixture, match);
    const watch = db.scoutWatchlist[pid];
    const mRating = Number(r.rating || st.lastMatchRating || 6.5);
    const goals = Number(r.goals || 0);
    const assists = Number(r.assists || 0);
    const isMotm = motmId === pid;
    const baseOvr = Number(pObj.ovr || pObj.rating || 70);
    const age = Number(pObj.age || 25);

    let delta = 0;
    if (mRating >= 8.0 || goals + assists >= 2 || isMotm) delta = 22;
    else if (mRating >= 7.4 || goals + assists >= 1) delta = 15;
    else if (mRating >= 7.0) delta = 10;
    else if (mRating >= 6.6) delta = 3;
    else if (mRating < 6.2) delta = -8;
    if (age <= 22 && delta > 0) delta += 3;
    if (baseOvr >= 78 && delta > 0) delta += 2;

    watch.heat = Math.max(0, Math.min(100, Math.round((watch.heat || 0) + delta)));
    watch.clubId = clubObj.id;
    watch.playerName = pObj.name;
    watch.pos = pObj.pos || 'ЦП';
    watch.games = st.games;
    watch.avgRating = st.avgRating;
    watch.last5AvgRating = st.last5AvgRating;
    watch.goals = st.goals;
    watch.assists = st.assists;
    watch.cleanSheets = st.cleanSheets;
    watch.saves = st.saves;
    watch.updatedAt = new Date().toISOString();
    if (!watch.watchedClubId && watch.heat >= 25) {
      watch.watchedClubId = pickForeignClub(pObj).id;
    }

    if (db.foreignOffers.some((o: any) => (o.pid === pid || o.playerId === pid) && o.status === 'pending')) continue;
    if (db.foreignOffers.filter((o: any) => o.clubId === clubObj.id && o.status === 'pending').length >= 2) continue;
    if (db.foreignOffers.some((o: any) => (o.pid === pid || o.playerId === pid) && o.status === 'rejected' && new Date(o.respondedAt || o.date || 0).getTime() > recentRejectedCutoff)) continue;

    const minGames = age <= 22 ? 3 : 4;
    if (st.games < minGames) continue;
    if (mRating < 6.5) continue;

    const isGk = pObj.pos === 'ВР';
    const isDef = ['ЦЗ', 'ЛЗ', 'ПЗ', 'ОП'].includes(pObj.pos);
    const strongSeasonRating = st.avgRating >= (isDef || isGk ? 7.12 : 7.20);
    const strongLast5Form = st.games >= 4 && st.last5AvgRating >= 7.22 && st.last5StrongCount >= 3;
    const strongOutput = isGk
      ? (st.cleanSheets >= 3 || (st.saves / Math.max(1, st.games)) >= 3.2) && st.avgRating >= 7.0
      : (st.goals + st.assists >= 4 && st.avgRating >= 7.05);
    const youngBreakout = age <= 22 && baseOvr >= 72 && st.avgRating >= 7.12 && st.games >= 3;

    if (!(strongSeasonRating || strongLast5Form || strongOutput || youngBreakout)) continue;
    if (watch.heat < 60) continue;

    const seasonPriority =
      st.avgRating * 14 +
      Math.max(0, st.last5AvgRating - 6.5) * 10 +
      st.goals * 2.5 +
      st.assists * 2.0 +
      (isGk ? st.cleanSheets * 2.5 + st.saves * 0.25 : 0) +
      st.last5StrongCount * 3.5 +
      watch.heat * 0.3 +
      (age <= 22 ? 6 : 0) +
      Math.max(0, baseOvr - 72);

    readyCandidates.push({ pObj, clubObj, st, watch, priority: seasonPriority });
  }

  if (!readyCandidates.length) return [];
  readyCandidates.sort((a, b) => b.priority - a.priority);
  const best = readyCandidates[0];
  const prob = best.watch.heat >= 85 || best.st.avgRating >= 7.55 ? 0.45 : best.watch.heat >= 72 ? 0.33 : 0.24;
  if (Math.random() > prob) return [];

  const summary = formatSeasonSummaryText(best.pObj, best.st);
  const offer = await createForeignOfferWithAI({
    player: best.pObj,
    club: best.clubObj,
    seasonStats: best.st,
    preferredBuyerId: best.watch.watchedClubId,
    triggerReason: `Сезонная форма: ${summary}`,
    performanceReason: `Зарубежные скауты вели ${best.pObj.name} на протяжении сезона (${summary}) и направили официальное предложение.`
  });

  best.watch.heat = 20;
  best.watch.watchedClubId = null;

  db.foreignOffers.push(offer);
  db.transfers.push({
    id: 'tr_' + offer.id,
    pid: offer.pid,
    playerName: offer.playerName,
    pos: offer.pos,
    from: best.clubObj.id,
    fromName: best.clubObj.name,
    to: null,
    toName: offer.buyerClub,
    isForeign: true,
    buyerCountry: offer.buyerCountry,
    buyerFlag: offer.buyerFlag,
    type: offer.type,
    fee: offer.fee,
    feeAmount: offer.feeAmount,
    date: offer.date.slice(0, 10),
    status: 'pending',
    clubApproval: 'pending',
    adminApproval: 'approved',
    note: offer.scoutReport,
    foreignOfferId: offer.id
  });
  return [offer];
}

export function respondToForeignOffer(
  db: any,
  offerId: string,
  action: 'accept' | 'reject' | string,
  tid?: string,
  comment?: string
): any {
  if (!db || !Array.isArray(db.foreignOffers)) throw new Error('База зарубежных предложений недоступна');
  const offer = db.foreignOffers.find((o: any) => o.id === offerId);
  if (!offer) throw new Error('Зарубежное предложение не найдено');
  if (tid && offer.clubId && offer.clubId !== tid) throw new Error('Предложение адресовано другому клубу');
  if (offer.status !== 'pending') throw new Error('По этому предложению уже принято решение');
  if (action !== 'accept' && action !== 'reject') throw new Error('Неизвестное действие по зарубежному предложению');

  const nowIso = new Date().toISOString();
  if (!Array.isArray(db.transfers)) db.transfers = [];
  const linkedTransfer = db.transfers.find((t: any) => t.foreignOfferId === offer.id || t.id === 'tr_' + offer.id);

  if (action === 'reject') {
    offer.status = 'rejected';
    offer.respondedAt = nowIso;
    if (comment) offer.comment = String(comment).slice(0, 300);
    if (linkedTransfer) {
      linkedTransfer.status = 'rejected';
      linkedTransfer.clubApproval = 'rejected';
      linkedTransfer.rejectedAt = nowIso;
    }
    return { ok: true, status: 'rejected', offer };
  }

  const pid = offer.pid || offer.playerId;
  const p = (db.players || []).find((x: any) => x.id === pid);
  const seller = (db.teams || []).find((x: any) => x.id === offer.clubId);
  if (!p) throw new Error('Игрок не найден в базе');
  if (!seller) throw new Error('Клуб-продавец не найден');
  if (p.teamId !== seller.id) throw new Error(`Игрок ${p.name} уже не числится в составе «${seller.name}»`);

  const feeAmt = offer.feeAmount !== undefined && offer.feeAmount !== null && Number.isFinite(Number(offer.feeAmount))
    ? Number(offer.feeAmount)
    : offer.feeNum && Number(offer.feeNum) >= 1000 ? Number(offer.feeNum) / 1e6 : 0;
  const feeEuros = Math.round(Math.max(0, feeAmt) * 1e6);

  if (db.squads && Array.isArray(db.squads[seller.id])) {
    db.squads[seller.id] = db.squads[seller.id].filter((id: string) => id !== p.id);
  }
  if (offer.type === 'loan') {
    p.loanFromId = seller.id;
    p.loanFromName = seller.name;
    p.loanIsForeign = true;
    p.teamId = null;
    p.abroadClub = offer.buyerClub;
    p.abroadCountry = offer.buyerCountry;
  } else {
    p.teamId = null;
    p.formerClub = seller.name;
    p.abroadClub = offer.buyerClub;
    p.abroadCountry = offer.buyerCountry;
    delete p.loanFromId;
    delete p.loanFromName;
    delete p.loanIsForeign;
  }

  if (!Array.isArray(db.budgetHistory)) db.budgetHistory = [];
  if (feeEuros > 0) {
    const prevBudget = seller.budget || 0;
    seller.budget = prevBudget + feeEuros;
    db.budgetHistory.push({
      id: `bh_${Date.now()}`,
      teamId: seller.id,
      teamName: seller.name,
      amount: feeEuros,
      prevBudget,
      newBudget: seller.budget,
      type: offer.type === 'loan' ? 'foreign_loan' : 'foreign_sale',
      typeLabel: offer.type === 'loan' ? 'Аренда за рубеж' : 'Трансфер за рубеж',
      description: `${offer.type === 'loan' ? 'Аренда' : 'Продажа'} за рубеж: ${p.name} в «${offer.buyerClub}» (${offer.buyerCountry}) (+€${feeEuros.toLocaleString('ru-RU')})`,
      date: nowIso,
      byAdmin: false
    });
  }

  offer.status = 'accepted';
  offer.respondedAt = nowIso;
  offer.feeAmount = feeAmt;
  if (linkedTransfer) {
    linkedTransfer.status = 'approved';
    linkedTransfer.clubApproval = 'approved';
    linkedTransfer.adminApproval = 'approved';
    linkedTransfer.executedAt = nowIso;
    linkedTransfer.fee = offer.fee;
    linkedTransfer.feeAmount = feeAmt;
  } else {
    db.transfers.push({
      id: 'tr_' + offer.id,
      pid: p.id,
      playerName: p.name,
      pos: p.pos || offer.pos || 'ЦП',
      from: seller.id,
      fromName: seller.name,
      to: null,
      toName: offer.buyerClub,
      isForeign: true,
      buyerCountry: offer.buyerCountry,
      buyerFlag: offer.buyerFlag || '🌍',
      type: offer.type || 'transfer',
      fee: offer.fee,
      feeAmount: feeAmt,
      date: nowIso.slice(0, 10),
      status: 'approved',
      clubApproval: 'approved',
      adminApproval: 'approved',
      executedAt: nowIso,
      note: offer.scoutReport,
      foreignOfferId: offer.id
    });
  }

  return { ok: true, status: 'accepted', offer, netIncome: feeEuros, newBudget: seller.budget };
}
