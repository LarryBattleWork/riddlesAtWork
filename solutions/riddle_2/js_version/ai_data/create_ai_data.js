// Date: Aug 3, 2016
const moment = require("moment");
const rl = require("readline");
const fs = require("fs");

const plays_file_path = "plays_reports.json";

var lineReader = rl.createInterface({
  input: fs.createReadStream(plays_file_path)
});
var line_count = 0;
var all_moves = {};

lineReader.on('line', function (line) {
  console.log(++line_count);
  const o = JSON.parse(line);
  o.moves.unshift('357');
  console.log(o.moves);
  const key = o.moves.join(',');
  all_moves[ key ] = o;
});

var startDate = moment();
lineReader.on('close', function (line) {
	console.log("closed after %s ms", moment().diff( startDate, 'ms') );
	const key_count = Object.keys(all_moves).length;
	console.log( "Found %s unique moves out of %s", key_count, line_count );
});
