// @ts-nocheck
/**
 * Match ratings, Man of the Match (MOTM), Team of the Round and Month
 */

const RU_MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export function formatMonthLabelRu(ym: string): string {
  const [y, m] = String(ym || '').split('-');
  const idx = parseInt(m, 10) - 1;
  return idx >= 0 && idx < 12 ? `${RU_MONTHS[idx]} ${y}` : String(ym || '');
}

function posBucket(pos: string): 'gk' | 'def' | 'mid' | 'fwd' {
  const p = String(pos || '').toUpperCase();
  if (p === 'ВР' || p === 'GK') return 'gk';
  if (['ЦЗ', 'ЛЗ', 'ПЗ', 'DEF', 'CB', 'LB', 'RB'].includes(p)) return 'def';
  if (['ЛВ', 'ПВ', 'ЦФ', 'НАП', 'FWD', 'ST', 'LW', 'RW'].includes(p)) return 'fwd';
  return 'mid';
}

function pickBestEleven433(candidates: any[]): any[] {
  if (!candidates.length) return [];
  const sorted = [...candidates].sort((a, b) =>
    (b.score ?? b.rating ?? b.avgRating ?? 0) - (a.score ?? a.rating ?? a.avgRating ?? 0) ||
    (b.g || 0) - (a.g || 0) ||
    (b.a || 0) - (a.a || 0) ||
    (b.min || 0) - (a.min || 0)
  );
  const used = new Set<string>();
  const pick = (bucket: 'gk' | 'def' | 'mid' | 'fwd', count: number) => {
    const res: any[] = [];
    for (const c of sorted) {
      if (res.length >= count) break;
      const id = String(c.pid || c.playerId || c.name);
      if (used.has(id)) continue;
      if (posBucket(c.pos) === bucket) {
        used.add(id);
        res.push(c);
      }
    }
    return res;
  };
  const gks = pick('gk', 1);
  const defs = pick('def', 4);
  const mids = pick('mid', 3);
  const fwds = pick('fwd', 3);
  const starters = [...gks, ...defs, ...mids, ...fwds];
  if (starters.length < 11) {
    for (const c of sorted) {
      if (starters.length >= 11) break;
      const id = String(c.pid || c.playerId || c.name);
      if (used.has(id)) continue;
      if (posBucket(c.pos) === 'gk' && gks.length >= 1) continue;
      used.add(id);
      starters.push(c);
    }
  }
  return starters;
}

export function computeMatchRatings(match: any, fixture: any, homeName: string, awayName: string): any[] {
  const ratings: any[] = [];
  const events = match?.events || [];
  const homeLineup = match?.lineup?.home || fixture?.lineup?.home || [];
  const awayLineup = match?.lineup?.away || fixture?.lineup?.away || [];

  const addPlayers = (list: any[], tName: string, tid: string) => {
    for (const p of list) {
      if (!p) continue;
      let base = 6.0 + (Math.random() * 1.5);
      const pid = p.id || p.playerId;
      const goals = events.filter((e: any) => e.type === 'goal' && (e.player === p.name || e.playerId === pid)).length;
      base += goals * 1.2;
      ratings.push({
        playerId: pid,
        name: p.name,
        pos: p.pos || 'НАП',
        team: tName,
        teamId: tid,
        rating: Math.min(10.0, Math.max(5.0, +base.toFixed(1))),
        goals,
        assists: 0
      });
    }
  };

  addPlayers(homeLineup, homeName, fixture?.home);
  addPlayers(awayLineup, awayName, fixture?.away);
  return ratings;
}

