/**
	@author <a href="mailto:me@neovov.com">Nicolas Le Gall</a>
	Based on Andreas Lagerkvist's jQuery Vibrate
	@see http://andreaslagerkvist.com/jquery/vibrate/
*/
(function( $ ) {
	$.fn.vibrate = function( conf ) {
		var config = $.extend({
			speed:    30,
			duration: $.fx.speeds._default,
			spread:   3
		}, conf);

		// Correct the jQuery's speed keywords
		if (typeof config.duration === "string") {
			config.duration = $.fx.speeds[config.duration] || $.fx.speeds._default;
		}

		return this.each(function() {
			var
				$elem = $(this), // The current element, extend with jQuery
				start = $.now(), // When did we started the animation?
				end   = start + config.duration; // When does the animating have to stop?

			(function vibrate() {
				var
					top    = Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2),
					left   = Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2),
					rotate = Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2);

				// "Animate"
				$elem.css({
					position: "relative",
					top:  top + "px",
					left: left + "px",
					WebkitTransform: "rotate(" + rotate + "deg)",
					MozTransform:    "rotate(" + rotate + "deg)",
					MsTransform:     "rotate(" + rotate + "deg)",
					OTransform:      "rotate(" + rotate + "deg)"
				});

				// Does the animation done?
				if ($.now() < end) {
					// … No, relaunch another vibration
					window.setTimeout(vibrate, config.speed);
				} else {
					// … Yes, remove useless inline-styles
					$elem.css({
						position: "",
						top:  "",
						left: "",
						WebkitTransform: "",
						MozTransform:    "",
						MsTransform:     "",
						OTransform:      ""
					});
				}
			}()); // end of function vibrate
		}); // end of return this.each
	}; // end of $.fn.vibrate
}( jQuery ));