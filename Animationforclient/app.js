var display1 = document.getElementById('display-1');
var display2 = document.getElementById('display-2');
var display3 = document.getElementById('display-3');
var display4 = document.getElementById('display-4');
var display5 = document.getElementById('display-5');

var map = [];
var progressstatus = false;
var intervaldisplay;
var intervalprogress;
var status = 0;
var response;
var presence = 'unknown';

document.body.addEventListener('keydown', function (e) {
	var e = e || event; //to deal with old IE
	e.preventDefault();
	if (map.includes(String.fromCharCode(e.keyCode)))
		return;
	if (e.type == 'keydown' && e.keyCode >= 65 && e.keyCode <= 90)
		map.push(String.fromCharCode(e.keyCode));
});

document.body.addEventListener('keyup', function (e) {
	map = [];
	progressstatus = false;
	clearInterval(intervalprogress);
	intervaldisplay = setInterval(setdisplays, 1000 / 24);
	status = 0;
	if (presence != 'marked') {
		presence = 'unknown';
		display5.className = 'progress-bar status-0';
	}
});

function setdisplays() {
	var baseClass = 'display-container display-char-';
	if (presence == 'unknown') {
		display1.className = baseClass + map[0];
		display2.className = baseClass + map[1];
		display3.className = baseClass + map[2];
		display4.className = baseClass + map[3];
	} else if (presence == 'marked') {
		display1.className = baseClass + 'green';
		display2.className = baseClass + 'green';
		display3.className = baseClass + 'green';
		display4.className = baseClass + 'green';
	} else if (presence == 'wrongcode') {
		display1.className = baseClass + 'red';
		display2.className = baseClass + 'red';
		display3.className = baseClass + 'red';
		display4.className = baseClass + 'red';
	}
	if (map.length == 4 && progressstatus == false && presence != 'marked') {
		progressstatus = true;
		clearInterval(intervaldisplay);
		intervalprogress = setInterval(runprogress, 5000 / 23);
	}
}

async function runprogress() {
	var value = status;
	if (status < 24) {
		display5.className = 'progress-bar status-' + value;
		if (status == 12) {
			console.log('calling the server');
			response = 'marked';
		}
		status++;
	} else {
		if (response == 'marked') {
			presence = 'marked';
			display5.className = 'progress-bar status-green'
		} else {
			display5.className = 'progress-bar status-red'
			presence = 'wrongcode';
		}
		setdisplays();
		clearInterval(intervalprogress);
	}
}


intervaldisplay = setInterval(setdisplays, 1000 / 24);