export function getMatchMotm(match: any, fixture: any, homeName: string, awayName: string, coachHome?: any, coachAway?: any): any {
  const ratings = match?.ratings || computeMatchRatings(match, fixture, homeName, awayName);
  if (!ratings.length) {
    return {
      playerId: 'motm_1',
      name: 'Лучший игрок матча',
      pos: 'НАП',
      rating: 8.5,
      team: homeName,
      teamName: homeName,
      headline: `Яркая игра в атаке решила исход противостояния!`,
      interview: {
        headline: `«Главное — победа команды и радость наших болельщиков»`,
        quote: `Мы выполнили установку наставника, сыграли дисциплинированно и довели дело до победы!`,
        tacticsComment: `Тренер просил действовать широко и прессинговать с первых минут.`,
        mood: 'happy'
      }
    };
  }

  const best = [...ratings].sort((a, b) => b.rating - a.rating)[0];
  return {
    ...best,
    teamName: best.team,
    headline: `«${best.name}: игра была напряжённой до последних минут»`,
    interview: {
      headline: `«${best.name}: игра была напряжённой до последних минут»`,
      quote: `Мы готовились к трудному матчу, соперник оказал серьезное сопротивление. Рады победе и поддержке трибун!`,
      tacticsComment: `Установка тренера была ясна: надёжность сзади и острота впереди.`,
      mood: 'satisfied'
    }
  };
}

export function buildTeamOfRound(round: number | string, comp: string, fixtures: any[], matchesMap: any, teamsMap: any): any {
  const roundFx = (fixtures || []).filter((f: any) =>
    f.comp === comp && f.status === 'done' && (f.label === round || `${f.round}-й тур` === round || String(f.round) === String(round))
  );
  if (!roundFx.length) {
    return { round, comp, formation: '4-3-3', starters: [], players: [], bestPlayer: null, coachOfRound: null };
  }

  const byPid = new Map<string, any>();
  const coachScores = new Map<string, any>();

  for (const f of roundFx) {
    const m = matchesMap?.[f.id];
    const hTeam = teamsMap?.[f.home] || {};
    const aTeam = teamsMap?.[f.away] || {};
    const hName = hTeam.name || f.homeName || f.home;
    const aName = aTeam.name || f.awayName || f.away;
    const ratings = (Array.isArray(m?.ratings) && m.ratings.length)
      ? m.ratings
      : computeMatchRatings(m || { stats: f.st }, f, hName, aName);

    const pStats = f.st?.players || m?.stats?.players || {};
    for (const r of ratings) {
      const pid = r.playerId || r.id;
      if (!pid) continue;
      const ps = pStats[pid] || {};
      const pos = r.pos || ps.pos || 'ЦП';
      const isGk = pos === 'ВР';
      const g = Number(r.goals ?? ps.g ?? 0);
      const a = Number(r.assists ?? ps.a ?? 0);
      const sv = isGk ? Number(r.saves ?? ps.sv ?? 0) : 0;
      const tk = Number(r.tackles ?? ps.tk ?? 0);
      const cs = isGk ? Number(r.cs ?? ps.cs ?? 0) : 0;
      const statParts: string[] = [];
      if (g > 0) statParts.push(`${g}Г`);
      if (a > 0) statParts.push(`${a}П`);
      if (isGk && sv > 0) statParts.push(`${sv} сейв.`);
      if (isGk && cs > 0) statParts.push('сух.');
      if (!statParts.length && tk > 0) statParts.push(`${tk} отб.`);
      const tid = r.teamId || ps.t || f.home;
      const tObj = teamsMap?.[tid] || {};
      const item = {
        pid,
        playerId: pid,
        n: r.name || ps.n || 'Игрок',
        name: r.name || ps.n || 'Игрок',
        pos,
        team: tObj.name || r.team || '',
        teamId: tid,
        teamLogo: tObj.logo || '',
        rating: +Number(r.rating || 6.5).toFixed(1),
        g, a, sv, tk, cs,
        min: Number(r.min ?? ps.min ?? 90),
        stat: statParts.join(' · ')
      };
      const prev = byPid.get(pid);
      if (!prev || item.rating > prev.rating) byPid.set(pid, item);
    }

    const hg = Number(f.hg ?? f.st?.teams?.home?.g ?? 0);
    const ag = Number(f.ag ?? f.st?.teams?.away?.g ?? 0);
    for (const side of ['home', 'away']) {
      const tid = f[side];
      const oppId = side === 'home' ? f.away : f.home;
      const gf = side === 'home' ? hg : ag;
      const ga = side === 'home' ? ag : hg;
      const tObj = teamsMap?.[tid] || {};
      const oppObj = teamsMap?.[oppId] || {};
      let pts = gf > ga ? 3 : gf === ga ? 1 : 0;
      pts += (gf - ga) * 0.6 + (side === 'away' && gf > ga ? 0.5 : 0) + (ga === 0 ? 0.4 : 0);
      const cur = coachScores.get(tid);
      if (!cur || pts > cur.pts) {
        coachScores.set(tid, {
          tid,
          teamName: tObj.name || (side === 'home' ? hName : aName),
          teamLogo: tObj.logo || '',
          coach: tObj.coach || { name: 'Главный тренер' },
          pts,
          reason: gf > ga
            ? `Победа над «${oppObj.name || oppId}» (${gf}:${ga})`
            : gf === ga
              ? `Ничья с «${oppObj.name || oppId}» (${gf}:${ga})`
              : `Матч против «${oppObj.name || oppId}» (${gf}:${ga})`
        });
      }
    }
  }

  const all = [...byPid.values()];
  const starters = pickBestEleven433(all);
  const best = [...all].sort((a, b) => b.rating - a.rating || b.g - a.g || b.a - a.a || b.sv - a.sv)[0] || null;
  const bestCoach = [...coachScores.values()].sort((a, b) => b.pts - a.pts)[0] || null;

  return {
    round,
    comp,
    formation: '4-3-3',
    starters,
    players: starters,
    bestPlayer: best ? {
      ...best,
      reason: best.stat ? `Лучший в туре: ${best.stat} (оценка ${best.rating})` : `Высочайшая оценка тура — ${best.rating}`
    } : null,
    coachOfRound: bestCoach ? {
      title: 'Тренер тура',
      teamName: bestCoach.teamName,
      teamLogo: bestCoach.teamLogo,
      coach: bestCoach.coach,
      reason: bestCoach.reason
    } : null
  };
}

