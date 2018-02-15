// INPUT BUFFER SYSTEM
// ------------------------------------------------------
var _PATTERNS = [
	{
		pattern: 'sdsdp',
		regex: /[a-z\s\S]*s[a-z\s\S]*d[a-z\s\S]*s[a-z\s\S]*d[a-z\s\S]*p[a-z\s\S]*/,
		move: 'Super Punch'
	},
	{
		pattern: 'sasak',
		regex: /[a-z\s\S]*s[a-z\s\S]*a[a-z\s\S]*s[a-z\s\S]*a[a-z\s\S]*k[a-z\s\S]*/,
		move: 'Ultra Kick'
	},
	{
		pattern: 'sdp',
		regex: /[a-z\s\S]*s[a-z\s\S]*d[a-z\s\S]*p[a-z\s\S]*/,
		move: 'Fireball'
	},
	{
		pattern: 'sak',
		regex: /[a-z\s\S]*s[a-z\s\S]*a[a-z\s\S]*k[a-z\s\S]*/,
		move: 'Spin Kick'
	},
	{
		pattern: 'p',
		regex: /[a-z\s\S]*p[a-z\s\S]*/,
		move: 'Punch'
	},
	{
		pattern: 'k',
		regex: /[a-z\s\S]*k[a-z\s\S]*/,
		move: 'Kick'
	}
];




var _input = new (function() {
	var self = this;

	self.config = {
		bufferSize: 10
	};

	self.buffer = [];



	self.CheckForPattern = function() {
		var bufferSet = self.buffer.slice(),
			bufferStr = '';

		while (bufferSet.length) {
			bufferStr += bufferSet.pop();
		}

		for (var p = 0; p < _PATTERNS.length; p++) {
			if (_PATTERNS[p].regex.test(bufferStr)) {
				self.OutputMove(_PATTERNS[p].move);
				return true;
			}
		}

		return false;
	};


	self.ResetBuffer = function() {
		self.buffer = [];
	};


	self.OutputMove = function(move) {
		var moveEl = document.getElementById('move');
		moveEl.innerHTML = move;
		moveEl.style.opacity = 1;

		// Fade out move
		(function FadeOut() {
			(moveEl.style.opacity -= 0.1) < 0 ? (moveEl.style.opacity = 0) : setTimeout(FadeOut, 50);
		})();
	};


	self.AddToBuffer = function(key) {
		if (self.buffer.length === self.config.bufferSize) {
			self.buffer.pop();
		}

		self.buffer.unshift(key);

		if (self.CheckForPattern()) {
			self.ResetBuffer();
		}

		self.OutputBuffer();
	};


	self.OutputBuffer = function() {
		var list = document.getElementById('bufferSet');

		if (list.hasChildNodes() && list.children.length == self.config.bufferSize) {
			for (var b = 0; b < self.config.bufferSize; b++) {
				var listItem = list.children[b],
					itemClass = 'icon fas';

				switch (self.buffer[b]) {
					case 'w':
						itemClass += ' fa-arrow-up';
						break;

					case 'd':
						itemClass += ' fa-arrow-right';
						break;

					case 's':
						itemClass += ' fa-arrow-down';
						break;

					case 'a':
						itemClass += ' fa-arrow-left';
						break;

					case 'p':
						itemClass += ' fa-hand-rock';
						break;

					case 'k':
						itemClass += ' fa-paw';
						break;

					default:
						itemClass += ' fa-expand';
				}

				listItem.querySelector('.icon').className = itemClass;
			}
		} else {
			// Create the nodes manually.... boo.
		}
	};
});


window.setInterval(function() {
	var input = null;

	for (var key in keys) {
		if (keys[key].pressed) {
			input = String.fromCharCode(key).toLowerCase();
		}
	}

	_input.AddToBuffer(input);
}, 100);



// Keys and events
var keys = {
	87: { pressed: false },		// w key (up)
	83: { pressed: false },		// s key (down)
	65: { pressed: false },		// a key (left)
	68: { pressed: false },		// d key (right)
	75: { pressed: false },		// k key (kick)
	80: { pressed: false }		// p key (punch)
};

var OnKeyDown = function(e) {
	var keyCode = e.keyCode || e.which;

	switch(keyCode) {
		case 87:
			keys[87].pressed = true;
			break;

		case 83:
			keys[83].pressed = true;
			break;

		case 65:
			keys[65].pressed = true;
			break;

		case 68:
			keys[68].pressed = true;
			break;

		case 75:
			keys[75].pressed = true;
			break;

		case 80:
			keys[80].pressed = true;
			break;
	}
};

var OnKeyUp = function(e) {
	var keyCode = e.keyCode || e.which;

	switch(keyCode) {
		case 87:
			keys[87].pressed = false;
			break;

		case 83:
			keys[83].pressed = false;
			break;

		case 65:
			keys[65].pressed = false;
			break;

		case 68:
			keys[68].pressed = false;
			break;

		case 75:
			keys[75].pressed = false;
			break;

		case 80:
			keys[80].pressed = false;
			break;
	}
};

document.addEventListener("keydown", OnKeyDown, false);
document.addEventListener("keyup", OnKeyUp, false);