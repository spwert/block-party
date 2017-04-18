var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
	clientId: 'bc4c9d8493304fdfbbe17cc26b4b3d4f',
	clientSecret: '9904b9fbd4ec40efac0f442bce4889e0',
	redirectUri: 'http://localhost:' + PORT + '/callback'
});

/*
 * getTrackUri
 *  Attempts to retrieve a Spotify URI for the given song, using whatever information is available.
 *
 * Params:
 * -title: The song title. Required.
 * -artist: The song's artist. Optional.
 * -album: The album which the song is on. Optional.
 *
 * Returns: The Spotify URI for the most popular track returned by the Spotify API, if any results
 * are returned.
 */
var getTrackUri = function (title, artist, album) {
	// Replace '&' with 'and' because the URL will get screwed up otherwise
	// TODO: properly escape &
	title = title.replace("&", "and");
	var searchString = 'title: ' + title;
	if (artist) {
		artist = artist.replace("&", "and");
		searchString += ' artist: ' + artist;
	}
	if (album) {
		album = album.replace("&", "and");
		searchString += ' album: ' + album;
	}
	spotifyApi.searchTracks(searchString)
		.then(function (data) {
			if (data.body.tracks.total > 0) {
				return data.body.tracks.items[0].uri;
			}
		}, function (err) {
			console.log("Error getting Spotify URI: " + err);
		});
};

// Make these functions externally visible
var exports = module.exports {
};