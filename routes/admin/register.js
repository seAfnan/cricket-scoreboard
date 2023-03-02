const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.all('/*', (req, res, next) => {
	req.app.locals.layout = 'register';
	next();
});

router.get('/', (req, res) => {
  // let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
	// 	let deleteLastRow = 'DELETE FROM login WHERE id = (4)';
	// 	db.all(deleteLastRow, [], (err) => {
	// 		if (err) {
	// 			console.log(err);
	// 		}else {
	// 			// console.log('delete row done');
	// 			// res.status(204).send();
	// 		}
	// 	});
	// });
	res.render('home/register');
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

router.get('/get/login/data', (req, res)=>{
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
		let getData = 'SELECT * FROM login';
		db.all(getData, [], (err, data) => {
			if (err) {
				console.log(err);
			}else {
				res.json({data});
				// console.log(data);
			}
		});
	});
});

router.get('/get/register/data', (req, res)=>{
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
		let getData = 'SELECT * FROM register';
		db.all(getData, [], (err, data) => {
			if (err) {
				console.log(err);
			}else {
				res.json({data});
				// console.log(data);
			}
		});
	});
});

router.post('/new', (req, res) => {
	let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
    let createTable = 'CREATE TABLE IF NOT EXISTS login ( id INTEGER PRIMARY KEY AUTOINCREMENT, password TEXT, active INTEGER)';
    // let createTable = 'ALTER TABLE login ADD COLUMN active INTEGER';
		db.all(createTable, [], (err, rows) => {
			if (err) {
				throw err;
			}else {
				let insertData = 'INSERT INTO login ( password, active ) VALUES ("'+req.body.registerPINInput+'", 0)';
        db.all(insertData, [], function(err) {
          if (err) {
            console.error(err);
          }else {
            res.status(204).send();
          }
        });
			}
    });
  });
});

router.put('/update/register', (req, res) => {
  let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
    let updateData = 'UPDATE register SET password = "'+req.body.password+'" WHERE id = '+req.body.id;
    db.all(updateData, [], function(err) {
      if (err) {
        console.error(err);
      }else {
        res.status(204).send();
      }
    });
  });
});

router.put('/update/login', (req, res) => {
  let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
    let updateData = 'UPDATE login SET password = "'+req.body.password+'" WHERE id = '+req.body.id;
    db.all(updateData, [], function(err) {
      if (err) {
        console.error(err);
      }else {
        res.status(204).send();
      }
    });
  });
});

router.put('/update/active/logins', (req, res) => {
  let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
    let updateAllData = 'UPDATE login SET active = "'+req.body.active+'"';
    db.all(updateAllData, [], function(err, rows) {
      if (err) {
        console.error(err);
      }else {
        // console.log(rows);
        res.status(204).send();
      }
    });
  });
});

router.put('/update/active/login', (req, res) => {
  let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
    let updateData = 'UPDATE login SET active = "'+req.body.active+'" WHERE id = '+req.body.id;
    db.all(updateData, [], function(err) {
      if (err) {
        console.error(err);
      }else {
        res.status(204).send();
      }
    });
  });
});

router.put('/update/active/register', (req, res) => {
  let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
    let updateData = 'UPDATE register SET active = "'+req.body.active+'" WHERE id = '+req.body.id;
    db.all(updateData, [], function(err) {
      if (err) {
        console.error(err);
      }else {
        res.status(204).send();
      }
    });
  });
});

router.post('/refresh/tables', (req, res) => {
  let db = new sqlite3.Database('./scoreboard', sqlite3.OPEN_READWRITE, (err) => {
		let emptyMatch = 'DELETE FROM match';
		db.all(emptyMatch, [], (err) => {
			if (err) {
				console.log(err);
			}else {
        var string = '00000000000000000000000';
        // callPython(string);
        
        // let allMatches = 'SELECT * FROM match';
        // db.all(allMatches, [], (err, rows1) => {
        //   if (err) {
        //     console.log(err);
        //   }else {
        //     console.log(rows1);
        //     let emptyHistory = 'DELETE FROM history';
        //     db.all(emptyHistory, [], (err) => {
        //       if (err) {
        //         console.log(err);
        //       }else {
        //         let allHistory = 'SELECT * FROM history';
        //         db.all(allHistory, [], (err, rows2) => {
        //           if (err) {
        //             console.log(err);
        //           }else {
        //             console.log(rows2);
        //             res.status(204).send();
        //           }
        //         });
        //       }
        //     });
        //   }
        // });
			}
		});
	});
});

module.exports = router;