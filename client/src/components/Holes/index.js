<div className="d-flex"> 
<div> 
    <FiMinus className="p-1 bg-dark text-light rounded" size="50" 
        onClick={() => dispatch({ type: 'set_current_hole', hole: state.current_hole_index === 0 ? (state.card.holes.length - 1) : state.current_hole_index - 1 })} 
    /> 
</div> 
<div className="m-0 text-dark bg-light rounded mx-1 text-center h-100 w-100 d-flex justify-content-center align-items-center"> 
    <h1 className="mb-0">Hole {state.card.holes[state.current_hole_index]}</h1></div> 
<div> 
    <FiPlus className="p-1 bg-dark text-light rounded" size="50" 
        onClick={() => dispatch({ type: 'set_current_hole', hole: state.current_hole_index === state.card.holes.length - 1 ? 0 : state.current_hole_index + 1 })} 
    /> 
</div> 
</div> 
<div className="d-flex flex-column mt-3 rounded"> 
{state.players.map((p, i) => { 
    return ( 
        <div key={i} className="d-flex text-light p-2 bg-dark my-1 align-items-center rounded"> 
            <div className="w-50"><h1 className="mb-0">{p.name}</h1></div> 
            <div><FiMinus className="p-1 bg-dark text-light rounded" size="50" onClick={() => dispatch({ type: 'set-player-score', players: decreaseScore(i) })} /></div> 
            <div className="m-0 rounded mx-1 flex-fill text-center h-100 d-flex justify-content-center align-items-center"> 
                {returnScore(i)} 
            </div> 
            <div><FiPlus className="p-1 bg-dark text-light rounded" size="50" onClick={() => dispatch({ type: 'set-player-score', players: increaseScore(i) })} /></div> 
        </div> 
    ) 
})} 
</div> 
