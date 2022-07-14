export function generateBlankScorecard(nines) {
  let scorecard = [];
  nines.forEach((n) => {
    n.holes.forEach((h) => {
      scorecard.push(0);
    });
  });

  return scorecard;
}
/*




*/
// export function getPlayerScoreForHole(uid, hole_index, players) {
//   return players.find((p) => p.uid === uid).score?.[hole_index];
// }

export function getPlayerScoreForHole(uid, hole_index, players) {
  const player = players.find((p) => p.uid === uid);
  const raw = player.score[hole_index];
  const hdcpToApply = player?.hdcpHoles[hole_index];
  const net =
    hdcpToApply !== 0 && raw !== 0 ? raw - hdcpToApply : raw;
  // console.log(raw, hdcpToApply, net)
  return { raw, hdcpToApply, net };
}

export function getAllPlayerScoresForHole(hole_index, players) {
  let scores = [];
  players.forEach((p, i) => {
    const { raw, hdcpToApply, net } = getPlayerScoreForHole(
      p.value,
      hole_index,
      players,
    );
    scores.push(net);
  });

  return scores;
}
/*




*/

function calculateHandicap(card, player) {
  const { handicap, teebox } = player;
  console.log('calculating course handicap', handicap, teebox);

  /* Course Handicap = Handicap Index x (Slope Rating / 113) + (Course Rating – par)

  This number is rounded to the nearest whole number when applying net double bogey or net par adjustments. 
  Otherwise, the unrounded result is retained and used to calculate a Playing Handicap.

  Playing Handicap = Course Handicap x handicap allowance */


  return handicap;
}

export function assignPlayerHandicap(player, card, blankCard) {
  const { handicap, teebox } = player;
  const isPositiveHandicap = handicap > 0;

  const nines_played = card.holes.length / 9;
  console.log(nines_played, card.holes.length)
  let hcap = Math.round(handicap);
  if(nines_played === 1){
    hcap = Math.round(handicap / 2);
    console.log(hcap)
  }
  else if(nines_played === 3){
    hcap = Math.round(handicap * 1.5)
  }
  else if(nines_played === 4){
    hcap = Math.round(handicap * 2)
  }

  let handicapAbs = Math.abs(hcap);

  let hdcp = calculateHandicap(card, player);

  const hdcpHoles = blankCard;
  console.log(card);
  let hdcpTemp = [...card.teeboxes[teebox.value].hdcp];
  console.log(`hdcpTemp ${hdcpTemp}`);
  let handicapTemp = handicapAbs;

  while (handicapTemp > 0) {
    const minVal = Math.min(...hdcpTemp);
    const minIndexTemp = hdcpTemp.indexOf(minVal);
    const minIndexOrig =
      card.teeboxes[teebox.value].hdcp.indexOf(minVal);

    if (isPositiveHandicap) hdcpHoles[minIndexOrig]++;
    else hdcpHoles[minIndexOrig]--;

    handicapTemp--;

    hdcpTemp.splice(minIndexTemp, 1);

    if (hdcpTemp.length === 0)
      hdcpTemp = [...card.teeboxes[teebox.value].hdcp];
  }
  console.log(hdcpHoles);
  return hdcpHoles;
}
/*




*/
export function getPlayerScorecard(uid, players) {
  const netScores = [];
  const rawScores = [];
  const player = players.find((p) => p.uid === uid);
  player.score.forEach((h, i) => {
    const netScore = getPlayerScoreForHole(uid, i, players).net;
    const rawScore = getPlayerScoreForHole(uid, i, players).raw;
    netScores.push(netScore);
    rawScores.push(rawScore);
  });

  return { netScores, rawScores };
}
/*




*/
export function calculateSkinsIndividual(state, participants) {
  const skins = [];

  state.card.holes.forEach((h, hole_index) => {
    let holeScores = {};
    participants?.forEach((p, player_index) => {
      const { raw, hdcpToApply, net } = getPlayerScoreForHole(
        p.value,
        hole_index,
        state.players,
      );
      holeScores[player_index] = net;
    });

    let lowScore = Math.min(...Object.values(holeScores));
    let lowScores = Object.values(holeScores).filter(
      (s) => s === lowScore,
    );

    if (lowScores.length === 1) {
      const playerIndex = Object.values(holeScores).findIndex(
        (s) => s === lowScore,
      );

      skins.push({
        player: participants[playerIndex].label,
        hole: h,
        score: lowScore,
      });
    }
  });

  return skins;
}
/*




*/
export function calculateSkinsTeams(state, teams) {
  const skins = [];
  const teamNames = Object.keys(teams);

  // iterate over holes
  state.card.holes.forEach((h, hole_index) => {
    let holeScores = {};
    // console.log('Hole', h)

    // iterate over teams
    teamNames.forEach((team_name, team_index) => {
      // console.log('Team', team_name);
      let teamScoresForHole = [];

      // get player scores for team
      let players = teams[team_name];

      players.forEach((p, i) => {
        const { raw, hdcpToApply, net } = getPlayerScoreForHole(
          p.value,
          hole_index,
          state.players,
        );
        // console.log('Player', i, net)
        teamScoresForHole.push(net);
      });

      // get low player score for team
      let lowScoreForTeam = Math.min(...teamScoresForHole);
      // console.log('* Low Score', lowScoreForTeam)

      holeScores[team_name] = lowScoreForTeam;
    });

    // console.log('Team Scores for comparison', holeScores)

    let lowScore = Math.min(...Object.values(holeScores));
    let lowScores = Object.values(holeScores).filter(
      (s) => s === lowScore,
    );

    if (lowScores.length === 1) {
      const team_index = Object.values(holeScores).findIndex(
        (s) => s === lowScore,
      );

      skins.push({
        player: teamNames[team_index],
        hole: h,
        score: lowScore,
      });
    }
    // console.log('----------')
  });

  return skins;
}
/*




*/
export function setupNassuaIndividualSubMatches(state, match) {
  const { matchFormat, participants } = match;
  const results = [];
  const scores = [];
  const scoring = matchFormat.value.includes('stroke')
    ? 'stroke'
    : 'match';
}

