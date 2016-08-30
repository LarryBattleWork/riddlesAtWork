// @TODO Rewrite/Fix this.
var moves = [ 
  [ '357', '352', '152', '052', '050', '040', '010' ],
  [ '357', '353', '053', '051', '001' ],
  [ '357', '356', '351', '321', '121', '101', '100' ]
];
// returns the index of the player in an array that won the game.
const whoWon = (moves, playerCount) => {
  if(Array.isArray(moves)){
    throw new Error( '`moves` must be a array.' );
  }
  if(playerCount != 2 ){
    throw new Error( 'Only supports 2 players' );
  }
  if( moves[0] != '357'){
    throw new Error('First move must be `357`');
  }
  return (moves.length % playerCount);
}

const createKey = (fromMove, toMove) => {
  return `${fromMove}-${toMove}`;
}

const getPlayerIndex = ( moveIndex, amountOfPlayers ) => {
  // if index == '357', then (moveIndex - 1)%2; with first index at 0
  return (moveIndex-1) % amountOfPlayers;
}

const getMoveInfo = (move, i, moves) => {
  if(i === 0){
    return;
  }
  let o = {
    from: moves[i-1],
    to: move,
    count: 0
  };
  o.didWin: o.playerIndex === whoWon(move, playerCount);
  o.playerIndex = getPlayerIndex( i, 2 );
  o.key = createKey(o.from, o.to);
  return o;
}

moves.forEach(move => {
  [ '357', '353', '053', '051', '001' ]
  0,    1,        2,      3
  null, p1:d,     p2:d,   p1:d
  p1:d, p2:d, p1:d, p2:d, (moves = 4 to win, 2 players => 4%2 = 0)
  
  move
})

// TESTS
thrown( whoWon( '357', 0 );
thrown( whoWon( [], 0 );
thrown( whoWon( ['357'] ) );
thrown( whoWon( ['357'], 1 );
thrown( whoWon( ['357'], 2 );
thrown( whoWon( ['357'], 3 );
equal( whoWon( [ '357', '057', '007', '001' ] ), 0 );
equal( whoWon( [ '353', '053', '051', '001' ] ), 0 );
equal( whoWon( [ '357', '353', '053', '051', '001' ] ), 1 );

