
var board;
var game;
var socket = io();
var boardElement = $('#gameBoard');
var lastMove;
var squareToHighlight;

window.onload = () => {
    initGame();
};

function highlightLastMove(target) {
    if (lastMove != null) {
        boardElement.find('.square-' + lastMove).removeClass('highlight-move');
    }

    boardElement.find('.square-' + target).addClass('highlight-move');

    squareToHighlight = target;
    lastMove = target;
};

var handleMove = (source, target) => {
    var move = game.move({from: source, to: target});
    
    if (move === null)  return 'snapback';
    else {
        socket.emit('move', move);
        highlightLastMove(target);
    }
};

var onMoveEnd = () => {
    boardElement.find('.square-' + squareToHighlight).addClass('highlight-move');
};

socket.on('move', (msg) => {
    game.move(msg);
    highlightLastMove(msg.to);
    board.position(game.fen());
});


var initGame = () => {
   var cfg = {
       draggable: true,
       position: 'start',
       onMoveEnd: onMoveEnd,
       onDrop: handleMove,
   };
   
   board = new ChessBoard('gameBoard', cfg);
   game = new Chess();
};

