/* I'll give a bit of documentation on the functions here.

popup(title, text):
	it does a popup box that looks like miiverses with an ok button to close it 


*/


var aTbottom = false;
var offset = 1;
var loading = 0;

// call this function whenever loading new posts
function reloadYeahTooltip() {
	window.tip.destroyAll()

	window.tip = tippy('.empathy', {
		animation: 'shift-away',
		arrow: true,
		dynamicTitle: true
	});
}

function popup(title, text) {
	$('body').append('<div class="dialog active-dialog modal-window-open mask">\
		<div class="dialog-inner">\
			<div class="window">\
				<h1 class="window-title">' + title + '</h1>\
				<div class="window-body">\
					<p class="window-body-content">' + text + '</p>\
					<div class="form-buttons">\
						<button class="ok-button black-button" type="button" data-event-type="ok">OK</button>\
					</div>\
				</div>\
			</div>\
		</div></div>');
	bindEvents();
}

function drawDialog() {
	window.addEventListener("load", () => {
		const canvas = document.querySelector("#canvas")
		const ctx = canvas.getContext("2d");
		var brushSize = 12;
		var tool = "brush";
		var finalImage = "<?php echo $drawing; ?>";
		let painting = false;

		function getOffset( el ) {
			var _x = 0;
			var _y = 0;
			while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
				_x += el.offsetLeft - el.scrollLeft;
				_y += el.offsetTop - el.scrollTop;
				el = el.offsetParent;
			}
			return { top: _y, left: _x };
		}
		
		function startPosition(){
			painting = true;
			draw(e);
			canvas.style.cursor = "pointer";
		}
		function endPosition(){
			painting = false;
			canvas.style.cursor = "default";
			ctx.beginPath();
		}
		function draw(e) {
			if(!painting) return;
			ctx.lineWidth = brushSize;
			ctx.lineCap = "round";
			ctx.lineTo(e.clientX, e.clientY);
			ctx.stroke();
			ctx.beginpath();
			ctx.moveTo(e.clientX - getOffset( document.getElementById('#canvas') ).left, e.clientY - getOffset( document.getElementById('#canvas') ).top);
		}

		function color(colorSelected) {
			ctx.strokeStyle = colorSelected;
			ctx.fillStyle = colorSelected;
		}

		function clear() {
			ctx.clearRect(0, 0, canvas.width, canvas.height)	
		}

		function eraser() {
			ctx.strokeStyle = rgba(0, 0, 0 ,0);
			ctx.fillStyle = rgba(0, 0, 0 ,0);
		}

		function onFill() {
			ctx.closePath();
			ctx.beginPath();
			ctx.fillStyle = context.strokeStyle;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		function strokeSize(size) {
			if(size == "small") {
				brushSize = 8; 
			} else if (size == "medium") {
				brushSize = 16;
			} else if (size == "large") {
				brushSize = 32;
			} else if (size == "pressure") {
				Pressure.set('#canvas', {
					change: brushSize = force * 32
				});
			}
		}

		function saveImage() {
			finalImage = ctx.toDataURL;
		}
		
		if (tool == "brush") {
			canvas.addEventListener('mousedown', startPosition);
			canvas.addEventListener('mouseup', endPosition);
			canvas.addEventListener("mousemove", draw);
		} else if (tool == "fill") {
			canvas.addEventListener('click', onFill);
		}
	});
	$('body').append('<div class="dialog active-dialog modal-window-open mask">\
		<div class="dialog-inner">\
			<div class="window">\
			<head>\
				<script src="/assets/js/pressure.min.js"></script>">\
				<script src="https://kit.fontawesome.com/7eb5e220c4.js"></script>\
				<style type="text/css">\
				#canvas {\
					border:1px solid black;\
				}\
				</style>\
			</head>\
				<h1 class="window-title">Drawing Tool</h1>\
				<div class="window-body">\
					<p class="window-body-content">\
					<nav>\
						<button id="clear" class="fas fa-trash-alt black-button" onclick="clear()"></button>\
						<button id="brush" class="fas fa-paint-brush black-button" onclick="tool = "brush""></button>\
						<button id="eraser" class="fas fa-eraser black-button" onclick="eraser()"></button>\
						<button id="fill" class="fas fa-fill black-button" onclick="tool = "fill""></button>\
						<input id="colorPicker" type="color" class="black-button" onselect="color(this.value)"></input>\
					</nav><p></p>\
					<button id="small" class="black-button" onclick="strokeSize("small")" value="S">\
					<button id="medium" class="black-button" onclick="strokeSize("medium")" value="M">\
              <button id="large" class="black-button" onclick="strokeSize("large")" value="L">\
              <button id="pressure" class="black-button" onclick="strokeSize("pressure")" value="Pressure">\
					<canvas id="canvas" width="600" height="300"></canvas></p>\
					<div class="form-buttons">\
						<button class="ok-button black-button" type="button" onclick="saveImage()" data-event-type="ok">Done</button>\
					</div>\
				</div>\
			</div>\
		</div></div>');
	bindEvents();
}

