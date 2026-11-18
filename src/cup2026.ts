// @ts-nocheck
/**
 * Russian Cup 2026 format (RPL Path & Regions Path)
 */

export const CUP_FINAL_VENUE = 'Лужники (Москва)';

export function getCupFinalVenue(): string {
  return CUP_FINAL_VENUE;
}

function addDaysIso(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return isoDate;
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function shuffleArr<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function initCup2026(
  season: string,
  rplTeams: any[],
  fnlTeams: any[],
  secondLeagueTeams: any[],
  mediaTeams: any[],
  uidFn: () => string,
  options?: any
): { cupState: any; fixtures: any[] } {
  const calBase = options?.calBase || '2026-07-18';
  const defaultRegOffsets = [3, 17, 31, 66, 94, 115];
  const regWeeks = Array.isArray(options?.regWeeks) && options.regWeeks.length >= 6
    ? options.regWeeks
    : defaultRegOffsets.map((off) => ({
        tue: addDaysIso(calBase, off),
        wed: addDaysIso(calBase, off + 1),
        thu: addDaysIso(calBase, off + 2)
      }));
  const defaultRplOffsets = [10, 24, 38, 66, 94, 108];
  const rplWeeks = Array.isArray(options?.rplWeeks) && options.rplWeeks.length >= 6
    ? options.rplWeeks
    : defaultRplOffsets.map((off) => ({
        tue: addDaysIso(calBase, off),
        wed: addDaysIso(calBase, off + 1),
        thu: addDaysIso(calBase, off + 2)
      }));

  const groups: Record<string, any[]> = { A: [], B: [], C: [], D: [] };
  const rplGroups: Record<string, any> = {};
  const rpl = shuffleArr(rplTeams || []);
  const keys = ['A', 'B', 'C', 'D'];
  rpl.forEach((t, i) => {
    const gKey = keys[i % 4];
    groups[gKey].push({
      id: t.id,
      name: t.name,
      logo: t.logo,
      p: 0, w: 0, wp: 0, lp: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0
    });
  });

  for (const gid of keys) {
    const gTeams = groups[gid].map((x) => x.id);
    rplGroups[gid] = {
      id: gid,
      name: `Группа ${gid}`,
      teams: gTeams,
      table: groups[gid].map((x, idx) => ({
        id: x.id,
        name: x.name,
        logo: x.logo || '',
        pos: idx + 1,
        p: 0, w: 0, wp: 0, lp: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0,
        zone: idx < 2 ? 'top' : idx === 2 ? 'playoff' : 'bad',
        zoneLabel: idx < 2 ? '1/8 Пути РПЛ' : idx === 2 ? 'В Путь регионов' : 'Вылет из турнира'
      }))
    };
  }

  const fixtures: any[] = [];
  if (!options?.skipFixtures && typeof uidFn === 'function') {
    const groupRoundPairs = [
      [[0, 1], [2, 3]],
      [[0, 2], [3, 1]],
      [[3, 0], [1, 2]],
      [[1, 0], [3, 2]],
      [[2, 0], [1, 3]],
      [[0, 3], [2, 1]]
    ];
    for (let rIdx = 0; rIdx < 6; rIdx++) {
      const dates = rplWeeks[rIdx] || rplWeeks[rplWeeks.length - 1];
      const roundMatches: any[] = [];
      for (const gid of keys) {
        const gIds = rplGroups[gid].teams;
        if (gIds.length < 4) continue;
        for (const [hi, ai] of groupRoundPairs[rIdx]) {
          roundMatches.push({ home: gIds[hi], away: gIds[ai], gid });
        }
      }
      const slotSchedule = [
        { date: dates.tue, time: '17:30' },
        { date: dates.tue, time: '20:00' },
        { date: dates.wed, time: '15:00' },
        { date: dates.wed, time: '17:30' },
        { date: dates.wed, time: '19:30' },
        { date: dates.wed, time: '20:45' },
        { date: dates.thu, time: '17:30' },
        { date: dates.thu, time: '20:00' }
      ];
      roundMatches.forEach((m, slotIdx) => {
        const sc = slotSchedule[slotIdx] || { date: dates.wed, time: '18:00' };
        fixtures.push({
          id: uidFn(),
          season,
          comp: 'cup',
          cupPath: 'rpl_group',
          groupId: m.gid,
          round: rIdx + 1,
          label: `Путь РПЛ · ${rIdx + 1}-й тур`,
          date: sc.date,
          time: sc.time,
          home: m.home,
          away: m.away,
          status: 'scheduled',
          hg: null,
          ag: null,
          pos: 0
        });
      });
    }

    const mediaPool = shuffleArr(mediaTeams || []);
    const lowSecondPool = shuffleArr(
      (secondLeagueTeams || []).filter((t) => String(t.comp || '').startsWith('2lb') || t.comp === '2la_silver')
    );
    const r1PairsCount = Math.min(8, mediaPool.length, lowSecondPool.length);
    const r1Dates = regWeeks[0];
    for (let i = 0; i < r1PairsCount; i++) {
      const mTeam = mediaPool[i];
      const sTeam = lowSecondPool[i];
      const slot = i % 3;
      fixtures.push({
        id: uidFn(),
        season,
        comp: 'cup',
        cupPath: 'regions_qual',
        qualRound: 1,
        round: 101,
        label: 'Путь регионов · 1-й отборочный раунд',
        date: slot === 0 ? r1Dates.tue : slot === 1 ? r1Dates.wed : r1Dates.thu,
        time: ['14:00', '16:30', '18:30', '20:00'][i % 4],
        home: i % 2 === 0 ? mTeam.id : sTeam.id,
        away: i % 2 === 0 ? sTeam.id : mTeam.id,
        status: 'scheduled',
        hg: null,
        ag: null,
        pos: 0
      });
    }
  }

  const r1Count = fixtures.filter((f) => f.cupPath === 'regions_qual' && f.qualRound === 1).length;
  const cupState = {
    season,
    format: 'rpl_and_regions',
    stage: 'groups',
    calBase,
    rplWeeks,
    regWeeks,
    finalVenue: CUP_FINAL_VENUE,
    groups,
    rplGroups,
    playoffRpl: {},
    regionsQualRounds: r1Count > 0 ? [{ round: 1, label: 'Путь регионов · 1-й отборочный раунд', matchesCount: r1Count, completed: false }] : [],
    regionsRounds: r1Count > 0 ? [{ round: 1, label: 'Путь регионов · 1-й отборочный раунд', matchesCount: r1Count, completed: false }] : []
  };

  return { cupState, fixtures };
}

export function recalculateCupGroups(cupState: any, fixtures: any[]): void {
  if (!cupState || !Array.isArray(fixtures)) return;
  const targetSeason = cupState.season || null;
  const groupDoneFx = fixtures.filter((f) => {
    if (!f || f.comp !== 'cup' || f.status !== 'done') return false;
    if (targetSeason && f.season && f.season !== targetSeason) return false;
    if (f.cupPath === 'rpl_group') return true;
    if (!f.cupPath && !f.cupStage && !f.qualRound) {
      if (f.groupId && ['A', 'B', 'C', 'D'].includes(String(f.groupId))) return true;
      if (f.round != null && Number(f.round) >= 1 && Number(f.round) <= 6) return true;
      if (/^Группа\s+[A-D]$/i.test(String(f.stage || ''))) return true;
    }
    return false;
  });

  const applyResult = (h: any, a: any, f: any) => {
    if (f.tech?.both) {
      h.p++; a.p++; h.l++; a.l++;
      return;
    }
    const hg = Number(f.hg) || 0;
    const ag = Number(f.ag) || 0;
    h.p++; a.p++;
    h.gf += hg; h.ga += ag;
    a.gf += ag; a.ga += hg;
    if (hg > ag) {
      h.w++; h.pts += 3; a.l++;
    } else if (hg < ag) {
      a.w++; a.pts += 3; h.l++;
    } else if (f.pen) {
      const homeWonPen = f.pen.winner === 'home' || (f.pen.winner !== 'away' && Number(f.pen.hg) > Number(f.pen.ag));
      if (homeWonPen) {
        h.wp = (h.wp || 0) + 1; h.pts += 2;
        a.lp = (a.lp || 0) + 1; a.pts += 1;
      } else {
        a.wp = (a.wp || 0) + 1; a.pts += 2;
        h.lp = (h.lp || 0) + 1; h.pts += 1;
      }
    } else {
      h.d++; a.d++; h.pts += 1; a.pts += 1;
    }
  };

  const sortRows = (rows: any[]) => {
    rows.sort((a, b) =>
      b.pts - a.pts ||
      ((b.w || 0) + (b.wp || 0)) - ((a.w || 0) + (a.wp || 0)) ||
      (b.w || 0) - (a.w || 0) ||
      (b.gf - b.ga) - (a.gf - a.ga) ||
      b.gf - a.gf ||
      String(a.name || '').localeCompare(String(b.name || ''), 'ru')
    );
  };

  if (cupState.rplGroups && typeof cupState.rplGroups === 'object') {
    for (const [gid, g] of Object.entries<any>(cupState.rplGroups)) {
      if (!g || typeof g !== 'object') continue;
      const prevById = new Map<string, any>();
      if (Array.isArray(g.table)) {
        for (const r of g.table) if (r?.id) prevById.set(r.id, r);
      }
      const rawTeams = Array.isArray(g.teams) && g.teams.length
        ? g.teams
        : Array.isArray(g.table) ? g.table.map((r: any) => r.id) : [];
      const teamIds = rawTeams.map((item: any) => typeof item === 'string' ? item : item?.id).filter(Boolean);
      if (!teamIds.length) continue;
      const rowsById = new Map<string, any>();
      teamIds.forEach((tid: string, idx: number) => {
        const prev = prevById.get(tid);
        rowsById.set(tid, {
          id: tid,
          name: prev?.name || tid,
          logo: prev?.logo || '',
          pos: idx + 1,
          p: 0, w: 0, wp: 0, lp: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0,
          zone: idx < 2 ? 'top' : idx === 2 ? 'playoff' : 'bad',
          zoneLabel: idx < 2 ? '1/8 Пути РПЛ' : idx === 2 ? 'В Путь регионов' : 'Вылет из турнира'
        });
      });
      for (const f of groupDoneFx) {
        if (f.groupId && f.groupId !== gid) continue;
        const h = rowsById.get(f.home);
        const a = rowsById.get(f.away);
        if (h && a) applyResult(h, a, f);
      }
      const rows = [...rowsById.values()];
      sortRows(rows);
      rows.forEach((r, idx) => {
        r.pos = idx + 1;
        r.gd = r.gf - r.ga;
        r.zone = idx < 2 ? 'top' : idx === 2 ? 'playoff' : 'bad';
        r.zoneLabel = idx < 2 ? '1/8 Пути РПЛ' : idx === 2 ? 'В Путь регионов' : 'Вылет из турнира';
      });
      g.table = rows;
    }
  }

  if (cupState.groups && typeof cupState.groups === 'object') {
    for (const [gid, group] of Object.entries<any>(cupState.groups)) {
      if (!Array.isArray(group)) continue;
      for (const t of group) {
        t.p = 0; t.w = 0; t.wp = 0; t.lp = 0; t.d = 0; t.l = 0; t.gf = 0; t.ga = 0; t.gd = 0; t.pts = 0;
      }
      for (const f of groupDoneFx) {
        if (f.groupId && f.groupId !== gid) continue;
        const hTeam = group.find(x => x.id === f.home);
        const aTeam = group.find(x => x.id === f.away);
        if (hTeam && aTeam) applyResult(hTeam, aTeam, f);
      }
      sortRows(group);
      group.forEach((t: any, idx: number) => {
        t.pos = idx + 1;
        t.gd = t.gf - t.ga;
      });
    }
  }
}

export function drawNextRegionsRound(
  cupState: any,
  roundNumber: number,
  roundFx: any[] = [],
  uidFn?: () => string,
  ctx: any = {}
): any[] {
  const nextRound = Number(roundNumber) + 1;
  if (!cupState || nextRound < 2 || nextRound > 6) return [];

  const allTeams: any[] = Array.isArray(ctx.teams) ? ctx.teams : [];
  const teamById = new Map<string, any>();
  for (const t of allTeams) if (t?.id) teamById.set(t.id, t);

  const seasonFxList: any[] = Array.isArray(ctx.seasonFx) ? ctx.seasonFx : [];
  const alreadyEntered = new Set<string>();
  for (const f of [...seasonFxList, ...(roundFx || [])]) {
    if (f && f.comp === 'cup' && (f.cupPath === 'regions_qual' || (f.qualRound && f.qualRound >= 1 && f.qualRound <= 6))) {
      if (f.home) alreadyEntered.add(f.home);
      if (f.away) alreadyEntered.add(f.away);
    }
  }

  const resolveWinnerId = (f: any): string | null => {
    if (!f) return null;
    if (f.tech?.winner === 'home') return f.home;
    if (f.tech?.winner === 'away') return f.away;
    const hg = Number(f.hg);
    const ag = Number(f.ag);
    if (Number.isFinite(hg) && Number.isFinite(ag)) {
      if (hg > ag) return f.home;
      if (ag > hg) return f.away;
    }
    if (f.pen) {
      if (f.pen.winner === 'home') return f.home;
      if (f.pen.winner === 'away') return f.away;
      const ph = Number(f.pen.hg);
      const pa = Number(f.pen.ag);
      if (Number.isFinite(ph) && Number.isFinite(pa) && ph !== pa) return ph > pa ? f.home : f.away;
    }
    return f.home || f.away || null;
  };

  const winners: string[] = [];
  const winnerSet = new Set<string>();
  for (const f of roundFx || []) {
    const wId = resolveWinnerId(f);
    if (wId && !winnerSet.has(wId)) {
      winnerSet.add(wId);
      winners.push(wId);
    }
  }
  if (!winners.length) return [];

  const unused = allTeams.filter((t) => t?.id && !alreadyEntered.has(t.id) && t.comp !== 'rpl');
  const unusedFnl = shuffleArr(unused.filter((t) => t.comp === 'fnl'));
  const unused2laGold = shuffleArr(unused.filter((t) => t.comp === '2la_gold'));
  const unused2laSilver = shuffleArr(unused.filter((t) => t.comp === '2la_silver'));
  const unused2lb = shuffleArr(unused.filter((t) => String(t.comp || '').startsWith('2lb')));
  const unusedMedia = shuffleArr(unused.filter((t) => t.comp === 'media' || t.comp === 'media_div2'));

  const entrants: any[] = [];
  const takeFromPools = (pools: any[][], count: number) => {
    for (const pool of pools) {
      while (entrants.length < count && pool.length > 0) {
        const picked = pool.shift();
        if (picked && !alreadyEntered.has(picked.id) && !winnerSet.has(picked.id)) {
          alreadyEntered.add(picked.id);
          entrants.push(picked);
        }
      }
    }
  };

  if (nextRound === 2) {
    const targetR4Total = Math.max(16, Math.min(32, unusedFnl.length + 14));
    const targetR3Winners = Math.max(2, targetR4Total - unusedFnl.length);
    const targetR3Total = targetR3Winners * 2;
    const reservedR3 = Math.min(unused2laGold.length, Math.max(0, targetR3Total - 2));
    const targetR2Winners = Math.max(1, targetR3Total - reservedR3);
    const targetR2Total = targetR2Winners * 2;
    const needed = Math.max(winners.length % 2, targetR2Total - winners.length);
    takeFromPools([unused2lb, unused2laSilver, unusedMedia], needed);
  } else if (nextRound === 3) {
    const targetR4Total = Math.max(16, Math.min(32, unusedFnl.length + 14));
    const targetR3Winners = Math.max(2, targetR4Total - unusedFnl.length);
    const targetR3Total = targetR3Winners * 2;
    const needed = Math.max(winners.length % 2, targetR3Total - winners.length);
    takeFromPools([unused2laGold, unused2laSilver, unused2lb, unusedMedia], needed);
  } else if (nextRound === 4) {
    takeFromPools([unusedFnl], unusedFnl.length);
    if ((winners.length + entrants.length) % 2 === 1) {
      takeFromPools([unused2laGold, unused2laSilver, unused2lb, unusedMedia], entrants.length + 1);
    }
  } else if (nextRound === 5 || nextRound === 6) {
    if (winners.length % 2 === 1) {
      takeFromPools([unused2laGold, unused2laSilver, unused2lb, unusedFnl, unusedMedia], 1);
    }
  }

  let participants = [...winners, ...entrants.map((t) => t.id)];
  if (participants.length % 2 === 1) participants.pop();
  if (participants.length < 2) return [];

  const shufW = shuffleArr(winners);
  const shufE = shuffleArr(entrants.map((t) => t.id));
  const pairs: Array<[string, string]> = [];
  while (shufW.length > 0 && shufE.length > 0) {
    pairs.push([shufW.shift()!, shufE.shift()!]);
  }
  const leftovers = shuffleArr([...shufW, ...shufE]);
  for (let i = 0; i + 1 < leftovers.length; i += 2) {
    pairs.push([leftovers[i], leftovers[i + 1]]);
  }

  const tierRank = (tid: string) => {
    const c = String(teamById.get(tid)?.comp || '');
    if (c === 'media_div2') return 1;
    if (c === 'media') return 2;
    if (c.startsWith('2lb')) return 3;
    if (c === '2la_silver') return 4;
    if (c === '2la_gold') return 5;
    if (c === 'fnl') return 6;
    return 7;
  };

  const regOffsets = [3, 17, 31, 66, 94, 115];
  const baseDate = cupState.calBase || '2026-07-18';
  const off = regOffsets[nextRound - 1] ?? (3 + (nextRound - 1) * 21);
  const regDates = cupState.regWeeks?.[nextRound - 1] || {
    tue: addDaysIso(baseDate, off),
    wed: addDaysIso(baseDate, off + 1),
    thu: addDaysIso(baseDate, off + 2)
  };
  const label = `Путь регионов · ${nextRound}-й отборочный раунд`;
  const targetSeason = cupState.season || ctx.season || '2026/27';
  const times = ['14:00', '16:30', '18:30', '20:00'];

  const newFixtures = pairs.map(([aId, bId], idx) => {
    const ra = tierRank(aId);
    const rb = tierRank(bId);
    let home = aId;
    let away = bId;
    if (rb < ra) {
      home = bId;
      away = aId;
    } else if (ra === rb && idx % 2 === 1) {
      home = bId;
      away = aId;
    }
    const slot = idx % 3;
    const rawDate = slot === 0 ? regDates.tue : slot === 1 ? regDates.wed : regDates.thu;
    const resolvedDate = typeof ctx.pickDate === 'function' ? ctx.pickDate(rawDate, targetSeason) : rawDate;
    return {
      id: typeof uidFn === 'function' ? uidFn() : `cup_${Date.now()}_${idx}`,
      season: targetSeason,
      comp: 'cup',
      cupPath: 'regions_qual',
      qualRound: nextRound,
      round: 100 + nextRound,
      label,
      date: resolvedDate,
      time: times[idx % times.length],
      home,
      away,
      status: 'scheduled',
      hg: null,
      ag: null,
      pos: 0
    };
  });

  if (!Array.isArray(cupState.regionsQualRounds)) cupState.regionsQualRounds = [];
  if (!Array.isArray(cupState.regionsRounds)) cupState.regionsRounds = [];
  const syncMeta = (arr: any[], rNum: number, rLabel: string, count: number, completed: boolean) => {
    const existing = arr.find((x) => Number(x.round) === rNum);
    if (existing) {
      existing.label = rLabel;
      existing.matchesCount = count;
      existing.completed = completed;
    } else {
      arr.push({ round: rNum, label: rLabel, matchesCount: count, completed });
    }
    arr.sort((a, b) => Number(a.round) - Number(b.round));
  };
  const prevLabel = `Путь регионов · ${roundNumber}-й отборочный раунд`;
  syncMeta(cupState.regionsQualRounds, roundNumber, prevLabel, roundFx.length, true);
  syncMeta(cupState.regionsRounds, roundNumber, prevLabel, roundFx.length, true);
  syncMeta(cupState.regionsQualRounds, nextRound, label, newFixtures.length, false);
  syncMeta(cupState.regionsRounds, nextRound, label, newFixtures.length, false);

  return newFixtures;
}
