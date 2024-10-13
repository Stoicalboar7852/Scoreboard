# Scoreboard
A scoreboard system for 4 soreboards and 4 controllers

The intended use case is for there to be 1 server that is always on and then through either the use of other computers or some other means, display the scoreboard webpage on a tv or other big screen. You can use whatever device to update the scores on, but iPads do work well for this.

*PLEASE NOTE*
This project is unfinished, so many things aren't implemented yet or don't work yet.

There is also some useless code in some of the files which does nothing. This is because I didn't start the files from scratch, and many I duplicated and already setup file and then edited it to how it was needed. I do plan on removing this unused code when I am done and the project releases.

Dependencies:
Requires node js to be installed
https://nodejs.org/en/download/prebuilt-installer

Requires all devices to be on same network

# To Run:
Clone entire Repo, then in a terminal cd to the root of the repo. Once in repo run `node server.js`

connect to system at `SEVERIP:3000/index.html` where `SERVERIP` is the local ip address or the server running server.js


# Plans
Things I am planning on adding

1) **Automatic timing.** Instead of having the `Set timer to 20 minutes` and `Set timer to 14 Minutes` buttons, I am planning on having it just be start timer and stop timer buttons. When you press start on the fours timer, it will run 20 minutes for first half, then 1 minute for half time break, then another 20 minutes for second half, then 1 minute again before next game. Pairs will be the same, but replace 20 minutes with 14.

2) **Game Logging.** Currently the system is the game scores are written down on paper at the end of the game and handed into the kiosk. I think this method should still be kept as backup, but I also want to make it so on the timer controller page, there is a button to go to a score keeper page which will automatically record all the scores for the games.