function getNotifs() {
	$.getJSON('/check_update.json', function(data) {
		if (data.notifs.unread_count > 0) {
			favicon.badge(data.notifs.unread_count);
			$('.badge').show().text(data.notifs.unread_count);
		} else {
			favicon.reset();
			$('.badge').hide().text(data.notifs.unread_count);
		}
	});
}

setInterval(function(){ 
    	getNotifs();
    }, 30000);

var favicon = new Favico({
    animation:'none'
});

var d = new Date();
d.setTime(d.getTime() + (365*24*60*60*1000));

//does the theme magic.
function lightTheme() {
	document.cookie = 'dark-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	document.cookie = 'translucent-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	document.cookie = 'blur-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	document.cookie = 'stripe-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	$('.empty-icon').children().attr('src', '/assets/img/empty.png');
	window.location.reload(false);
}
function darkTheme() {
	document.cookie = 'translucent-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	document.cookie = 'blur-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	document.cookie = 'stripe-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	var expires = "expires="+ d.toUTCString();
	document.cookie = "dark-mode=1;" + expires + ";path=/";
	$('.empty-icon').children().attr('src', '/assets/img/dark-empty.png');
	window.location.reload(false);
}
function translucentTheme() {
	document.cookie = 'dark-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	document.cookie = 'blur-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	document.cookie = 'stripe-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	var expires = "expires="+ d.toUTCString();
	document.cookie = "translucent-mode=1;" + expires + ";path=/";
	$('.empty-icon').children().attr('src', '/assets/img/dark-empty.png');
	window.location.reload(false); 
}
function blurTheme() {
	document.cookie = 'dark-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	document.cookie = 'translucent-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	document.cookie = 'stripe-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	var expires = "expires="+ d.toUTCString();
	document.cookie = "blur-mode=1;" + expires + ";path=/";
	$('.empty-icon').children().attr('src', '/assets/img/dark-empty.png');
	window.location.reload(false);
}
function stripeTheme() {
	document.cookie = 'dark-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	document.cookie = 'translucent-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	document.cookie = 'blur-mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	var expires = "expires="+ d.toUTCString();
	document.cookie = "stripe-mode=1;" + expires + ";path=/";
	$('.empty-icon').children().attr('src', '/assets/img/dark-empty.png');
	window.location.reload(false);
}
function setBackground(backgroundURL) {
	document.cookie = 'background=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	var expires = "expires="+ d.toUTCString();
	document.cookie = "background=" + backgroundURL + ";" + expires + ";path=/";
	window.location.reload(false)
}

function removeBackground() {
	document.cookie = 'background=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
	window.location.reload(false)
}

