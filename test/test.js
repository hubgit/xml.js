var xmlPath = 'test.xml';
var dtdPath = 'JATS-journalpublishing1.dtd';
var filesRoot = 'http://git.macropus.org/jats-dtd/publishing/1.0/';

var statusNode = document.querySelector('#status');

var fetchFile = function(file, root) {
	return fetch(root + file).then(function(response) {
		return response.text().then(function(data) {
			return {
				path: file,
				data: data
			}
		});
	});
};

statusNode.textContent = 'Fetching DTD files…';

var fetchIndex = fetchFile('index.txt', filesRoot).then(function(file) {
	return file.data.trim().split('\n').filter(function(line) {
		return line;
	});
});

var fetchFiles = fetchIndex.then(function(files) {
	// fetch the DTD files
	var requests = files.map(function(file) {
		return fetchFile(file, filesRoot);
	});

	// fetch the XML file
	requests.push(fetchFile(xmlPath, './'));

	return Promise.all(requests);
});

fetchFiles.then(function(files) {
	statusNode.textContent = 'Validating XML…';

	var args = ['--noent', '--dtdvalid', dtdPath, xmlPath];

	var output = xmllint(args, files);

	if (output.stderr) {
		statusNode.textContent = 'Validation errors:';
		document.getElementById('lint').textContent = output.stderr;
	} else {
		statusNode.textContent = 'Valid!';
		document.getElementById('xml').textContent = output.stdout;
	}
});
