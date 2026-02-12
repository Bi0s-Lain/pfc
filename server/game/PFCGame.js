export default class PFCGame {
    constructor() {
        this.players = []; 
        this.moves = {};
    }

    addPlayer(socketId) {
        if (this.players.length < 2) {
            this.players.push(socketId);
            return true;
        }
        return false;
    }

    removePlayer(socketId) {
        this.players = this.players.filter(id => id !== socketId);
        this.resetMoves();
    }

    setMove(socketId, move) {
        this.moves[socketId] = move;
    }

    allMoved() {
        return Object.keys(this.moves).length === 2;
    }

    resetMoves() {
        this.moves = {};
    }

    getWinner() {
        const [id1, id2] = this.players;
        const move1 = this.moves[id1];
        const move2 = this.moves[id2];

        if (move1 === move2) return 'nul';

        const wins = {
            pierre: 'ciseaux',
            feuille: 'pierre',
            ciseaux: 'feuille'
        };

        return wins[move1] === move2 ? id1 : id2;
    }
}