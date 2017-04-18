'use strict';
var http = require('http');
var npr = require('./nprplaylist');

var server = http.createServer(function (req, res) {
	res.writeHead(200, { "Content-Type": "text/plain" });
	// Get the playlist from the NPR API
	npr.getBlockPartyPlaylistForDate(2017, 4, 17)
		.then((playlist) => {
			// Convert playlist to our simplified form
			var parsedPlaylist = npr.parseNprPlaylist(playlist);
			// Generate newline-separated list of tracks in format "Artist - Title"
			var textPlaylist = parsedPlaylist.map(function (track) {
				return track.Artist + " - " + track.Title;
			}).join("\n");
			// Write list of tracks to HTTP response
			res.end(textPlaylist);
		})
		.catch((err) => {
			res.end("Error: " + err);
		});
});

server.listen(8888);