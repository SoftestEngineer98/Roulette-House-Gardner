const bet = document.getElementsByClassName('betChoice');

Array.from(bet).forEach(button => {
	button.addEventListener('click', setValue);
});
function setValue(e) {
	let targetValue = e.target.value;

	const betValue = document.querySelector('.betValue');

	betValue.value = targetValue;
}

document.querySelector('.submitBtn').addEventListener('click', runGame);

let revenue = 0;

function runGame() {
	let amount = document.querySelector('.betAmount');
	let id = amount.id;
	console.log(id);
	amount = Number(amount.value);
	console.log(typeof amount);

	let betColor = document.querySelector('.betValue').value;
	console.log(betColor);

	fetch('game', {
		method: 'put',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			betColor: betColor,
			amount: amount,
			id: id,
		}),
	})
		.then(response => {
			if (response.ok) return response.json();
		})
		.then(data => {
			document.querySelector('#result').innerText = data.winCheck;
		});
}

// var thumbUp = document.getElementsByClassName('fa-thumbs-up');
// var thumbDown = document.getElementsByClassName('fa-thumbs-down');
// var trash = document.getElementsByClassName('fa-trash');

// Array.from(thumbUp).forEach(function (element) {
// 	element.addEventListener('click', function () {
// 		const name = this.parentNode.parentNode.childNodes[1].innerText;
// 		const msg = this.parentNode.parentNode.childNodes[3].innerText;
// 		const thumbUp = parseFloat(
// 			this.parentNode.parentNode.childNodes[5].innerText
// 		);
// 		fetch('upVote', {
// 			method: 'put',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({
// 				name: name,
// 				msg: msg,
// 				thumbUp: thumbUp,
// 			}),
// 		})
// 			.then(response => {
// 				if (response.ok) return response.json();
// 			})
// 			.then(data => {
// 				console.log(data);
// 				window.location.reload(true);
// 			});
// 	});
// });

// Array.from(thumbDown).forEach(function (element) {
// 	element.addEventListener('click', function () {
// 		const name = this.parentNode.parentNode.childNodes[1].innerText;
// 		const msg = this.parentNode.parentNode.childNodes[3].innerText;
// 		const thumbDown = parseFloat(
// 			this.parentNode.parentNode.childNodes[5].innerText
// 		);
// 		fetch('downVote', {
// 			method: 'put',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({
// 				name: name,
// 				msg: msg,
// 				thumbDown: thumbDown,
// 			}),
// 		})
// 			.then(response => {
// 				if (response.ok) return response.json();
// 			})
// 			.then(data => {
// 				console.log(data);
// 				window.location.reload(true);
// 			});
// 	});
// });

// Array.from(trash).forEach(function (element) {
// 	element.addEventListener('click', function () {
// 		const name = this.parentNode.parentNode.childNodes[1].innerText;
// 		const msg = this.parentNode.parentNode.childNodes[3].innerText;
// 		fetch('messages', {
// 			method: 'delete',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				name: name,
// 				msg: msg,
// 			}),
// 		}).then(function (response) {
// 			window.location.reload();
// 		});
// 	});
// });
