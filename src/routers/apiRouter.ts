import { Router } from 'express';
import { Player } from '../data/models';
import { createGame, joinGame } from '../gameManager';
import bodyParser from "body-parser"
import { simulateLobby } from '../utilities';

export const apiRouter = Router();


// Host a new game
apiRouter.post('/game', (req, res) => {
    try {
        let { ip } = req.body;
        const game = createGame(ip);
        res.status(200).send({ gameId: game.gameId});
    } catch(e) {
        console.error(e, "Failed creating game");
        res.status(500).send("Something failed");
    }
    
});

// join a game
apiRouter.post('/game/:gameId/join', (req, res) => {
    try {
        const player:Player = req.body;
        joinGame(req.params.gameId, player);
        res.sendStatus(200);
    } catch(e) {
        console.error(e, "Failed joining game");
        res.status(500).send("Something failed");
    }
});

// get game state
// apiRouter.get('/game/:gameId/state', (req, res) => {
//     const player:Player = req.body;
//     joinGame(req.params.gameId, player);
//     res.sendStatus(200);
// });

// simulate a game
apiRouter.post('/game/:gameId/simulate-lobby', async (req, res) => {
    try {
        await simulateLobby(req.params.gameId, req.query.startGame === "true");
        res.sendStatus(200);
    }  catch(e) {
        console.error(e, "Failed simulating game");
        res.status(500).send("Something failed");
    }
});