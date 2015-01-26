$(function(){
	$.get('/blocks', appendToList);

	function appendToList (blocks) {
		var list = [];
		var content, block;
		for(var i in blocks){
			block = blocks[i];
			content = '<a href="/blocks/'+block+'">'+block+'</a>'+
				'  <a href="#" data-block="'+block+'">x</a>';
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

	$('.blocks-list').on('click', 'a[data-block]', function(event){
		if (!confirm('Are you sure')) {
			return false;
		}

		var target = $(event.currentTarget);

		$.ajax({
			type: 'DELETE', url: '/blocks/'+target.data('block')
		}).done(function(){
			target.parents('li').remove();
		});
	});
});