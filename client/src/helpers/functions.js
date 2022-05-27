
/* return array of size of nines for match initialized to 0 */
export function generateBlankScorecard(nines) {
    let scorecard = []
    nines.forEach(n => {
        n.holes.forEach(h => {
            scorecard.push(0)
        })
    })
    console.log(scorecard)

    return scorecard;
}