const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.all('/*', (req, res, next) => {
	req.app.locals.layout = 'admin';
	next();
});

router.get('/', (req, res) => {
	// let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
	// 	// let createTable = 'SELECT name FROM sqlite_schema WHERE type ="table" AND name NOT LIKE "sqlite_%"';
	// 	let createTable = 'SELECT * FROM board';
	// 	db.all(createTable, [], (err, rows) => {
	// 		if (err) {
	// 			throw err;
	// 		}else {
	// 			console.log(rows);
	// 			res.render('home/admin');
	// 		}
	// 	});
	// });
	res.render('home/admin');
});

var callPython = function($value)
{
	var spawn = require("child_process").spawn;
	
	var process = spawn('python',["./ScoreRefresh.py", $value]);
	process.stdout.on('data',function(data){
		console.log("Pyth: "+data.toString());
		return data.toString();
	});
}

var callPythonOFF = function()
{
	var spawn = require("child_process").spawn;
	$value = 'off';
	
	var process = spawn('python',["./DisplayOff.py", $value]);
	process.stdout.on('data',function(data){
		console.log("Pyth: "+data.toString());
		return data.toString();
	});
}

var callPythonON = function()
{
	var spawn = require("child_process").spawn;
	$value = 'on';
	
	var process = spawn('python',["./DisplayOff.py", $value]);
	process.stdout.on('data',function(data){
		console.log("Pyth: "+data.toString());
		return data.toString();
	});
}

var pythonTestOne = function()
{
	var spawn = require("child_process").spawn;
	$value = '1';
	
	var process = spawn('python',["./TestPattern.py", $value]);
	process.stdout.on('data',function(data){
		console.log("Test 1: "+data.toString());
		return data.toString();
	});
}

var pythonTestTwo = function()
{
	var spawn = require("child_process").spawn;
	$value = '2';
	
	var process = spawn('python',["./TestPattern.py", $value]);
	process.stdout.on('data',function(data){
		console.log("Test 2: "+data.toString());
		return data.toString();
	});
}

var pythonRebootPi = function()
{
	var spawn = require("child_process").spawn;
	$value = 'reboot';
	
	var process = spawn('python',["./RebootPi.py", $value]);
	process.stdout.on('data',function(data){
		console.log("Test 2: "+data.toString());
		return data.toString();
	});
}

// put the board OFF on click
router.put('/put/off', (req, res) => {
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
    let updateData = 'UPDATE board SET board = 0';
    db.all(updateData, [], function(err) {
      if (err) {
        console.error(err);
      }else {
				// callPythonOFF();
        res.status(204).send();
      }
    });
  });
});

// put the board ON on click
router.put('/put/on', (req, res) => {
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
    let updateData = 'UPDATE board SET board = 1';
    db.all(updateData, [], function(err) {
      if (err) {
        console.error(err);
      }else {
				// callPythonON();
        res.status(204).send();
      }
    });
  });
});

// check whether board is OFF or ON on page load
router.get('/get/onoff', (req, res) => {
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
		let getData = 'SELECT * FROM board';
		db.all(getData, [], (err, data) => {
			if (err) {
				console.log(err);
			}else {
				// console.log(data);
				res.json({data});
			}
		});
	});
});

// to turn OFF the board on page load
router.get('/get/off', (req, res) => {
	// callPythonOFF();
});

// to turn ON the board on page load
router.get('/get/on', (req, res) => {
	// callPythonON();
});

router.get('/get/test/one', (req, res) => {
	// pythonTestOne();
	console.log('called');
});

router.get('/get/test/two', (req, res) => {
	// pythonTestTwo();
	console.log('called2');
});

router.get('/get/data', (req, res)=>{
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
		let getData = 'SELECT * FROM match ORDER BY id DESC LIMIT 1';
		db.all(getData, [], (err, data) => {
			if (err) {
				console.log(err);
			}else {
				// console.log(data);
				res.json({data});
			}
		});
	});
});

