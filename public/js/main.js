$(function() {
	// localStorage.clear();
	$('#main-div-one, #loading-main').removeAttr('style');
	$('#main-div-one, #startBufferBtn').hide();
	var globalArr = {};
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
					$('.hideButtons, .hideRow, #showResultDiv, .nextTeamBtn').css('display', 'none');
					$('.endMatchBtn, #result').css('display', 'block');
					$('.final-result, .teamOneName, .result-score-1, .result-wicket-1, .teamTwoName, .result-score-2, .result-wicket-2').html('');
					$('.final-result').html('<h2>'+one.teamOneName+' won the match.</h2>');
					$('.teamOneName').html(one.teamOneName);
					$('.result-score-1').html(one.teamOneScore);
					$('.result-wicket-1').html(one.teamOneOut);
					$('.teamTwoName').html(one.teamTwoName);
					$('.result-score-2').html(one.teamTwoScore);
					$('.result-wicket-2').html(one.teamTwoOut);
					clearInterval(dataInterval);
					matchEnded = 1;
				}else if(one.teamTwoScore > one.teamOneScore) {
					$('.hideButtons, .hideRow, #showResultDiv, .nextTeamBtn').css('display', 'none');
					$('.endMatchBtn, #result').css('display', 'block');
					$('.final-result, .teamOneName, .result-score-1, .result-wicket-1, .teamTwoName, .result-score-2, .result-wicket-2').html('');
					$('.final-result').html('<h2>'+one.teamTwoName+' won the match.</h2>');
					$('.teamOneName').html(one.teamOneName);
					$('.result-score-1').html(one.teamOneScore);
					$('.result-wicket-1').html(one.teamOneOut);
					$('.teamTwoName').html(one.teamTwoName);
					$('.result-score-2').html(one.teamTwoScore);
					$('.result-wicket-2').html(one.teamTwoOut);
					clearInterval(dataInterval);
					matchEnded = 1;
				}else {
					$('.hideButtons, .hideRow, #showResultDiv, .nextTeamBtn').css('display', 'none');
					$('.endMatchBtn, #result').css('display', 'block');
					$('.final-result, .teamOneName, .result-score-1, .result-wicket-1, .teamTwoName, .result-score-2, .result-wicket-2').html('');
					$('.final-result').html('<h2>The match has been draw</h2>');
					$('.teamOneName').html(one.teamOneName);
					$('.result-score-1').html(one.teamOneScore);
					$('.result-wicket-1').html(one.teamOneOut);
					$('.teamTwoName').html(one.teamTwoName);
					$('.result-score-2').html(one.teamTwoScore);
					$('.result-wicket-2').html(one.teamTwoOut);
					clearInterval(dataInterval);
					matchEnded = 1;
				}
			});
		});
	}

	extraFunc = function() {
		
		$.get('admin/get/data', function(data) {
			$.each(data.data, function(i, one) {
				$('#batsmanOneId, #batsmanOneScore, #batsmanTwoId, #batsmanTwoScore, #lastmanScore').html('');
				$('#batsmanOneId').html(one.playerOneNumber);
				$('#batsmanOneScore').html(' ('+one.playerOneScore+')');
				$('#batsmanTwoId').html(one.playerTwoNumber);
				$('#batsmanTwoScore').html(' ('+one.playerTwoScore+')');
				$('#lastmanScore').html(' ('+one.lastManScore+')');

				if(one.teamTwoScore == one.target && one.target != 0) {
					$('.hideButtons, .hideRow, #showResultDiv, .nextTeamBtn').css('display', 'none');
					$('.endMatchBtn, #result').css('display', 'block');
					$('.final-result, .teamOneName, .result-score-1, .result-wicket-1, .teamTwoName, .result-score-2, .result-wicket-2').html('');
					$('.final-result').html('<h2>'+one.teamTwoName+' won the match.</h2>');
					$('.teamOneName').html(one.teamOneName);
					$('.result-score-1').html(one.teamOneScore);
					$('.result-wicket-1').html(one.teamOneOut);
					$('.teamTwoName').html(one.teamTwoName);
					$('.result-score-2').html(one.teamTwoScore);
					$('.result-wicket-2').html(one.teamTwoOut);
					clearInterval(dataInterval);
					matchEnded = 1;
				}

				if(one.teamTwoScore > one.target && one.target != 0) {
					$('.hideButtons, .hideRow, #showResultDiv, .nextTeamBtn').css('display', 'none');
					$('.endMatchBtn, #result').css('display', 'block');
					$('.final-result, .teamOneName, .result-score-1, .result-wicket-1, .teamTwoName, .result-score-2, .result-wicket-2').html('');
					$('.final-result').html('<h2>'+one.teamTwoName+' won the match.</h2>');
					$('.teamOneName').html(one.teamOneName);
					$('.result-score-1').html(one.teamOneScore);
					$('.result-wicket-1').html(one.teamOneOut);
					$('.teamTwoName').html(one.teamTwoName);
					$('.result-score-2').html(one.teamTwoScore);
					$('.result-wicket-2').html(one.teamTwoOut);
					clearInterval(dataInterval);
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

	updateEverything = function() {
		$.get('admin/get/data', function(data) {
			// console.log(data);
			if(data.data != '') {
				$.each(data.data, function(i, one) {
					totalOvers = one.totalOvers;
					currentMatch = 1;
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
						$('.hideButtons, .nextTeamBtn').css('display', 'block');
						$('.newMatchBtn').css('display', 'none');
						if(one.playing == 1) {
							$avg = one.teamOneBall*0.6+one.teamOneOver;
							$avg = one.teamOneScore/$avg;
							$avg = $avg.toFixed(1);
							if($avg == 'NaN') {
								$avg = '--';
							}
							// $('#overId, #wicketId, #scoreId, #totalOvers, #teamName, #targetId, #toWinId, #extraScore').html('');
							// $('#extraScore').html(one.teamOneExtra);
							// $('#overId').html(one.teamOneOver+'.'+one.teamOneBall);
							// $('#scoreId').html(one.teamOneScore);
							// $('#wicketId').html(one.teamOneOut);
							// $('#totalOvers').html(one.totalOvers);
							// $('#toWinId, #targetId').html('--');
							// $('#teamName').html(one.teamOneName+'<span style="font-family: verdana; font-size: 17px;">  (avg: '+$avg+') </span>');
							// $('#teamName').html(one.teamOneName);

							$('.overId, .wicketsId, #scoreId, .tOvers, .t-font, #targetId, .toWin, #extraScore').html('');
							$('#extraScore').html('('+one.teamOneExtra+')');
							$('.overId').html(one.teamOneOver+'.'+one.teamOneBall);
							$('#scoreId').html(one.teamOneScore);
							$('.wicketsId').html(one.teamOneOut);
							$('.tOvers').html(' ('+one.totalOvers+')');
							$('.toWin, #targetId').html('--');
							$('.t-font').html(one.teamOneName+'<span style="font-family: verdana; font-size: 17px;">  (avg: '+$avg+') </span>');
							// $('#teamName').html(one.teamOneName);

							if(one.teamOneOver == one.totalOvers) {
								nextTeamNoti();
								globalArr.target = one.teamOneScore+1;
								globalArr.teamOnePlayedOvers = one.teamOneOver;
							}
							extraFunc();
						}else {
							nextTeamCheck = 1;
							// console.log('here i am now');
							$('.nextTeamBtn').css('display', 'none');
							$avg = one.teamTwoBall*0.6+one.teamTwoOver;
							$avg = one.teamTwoScore/$avg;
							$avg = $avg.toFixed(1);
							if($avg == 'NaN') {
								$avg = '--';
							}
							// $('#overId, #wicketId, #scoreId, #totalOvers, #targetId, #toWinId, #teamName, #extraScore').html('');
							// $('#extraScore').html(one.teamTwoExtra);
							// $('#overId').html(one.teamTwoOver+'.'+one.teamTwoBall);
							// $('#scoreId').html(one.teamTwoScore);
							// $('#wicketId').html(one.teamTwoOut);
							// $('#totalOvers').html(one.totalOvers);
							// $('#targetId').html(one.target-1);
							// $toWin = one.target-one.teamTwoScore;
							// $('#toWinId').html($toWin);
							// // $('#teamName').html(one.teamTwoName+'<span style="font-family: verdana; font-size: 17px;">  (avg: '+$avg+') </span>');
							// $('#teamName').html(one.teamTwoName);

							$('.overId, .wicketsId, #scoreId, .tOvers, #targetId, .toWin, .t-font, #extraScore').html('');
							$('#extraScore').html('('+one.teamTwoExtra+')');
							$('.overId').html(one.teamTwoOver+'.'+one.teamTwoBall);
							$('#scoreId').html(one.teamTwoScore);
							$('.wicketsId').html(one.teamTwoOut);
							$('.tOvers').html(' ('+one.totalOvers+')');
							$('#targetId').html(one.target-1);
							$toWin = one.target-one.teamTwoScore;
							$('.toWin').html($toWin);
							$('.t-font').html(one.teamTwoName+'<span style="font-family: verdana; font-size: 17px;">  (avg: '+$avg+') </span>');
							// $('.t-font').html(one.teamTwoName);

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

	var updateTrig = '';

	updateTrigger = function() {
		updateTrig = setInterval(() => {
			updateEverything();
		}, 10000);
	}

	updateTrigger();
	updateEverything();
	
	stopBuffering = function() {
		clearInterval(updateTrig);
		$('#stopBufferBtn, .video__icon').hide();
		$('#startBufferBtn').show();
	}

	startBuffering = function() {
		updateTrigger();
		$('#stopBufferBtn, .video__icon').show();
		$('#startBufferBtn').hide();
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

});