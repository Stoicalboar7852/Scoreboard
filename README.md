# Scoreboard
A scoreboard system for 4 soreboards and 4 controllers

The intended use case is for there to be 1 server that is always on and then through either the use of other computers or some other means, display the scoreboard webpage on a tv or other big screen. You can use whatever device to update the scores on, but iPads do work well for this.

Dependencies:
Requires node js to be installed
https://nodejs.org/en/download/prebuilt-installer

Requires all devices to be on same network

# To Run:
Clone entire Repo, then in a terminal cd to the root of the repo. Once in repo run `node server.js`

connect to system at `SEVERIP:3000/index.html` where `SERVERIP` is the local ip address or the server running server.js
