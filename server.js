const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Each scoreboard/controller will have its own state
const scoreboards = {
  scoreboard1: { 
    scores: { team1: 0, team2: 0 }, 
    timer: 0, 
    timerInterval: null,
    teamNames: { team1: 'Team 1', team2: 'Team 2' } // Store team names
  },
  scoreboard2: { 
    scores: { team1: 0, team2: 0 }, 
    timer: 0, 
    timerInterval: null,
    teamNames: { team1: 'Team 1', team2: 'Team 2' }
  },
  scoreboard3: { 
    scores: { team1: 0, team2: 0 }, 
    timer: 0, 
    timerInterval: null,
    teamNames: { team1: 'Team 1', team2: 'Team 2' }
  },
  scoreboard4: { 
    scores: { team1: 0, team2: 0 }, 
    timer: 0, 
    timerInterval: null,
    teamNames: { team1: 'Team 1', team2: 'Team 2' }
  }
};

app.use(express.static('public'));

// Helper function to set up namespaces for each scoreboard
function setupNamespace(namespace, scoreboard) {
  io.of(`/${namespace}`).on('connection', (socket) => {
    console.log(`${namespace} connected`);

    // Send initial data to clients (score, timer, team names)
    socket.emit('scoreUpdate', scoreboard.scores);
    socket.emit('timerUpdate', scoreboard.timer);
    socket.emit('teamNameUpdate', scoreboard.teamNames); // Emit team names on connection

    // Handle score changes
    socket.on('changeScore', ({ delta, team }) => {
      scoreboard.scores[team] += delta;
      io.of(`/${namespace}`).emit('scoreUpdate', scoreboard.scores);
    });

    // Handle timer setting
    socket.on('setTimer', (time) => {
      scoreboard.timer = time;
      io.of(`/${namespace}`).emit('timerUpdate', scoreboard.timer);
    });

    // Handle timer start
    socket.on('startTimer', () => {
      if (scoreboard.timerInterval === null) {
        scoreboard.timerInterval = setInterval(() => {
          if (scoreboard.timer > 0) {
            scoreboard.timer--;
            io.of(`/${namespace}`).emit('timerUpdate', scoreboard.timer);
          } else {
            clearInterval(scoreboard.timerInterval);
            scoreboard.timerInterval = null;
          }
        }, 1000);
      }
    });

    // Handle timer reset
    socket.on('resetTimer', () => {
      clearInterval(scoreboard.timerInterval);
      scoreboard.timerInterval = null;
      scoreboard.timer = 0;
      io.of(`/${namespace}`).emit('resetTimer');
      io.of(`/${namespace}`).emit('timerUpdate', scoreboard.timer);
    });

    // Handle score reset
    socket.on('resetScores', () => {
      scoreboard.scores = { team1: 0, team2: 0 };
      io.of(`/${namespace}`).emit('scoreUpdate', scoreboard.scores);
    });

    // Handle team name setting
    socket.on('setTeamNames', ({ team1, team2 }) => {
      // Update the team names in the server
      scoreboard.teamNames = { team1: team1 || 'Team 1', team2: team2 || 'Team 2' };
      io.of(`/${namespace}`).emit('teamNameUpdate', scoreboard.teamNames);
    });
  });
}

// Set up namespaces for each scoreboard
setupNamespace('scoreboard1', scoreboards.scoreboard1);
setupNamespace('scoreboard2', scoreboards.scoreboard2);
setupNamespace('scoreboard3', scoreboards.scoreboard3);
setupNamespace('scoreboard4', scoreboards.scoreboard4);533

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
