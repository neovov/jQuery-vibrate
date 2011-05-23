/*global JSLINT */
/*jslint white: true, rhino: true */
/**
 * @fileOverview Provides a JSLint console for Rhino.
 * <p>Usage: <code>java -jar lib/js.jar lib/jslint-console.js lib/fulljslint.js src/testFile1.js src/testFile2.js</code></p>
 * @author Mehdi Kabab <http://pioupioum.fr/>
 * @version 0.1.1 (2010-06-24)
 */
/**
 * @license Copyright (c) 2010 Mehdi Kabab <http://pioupioum.fr/>.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

var options = {
	passfail: false, // Stop on first error
	white:    false, // Strict white space
	browser:  true, // Assume a browser
	devel:    true, // Assume console, alert, …
	widget:   false, // Assume a Yahoo Widget (http://widgets.yahoo.com/tools/)
	windows:  true, // Assume Windows
	rhino:    true, // Assume Rhino (http://www.mozilla.org/rhino/)
	safe:     false, // Safe Subset
	adsafe:   false, // ADsafe (http://www.adsafe.org/)

	debug:    false, // Tolerate debugger statements
	evil:     false, // Tolerate eval
	laxbreak: false, // Tolerate sloppy line breaking
	forin:    true, // Tolerate unfiltered for in
	sub:      false, // Tolerate inefficient subscripting
	css:      false, // Tolerate CSS workarounds
	cap:      false, // Tolerate HTML case
	on:       false, // Tolerate HTML event handlers
	fragment: false, // Tolerate HTML fragments
	es5:      false, // Tolerate ES5 syntax

	onevar:   true, // Allow one var statement per function
	undef:    true, // Disallow undefined variables
	nomen:    false, // Disallow dangling _ in identifiers
	eqeqeq:   true, // Disallow == and !=
	plusplus: false, // Disallow ++ and --
	bitwise:  false, // Disallow bitwise operators
	regexp:   true, // Disallow insecure . and [^...] in /RegExp/
	newcap:   true, // Require Initial Caps for constructors
	immed:    true, // Require parens around immediate invocations
	strict:   false, // Require "use strict";

	indent: 4, // The number of spaces used for indentation
	maxerr: 50, // The maximum number of warnings reported
	maxlen: 0, // The maximum number of characters in a line
	predef: ["window", "jQuery"] // An array of strings, the names of predefined global variables.
};

// Loads the JSLint script given as first argument.
load(arguments.splice(0, 1));

(function (scripts) {
	var
		i = 0, // loop counter
		nbScripts = scripts.length; // number of scripts to validate

	/**
	 * Check quality code of the given script.
	 * @private
	 * @param {String} jsfile File to check.
	 * @requires JSLINT
	 * @requires String#repeat()
	 */
	function lint(file) {
		var
			i = 0, // loop counter
			input, // current processed file
			error, // current error
			nbErrors = 0, // number of errors found
			nbTotal = 0; // number of total errors found

		// Opening file
		print("Running JSLint on: " + file);
		input = readFile(file);

		// File not found
		if (!input) {
			print("\t✘ Couldn’t open the file.");
			quit(1);
		}

		// Running tests
		if (!JSLINT(input, options)) {
			// Looping through founded errors
			for (nbErrors = JSLINT.errors.length; i < nbErrors; ++i) {
				error = JSLINT.errors[i];
				if (error) {
					if (error.reason.substr(-11) === "% scanned).") {
						break;
					}

					// Printinr the error
					print("\n✘ " + error.reason);

					// Printing evidence if exists
					if (error.evidence !== "") {
						// Triming evidence
						print("\t" + error.evidence.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, ""));
					}

					// Printing line and character number
					print("\tline " + error.line + ", character " + error.character);

					// Increasing the number of error found
					nbTotal++;
				} // end of if
			} // end of for

			// Printing the number of errors found
			print("\n" + nbTotal + " " + ((nbTotal === 1) ? "error" : "errors") + " found.\n");

			// Exiting on errors
			quit(2);
		} else {
			print("\t✔ Validation passed!\n");
		}

	} // end of lint

	// No JSLint provided
	if (!scripts[0]) {
		print("Usage: jslint-console.js jslint file1.js[ file2.js]");
		quit(1);
	}

	// Launch the validation on the scripts
	for (; i < nbScripts; i++) {
		lint(scripts[i]);
	}
}(arguments));