export function calculateNassauIndividual(state, match) {
  const { matchFormat, participants } = match;
  const results = [];
  const scores = [];
  const scoring = matchFormat.value.includes('stroke')
    ? 'stroke'
    : 'match';

  participants.forEach((p) => {
    const playerScorecard = getPlayerScorecard(
      p.value,
      state.players,
    ).netScores;
    scores.push(playerScorecard);
  });

  for (let i = 0; i < scores.length - 1; i++) {
    for (let j = i + 1; j < scores.length; j++) {
      const scores_a = scores[i];
      const scores_b = scores[j];

      const player_a = participants[i]?.label || '';
      const player_b = participants[j]?.label || '';

      const holes = scores_a?.length || 0;
      const matchStatus = {
        f: 0,
        b: 0,
        t: 0,
        scoring,
      };

      for (let ii = 0; ii < holes; ii++) {
        const score_a = scores_a[ii];
        const score_b = scores_b[ii];

        const nineIndex = ii < 9 ? 'f' : 'b';
        const difference_stroke = score_a - score_b;

        if (scoring === 'stroke') {
          matchStatus[nineIndex] += difference_stroke;
          matchStatus.t += difference_stroke;
        } else {
          const difference_match =
            difference_stroke > 0
              ? 1
              : difference_stroke < 0
              ? -1
              : 0;
          matchStatus[nineIndex] += difference_match;
          matchStatus.t += difference_match;
        }
      }
      results.push({
        name: player_a + ' vs ' + player_b,
        status: matchStatus,
      });
    }
  }

  return results;
}
/*




*/
export function calculateNassauTeams(state, match) {
  // match between Team 1 and Team 2
  // check stroke or match play

  const { matchFormat, teams } = match;
  const results = [];
  const scores = []; // each team's scores
  const teamNames = Object.keys(teams);
  const scoring = matchFormat.value.includes('stroke')
    ? 'stroke'
    : 'match';

  // iterate over teams
  teamNames.forEach((team_name, team_index) => {
    const teamScore = [];

    // get players on team
    let players = teams[team_name];

    state.card.holes.forEach((h, hi) => {
      let lowHoleScore = 0;
      players.forEach((p, pi) => {
        const playerScore = getPlayerScoreForHole(
          p.value,
          hi,
          state.players,
        ).net;
        if (lowHoleScore === 0) lowHoleScore = playerScore;
        else if (playerScore < lowHoleScore)
          lowHoleScore = playerScore;
      });
      teamScore.push(lowHoleScore);
    });

    scores.push(teamScore);
  });

  console.log(scores);

  for (let i = 0; i < scores.length - 1; i++) {
    for (let j = i + 1; j < scores.length; j++) {
      const scores_a = scores[i];
      const scores_b = scores[j];

      const player_a = Object.keys(teams)[i] || '';
      const player_b = Object.keys(teams)[j] || '';

      const holes = scores_a?.length || 0;
      const matchStatus = {
        f: 0,
        b: 0,
        t: 0,
        scoring,
      };

      for (let ii = 0; ii < holes; ii++) {
        const score_a = scores_a[ii];
        const score_b = scores_b[ii];

        const nineIndex = ii < 9 ? 'f' : 'b';
        const difference_stroke = score_a - score_b;

        if (scoring === 'stroke') {
          matchStatus[nineIndex] += difference_stroke;
          matchStatus.t += difference_stroke;
        } else {
          const difference_match =
            difference_stroke > 0
              ? 1
              : difference_stroke < 0
              ? -1
              : 0;
          matchStatus[nineIndex] += difference_match;
          matchStatus.t += difference_match;
        }
      }
      results.push({
        name: player_a + ' vs ' + player_b,
        status: matchStatus,
      });
    }
  }

  return results;
}
/*





*/
export function calculateBestBallTeams(state, match) {
  const { matchFormat, teams } = match;
  const results = [];
  const scores = []; // each team's scores
  const teamNames = Object.keys(teams);
  const scoring = matchFormat.value.includes('stroke')
    ? 'stroke'
    : 'match';

  // iterate over teams
  teamNames.forEach((team_name, team_index) => {
    const teamScore = [];

    // get players on team
    let players = teams[team_name];

    state.card.holes.forEach((h, hi) => {
      let lowHoleScore = 0;
      players.forEach((p, pi) => {
        const playerScore = getPlayerScoreForHole(
          p.value,
          hi,
          state.players,
        ).net;
        if (lowHoleScore === 0) lowHoleScore = playerScore;
        else if (playerScore < lowHoleScore)
          lowHoleScore = playerScore;
      });
      teamScore.push(lowHoleScore);
    });

    scores.push(teamScore);
  });

  console.log(scores);

  for (let i = 0; i < scores.length - 1; i++) {
    for (let j = i + 1; j < scores.length; j++) {
      const scores_a = scores[i];
      const scores_b = scores[j];

      const player_a = Object.keys(teams)[i] || '';
      const player_b = Object.keys(teams)[j] || '';

      const holes = scores_a?.length || 0;
      const matchStatus = {
        t: 0,
        scoring,
      };

      for (let ii = 0; ii < holes; ii++) {
        const score_a = scores_a[ii];
        const score_b = scores_b[ii];

        const difference_stroke = score_a - score_b;

        if (scoring === 'stroke') {
          matchStatus.t += difference_stroke;
        } else {
          const difference_match =
            difference_stroke > 0
              ? 1
              : difference_stroke < 0
              ? -1
              : 0;
          matchStatus.t += difference_match;
        }
      }
      results.push({
        name: player_a + ' vs ' + player_b,
        status: matchStatus,
      });
    }
  }

  return results;
}
