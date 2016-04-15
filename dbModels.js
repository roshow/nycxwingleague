/*jshint esnext: true */
import mongoose from 'mongoose';
import constants from './constants';

let Schema = mongoose.Schema;

let scoredPlayerSchema = Schema({
	name: String,
	print_name: String,
	division: String,
	lp: {
		type: Number,
		default: 0
	},
	mov: {
		type: Number,
		default: 0
	},
	games_played: {
		type: Number,
		default: 0
	}
});

let match_player = Schema({
	name: String,
	list_id: String,
	destroyed: {
		type: Number,
		default: 0
	},
	lp: {
		type: Number,
		default: 0
	},
	mov: {
		type: Number,
		default: 0
	}
});

let match = Schema({
	week: Number,
	game: Number,
	division: String,
	match_id: String,
	played: {
		type: Boolean,
		Default: false
	},
	players: [match_player]
});

let pilot = Schema({
	name: String,
	ship: String,
	points: Number,
	upgrades: {
		type: Schema.Types.Mixed,
		default: {}
	}
});

let list = Schema({
	name: String,
	pilots: [ pilot ],
	points: Number,
	list_id: String,
	times_used: Number,
	faction: String,
	version: String,
	description: String
});

let player = Schema({
	name: String,
	print_name: String,
	division: String,
	lists: {
		type: Schema.Types.Mixed,
		default: []
	},
	pilots_used: {
		type: Schema.Types.Mixed,
		default: {}
	}
});

let List = mongoose.model('List', list);
let Player = mongoose.model(constants.PLAYER_STR, player);
let Match = mongoose.model('Match', match);
let ScoredPlayer = mongoose.model(constants.SCOREDPLAYER_STR, scoredPlayerSchema);

export default { List, Player, Match, ScoredPlayer };