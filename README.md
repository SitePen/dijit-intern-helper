# dijit-intern-helper
A simple Intern helper utility for writing functional tests with Dijit

## Example usage

```js
define([
	'intern!object', 'intern/chai!assert', 'require',
	'intern/dojo/node!dijit-intern-helper/helpers/dijit',
	'intern/dojo/node!leadfoot/helpers/pollUntil'
], function (registerSuite, assert, require, dijit, pollUntil) {
	registerSuite({
		name: 'Dijit Functional Test',

		'functional test': function () {
			var sliderSize;
			var url = require.toUrl('../../example.html');

			return this.remote.get(url)
				.setFindTimeout(10000)
				.setPageLoadTimeout(8000)
				.setExecuteAsyncTimeout(10000)
				.then(pollUntil('return window.ready', 5000))
				// Obtain widget DOM node via the dijit registry
				.then(dijit.nodeById('titlePane', 'titleBarNode'))
				// Explicitly set the Command chain's context to the node
				.click()

				// wait for title pane to expand, default duration is 200ms
				.sleep(500)

				.then(dijit.nodeById('yesButton', 'focusNode'))
				.click()
				.then(dijit.nodeById('horizontalSlider', 'domNode'))
				.getSize()
				.then(function (size) {
					sliderSize = size;
				})
				.then(dijit.nodeById('horizontalSlider', 'sliderHandle'))
				.then(function (node) {
					// Drag slider all the way to the right
					return this.parent
						.moveMouseTo(node)
						.pressMouseButton()
						.moveMouseTo(sliderSize.width, 0)
						.releaseMouseButton();
				})
				// get the form value to compare it with the expected value
				.then(dijit.getProperty('testForm', 'value'))
				.then(function (formValue) {
					assert.deepEqual(formValue, {
						horizontalSlider: 10,
						answer: 'yes'
					});
				});
		}
	});
});
```

Each of the `dijit.nodeById` or `dijit.getProperty` calls saves several lines of
boilerplate that would be needed otherwise.

The example above assumes an HTML file like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Dijit Test Example</title>
	<link rel="stylesheet"
		href="dijit/themes/claro/claro.css">
</head>
<body class="claro">
	<!-- HTML body -->
	<div id="titlePane"
		data-dojo-type="dijit/TitlePane"
		data-dojo-props="title: 'Form', open: false">

		<div id="testForm" data-dojo-type="dijit/form/Form">
			<div id="horizontalSlider"
				name="horizontalSlider"
				data-dojo-type="dijit/form/HorizontalSlider"
				data-dojo-props="value:0, minimum: 0, maximum: 10"
				style="width: 400px; padding: 1em;">
			</div>

			<input id="yesButton"
				name="answer" type="radio" value="yes"
				data-dojo-type="dijit/form/RadioButton"
				><label>Yes</label>
			<input id="noButton"
				name="answer" type="radio" value="no"
				data-dojo-type="dijit/form/RadioButton"
				><label>No</label>
		</div>
	</div>

	<script src="dojo/dojo.js" data-dojo-config="async: 1">
	</script>
	<script>
		var ready;
		require([
			'dojo/parser',
			'dijit/form/Form',
			'dijit/form/RadioButton',
			'dijit/form/HorizontalSlider',
			'dijit/TitlePane',
			'dojo/domReady!'
		], function (parser) {
			parser.parse(document.body).then(function () {
				ready = true;
			});
		});
	</script>
</body>
</html>
```
