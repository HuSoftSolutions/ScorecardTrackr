const HOLE_SCORE_LIMIT = 9;

export const returnScore = (i, state) => {
    let currentPlayer = state.players.filter((p) => (p.id = i + 1))[
      i
    ];
    let score = currentPlayer?.score?.[state.current_hole_index] || 0;

    return <h1 className="mb-0">{score}</h1>;
  };

  export function decreaseScore(playerIndex, state) {
    let currentPlayer = state.players.filter(
      (p) => (p.id = playerIndex + 1),
    )?.[playerIndex];
    let curScore = currentPlayer?.score?.[state.current_hole_index];
    let isValid = curScore > 0;

    currentPlayer.score[state.current_hole_index] = isValid
      ? curScore - 1
      : curScore;

    let players = [...state.players];
    players[playerIndex] = currentPlayer;

    return players;
  }

  export function increaseScore(playerIndex, state) {
    let currentPlayer = state.players.filter(
      (p) => (p.id = playerIndex + 1),
    )?.[playerIndex];
    let curScore = currentPlayer?.score?.[state.current_hole_index];
    let isValid = curScore + 1 < HOLE_SCORE_LIMIT;

    currentPlayer.score[state.current_hole_index] = isValid
      ? curScore + 1
      : curScore;

    let players = [...state.players];
    players[playerIndex] = currentPlayer;

    return players;
  }