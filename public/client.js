$(function(){
	$.get('/blocks', appendToList);

	function appendToList (blocks) {
		var list = [];
		var content, block;
		for(var i in blocks){
			block = blocks[i];
			content = '<a href="/blocks/'+block+'">'+block+'</a>';
			list.push($('<li>', {html: content}));
		}
		$('.blocks-list').append(list);
	}

	$('form').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var blockData = form.serialize();

		$.ajax({
			type: 'POST', url: '/blocks', data: blockData
		}).done(function(block){
			console.log(block);
			appendToList([block.name]);
			form.trigger('reset');
		});
	});
});