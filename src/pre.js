// https://kripken.github.io/emscripten-site/docs/api_reference/module.html

var Module = {
	arguments: args || [],
	preRun: function () {
		files.forEach(function(file) {
			// create the folder if needed
			var parts = file.path.split('/');

			if (parts.length > 1) {
				FS.createPath('/', parts.slice(0, -1).join('/'), true, true);
			}

			// create the file
			FS.createDataFile('/', file.path, Module['intArrayFromString'](file.data), true, true);
		});
	},
	stdout: function (code) {
		stdout += String.fromCharCode(code);
	},
	stderr: function (code) {
		stderr += String.fromCharCode(code);
	}
};
