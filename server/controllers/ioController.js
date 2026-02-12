import PFCGame from '../game/PFCGame.js';

export default class IOController {
    constructor(io) {
        this.io = io;
        this.game = new PFCGame();
        this.setupListeners();
    }

    setupListeners() {
        this.io.on('connection', (socket) => {
            if (!this.game.addPlayer(socket.id)) {
                socket.emit('errorConnection', "Partie pleine !");
                return socket.disconnect();
            }

            const pNum = this.game.players.indexOf(socket.id) + 1;
            socket.emit('player:assignment', { pNum });

            if (this.game.players.length === 2) {
                this.io.emit('game:ready');
            }

            socket.on('game:play', (move) => {
                this.game.setMove(socket.id, move);
                
                if (this.game.allMoved()) {
                    const winnerId = this.game.getWinner();
                    this.io.emit('game:result', {
                        winner: winnerId,
                        moves: this.game.moves
                    });
                } else {
                    socket.broadcast.emit('game:opponentPlayed');
                }
            });
            socket.on('game:restart', () => {
                
                this.game.resetMoves(); 
                
                this.io.emit('game:ready');
            });

            socket.on('disconnect', () => {
                this.game.removePlayer(socket.id);
                this.io.emit('player:left');
            });
        });
    }
}