router.get('/get/dataa', (req, res)=>{
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
		let getData = 'SELECT * FROM match ORDER BY id DESC LIMIT 1';
		db.all(getData, [], (err, data) => {
			if (err) {
				console.log(err);
			}else {
				data.forEach(one => {
					//console.log(one);
					if(one.playing == 1) {
						// console.log(one);
						var totalString = toTwoDigits(one.playerTwoNumber)+''+toThreeDigits(one.teamOneScore)+''+toTwoDigits(one.playerOneNumber)+''+toThreeDigits(one.playerOneScore)+''+toTwoDigits(one.teamOneOut)+''+toThreeDigits(one.playerTwoScore)+'---'+toTwoDigits(one.teamOneOver)+''+toThreeDigits(one.lastManScore);
						console.log('orig: '+totalString);
						// callPython(totalString);
					}else {
						// console.log(one);
						var totalString = toTwoDigits(one.playerTwoNumber)+''+toThreeDigits(one.teamTwoScore)+''+toTwoDigits(one.playerOneNumber)+''+toThreeDigits(one.playerOneScore)+''+toTwoDigits(one.teamTwoOut)+''+toThreeDigits(one.playerTwoScore)+''+toThreeDigits(one.teamOneScore)+''+toTwoDigits(one.teamTwoOver)+''+toThreeDigits(one.lastManScore);
						console.log('orig1: '+totalString);
						// callPython(totalString);
					}
				});
				// console.log(data);
				res.json({data});
			}
		});
	});
});

var toTwoDigits = function(digit) {
	if (digit < 0 | digit > 99 ) return "--";
	return (digit < 10) ? '-' + digit.toString() : digit.toString();
}

var toThreeDigits = function(digit) {
	var val="---";
	if (digit < 0 | digit > 999)
		return val;
	if (digit < 10 )
		val = "--" + digit.toString();
	else if (digit >= 10 && digit < 100 )
		val = "-" + digit.toString();
	else
		val = digit.toString();
 			
	return val;
	// return (digit < 10) ? '--' + digit.toString() : (digit > 10 && digit < 100) ? '-' + digit.toString() : digit.toString();
}

router.post('/match', (req, res)=>{
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {

		// let createTable = 'CREATE TABLE IF NOT EXISTS match ( id INTEGER PRIMARY KEY AUTOINCREMENT, totalOvers INTEGER NULL, currentMatch INTEGER NULL, target INTEGER NULL, playing INTEGER NULL, playerOneNumber INTEGER NULL, playerTwoNumber INTEGER NULL, playerOneScore INTEGER NULL, playerTwoScore INTEGER NULL, lastManScore INTEGER NULL, recentOutPlayer INTEGER NULL, recentOutPlayerScore INTEGER NULL, teamOneName NVARCHAR(160) NULL, teamOneOver INTEGER NULL, teamOneBall INTEGER NULL, teamOnePlayedOvers INTEGER NULL, teamOneScore INTEGER NULL, teamOneOut INTEGER NULL, teamTwoName NVARCHAR(160) NULL, teamTwoOver INTEGER NULL, teamTwoBall INTEGER NULL, teamTwoPlayedOvers INTEGER NULL, teamTwoScore INTEGER NULL, teamTwoOut INTEGER NULL)';

		// let createTable2 = 'CREATE TABLE IF NOT EXISTS history ( id INTEGER PRIMARY KEY AUTOINCREMENT, totalOvers INTEGER NULL, currentMatch INTEGER NULL, target INTEGER NULL, playing INTEGER NULL, playerOneNumber INTEGER NULL, playerTwoNumber INTEGER NULL, playerOneScore INTEGER NULL, playerTwoScore INTEGER NULL, lastManScore INTEGER NULL, recentOutPlayer INTEGER NULL, recentOutPlayerScore INTEGER NULL, teamOneName NVARCHAR(160) NULL, teamOneOver INTEGER NULL, teamOneBall INTEGER NULL, teamOnePlayedOvers INTEGER NULL, teamOneScore INTEGER NULL, teamOneOut INTEGER NULL, teamTwoName NVARCHAR(160) NULL, teamTwoOver INTEGER NULL, teamTwoBall INTEGER NULL, teamTwoPlayedOvers INTEGER NULL, teamTwoScore INTEGER NULL, teamTwoOut INTEGER NULL)';
	
		// db.all(createTable2, [], (err, rows) => {
		// 	if (err) {
		// 		throw err;
		// 	}else {
		// 		console.log(rows);
		// 	}
		// });

		let insertData = 'INSERT INTO match ( totalOvers, currentMatch, target, playing, playerOneNumber, playerTwoNumber, playerOneScore, playerTwoScore, lastManScore, recentOutPlayer, recentOutPlayerScore, teamOneName, teamOneOver, teamOneBall, teamOnePlayedOvers, teamOneScore, teamOneOut, teamTwoName, teamTwoOver, teamTwoBall, teamTwoPlayedOvers, teamTwoScore, teamTwoOut, teamOneExtra, teamTwoExtra) VALUES ('+req.body.totalOvers+', 1, 0, 1, 1, 2, 0, 0, 0, 0, 0, "'+req.body.teamOne+'", 0, 0, 0, 0, 0, "'+req.body.teamTwo+'", 0, 0, 0, 0, 0, 0, 0)';

		db.all(insertData, [], function(err) {
			if (err) {
				console.error(err);
			}else {
				res.status(204).send();
			}
		});
	});
});

