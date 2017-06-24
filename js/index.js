$(document).ready(function(){
	app.init();
});

const app = {};

app.init = function() {
	this.eventLiseners();
}

app.eventLiseners = function() {
	$('#search').on('keyup', e => {
		if (e.keyCode === 13) {
			this.getData();
		}
	});
}

app.getData = function() {
	const value = $('#search').val();
	const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&inprop=url&generator=search&gsrsearch=${value}&exsentences=1&exlimit=20&exintro=1&explaintext=1&callback=?`;
	$.getJSON(url)
		.done(response => {
			this.render(response.query.pages);
		})
		.fail(error => {
			console.log(error);
		});
}

app.render = function(data) {
	const articles = $('.entries');
	
	articles.html('');
	articles.toggleClass('fly-in');

	$.each(data, (key, article) => {
		articles.append(`<a target="_blank" href=https://en.wikipedia.org/?curid=${article.pageid}><li>${article.title}<p>${article.extract}</p></li></a>`);
	});
}