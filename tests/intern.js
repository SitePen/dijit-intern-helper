define({
	capabilities: {
		'selenium-version': '2.48.2',
		'idle-timeout': 30
	},

	environments: [
		{ browserName: 'internet explorer', version: '11', platform: 'WIN8' },
		{ browserName: 'internet explorer', version: '10', platform: 'WIN8' },
		{ browserName: 'internet explorer', version: '9', platform: 'WINDOWS' },
		{ browserName: 'firefox', version: '33', platform: [ 'WINDOWS', 'MAC' ] },
		{ browserName: 'chrome', version: '38', platform: [ 'WINDOWS', 'MAC' ] },
		{ browserName: 'safari', version: '8', platform: 'MAC' }
	],

	maxConcurrency: 2,
	tunnel: 'BrowserStackTunnel',

	reporters: [ 'combined' ],

	loader: {
		packages: [
			{ name: 'leadfoot', location: '.' },
			{ name: 'dojo', location: './node_modules/dojo' },
			{ name: 'dijit', location: './node_modules/dijit' }
		]
	},

	suites: [
	],

	functionalSuites: [
		'dijit-intern-helper/tests/functional/helpers/dijit'
	],

	excludeInstrumentation: /^(?:tests|node_modules)\//
});