router.post('/match/update', (req, res)=>{
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
		let insertData = 'INSERT INTO match ( totalOvers, currentMatch, target, playing, playerOneNumber, playerTwoNumber, playerOneScore, playerTwoScore, lastManScore, recentOutPlayer, recentOutPlayerScore, teamOneName, teamOneOver, teamOneBall, teamOnePlayedOvers, teamOneScore, teamOneOut, teamTwoName, teamTwoOver, teamTwoBall, teamTwoPlayedOvers, teamTwoScore, teamTwoOut, teamOneExtra, teamTwoExtra) VALUES ('+req.body.totalOvers+', '+req.body.currentMatch+', '+req.body.target+', '+req.body.playing+', '+req.body.playerOneNumber+', '+req.body.playerTwoNumber+', '+req.body.playerOneScore+', '+req.body.playerTwoScore +', '+req.body.lastManScore +', '+req.body.recentOutPlayer +', '+req.body.recentOutPlayerScore +', "'+req.body.teamOneName+'", '+req.body.teamOneOver +', '+req.body.teamOneBall +', '+req.body.teamOnePlayedOvers +', '+req.body.teamOneScore +', '+req.body.teamOneOut +', "'+req.body.teamTwoName+'", '+req.body.teamTwoOver +', '+req.body.teamTwoBall +', '+req.body.teamTwoPlayedOvers +', '+req.body.teamTwoScore +', '+req.body.teamTwoOut +', '+req.body.teamOneExtra +', '+req.body.teamTwoExtra +')';

		db.all(insertData, [], function(err) {
			if (err) {
				console.log(err);
			}else {
				res.status(204).send();
			}
		});
	});
});

router.post('/match/post', (req, res)=>{
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {

		let insertData2 = 'INSERT INTO history ( totalOvers, currentMatch, target, playing, playerOneNumber, playerTwoNumber, playerOneScore, playerTwoScore, lastManScore, recentOutPlayer, recentOutPlayerScore, teamOneName, teamOneOver, teamOneBall, teamOnePlayedOvers, teamOneScore, teamOneOut, teamTwoName, teamTwoOver, teamTwoBall, teamTwoPlayedOvers, teamTwoScore, teamTwoOut, teamOneExtra, teamTwoExtra) VALUES ('+req.body.totalOvers+', '+req.body.currentMatch+', '+req.body.target+', '+req.body.playing+', '+req.body.playerOneNumber+', '+req.body.playerTwoNumber+', '+req.body.playerOneScore+', '+req.body.playerTwoScore +', '+req.body.lastManScore +', '+req.body.recentOutPlayer +', '+req.body.recentOutPlayerScore +', "'+req.body.teamOneName+'", '+req.body.teamOneOver +', '+req.body.teamOneBall +', '+req.body.teamOnePlayedOvers +', '+req.body.teamOneScore +', '+req.body.teamOneOut +', "'+req.body.teamTwoName+'", '+req.body.teamTwoOver +', '+req.body.teamTwoBall +', '+req.body.teamTwoPlayedOvers +', '+req.body.teamTwoScore +', '+req.body.teamTwoOut +', '+req.body.teamOneExtra +', '+req.body.teamTwoExtra +')';

		db.all(insertData2, [], function(err) {
			if (err) {
				console.error(err);
			}else {
				let getData = 'SELECT * FROM history';
				db.all(getData, [], (err, data) => {
					if (err) {
						console.log(err);
					}else {
						// console.log(data);
					}
				});
				res.status(204).send();
			}
		});
	});
});

