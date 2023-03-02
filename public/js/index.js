$(function() {
	// localStorage.clear();
	$('#main-div-one, #loading-main').removeAttr('style');
	$('#main-div-one, #changeOverBtn, .changeOverClass, #changeTargetBtn, .changeTargetClass').hide();
	var globalArr = {};
	var target = 0;
	var playing = 0;
	var playerOneNumber = 0;
	var playerTwoNumber = 0;
	var playerOneScore = 0;
	var playerTwoScore = 0;
	var lastManScore = 0;
	var recentOutPlayer = 0;
	var recentOutPlayerScore = 0;
	var teamOneOver = 0;
	var teamOneBall = 0;
	var teamOneScore = 0;
	var teamOneOut = 0;
	var teamTwoOver = 0;
	var teamTwoBall = 0;
	var teamTwoScore = 0;
	var teamTwoOut = 0;
	var teamOneExtra = 0;
	var teamTwoExtra = 0;

	var matchEnded = 0;
	var nextTeamCheck = 0;
	var dataInterval = '';

	newMatch = function() {
		$('#newMatchModal').modal('show');
		setTimeout(() => {
			$('#teamOne').focus();
		}, 500);
		$(".onlyNum").keypress(function(e){
			var keyPress = e.which;

			if ((keyPress >= 48 && keyPress <= 57) || keyPress === 8) { 
				return true;
			}else {
				return false;
			}
		});
	}

	showResult = function() {
		$.get('admin/get/data', function(data) {
			$.each(data.data, function(i, one) {
				if(one.teamOneScore > one.teamTwoScore) {
					$('.hideButtons, .hideRow, #showResultDiv, .nextTeamBtn, #changeOverBtn, #changeTargetBtn').css('display', 'none');
					$('.endMatchBtn, #result').css('display', 'block');
					
					$('.final-result, .teamOneName, .result-score-1, .result-wicket-1, .teamTwoName, .result-score-2, .result-wicket-2').html('');
					$('.final-result').html('<h2>CONGRATS '+one.teamOneName+' WON.</h2>');
					$('.teamOneName').html(one.teamOneName);
					$('.result-score-1').html(one.teamOneScore);
					$('.result-wicket-1').html(one.teamOneOut);
					$('.teamTwoName').html(one.teamTwoName);
					$('.result-score-2').html(one.teamTwoScore);
					$('.result-wicket-2').html(one.teamTwoOut);
					clearInterval(dataInterval);
					getAllData();
					matchEnded = 1;
				}else if(one.teamTwoScore > one.teamOneScore) {
					$('.hideButtons, .hideRow, #showResultDiv, .nextTeamBtn, #changeOverBtn, #changeTargetBtn').css('display', 'none');
					$('.endMatchBtn, #result').css('display', 'block');
					
					$('.final-result, .teamOneName, .result-score-1, .result-wicket-1, .teamTwoName, .result-score-2, .result-wicket-2').html('');
					$('.final-result').html('<h2>CONGRATS '+one.teamTwoName+' WON.</h2>');
					$('.teamOneName').html(one.teamOneName);
					$('.result-score-1').html(one.teamOneScore);
					$('.result-wicket-1').html(one.teamOneOut);
					$('.teamTwoName').html(one.teamTwoName);
					$('.result-score-2').html(one.teamTwoScore);
					$('.result-wicket-2').html(one.teamTwoOut);
					clearInterval(dataInterval);
					getAllData();
					matchEnded = 1;
				}else {
					$('.hideButtons, .hideRow, #showResultDiv, .nextTeamBtn, #changeOverBtn, #changeTargetBtn').css('display', 'none');
					$('.endMatchBtn, #result').css('display', 'block');
					
					$('.final-result, .teamOneName, .result-score-1, .result-wicket-1, .teamTwoName, .result-score-2, .result-wicket-2').html('');
					$('.final-result').html('<h2>SORRY, MATCH IS DRAWN</h2>');
					$('.teamOneName').html(one.teamOneName);
					$('.result-score-1').html(one.teamOneScore);
					$('.result-wicket-1').html(one.teamOneOut);
					$('.teamTwoName').html(one.teamTwoName);
					$('.result-score-2').html(one.teamTwoScore);
					$('.result-wicket-2').html(one.teamTwoOut);
					clearInterval(dataInterval);
					getAllData();
					matchEnded = 1;
				}
			});
		});
	}

	extraFunc = function() {
		$.get('admin/get/data', function(data) {
			$.each(data.data, function(i, one) {
				$('.batsmanOneClass, #batsmanOneScore, .batsmanTwoClass, #batsmanTwoScore, #lastmanScore').html('');
				$('.batsmanOneClass').html(one.playerOneNumber);
				$('#batsmanOneScore').html(one.playerOneScore);
				$('.batsmanTwoClass').html(one.playerTwoNumber);
				$('#batsmanTwoScore').html(one.playerTwoScore);
				$('#lastmanScore').html(one.lastManScore);

				if(one.teamTwoScore == one.target && one.target != 0) {
					$('.hideButtons, .hideRow, #showResultDiv, .nextTeamBtn, #changeOverBtn, #changeTargetBtn').css('display', 'none');
					$('.endMatchBtn, #result').css('display', 'block');
					
					$('.final-result, .teamOneName, .result-score-1, .result-wicket-1, .teamTwoName, .result-score-2, .result-wicket-2').html('');
					$('.final-result').html('<h2>CONGRATS '+one.teamTwoName+' WON.</h2>');
					$('.teamOneName').html(one.teamOneName);
					$('.result-score-1').html(one.teamOneScore);
					$('.result-wicket-1').html(one.teamOneOut);
					$('.teamTwoName').html(one.teamTwoName);
					$('.result-score-2').html(one.teamTwoScore);
					$('.result-wicket-2').html(one.teamTwoOut);
					clearInterval(dataInterval);
					getAllData();
					matchEnded = 1;
				}

				if(one.teamTwoScore > one.target && one.target != 0) {
					$('.hideButtons, .hideRow, #showResultDiv, .nextTeamBtn, #changeOverBtn, #changeTargetBtn').css('display', 'none');
					$('.endMatchBtn, #result').css('display', 'block');
					
					$('.final-result, .teamOneName, .result-score-1, .result-wicket-1, .teamTwoName, .result-score-2, .result-wicket-2').html('');
					$('.final-result').html('<h2>CONGRATS '+one.teamTwoName+' WON.</h2>');
					$('.teamOneName').html(one.teamOneName);
					$('.result-score-1').html(one.teamOneScore);
					$('.result-wicket-1').html(one.teamOneOut);
					$('.teamTwoName').html(one.teamTwoName);
					$('.result-score-2').html(one.teamTwoScore);
					$('.result-wicket-2').html(one.teamTwoOut);
					clearInterval(dataInterval);
					getAllData();
					matchEnded = 1;
				}
				
				if(one.teamTwoOver == one.totalOvers) {
					// console.log('i am called');
					globalArr.teamTwoPlayedOvers = one.teamTwoOver;
					showResult();
				}
			});
		});
	}

	var okLogin = 0;
	loginCheckFunc = function() {
		okLogin = 0;
		$.get('register/get/login/data', function(data) {
			$.each(data.data, function(j, two) {
				if(localStorage.getItem('pinid') == two.id && two.active == 1) {
					okLogin = 1;
				}else {
					
				}
			});
			if(okLogin == 1) {
				// if(nextTeamCheck == 1) {
				// 	$('.nextTeamBtn').css('display', 'none');
				// }else {
				// 	$('.nextTeamBtn').css('display', 'block');
				// }
				// $('.hideButtons').css('display', 'block');
				// $('#loggedOutNoti').empty();
			}else {
				localStorage.setItem('pinid', '');
				localStorage.setItem('login', '');
				window.location.href = "/";
			}
		});
	}

	loginTrigger = function() {
		setInterval(() => {
			if(localStorage.getItem('pinid') == '') {
				
			}else {
				loginCheckFunc();
			}
		}, 1000);
	}

	loginTrigger();

	getAllData =function() {
		$.get('admin/get/dataa', function(data) {
				
		});
	}

	triggerData = function() {
		dataInterval = setInterval(() => {
			getAllData();
		}, 2000);
	}

	var triggerCheck = 0;

	onLoad = function() {
		$.get('admin/get/data', function(data) {
			if(data.data != '') {
				triggerData();
			}
		});
	}

	updateEverything = function() {
		$.get('admin/get/data', function(data) {
			// console.log(data);
			if(data.data != '') {
				$('#changeOverBtn').show();
				$.each(data.data, function(i, one) {
					totalOvers = one.totalOvers;
					currentMatch = 1;
					target = one.target;
					playing = one.playing;
					playerOneNumber = one.playerOneNumber;
					playerTwoNumber = one.playerTwoNumber;
					playerOneScore = one.playerOneScore;
					playerTwoScore = one.playerTwoScore;
					lastManScore = one.lastManScore;
					recentOutPlayer = one.recentOutPlayer;
					recentOutPlayerScore = one.recentOutPlayerScore;
					teamOneOver = one.teamOneOver;
					teamOneBall = one.teamOneBall;
					teamOneScore = one.teamOneScore;
					teamOneOut = one.teamOneOut;
					teamTwoOver = one.teamTwoOver;
					teamTwoBall = one.teamTwoBall;
					teamTwoScore = one.teamTwoScore;
					teamTwoOut = one.teamTwoOut;
					teamOneExtra = one.teamOneExtra;
					teamTwoExtra = one.teamTwoExtra

					globalArr.totalOvers = one.totalOvers;
					globalArr.currentMatch = 1;
					globalArr.target = one.target;
					globalArr.playing = one.playing;
					globalArr.playerOneNumber = one.playerOneNumber;
					globalArr.playerTwoNumber = one.playerTwoNumber;
					globalArr.playerOneScore = one.playerOneScore;
					globalArr.playerTwoScore = one.playerTwoScore;
					globalArr.lastManScore = one.lastManScore;
					globalArr.recentOutPlayer = one.recentOutPlayer;
					globalArr.recentOutPlayerScore = one.recentOutPlayerScore;
					globalArr.teamOneName = one.teamOneName;
					globalArr.teamOneOver = one.teamOneOver;
					globalArr.teamOneBall = one.teamOneBall;
					globalArr.teamOnePlayedOvers = one.teamOnePlayedOvers;
					globalArr.teamOneScore = one.teamOneScore;
					globalArr.teamOneOut = one.teamOneOut;
					globalArr.teamTwoName = one.teamTwoName;
					globalArr.teamTwoOver = one.teamTwoOver;
					globalArr.teamTwoBall = one.teamTwoBall;
					globalArr.teamTwoPlayedOvers = one.teamTwoPlayedOvers;
					globalArr.teamTwoScore = one.teamTwoScore;
					globalArr.teamTwoOut = one.teamTwoOut;
					globalArr.teamOneExtra = one.teamOneExtra;
					globalArr.teamTwoExtra = one.teamTwoExtra;
					if(one != '') {
						if(triggerCheck == 1) {
							onLoad();
							triggerCheck = 0;
						}
						$('.hideButtons, .nextTeamBtn').css('display', 'block');
						$('.newMatchBtn').css('display', 'none');
						if(one.playing == 1) {
							$avg = one.teamOneBall*0.6+one.teamOneOver;
							$avg = one.teamOneScore/$avg;
							$avg = $avg.toFixed(1);
							if($avg == 'NaN') {
								$avg = '--';
							}
							$('#overId, #wicketId, #scoreId, #totalOvers, #teamName, #targetId, #toWinId, #extraScore, #playerOneNumDiv, #playerTwoNumDiv').html('');
							$('#extraScore').html(one.teamOneExtra);
							$('#overId').html(one.teamOneOver+'.'+one.teamOneBall);
							$('#scoreId').html(one.teamOneScore);
							$('#wicketId').html(one.teamOneOut);
							$('#totalOvers').html(one.totalOvers);
							$('#toWinId, #targetId').html('--');
							// $('#teamName').html(one.teamOneName+'<span style="font-family: verdana; font-size: 17px;">  (avg: '+$avg+') </span>');
							$('#teamName').html(one.teamOneName);
							if(one.teamOneOver == one.totalOvers) {
								nextTeamNoti();
								globalArr.target = one.teamOneScore+1;
								globalArr.teamOnePlayedOvers = one.teamOneOver;
							}
							extraFunc();
						}else {
							$('#changeTargetBtn').show();
							nextTeamCheck = 1;
							// console.log('here i am now');
							$('.nextTeamBtn').css('display', 'none');
							$avg = one.teamTwoBall*0.6+one.teamTwoOver;
							$avg = one.teamTwoScore/$avg;
							$avg = $avg.toFixed(1);
							if($avg == 'NaN') {
								$avg = '--';
							}
							$('#overId, #wicketId, #scoreId, #totalOvers, #targetId, #toWinId, #teamName, #extraScore').html('');
							$('#extraScore').html(one.teamTwoExtra);
							$('#overId').html(one.teamTwoOver+'.'+one.teamTwoBall);
							$('#scoreId').html(one.teamTwoScore);
							$('#wicketId').html(one.teamTwoOut);
							$('#totalOvers').html(one.totalOvers);
							$('#targetId').html(one.target-1);
							$toWin = one.target-one.teamTwoScore;
							$('#toWinId').html($toWin);
							// $('#teamName').html(one.teamTwoName+'<span style="font-family: verdana; font-size: 17px;">  (avg: '+$avg+') </span>');
							$('#teamName').html(one.teamTwoName);
							extraFunc();
						}
					}else {
						// $('.hideButtons').css('display', 'none');
						// $('.newMatchBtn').css('display', 'block');
					}
				});
			}else {
				$('#newMatchModal').modal('show');
			}
			check = 0;
			// loginCheckFunc();
			$('#loading-main').hide();
			$('#main-div-one').show();
		});	
	}

	updateEverything();

	postEverything = function() {
		var myArrJSON = JSON.stringify(globalArr);
		// $.ajax({
		// 	type:"POST",
		// 	url: "/admin/match/update",
		// 	headers: {
		// 		'Accept': 'application/json',
		// 		'Content-Type': 'application/json'
		// 	},
		// 	data: myArrJSON,
		// 	success:function(response){
		// 		// console.log('insert success');
		// 		updateEverything();
		// 	},
		// 	error:function(response){ 
		// 		console.log('failed');
		// 	}
		// });

		$.post('/admin/match/update', globalArr)
			.done(function() {
				// console.log('done insert');
				updateEverything();
				return false;
			}).fail(function() {
				console.log('fail post');
		});
		
		
	}

	registerTeams = function() {
		$('#newMatchModal').modal('hide');
		$teamOne = $('#teamOne').val();
		$teamTwo = $('#teamTwo').val();
		$totalOversInp = $('#totalOversInp').val();
		if($teamOne == '') {
			alert('Team One Name is required !');
		}else if($teamTwo == '') {
			alert('Team Two Name is required !');
		}else if($totalOversInp == '') {
			alert('Overs are necessary to start.');
		}else {
			setTimeout(function() {
				$teamOne = $('#teamOne').val();
				$teamTwo = $('#teamTwo').val();
				$totalOversInp = $('#totalOversInp').val();
				
				var myArr2 = {};
				myArr2.teamOne = $teamOne;
				myArr2.teamTwo = $teamTwo;
				myArr2.totalOvers = $totalOversInp;

				$.post('admin/match', myArr2)
					.done(function() {
						// console.log('done insert');
						updateEverything();
						// triggerData();
					}).fail(function() {
						console.log('fail post');
					});
			}, 500);
		}
	}

	nextBall = function() {
		if(playing == 1) {
			teamOneBall++;
			if(teamOneBall > 5) {
				teamOneBall = 0;
				teamOneOver++;
				globalArr.teamOneOver = teamOneOver;
			}
			globalArr.teamOneBall = teamOneBall;
			postEverything();
		}else {
			teamTwoBall++;
			if(teamTwoBall > 5) {
				teamTwoBall = 0;
				teamTwoOver++;
				globalArr.teamTwoOver = teamTwoOver;
			}
			globalArr.teamTwoBall = teamTwoBall;
			postEverything();
		}
	}

	minusBall = function() {
		$.get('admin/match/get/secondlast', function(data) {
			$.each(data.data, function(i, one) {
				if(playing == 1) {
					teamOneBall = one.teamOneBall;
					teamOneOver = one.teamOneOver;
					globalArr.teamOneBall = teamOneBall;
					globalArr.teamOneOver = teamOneOver;
				}else {
					teamTwoBall = one.teamTwoBall;
					teamTwoOver = one.teamTwoOver;
					globalArr.teamTwoBall = teamTwoBall;
					globalArr.teamTwoOver = teamTwoOver;
				}
			});
			postEverything();
		});
	}

	nextOver = function() {
		if(playing == 1) {
			teamOneOver++;
			teamOneBall = 0;
			globalArr.teamOneOver = teamOneOver;
			globalArr.teamOneBall = teamOneBall;
		}else {
			teamTwoOver++;
			teamTwoBall = 0;
			globalArr.teamTwoOver = teamTwoOver;
			globalArr.teamTwoBall = teamTwoBall;
		}
		nextBall();
	}

	wide = function() {
		if(playing == 1) {
			teamOneExtra++;
			teamOneScore++;
			globalArr.teamOneScore = teamOneScore;
			globalArr.teamOneExtra = teamOneExtra;
		}else {
			teamTwoExtra++;
			teamTwoScore++;
			globalArr.teamTwoScore = teamTwoScore;
			globalArr.teamTwoExtra = teamTwoExtra;
		}
		postEverything();
	}

	noBall = function() {
		if(playing == 1) {
			teamOneExtra++;
			teamOneScore++;
			globalArr.teamOneScore = teamOneScore;
			globalArr.teamOneExtra = teamOneExtra;
		}else {
			teamTwoScore++;
			teamTwoExtra++;
			globalArr.teamTwoScore = teamTwoScore;
			globalArr.teamTwoExtra = teamTwoExtra;
		}
		postEverything();
	}

	oneScoreP1 = function() {
		playerOneScore++;
		if(playing == 1) {
			teamOneScore++;
			globalArr.teamOneScore = teamOneScore;
		}else {
			teamTwoScore++;
			globalArr.teamTwoScore = teamTwoScore;
		}
		globalArr.playerOneScore = playerOneScore;
		nextBall();
	}

	oneScoreP2 = function() {
		playerTwoScore++;
		if(playing == 1) {
			teamOneScore++;
			globalArr.teamOneScore = teamOneScore;
		}else {
			teamTwoScore++;
			globalArr.teamTwoScore = teamTwoScore;
		}
		globalArr.playerTwoScore = playerTwoScore;
		nextBall();
	}

	twoScoreP1 = function() {
		playerOneScore+=2;
		if(playing == 1) {
			teamOneScore+=2;
			globalArr.teamOneScore = teamOneScore;
		}else {
			teamTwoScore+=2;
			globalArr.teamTwoScore = teamTwoScore;
		}
		globalArr.playerOneScore = playerOneScore;
		nextBall();
	}

	twoScoreP2 = function() {
		playerTwoScore+=2;
		if(playing == 1) {
			teamOneScore+=2;
			globalArr.teamOneScore = teamOneScore;
		}else {
			teamTwoScore+=2;
			globalArr.teamTwoScore = teamTwoScore;
		}
		globalArr.playerTwoScore = playerTwoScore;
		nextBall();
	}

	threeScoreP1 = function() {
		playerOneScore+=3;
		if(playing == 1) {
			teamOneScore+=3;
			globalArr.teamOneScore = teamOneScore;
		}else {
			teamTwoScore+=3;
			globalArr.teamTwoScore = teamTwoScore;
		}
		globalArr.playerOneScore = playerOneScore;
		nextBall();
	}

	threeScoreP2 = function() {
		playerTwoScore+=3;
		if(playing == 1) {
			teamOneScore+=3;
			globalArr.teamOneScore = teamOneScore;
		}else {
			teamTwoScore+=3;
			globalArr.teamTwoScore = teamTwoScore;
		}
		globalArr.playerTwoScore = playerTwoScore;
		nextBall();
	}

	fourScoreP1 = function() {
		playerOneScore+=4;
		if(playing == 1) {
			teamOneScore+=4;
			globalArr.teamOneScore = teamOneScore;
		}else {
			teamTwoScore+=4;
			globalArr.teamTwoScore = teamTwoScore;
		}
		globalArr.playerOneScore = playerOneScore;
		nextBall();
	}

	fourScoreP2 = function() {
		playerTwoScore+=4;
		if(playing == 1) {
			teamOneScore+=4;
			globalArr.teamOneScore = teamOneScore;
		}else {
			teamTwoScore+=4;
			globalArr.teamTwoScore = teamTwoScore;
		}
		globalArr.playerTwoScore = playerTwoScore;
		nextBall();
	}

	fiveScoreP1 = function() {
		playerOneScore+=5;
		if(playing == 1) {
			teamOneScore+=5;
			globalArr.teamOneScore = teamOneScore;
		}else {
			teamTwoScore+=5;
			globalArr.teamTwoScore = teamTwoScore;
		}
		globalArr.playerOneScore = playerOneScore;
		nextBall();
	}

	fiveScoreP2 = function() {
		playerTwoScore+=5;
		if(playing == 1) {
			teamOneScore+=5;
			globalArr.teamOneScore = teamOneScore;
		}else {
			teamTwoScore+=5;
			globalArr.teamTwoScore = teamTwoScore;
		}
		globalArr.playerTwoScore = playerTwoScore;
		nextBall();
	}

	sixScoreP1 = function() {
		playerOneScore+=6;
		if(playing == 1) {
			teamOneScore+=6;
			globalArr.teamOneScore = teamOneScore;
		}else {
			teamTwoScore+=6;
			globalArr.teamTwoScore = teamTwoScore;
		}
		globalArr.playerOneScore = playerOneScore;
		nextBall();
	}

	sixScoreP2 = function() {
		playerTwoScore+=6;
		if(playing == 1) {
			teamOneScore+=6;
			globalArr.teamOneScore = teamOneScore;
		}else {
			teamTwoScore+=6;
			globalArr.teamTwoScore = teamTwoScore;
		}
		globalArr.playerTwoScore = playerTwoScore;
		nextBall();
	}

	minusScoreP1 = function() {
		if(playerOneScore != 0) {
			playerOneScore--;
			globalArr.playerOneScore = playerOneScore;
		}
		if(playing == 1) {
			if(teamOneScore != 0) {
				teamOneScore--;
				globalArr.teamOneScore = teamOneScore;
			}
		}else {
			if(teamTwoScore != 0) {
				teamTwoScore--;
				globalArr.teamTwoScore = teamTwoScore;
			}
		}
		postEverything();
	}

	minusScoreP2 = function() {
		if(playerTwoScore != 0) {
			playerTwoScore--;
			globalArr.playerTwoScore = playerTwoScore;
		}
		if(playing == 1) {
			if(teamOneScore != 0) {
				teamOneScore--;
				globalArr.teamOneScore = teamOneScore;
			}
		}else {
			if(teamTwoScore != 0) {
				teamTwoScore--;
				globalArr.teamTwoScore = teamTwoScore;
			}
		}
		postEverything();
	}

	outP1 = function() {
		globalArr.recentOutPlayer = playerOneNumber;
		globalArr.recentOutPlayerScore = lastManScore;
		if(playerTwoNumber > playerOneNumber) {
			playerOneNumber = playerTwoNumber+1;	
		}else {
			playerOneNumber++;
		}
		if(playing == 1) {
			teamOneOut++;
			globalArr.teamOneOut = teamOneOut;
			globalArr.lastManScore = playerOneScore;
		}else {
			teamTwoOut++;
			globalArr.teamTwoOut = teamTwoOut;
			globalArr.lastManScore = playerOneScore;
		}
		globalArr.playerOneNumber = playerOneNumber;
		globalArr.playerOneScore = 0;
		nextBall();
	}

	outP2 = function() {
		globalArr.recentOutPlayer = playerTwoNumber;
		globalArr.recentOutPlayerScore = lastManScore;
		if(playerOneNumber > playerTwoNumber) {
			playerTwoNumber = playerOneNumber+1;	
		}else {
			playerTwoNumber++;
		}
		if(playing == 1) {
			teamOneOut++;
			globalArr.teamOneOut = teamOneOut;
			globalArr.lastManScore = playerTwoScore;
		}else {
			teamTwoOut++;
			globalArr.teamTwoOut = teamTwoOut;
			globalArr.lastManScore = playerTwoScore;
		}
		globalArr.playerTwoNumber = playerTwoNumber;
		globalArr.playerTwoScore = 0;
		nextBall();
	}

	notOutP1 = function() {
		if(playing == 1) {
			if(teamOneOut == 0) {
				globalArr.teamOneOut = teamOneOut;
			}else {
				teamOneOut--;
			  globalArr.teamOneOut = teamOneOut;
			}
		}else {
			if(teamTwoOut == 0) {
				globalArr.teamTwoOut = teamTwoOut;
			}else {
				teamTwoOut--;
				globalArr.teamTwoOut = teamTwoOut;
			}
		}
		globalArr.playerOneNumber = recentOutPlayer;
		globalArr.playerOneScore = lastManScore;
		globalArr.lastManScore = recentOutPlayerScore;
		postEverything();
	}

	notOutP2 = function() {
		if(playing == 1) {
			if(teamOneOut == 0) {
				globalArr.teamOneOut = teamOneOut;
			}else {
				teamOneOut--;
			  globalArr.teamOneOut = teamOneOut;
			}
		}else {
			if(teamTwoOut == 0) {
				globalArr.teamTwoOut = teamTwoOut;
			}else {
				teamTwoOut--;
				globalArr.teamTwoOut = teamTwoOut;
			}
		}
		globalArr.playerTwoNumber = recentOutPlayer;
		globalArr.playerTwoScore = lastManScore;
		globalArr.lastManScore = recentOutPlayerScore;
		postEverything();
	}

	byeOneScore = function() {
		if(playing == 1) {
			teamOneExtra++;
			teamOneScore++;
			globalArr.teamOneScore = teamOneScore;
			globalArr.teamOneExtra = teamOneExtra;
		}else {
			teamTwoExtra++;
			teamTwoScore++;
			globalArr.teamTwoScore = teamTwoScore;
			globalArr.teamTwoExtra = teamTwoExtra;
		}
		nextBall();
	}

	byeTwoScore = function() {
		if(playing == 1) {
			teamOneExtra+=2;
			teamOneScore+=2;
			globalArr.teamOneScore = teamOneScore;
			globalArr.teamOneExtra = teamOneExtra;
		}else {
			teamTwoExtra+=2;
			teamTwoScore+=2;
			globalArr.teamTwoScore = teamTwoScore;
			globalArr.teamTwoExtra = teamTwoExtra;
		}
		nextBall();
	}

	byeThreeScore = function() {
		if(playing == 1) {
			teamOneExtra+=3;
			teamOneScore+=3;
			globalArr.teamOneScore = teamOneScore;
			globalArr.teamOneExtra = teamOneExtra;
		}else {
			teamTwoExtra+=3;
			teamTwoScore+=3;
			globalArr.teamTwoScore = teamTwoScore;
			globalArr.teamTwoExtra = teamTwoExtra;
		}
		nextBall();
	}

	byeFourScore = function() {
		if(playing == 1) {
			teamOneExtra+=4;
			teamOneScore+=4;
			globalArr.teamOneScore = teamOneScore;
			globalArr.teamOneExtra = teamOneExtra;
		}else {
			teamTwoExtra+=4;
			teamTwoScore+=4;
			globalArr.teamTwoScore = teamTwoScore;
			globalArr.teamTwoExtra = teamTwoExtra;
		}
		nextBall();
	}

	byeFiveScore = function() {
		if(playing == 1) {
			teamOneExtra+=5;
			teamOneScore+=5;
			globalArr.teamOneScore = teamOneScore;
			globalArr.teamOneExtra = teamOneExtra;
		}else {
			teamTwoExtra+=5;
			teamTwoScore+=5;
			globalArr.teamTwoScore = teamTwoScore;
			globalArr.teamTwoExtra = teamTwoExtra;
		}
		nextBall();
	}

	nextTeam = function() {
		$('#nextTeamNoti').modal('hide');
		globalArr.target = teamOneScore+1;
		globalArr.playing = 2;
		globalArr.playerOneNumber = 1;
		globalArr.playerOneScore = 0;
		globalArr.playerTwoNumber = 2;
		globalArr.playerTwoScore = 0;
		globalArr.lastManScore = 0;
		globalArr.recentOutPlayer = 0;
		postEverything();
	}

	nextTeamNoti = function() {
		$('#nextTeamModal').modal('show');
		setTimeout(function() {
			$('#nextTeamModal').modal('hide');
			nextTeam();
		}, 2000);
	}

	nextTeamPermission = function() {
		$('#nextTeamNoti').modal('show');
	}

	endMatchModal = function() {
		$('#endMatchModal').modal('show');
	}

	endMatch = function() {
		var myArrJSON = JSON.stringify(globalArr);
		$('#endMatchModal').modal('hide');
		$.ajax({
			type:"POST",
			url: "/admin/match/post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: myArrJSON,
			success:function(response){
				// console.log('insert success');
				$.ajax({
					type:"DELETE",
					url: "/admin/match/delete",
					success:function(response) {
						setTimeout(function() {
							window.location.href = "/admin";
						}, 1000);
					},
					error:function(response){ 
						console.log('failed');
					}
				});
			},
			error:function(response){ 
				console.log('failed');
			}
		});
		
	}

	oneStepBack = function() {
		$.ajax({
			type:"DELETE",
			url: "/admin/match/delete/one",
			success:function(response) {
				updateEverything();
			},
			error:function(response){ 
				console.log('failed');
			}
		});
	}

	loginModal = function() {
		var checkLogin = 0;
		$('#loginBtn').html('');
		$('#loginBtn').html('Loading...');
		$.get('register/get/login/data', function(data) {
			// console.log(data);
			$.each(data.data, function(j, two) {
				if(checkLogin == 0) {
					if(two.active == 1) {
						checkLogin = 1;
						$('#loginBtn').html('');
						$('#loginBtn').html('LOGIN');
						$('#loginModal').modal('show');
						setTimeout(function(){ $('#pin').focus() }, 1000);
	
						$('#loggedOnSomeoneNoti').empty();
						$('#loggedOnSomeoneNoti').append('Someone is already Logged In, do you really want to log him out? if YES then enter PIN');
					}else {
						$('#loginBtn').html('');
						$('#loginBtn').html('LOGIN');
						$('#loginModal').modal('show');
						setTimeout(function(){ $('#pin').focus() }, 1000);
					}
				}
			});
		});
	}

	var prevPassword = 0;
	var newPassword = 0;
	var personId = '';

	login = function() {
		prevPassword = 0;
		newPassword = 0;
		personId = '';
		// to log this person in
		$.get('register/get/login/data', function(data) {
			$.each(data.data, function(j, two) {
				console.log(j);
				if($('#pin').val() === two.password && two.active == 1) {
					prevPassword = 1;
					$('#loginPINError').empty();
					$('#loginPINError').append('ALREADY USED, USE ANOTHER PIN');
				}else if($('#pin').val() === two.password && two.active != 1) {
					newPassword = 1;
					personId = two.id;
				}else {
					$('#loginPINError').empty();
					$('#loginPINError').append('PIN NOT MATCHED');
				}
			});

			if(prevPassword == 1) {
				$('#loginPINError').empty();
				$('#loginPINError').append('ALREADY USED, USE ANOTHER PIN');
			}else if(newPassword == 1) {
				var updateActiveLogin = {};
				updateActiveLogin.active = 0;
				var myArrJSON = JSON.stringify(updateActiveLogin);
				$.ajax({
					type:"PUT",
					url: "register/update/active/logins",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					data: myArrJSON,
					success:function(response) {
						var updateActiveLogin2 = {};
						updateActiveLogin2.id = personId;
						updateActiveLogin2.active = 1;
						var myArrJSON2 = JSON.stringify(updateActiveLogin2);
						$.ajax({
							type:"PUT",
							url: "register/update/active/login",
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							data: myArrJSON2,
							success:function(response){
								$('#loginModal').modal('hide');
								localStorage.setItem('pinid', personId);
								localStorage.setItem('login', 'Yesss');
								setTimeout(function() {
									window.location.href = "/admin";
								}, 500);
							},
							error:function(response){ 
								console.log('failed');
							}
						});
					},
					error:function(response){ 
						console.log('failed');
					}
				});
			}else {
				$('#loginPINError').empty();
				$('#loginPINError').append('PIN NOT MATCHED');
			}
		});
	}

	logoutFromLogin = function() {
		var updateActiveLogin = {};
		updateActiveLogin.id = localStorage.getItem('pinid');
		updateActiveLogin.active = 0;
		var myArrJSON = JSON.stringify(updateActiveLogin);
		$.ajax({
			type:"PUT",
			url: "register/update/active/login",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: myArrJSON,
			success:function(response){
				localStorage.setItem('pinid', '');
				localStorage.setItem('login', '');
				localStorage.setItem('onoff', 'NO');
				setTimeout(function() {
					window.location.href = "/";
				}, 500);
			},
			error:function(response){ 
				console.log('failed');
			}
		});
	}

	registerModal = function() {
		$('#registerBtn').html('');
		$('#registerBtn').html('Loading...');
		$.get('register/get/register/data', function(data) {
			$.each(data.data, function(j, two) {
				if(two.active == 1) {
					var updateActiveRegister = {};
					updateActiveRegister.id = two.id;
					updateActiveRegister.active = 0;
					var myArrJSON = JSON.stringify(updateActiveRegister);
					$.ajax({
						type:"PUT",
						url: "register/update/active/register",
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						data: myArrJSON,
						success:function(response){
							$('#registerBtn').html('');
							$('#registerBtn').html('REGISTER');
							$('#registerModal').modal('show');
							setTimeout(function(){ $('#pin2').focus() }, 1000);
						},
						error:function(response){ 
							console.log('failed');
						}
					});
				}else {
					$('#registerBtn').html('');
					$('#registerBtn').html('REGISTER');
					$('#registerModal').modal('show');
					setTimeout(function(){ $('#pin').focus() }, 1000);
				}
			});
		});
	}

	register = function() {
		$.get('register/get/register/data', function(data) {
			$.each(data.data, function(j, two) {
				if($('#pin2').val() === two.password) {
					var updateActiveRegister = {};
					updateActiveRegister.id = two.id;
					updateActiveRegister.active = 1;
					var myArrJSON = JSON.stringify(updateActiveRegister);
					$.ajax({
						type:"PUT",
						url: "register/update/active/register",
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						data: myArrJSON,
						success:function(response){
							$('#registerModal').modal('hide');
							localStorage.setItem('pin2id', two.id);
							localStorage.setItem('register', 'Yesss');
							setTimeout(function() {
								window.location.href = "/register";
							}, 500);
						},
						error:function(response){ 
							console.log('failed');
						}
					});
				}else {
					$('#registerPINError').empty();
					$('#registerPINError').append('PIN NOT MATCHED');
				}
			});
		});
	}

	logoutFromRegister = function() {
		var updateActiveRegister = {};
		updateActiveRegister.id = localStorage.getItem('pin2id');
		updateActiveRegister.active = 0;
		var myArrJSON = JSON.stringify(updateActiveRegister);
		$.ajax({
			type:"PUT",
			url: "register/update/active/register",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: myArrJSON,
			success:function(response){
				localStorage.setItem('pin2id', '');
				localStorage.setItem('register', '');
				setTimeout(function() {
					window.location.href = "/admin";
				}, 500);
			},
			error:function(response){ 
				console.log('failed');
			}
		});
	}

	$('#saveBtn').empty();
	$('#saveBtn').append('<button class="btn btn-success" onclick="registerUser()">Save</button>');

	registerUser = function() {
		var registerPINInput = $('#registerPINInput').val();
		var registerArr = {};
		registerArr.registerPINInput = registerPINInput;
		
		$.post('/register/new', registerArr)
			.done(function() {
				logins();
				$('#registerPINInput').val('');
			}).fail(function() {
				console.log('fail post');
		});
	}
	
	registers = function() {
		$('#tHeadOne, #tBodyOne').empty();
		$('#tHeadOne').append('<tr><th>PIN</th><th>Action</th></tr>');
		$.get('register/get/register/data', function(data) {
			$.each(data.data, function(i, one) {
				// console.log(one);
				$('#tBodyOne').append('<tr><td class="p-2" style="border: 1px solid white;">'+one.password+'</td><td class="p-2" style="border: 1px solid white;"><button class="btn btn-sm btn-light" onclick="editRegister(\'' + one.id + '\', \'' + one.password + '\')">Edit</button></td><tr>');
			});
		});
	}
	registers();

	editRegister = function($id, $password) {
		$('#registerPINInput, #registerId').val('');
		$('#registerId').val($id);
		$('#registerPINInput').val($password);
		$('#saveBtn').empty();
		$('#saveBtn').append('<button class="btn btn-success" onclick="updateRegisterUser()">Update</button>');
	}

	updateRegisterUser = function() {
		var updateRegArr = {};
		updateRegArr.id = $('#registerId').val();
		updateRegArr.password = $('#registerPINInput').val();
		var myArrJSON = JSON.stringify(updateRegArr);
		$.ajax({
			type:"PUT",
			url: "register/update/register",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: myArrJSON,
			success:function(response){
				registers();
				$('#registerPINInput').val('');
				$('#saveBtn').empty();
				$('#saveBtn').append('<button class="btn btn-success" onclick="registerUser()">Save</button>');
			},
			error:function(response){ 
				console.log('failed');
			}
		});
	}
	
	logins = function() {
		$('#tHeadTwo, #tBodyTwo').empty();
		$('#tHeadTwo').append('<tr><th>PIN</th><th>Action</th></tr>');
		$.get('register/get/login/data', function(data) {
			$.each(data.data, function(j, two) {
				// console.log(two);
				$('#tBodyTwo').append('<tr><td class="p-2" style="border: 1px solid white;">'+two.password+'</td><td class="p-2" style="border: 1px solid white;"><button class="btn btn-sm btn-light" onclick="editLogin(\'' + two.id + '\', \'' + two.password + '\')">Edit</button></td><tr>');
			});
		});
	}
	logins();

	editLogin = function($id, $password) {
		$('#registerPINInput, #registerId').val('');
		$('#registerId').val($id);
		$('#registerPINInput').val($password);
		$('#saveBtn').empty();
		$('#saveBtn').append('<button class="btn btn-success" onclick="updateLoginUser()">Update</button>');
	}

	updateLoginUser = function() {
		var updateRegArr = {};
		updateRegArr.id = $('#registerId').val();
		updateRegArr.password = $('#registerPINInput').val();
		var myArrJSON = JSON.stringify(updateRegArr);
		$.ajax({
			type:"PUT",
			url: "register/update/login",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: myArrJSON,
			success:function(response){
				logins();
				$('#registerPINInput').val('');
				$('#saveBtn').empty();
				$('#saveBtn').append('<button class="btn btn-success" onclick="registerUser()">Save</button>');
			},
			error:function(response){ 
				console.log('failed');
			}
		});
	}

	turnOffBoard = function() {
		// $.get('admin/get/off', function(data) {
			
		// }).done(function() {
		// 	clearInterval(dataInterval);
		// 	ON = 0;
		// 	onOfBtn();
		// });

		$.ajax({
			type:"PUT",
			url: "admin/put/off",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			success:function(response){
				triggerCheck = 0;
				clearInterval(dataInterval);
				$('#OFFBtn').prop('disabled', true);
				$('#ONBtn').prop('disabled', false);
			},
			error:function(response){ 
				console.log('failed');
			}
		});
	}

	turnOnBoard = function() {
		// $.get('admin/get/on', function(data) {
			
		// }).done(function() {
		// 	ON = 1;
		// 	onOfBtn();
		// 	loginCheckFunc();
		// 	onLoad();
		// });

		$.ajax({
			type:"PUT",
			url: "admin/put/on",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			success:function(response){
				triggerCheck = 1;
				clearInterval(dataInterval);
				getAllData();
				$('#OFFBtn').prop('disabled', false);
				$('#ONBtn').prop('disabled', true);
			},
			error:function(response){ 
				console.log('failed');
			}
		});
	}

	onoffCheckOnLoad = function() {
		// check whether board is OFF or ON
		$.get('admin/get/onoff', function(data) {
			$.each(data.data, function(i, one) {
				if(one.board == 0) {
					// if previous status was OFF then put the board OFF and disable OFF button(enable ON button)
					// $.get('admin/get/off', function(data) {
			
					// }).done(function() {
					// 	$('#OFFBtn').prop('disabled', true);
					// 	$('#ONBtn').prop('disabled', false);
					// });
					$.ajax({
						type:"PUT",
						url: "admin/put/off",
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						success:function(response){
							triggerCheck = 0;
							$('#OFFBtn').prop('disabled', true);
							$('#ONBtn').prop('disabled', false);
						},
						error:function(response){ 
							console.log('failed');
						}
					});
				}else {
					// if previous status was ON then put the board ON and disable ON button(enable OFF button)
					// $.get('admin/get/on', function(data) {
			
					// }).done(function() {
					// 	$('#OFFBtn').prop('disabled', false);
					// 	$('#ONBtn').prop('disabled', true);
					// });
					$.ajax({
						type:"PUT",
						url: "admin/put/on",
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						success:function(response){
							// onLoad();
							triggerCheck = 1;
							getAllData();
							$('#OFFBtn').prop('disabled', false);
							$('#ONBtn').prop('disabled', true);
						},
						error:function(response){ 
							console.log('failed');
						}
					});
				}
			})
		});
	}

	onoffCheckOnLoad();

	testBoard_1 = function() {
		triggerCheck = 1;
		clearInterval(dataInterval);
		$.get('admin/get/test/one', function(data) {

		});
	}

	testBoard_2 = function() {
		triggerCheck = 1;
		clearInterval(dataInterval);
		$.get('admin/get/test/two', function(data) {
			
		});
	}

	makeTables = function() {
		$.get('admin/make/tables', function(data) {

		});
	}

	clearHistory = function() {
		$.get('admin/clear/history', function(data) {

		});
	}

	refreshTables = function() {
		var registerArr = {};
		
		$.post('/register/refresh/tables', registerArr)
			.done(function() {
				console.log('done');
			}).fail(function() {
				console.log('fail post');
		});
	}

	rebootPi = function() {
		$.get('admin/get/reboot', function(data) {

		});
	}

	changeOverFunc = function() {
		if($('.changeOverClass').is(':visible')) {
			$('.changeOverClass').hide();
		}else {
			$('.changeOverClass').show();
			$('#totalOversInput').val('');
			$('#totalOversInput').val(totalOvers);
		}
	}

	changeOverPost = function() {
		// if($('#totalOversInput').val() <= totalOvers) {
		// 	$('.changeOverClass').hide();
		// 	$('#changeOverBtn').html('Please select higher value');
		// 	setTimeout(() => {
		// 		$('#changeOverBtn').html('Change Overs');
		// 	}, 3000);
		// }else {
			globalArr.totalOvers = $('#totalOversInput').val();
			postEverything();
			$('.changeOverClass').hide();
			$('#changeOverBtn').html('Success');
			$('#changeOverBtn').removeClass('btn-danger');
			$('#changeOverBtn').addClass('btn-success');
			setTimeout(() => {
				$('#changeOverBtn').html('Change Overs');
				$('#changeOverBtn').removeClass('btn-success');
				$('#changeOverBtn').addClass('btn-danger');
			}, 3000);
		// }
	}

	changeTargetFunc = function() {
		if($('.changeTargetClass').is(':visible')) {
			$('.changeTargetClass').hide();
		}else {
			$('.changeTargetClass').show();
			$('#totalTargetInput').val('');
			$('#totalTargetInput').val(target-1);
		}
	}

	changeTargetPost = function() {
		var targetValue = $('#totalTargetInput').val();
		targetValue++;
		globalArr.target = targetValue;
		globalArr.teamOneScore = $('#totalTargetInput').val();
		postEverything();
		$('.changeTargetClass').hide();
		$('#changeTargetBtn').html('Success');
		$('#changeTargetBtn').removeClass('btn-danger');
		$('#changeTargetBtn').addClass('btn-success');
		setTimeout(() => {
			$('#changeTargetBtn').html('Change Target');
			$('#changeTargetBtn').removeClass('btn-success');
			$('#changeTargetBtn').addClass('btn-danger');
		}, 3000);
	}

});
