$(function () {
	$('#article-index .card-head').on('click', function(event) {
		// Prevents following the link: we'll load the document with pjax
		event.preventDefault()

		// Get link and URL
    var link = $(this)
		var data = link.data().index

		// This is the card holder in the index
		var holder = $(link.parents('.card-holder').get(0))

		// Set the CSS variables that track the position of the card
		// in the list
		function adjustRestOffset() {
			var offset = holder.offset()
			$('html').css({
				'--offsetTop': '' + offset.top + 'px',
				'--offsetLeft': '' + offset.left + 'px',
				'--width': '' + holder.width() + 'px',
			})
		}
		adjustRestOffset()

		// Create a close button
		var close = $('<button></button>')
			.addClass('close')

		// Create a new card head that is not a link but a header
		var head = $('<header></header>')
			.addClass('card-head')
			.addClass('card-cover-' + data)
			.append(close)
			.append(link.children().clone())

		// Container for the article's body
		var article = $('<div></div>')
			.addClass('card-article')
			.addClass('loading')

		// Overlay
		var overlay = $('<div></div>')
			.addClass('page')
			.addClass('article-overlay')
			.addClass('positioned')
			.append($('<article></article>')
				.addClass('card')
				.append(head)
				.append(article))

		// Add the overlay to the DOM and animate it from the position
		// in the index to covering the main container.
		//
		// Because we use a spring-like bezier curve we need to make the
		// original card holder invisible
		$('#main-container').append(overlay)
		holder.css({visibility: 'hidden'})
		setTimeout(function () {
			overlay.removeClass('positioned')
		}, 0)

		// When the close button is tapped, update the CSS variable (we may
		// have rotated the device or resized the window in-between), animate
		// the overlay back to the position of the card in the list, restore
		// the opacity of the original card and delete the overlay.
		close.on('click', function () {
			adjustRestOffset()
			overlay.addClass('positioned')
			setTimeout(function () {
				holder.css({visibility: 'visible'})
				overlay.remove()
			}, 600)
		})

		// Simulate loading the article
		setTimeout(function() {
			article
				.removeClass('loading')
				.append('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>')
				.append('<p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. </p>')
				.append('<p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus.</p>')
				.append('<p>Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. </p>')
				.append('<p>Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. </p>')
		}, 500)
	})
})