router.delete('/match/delete', (req, res)=>{
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
		let deleteAll = 'DELETE FROM match';
		db.all(deleteAll, [], (err) => {
			if (err) {
				console.log(err);
			}else {
				res.status(204).send();
			}
		});
	});
});

router.delete('/match/delete/one', (req, res)=> {
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
		let deleteLastRow = 'DELETE FROM match WHERE id = (SELECT MAX(id) FROM match)';
		db.all(deleteLastRow, [], (err) => {
			if (err) {
				console.log(err);
			}else {
				// console.log('delete row done');
				res.status(204).send();
			}
		});
	});
});

router.get('/match/get/secondlast', (req, res) => {
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
		let getSecondLastRow = 'SELECT * FROM (SELECT * FROM match ORDER BY Id DESC LIMIT 2) match ORDER BY Id LIMIT 1';
		db.all(getSecondLastRow, [], (err, data) => {
			if (err) {
				console.log(err);
			}else {
				// console.log('delete row done');
				res.json({data});
			}
		});
	});
});

router.get('/make/tables', (req, res) => {
	let db = new sqlite3.Database('./test', sqlite3.OPEN_READWRITE, (err) => {
		let createTable = 'CREATE TABLE IF NOT EXISTS match ( id INTEGER PRIMARY KEY AUTOINCREMENT, totalOvers INTEGER NULL, currentMatch INTEGER NULL, target INTEGER NULL, playing INTEGER NULL, playerOneNumber INTEGER NULL, playerTwoNumber INTEGER NULL, playerOneScore INTEGER NULL, playerTwoScore INTEGER NULL, lastManScore INTEGER NULL, recentOutPlayer INTEGER NULL, recentOutPlayerScore INTEGER NULL, teamOneName NVARCHAR(160) NULL, teamOneOver INTEGER NULL, teamOneBall INTEGER NULL, teamOnePlayedOvers INTEGER NULL, teamOneScore INTEGER NULL, teamOneOut INTEGER NULL, teamTwoName NVARCHAR(160) NULL, teamTwoOver INTEGER NULL, teamTwoBall INTEGER NULL, teamTwoPlayedOvers INTEGER NULL, teamTwoScore INTEGER NULL, teamTwoOut INTEGER NULL)';
		db.all(createTable, [], (err1, rows1) => {
			if (err1) {
				throw err1;
			}else {
				console.log('Match table created with rows1: '+rows1);
				let createTable2 = 'CREATE TABLE IF NOT EXISTS history ( id INTEGER PRIMARY KEY AUTOINCREMENT, totalOvers INTEGER NULL, currentMatch INTEGER NULL, target INTEGER NULL, playing INTEGER NULL, playerOneNumber INTEGER NULL, playerTwoNumber INTEGER NULL, playerOneScore INTEGER NULL, playerTwoScore INTEGER NULL, lastManScore INTEGER NULL, recentOutPlayer INTEGER NULL, recentOutPlayerScore INTEGER NULL, teamOneName NVARCHAR(160) NULL, teamOneOver INTEGER NULL, teamOneBall INTEGER NULL, teamOnePlayedOvers INTEGER NULL, teamOneScore INTEGER NULL, teamOneOut INTEGER NULL, teamTwoName NVARCHAR(160) NULL, teamTwoOver INTEGER NULL, teamTwoBall INTEGER NULL, teamTwoPlayedOvers INTEGER NULL, teamTwoScore INTEGER NULL, teamTwoOut INTEGER NULL)';
				db.all(createTable2, [], (err2, rows2) => {
					if (err2) {
						throw err2;
					}else {
						console.log('Match table created with rows2: '+rows2);
					}
				});
			}
		});
	});
});

router.get('/clear/history', (req, res) => {
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
		let deleteAll = 'DELETE FROM history';
		db.all(deleteAll, [], (err) => {
			if (err) {
				console.log(err);
			}else {
				let getData = 'SELECT * FROM history';
				db.all(getData, [], (err, data) => {
					if (err) {
						console.log(err);
					}else {
						console.log(data);
					}
				});
			}
		});
	});
});

router.get('/get/reboot', (req, res) => {
	// console.log('rach');
	// pythonRebootPi();
});

module.exports = router;
