const HOLE_SCORE_LIMIT = 9;

export const returnScore = (id, state) => {
  let currentPlayer = state.players.find((p) => p.uid === id);
  // console.log(currentPlayer);
  let score = currentPlayer?.score?.[state.current_hole_index] || 0;

  return <h1 className="mb-0">{score}</h1>;
};

export function decreaseScore(id, state) {
  let players = [...state.players]
  let currentPlayerIndex = state.players.findIndex((p) => (p.uid === id));

  let curScore = players[currentPlayerIndex]?.score?.[state.current_hole_index];
  let isValid = curScore > 0;

  players[currentPlayerIndex].score[state.current_hole_index] = isValid
    ? curScore - 1
    : curScore;

  return players;
}

export function increaseScore(id, state) {
  let players = [...state.players]
  let currentPlayerIndex = state.players.findIndex((p) => (p.uid === id));

  let curScore = players[currentPlayerIndex]?.score?.[state.current_hole_index];
  let isValid = curScore + 1 < HOLE_SCORE_LIMIT;

  players[currentPlayerIndex].score[state.current_hole_index] = isValid
    ? curScore + 1
    : curScore;

  return players;
}
