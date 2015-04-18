Module['preRun'] = function () {
	files.forEach(function(file) {
		var parts = file.path.split('/');

		// create the folder if needed
		if (parts.length > 1) {
			FS.createPath('/', parts.slice(0, -1).join('/'), true, true);
		}

		FS.createDataFile('/', file.path, Module['intArrayFromString'](file.data), true, true);
	});
};

Module['stdout'] = function (code) {
	output.stdout += String.fromCharCode(code);
};

Module['stderr'] = function (code) {
	output.stderr += String.fromCharCode(code);
};
