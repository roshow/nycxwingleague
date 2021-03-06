
import leagueDb from './db';
import squadLists from './squadlists';
import players from './players';
import matches from './matches';
import rankings from './rankings';
import constants from './constants';
import csvconvert from './csvconvert';
import { readFileSync } from 'fs';

function nothingToDo () {
	return Promise.resolve(`do something will ya?`);
}

function updateMatchesFromSS () {
	return csvconvert.getMatchesFromUrls().then(matches.uploadMatches);
}

function uploadLists (...args) {
	return squadLists.uploadFromFiles(args);
}

function uploadMatchesFile (filename=`json/matches/ultima1.json`) {
	return matches.uploadMatchesFromFile(filename);
}

function uploadPlayersFile () {
	return players.uploadPlayers(JSON.parse(readFileSync('json/players/players.json')));
}

function getPlayerMatches (playername=`rolandogarcia`) {
	return players.getPlayerMatches(playername).then(function (matches) {
		// for (let match of matches) {
		// 	console.log(match.toJSON());
		// }
		return matches;
	});
}

function getMatchesByDivision(division, season, week) {
	return matches.getMatchesByDivision(division, season, week);
}

function getPlayer (name) {
	if (!name) {
		return leagueDb.find(constants.PLAYER_STR, {});
	}
	return players.getPlayer(name);
}

function getList (list_id) {
	return leagueDb.getOne(constants.LIST_STR, { list_id: list_id});
}

function getDivisionRankings (division=`ultima`, season=1) {
	return rankings.getDivisionRankings(division, season);
}

let fUNctions = { 
	nothingToDo,
	uploadLists,
	getPlayerMatches,
	uploadMatchesFile, 
	getDivisionRankings,
	getPlayer,
	getList,
	uploadPlayersFile,
	getMatchesByDivision,
	updateMatchesFromSS,
};


function runScript (script=`nothingToDo`, args=[]) {
	return leagueDb.connect().then(function () {
		return fUNctions[script](...args).then(function (response) {
			leagueDb.disconnect();
			return response;
		});
	}, console.log);
}

function justRunScript  (script=`nothingToDo`, args=[]) {
	return fUNctions[script](...args).then(function (response) {
		return response;
	});
}

if (process.argv[2] === 'runscript') {
	runScript(process.argv[3], process.argv.slice(4));
		// .then(function (res) {
		// 	if (res) {
		// 		console.log(`printing script results: \n`, res);	
		// 	}
		// });
}

export default { 
	runScript,
	justRunScript,
};