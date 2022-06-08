/* return array of size of nines for match initialized to 0 */
export function generateBlankScorecard(nines) {
  let scorecard = [];
  nines.forEach((n) => {
    n.holes.forEach((h) => {
      scorecard.push(0);
    });
  });

  return scorecard;
}

export function getPlayerScoreForHole(uid, hole_index, players) {
  return players.find((p) => p.uid === uid).score?.[hole_index];
}

export function calculateSkinsIndividual(state, participants) {
  const skins = [];

  state.card.holes.forEach((h, hole_index) => {
    let holeScores = {};
    participants?.forEach((p, player_index) => {
      const playerScore = getPlayerScoreForHole(
        p.value,
        hole_index,
        state.players,
      );
      holeScores[player_index] = playerScore;
    });

    let lowScore = Math.min(...Object.values(holeScores));
    let lowScores = Object.values(holeScores).filter(
      (s) => s === lowScore,
    );

    if (lowScores.length === 1 && !lowScores.includes(0)) {
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
        const playerScore = getPlayerScoreForHole(
          p.value,
          hole_index,
          state.players,
        );
        // console.log('Player', i, playerScore)
        teamScoresForHole.push(playerScore);
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

    if (lowScores.length === 1 && !lowScores.includes(0)) {
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

export function calculateNassauIndividual() {}
export function calculateNassauTeams() {}

export function calculateBestBallIndividual() {}
export function calculateBestBallTeams() {}
