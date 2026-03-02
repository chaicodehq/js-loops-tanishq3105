export function iplPointsTable(matches) {
  if (!Array.isArray(matches) || matches.length === 0) return [];

  const acc = {};

  for (let match of matches) {
    const { team1, team2, result, winner } = match;

    // initialize teams if not present
    for (let team of [team1, team2]) {
      if (!acc[team]) {
        acc[team] = {
          team,
          played: 0,
          won: 0,
          lost: 0,
          tied: 0,
          noResult: 0,
          points: 0,
        };
      }
    }

    // every match increases played
    acc[team1].played++;
    acc[team2].played++;

    if (result === "win") {
      acc[winner].won++;
      acc[winner].points += 2;

      const loser = winner === team1 ? team2 : team1;
      acc[loser].lost++;
    } else if (result === "tie") {
      acc[team1].tied++;
      acc[team2].tied++;
      acc[team1].points += 1;
      acc[team2].points += 1;
    } else if (result === "no_result") {
      acc[team1].noResult++;
      acc[team2].noResult++;
      acc[team1].points += 1;
      acc[team2].points += 1;
    }
  }

  // convert to array
  const table = Object.values(acc);

  // sort
  table.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return a.team.localeCompare(b.team);
  });

  return table;
}