export function buildTeamOfMonth(month: string, comp: string, fixtures: any[], matchesMap: any, teamsMap: any, isSeason = false): any {
  const monthFx = (fixtures || []).filter((f: any) =>
    f.comp === comp && f.status === 'done' && (isSeason || String(f.date || '').startsWith(month))
  );
  const monthLabel = formatMonthLabelRu(month);
  if (!monthFx.length) {
    return { month, monthLabel, comp, formation: '4-3-3', starters: [], players: [], bestPlayer: null, coachOfMonth: null };
  }

  const aggMap = new Map<string, any>();
  const coachMap = new Map<string, any>();

  for (const f of monthFx) {
    const m = matchesMap?.[f.id];
    const hTeam = teamsMap?.[f.home] || {};
    const aTeam = teamsMap?.[f.away] || {};
    const hName = hTeam.name || f.homeName || f.home;
    const aName = aTeam.name || f.awayName || f.away;
    const ratings = (Array.isArray(m?.ratings) && m.ratings.length)
      ? m.ratings
      : computeMatchRatings(m || { stats: f.st }, f, hName, aName);

    const pStats = f.st?.players || m?.stats?.players || {};
    for (const r of ratings) {
      const pid = r.playerId || r.id;
      if (!pid) continue;
      const ps = pStats[pid] || {};
      const pos = r.pos || ps.pos || 'ЦП';
      const isGk = pos === 'ВР';
      const tid = r.teamId || ps.t || f.home;
      const tObj = teamsMap?.[tid] || {};
      const cur = aggMap.get(pid) || {
        pid,
        playerId: pid,
        n: r.name || ps.n || 'Игрок',
        name: r.name || ps.n || 'Игрок',
        pos,
        team: tObj.name || r.team || '',
        teamId: tid,
        teamLogo: tObj.logo || '',
        ratingSum: 0,
        count: 0,
        g: 0, a: 0, sv: 0, tk: 0, cs: 0, min: 0
      };
      cur.ratingSum += Number(r.rating || 6.5);
      cur.count += 1;
      cur.g += Number(r.goals ?? ps.g ?? 0);
      cur.a += Number(r.assists ?? ps.a ?? 0);
      if (isGk) {
        cur.sv += Number(r.saves ?? ps.sv ?? 0);
        cur.cs += Number(r.cs ?? ps.cs ?? 0);
      }
      cur.tk += Number(r.tackles ?? ps.tk ?? 0);
      cur.min += Number(r.min ?? ps.min ?? 90);
      cur.team = tObj.name || cur.team;
      cur.teamId = tid;
      cur.teamLogo = tObj.logo || cur.teamLogo;
      aggMap.set(pid, cur);
    }

    const hg = Number(f.hg ?? f.st?.teams?.home?.g ?? 0);
    const ag = Number(f.ag ?? f.st?.teams?.away?.g ?? 0);
    for (const side of ['home', 'away']) {
      const tid = f[side];
      const gf = side === 'home' ? hg : ag;
      const ga = side === 'home' ? ag : hg;
      const tObj = teamsMap?.[tid] || {};
      const c = coachMap.get(tid) || {
        tid,
        teamName: tObj.name || (side === 'home' ? hName : aName),
        teamLogo: tObj.logo || '',
        coach: tObj.coach || { name: 'Главный тренер' },
        w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0
      };
      c.gf += gf;
      c.ga += ga;
      if (gf > ga) { c.w++; c.pts += 3; }
      else if (gf === ga) { c.d++; c.pts += 1; }
      else { c.l++; }
      coachMap.set(tid, c);
    }
  }

  const list = [...aggMap.values()].map((p) => {
    const avgRating = +(p.ratingSum / Math.max(1, p.count)).toFixed(2);
    const statParts: string[] = [];
    if (p.g > 0) statParts.push(`${p.g}Г`);
    if (p.a > 0) statParts.push(`${p.a}П`);
    if (p.pos === 'ВР' && p.sv > 0) statParts.push(`${p.sv} сейв.`);
    if (p.pos === 'ВР' && p.cs > 0) statParts.push(`${p.cs} сух.`);
    if (!statParts.length && p.tk > 0) statParts.push(`${p.tk} отб.`);
    return {
      ...p,
      avgRating,
      rating: avgRating,
      score: avgRating + Math.min(0.25, (p.count - 1) * 0.05) + p.g * 0.04 + p.a * 0.02,
      stat: statParts.join(' · ')
    };
  });

  const starters = pickBestEleven433(list);
  const best = [...list].sort((a, b) => b.score - a.score || b.avgRating - a.avgRating || b.g - a.g)[0] || null;
  const bestCoach = [...coachMap.values()].sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf)[0] || null;

  return {
    month,
    monthLabel,
    comp,
    formation: '4-3-3',
    starters,
    players: starters,
    bestPlayer: best ? {
      ...best,
      reason: `${best.count} игр · ср. оценка ${best.avgRating}${best.stat ? ` (${best.stat})` : ''}`
    } : null,
    coachOfMonth: bestCoach ? {
      title: isSeason ? 'Тренер года' : 'Тренер месяца',
      teamName: bestCoach.teamName,
      teamLogo: bestCoach.teamLogo,
      coach: bestCoach.coach,
      reason: `${bestCoach.w}В ${bestCoach.d}Н ${bestCoach.l}П · мячи ${bestCoach.gf}:${bestCoach.ga} (${bestCoach.pts} очк.)`
    } : null
  };
}
