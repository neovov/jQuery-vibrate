# jQuery Vibrate #

## What the heck? ##
This jQuery plugin is based on Andreas Lagerkvist's jQuery plugin (http://andreaslagerkvist.com/jquery/vibrate/). I was unsatisfied by Andreas' one so I decided to fork it (but his is on Google Code). With this fancy plugin you can make any DOM element vibrate.

The main difference between mine and Andreas' one is that it will vibrate only for a given ammount of time. For instance, I used it to give a feedback to the user when drag&droping a (wrong) file.

## How to use (aka Documentation) ##
Hang on, there is a lot of code:

	$(element).vibrate();

And that's it!
Well, maybe you want to tune:

	$(element).vibrate({
		speed: 30, // The time in ms between each rotation
		duration: 400, // The whole "animation" duration, you can use "fast" and "slow"
		spread: 3 // The spread of the animation, beware of huge values (parkinson's style)
	});

See the example file to enjoy the flavor.

## Now what? ##
That's it! Love it! "Issue it"! Fork it!