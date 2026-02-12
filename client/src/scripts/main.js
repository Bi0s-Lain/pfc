import { io } from "socket.io-client";

const MOVES_MAP = { rock: 'pierre', paper: 'feuille', scissors: 'ciseaux' };

const socket = io();
const btns = ['rock', 'paper', 'scissors'].map(id => document.getElementById(id));
const replayBtn = document.getElementById('replay');
const msgZone = document.getElementById('message');
const statusZone = document.getElementById('status');

const setButtonsState = (disabled) => {
    btns.forEach(btn => btn.disabled = disabled);
};

setButtonsState(true);
if(replayBtn) replayBtn.style.display = 'none';

socket.on('player:assignment', ({ pNum }) => {
    msgZone.textContent = `Vous êtes le Joueur ${pNum}. Attente de l'adversaire...`;
});

socket.on('game:ready', () => {
    msgZone.textContent = "C'est parti ! Choisissez votre coup.";
    setButtonsState(false);
    if(replayBtn) replayBtn.style.display = 'none';
});

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const move =MOVES_MAP[btn.id];
        socket.emit('game:play', move);
        setButtonsState(true); 
        msgZone.textContent = "Coup envoyé. Attente de l'adversaire...";
    });
});

socket.on('game:result', ({ winner, moves }) => {
    const isWinner = winner === socket.id;
    const isNul = winner === 'nul';

    let text = isNul ? "Match nul !" : (isWinner ? "Gagné !" : "Perdu.");
    msgZone.textContent = text + " Voulez-vous rejouer ?";


    if(replayBtn) {
        replayBtn.style.display = 'inline-block';
        replayBtn.disabled = false;
    }
});

if (replayBtn) {
    replayBtn.addEventListener('click', () => {
        socket.emit('game:restart');
        replayBtn.disabled = true;
        msgZone.textContent = "Demande de revanche envoyée...";
    });
}

socket.on('player:left', () => {
    msgZone.textContent = "Adversaire déconnecté. Retour à l'attente...";
    setButtonsState(true);
    if(replayBtn) replayBtn.style.display = 'none';
});