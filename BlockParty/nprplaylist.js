'use strict';
var request = require('request');
var querystring = require('querystring');

/*
 * zeroPad
 *  Returns the given number as a string, with leading zeroes prepended if the number has fewer
 *  digits than required. I can't believe a decent string formatting function isn't provided by
 *  the standard library.
 *
 * Params:
 *  -num: The number to convert.
 *  -places: The minimum number of digits for the returned string.
 *
 * Returns: The given number as a decimal string, with zeroes prepended to meet the specified number
 *			of digits, if necessary.
 *
 * Author: Christian C. Salvadó http://stackoverflow.com/a/2998874/441776
 */
var zeroPad = function (num, places) {
	var zero = places - num.toString().length + 1;
	return Array(+(zero > 0 && zero)).join("0") + num;
};

/*
 * getNprPlaylistForDate
 *  Uses the nprstations.org API to retrieve the playlist for the given program.
 *
 * Params:
 * -program_id: The ID of the radio show. Used as the prog_id parameter to the NPR API.
 * -year, month, day: The date of the episode to retrieve the playlist for.
 *
 * Returns: An array of song objects.
 */
var getNprPlaylistForDate = function (program_id, year, month, day) {
	// The base URL for the NPR API
	var apiUrl = "https://api.composer.nprstations.org/v1/widget/50e451b6a93e91ee0a00028e/playlist?";
	// The "t" parameter. WYEP web app's unique token? ¯\_(ツ)_/¯
	var t = "1492490199876";
	// The "order" parameter. Any value but 1 returns an empty body; leaving the parameter out causes
	// the order to change in some manner which I haven't bothered to figure out.
	var order = "1";
	// The datestamp required by the API URL (YYYY-MM-DD).
	var datestamp = zeroPad(year, 4) + zeroPad(month, 2) + zeroPad(day, 2);
	// Put it all together
	var completeUrl = apiUrl + querystring.stringify({
		t: t,
		order: order,
		datestamp: datestamp,
		prog_id: program_id
	});
	// Call the API
	var response = request.get(completeUrl, function (error, response, body) {
		if (error) {
			console.log("Error while getting playlist: " + error);
		}
		else if (response.statusCode !== 200) {
			console.log("Invalid response status: " + response.statusCode + ": " + response.statusMessage);
		}
		else {
			return body.playlist.playlist;
		}
	});
};

/*
 * parseNprPlaylist
 *  Converts the playlist returned by getPlaylistForDate to a simplified version.
 *
 * Params:
 * -playlist: The playlist returned by getPlaylistForDate.
 *
 * Returns: An array of song objects containing Title, Artist, and Album fields.
 */
var parseNprPlaylist = function (playlist) {
	return playlist.map(function (track) {
		return {
			Title: track.trackName,
			Artist: track.artistName,
			Album: track.collectionName
		};
	});
};

// Calls getPlaylistForDate with the Block Party's prog_id
var getBlockPartyPlaylistForDate = function (year, month, day) {
	return getNprPlaylistForDate("50e7557f017b24380f000042", year, month, day);
};

// Make these functions externally visible
var exports = module.exports {
	parseNprPlaylist = parseNprPlaylist,
	zeroPad = zeroPad,
	getBlockPartyPlaylistForDate = getBlockPartyPlaylistForDate
};