function bindEvents() {
	
	$(".trigger").off().on('click', (function(){
		var href = $(this).attr('data-href');
		
		//if you click on a post it takes you to 'data-href' an attribute defined in list.php for each post
		
		$.pjax({url: href, container: '#main-body'});
    }));

    // prevents accidentally opening a post when trying to view the Yeah to Nah ratio on mobile
    $('.empathy').off().on('click', function(e) {
    	e.stopImmediatePropagation();
    });


    // prevents opening a post when clicking a link
    $('.post-link').off().on('click', function(e) {
    	e.stopImmediatePropagation();
    })

	
    $('.yeah').off().on('click', function(event) {
    	event.stopPropagation();

    	var postId = $(this).attr('id');
    	var yeahType = $(this).attr('data-track-label');

    	//changes the yeah button to disabled so no one yeahs twice while its posting the first yeah just like on miiverse holy shish
    	$('#'+postId).attr('disabled', '');

    	$.post('/yeah.php', {postId:postId, yeahType:yeahType}, function(data) {
    		if(data == 'success') {

    			$('#'+postId).addClass('yeah-added');
    			$('#'+postId).find('.yeah-button-text').text('Unyeah');
    			$('#'+postId).closest('div').find('.yeah-count').text(Number($('#'+postId).closest('div').find('.yeah-count').text()) + 1);

    			$('#'+postId).closest('div').find('[yeahs]').attr('yeahs', Number($('#'+postId).closest('div').find('[yeahs]').attr('yeahs')) + 1);



				if (yeahType == 'post') {
					$('#yeah-content').removeClass('none');
					$('.icon-container.visitor').removeAttr("style");
				} else {
					$('.reply-permalink-post #yeah-content').removeClass('none');
					$('.reply-permalink-post .icon-container.visitor').removeAttr("style");
				}

				if ($('#' + postId + '.nah').hasClass('nah-added')) {
					$('#' + postId + '.nah').removeClass('nah-added');
					$('#' + postId + '.nah').find('.nah-button-text').text('Nah...');
					$('#'+postId).closest('div').find('.yeah-count').text(Number($('#'+postId).closest('div').find('.yeah-count').text()) + 1);

					$('#'+postId).closest('div').find('[nahs]').attr('nahs', Number($('#'+postId).closest('div').find('[nahs]').attr('nahs')) - 1);
				}


				nahs = Number($('#'+postId).closest('div').find('[nahs]').attr('nahs'));

				yeahs = Number($('#'+postId).closest('div').find('[yeahs]').attr('yeahs'));

				$('#'+postId).closest('div').find('[data-original-title]').attr('title', yeahs + ' ' + (yeahs == 1 ? 'Yeah' : 'Yeahs') + ' / ' + nahs + ' ' + (nahs == 1 ? 'Nah' : 'Nahs'));

				//rebind events here
				bindEvents();
			} else {
				popup('', 'Yeah failed.');
			}

			$('#'+postId).removeAttr("disabled");
		})
    });

    $('.yeah-added').off().on('click', function(event){
    	event.stopPropagation();
    	var postId = $(this).attr('id');
		var yeahType = $(this).attr('data-track-label');
		
		//same thing here just for unyeahs lol
		$('#'+postId).attr('disabled', '');

		$.post('/unyeah.php', {postId:postId, yeahType:yeahType}, function(data){
			if(data=='success'){
				$('#'+postId).removeClass('yeah-added');
				$('#'+postId).find('.yeah-button-text').text('Yeah!');
				$('#'+postId).closest('div').find('.yeah-count').text(Number($('#'+postId).closest('div').find('.yeah-count').text()) - 1);

				$('#'+postId).closest('div').find('[yeahs]').attr('yeahs', Number($('#'+postId).closest('div').find('[yeahs]').attr('yeahs')) - 1);

				if (yeahType == 'post') { 
					$('.icon-container.visitor').attr('style', 'display: none;');
					if ($('.yeah-count').text() < 1){
						$('#yeah-content').addClass('none');
					}
				} else {
					$('.reply-permalink-post .icon-container.visitor').attr('style', 'display: none;');
					if ($('.reply-permalink-post .yeah-count').text() < 1){
						$('.reply-permalink-post #yeah-content').addClass('none');
					}
				} 

				nahs = Number($('#'+postId).closest('div').find('[nahs]').attr('nahs'));

				yeahs = Number($('#'+postId).closest('div').find('[yeahs]').attr('yeahs'));

				$('#'+postId).closest('div').find('[data-original-title]').attr('title', yeahs + ' ' + (yeahs == 1 ? 'Yeah' : 'Yeahs') + ' / ' + nahs + ' ' + (nahs == 1 ? 'Nah' : 'Nahs'));

				//rebind events here
				bindEvents();
			} else {
				alert('unyeah failed');
			}

			$('#'+postId).removeAttr("disabled");
		})
	});

	$(".js-open-global-my-menu").off().click(function() {
		$('#global-my-menu').not($("#global-my-menu").toggleClass('none')).addClass('none');
	});

	$('.textarea').keyup(function() {
		var text_length = $('.textarea').val().length;
		var text_remaining = 800 - text_length;
		$('.textarea-feedback').html('<font color="#646464" style="font-size: 13px; padding: 0 3px 0 7px;">'+text_remaining+'</font> Characters Remaining');
	});

	$(document).off().on('click',function (e) {
		footerUl = $('.open-global-my-menu');
		if ((!footerUl.is(e.target) && footerUl.has(e.target).length === 0) && (!$('#global-my-menu').is(e.target) && $('#global-my-menu').has(e.target).length === 0)){
			$('#global-my-menu').addClass('none');
		}
	});

	$('.js-open-truncated-text-button').off().on('click', function(){
		$(this).addClass('none');
		$('.js-truncated-text').addClass('none');
		$('.js-full-text').removeClass('none');
		bindEvents();
	})

	$('.favorite-button').off().on('click', function(){
		var titleId = $(this).attr('data-title-id');
		if ($('.favorite-button').hasClass('checked')){

			$.post('/favorite.php', {titleId:titleId, favType: "removeFav"}, function(data) {
				if(data == 'success'){
					$('.favorite-button').removeClass('checked');
				}
			})
		} else {
			$.post('/favorite.php', {titleId:titleId, favType: "addFav"}, function(data) {
				if(data == 'success'){
					$('.favorite-button').addClass('checked');
				}
			})
		}
	});

	$('input[name="face-type"]').click(function(){
		if ($('input[name="face-type"][value="2"]').is(':checked')) {
			$('.nnid-face').removeClass('none');
			$('.custom-face').addClass('none');
		} else {
			$('.custom-face').removeClass('none');
			$('.nnid-face').addClass('none');
		}
	});

	$('.feeling-button').click(function(){
		$('.feeling-button').removeClass('checked');
		$(this).addClass('checked');
	})

	$('.follow-button').off().on('click', function(){
		event.stopPropagation();
		var userId = $(this).attr('data-user-id');
		$.post('/follow.php', {userId:userId, followType: "follow"}, function(data) {
			if(data == 'success'){
				$('.user-sidebar').find('[data-user-id="' + userId + '"]').addClass('unfollow-button').removeClass('follow-button');
				$('.list').find('[data-user-id="' + userId + '"]').addClass('none').next('.follow-done-button').removeClass('none').removeAttr("disabled");
				bindEvents();
			}
		})
	});

	$('.unfollow-button').off().on('click', function(){
		var userId = $(this).attr('data-user-id');
		$.post('/follow.php', {userId:userId, followType: "unfollow"}, function(data) {
			if(data == 'success'){
				$('.unfollow-button').addClass('follow-button').removeClass('unfollow-button');
				bindEvents();
			}
		})
	});

	$('#profile-post').off().on('click', function(){
		$.post('/settings/profile_post.unset.json');
		$(this).remove();
	});

	$('.edit-button').off().on('click', function(){
		$('#edit-post-page').attr('class', 'dialog active-dialog modal-window-open mask');
	});

	$('.olv-modal-close-button').off().on('click', function(){
		$('.mask').addClass('none');
	});

	$('.edit-post-form').find('select[name="edit-type"]').on('change', function(){
		if ($(this).val() != "" && $(this).val() != "edit"){
			$('.edit-post-form').attr('action', $('.edit-post-form').find('select').find('option:selected').attr('data-action'));
			$('.edit-post-form').find('.post-button').removeClass('disabled').removeAttr("disabled");
		} else {
			$('.edit-post-form').find('.post-button').addClass('disabled').attr('disabled', '');
		}

		if ($(this).val() == "edit"){
			$('<div class="post-edit-form"><div class="post-count-container"><div class="textarea-feedback" style="float:left;"><font color="#646464" style="font-size: 13px; padding: 0 3px 0 7px;">800</font> Characters Remaining</div></div><div class="feeling-selector js-feeling-selector test-feeling-selector"><label class="symbol feeling-button feeling-button-normal checked"><input type="radio" name="feeling_id" value="0" checked=""><span class="symbol-label">normal</span></label><label class="symbol feeling-button feeling-button-happy"><input type="radio" name="feeling_id" value="1"><span class="symbol-label">happy</span></label><label class="symbol feeling-button feeling-button-like"><input type="radio" name="feeling_id" value="2"><span class="symbol-label">like</span></label><label class="symbol feeling-button feeling-button-surprised"><input type="radio" name="feeling_id" value="3"><span class="symbol-label">surprised</span></label><label class="symbol feeling-button feeling-button-frustrated"><input type="radio" name="feeling_id" value="4"><span class="symbol-label">frustrated</span></label><label class="symbol feeling-button feeling-button-puzzled"><input type="radio" name="feeling_id" value="5"><span class="symbol-label">puzzled</span></label></div><div class="textarea-container"><textarea name="text_data" class="textarea-text textarea" maxlength="800" placeholder="Add a comment here."></textarea></div>Image upload: <input type="file" name="image" accept="image/*"><div class="form-buttons"></div></div>').insertAfter('select[name="edit-type"]');
		} else {
			$('.post-edit-form').remove();
		}
	});

	$('.edit-post-form').off().on('submit', function(e){
		e.preventDefault();
		$.ajax({url: $(this).attr('action'), type: 'POST', success:function(data){
			if ($('select[name="edit-type"]').val() == 'delete'){
				location.reload();
			} else {
				$('.mask').addClass('none');
			}
		}});
		bindEvents();
	});

	$('#post-form').find('textarea[name="text_data"]').on('input', function(){
		if ($(this).val() == ""){
			$('#post-form').find('.post-button').addClass('disabled').attr('disabled', '');
		} else {
			$('#post-form').find('.post-button').removeClass('disabled').removeAttr('disabled');
		}
	});



	$('#post-form').off().on('submit', function(e){

		e.preventDefault();
		$(this).find('.post-button').addClass('disabled').attr('disabled', '');
		var formData = new FormData(this);
		var code;

		$.ajax({url: $(this).attr('action'), type: 'POST', data: formData,

		statusCode: {
			201: function() {
				var code = 201;
			}
		},

		success:function(data) {

			if ($('#post-form').attr('action').substr(-7) == 'replies') {
				$('.reply-list').append(data);
			} else {
				$('.post-list').prepend(data);
			}

			if (code !== 201) {
				$('.no-reply-content').remove();
				$('.no-content').remove();
				$('.post').fadeIn();
				$('.feeling-button').removeClass('checked');
				$('.feeling-button-normal').addClass('checked');
				$('#post-form').each(function(){this.reset();});
			}

			$("#post-form").find('.post-button').removeClass('disabled').removeAttr('disabled');
			bindEvents();
		}, contentType: false, processData: false});

	});

	$('.setting-form').off().on('submit', function(e){
		e.preventDefault();
		$('.apply-button').addClass('disabled').prop('disabled', '');
		var formData = new FormData(this);
		$.ajax({url: $(this).attr('action'), type: 'POST', data: formData, success:function(data){
			popup('', data);

			$('.apply-button').removeClass('disabled').removeAttr('disabled', '');
		}, contentType: false, processData: false})
	});

	$('.ok-button').off().on('click', function(){
		$('.active-dialog').remove();
	});

	$('.community-top-sidebar .search').on('submit', function(e){
		if ($(this).find('input[type="text"]').val().length < 2){
			e.preventDefault();
		}
	});

	$('.headline .search').on('submit', function(e){
		if ($(this).find('input[type="text"]').val().length < 1){
			e.preventDefault();
		}
	});

	//checks if loadOnScroll is defined. So this code will only run on pages the need it
	if ((typeof loadOnScroll !== 'undefined')) {

		$(window).scroll(function() {
			//checks if you're at the bottom of the page and if you are it loads more posts
			if ($(window).scrollTop() + window.innerHeight >= $('[data-next-page-url]').height()) {
				if (loading == 0 && aTbottom == false) {
					$("[data-next-page-url]").append('<div class="post-list-loading"><img src="/assets/img/loading-image-green.gif" alt=""></div>');
					loading = 1;
					$.get($('[data-next-page-url]').attr('data-next-page-url'), function(data) {
						if(data == ''){
							aTbottom = true;
							bindEvents();
						}
						$("[data-next-page-url]").append(data);
						offset++;
						$('[data-next-page-url]').attr('data-next-page-url', $('[data-next-page-url]').attr('data-next-page-url').replace(/(offset=).*?(&)/,"offset=" + offset + "&"))
						loading = 0;
						$(".post-list-loading").remove();
						bindEvents();
					})
				}
			}
		});
	}

	$(document).on('pjax:end', function() {
		getNotifs();
		bindEvents();
		reloadYeahTooltip();
		console.log(window.tip);
	});

	$(document).pjax('a', '#main-body', replace = true);
}

$(document).ready(function() {
	window.tip = tippy('.empathy', {
		animation: 'shift-away',
		arrow: true,
		dynamicTitle: true
	});
	bindEvents();
    getNotifs();
});

function newFunction() {
	;
}
