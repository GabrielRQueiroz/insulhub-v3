export const urlFormatter = (url) => {
	switch (true) {
		case url.includes('https://', 0) && url.includes('/', url.length - 1):
			return url;
		case url.includes('http://', 0) && url.includes('/', url.length - 1):
			url = url.replace('http://', 'https://');
			return url;
		case url.includes('https://', 0):
			return url + '/';
		case url.includes('http://', 0):
			url = url.replace('http://', 'https://');
			return url + '/';
		case url.includes('/', url.length - 1):
			return 'https://' + url;
		default:
			return 'https://' + url + '/';
	}
};

// export const urlFormatter = (url) => {
// 	if (url.includes('https://', 0) && url.includes('/', url.length - 1)) {
// 		return url;
// 	} else if (url.includes('http://', 0) && url.includes('/', url.length - 1)) {
// 		url = url.replace('http://', 'https://');
// 		return url;
// 	} else if (url.includes('https://', 0)) {
// 		return url + '/';
// 	} else if (url.includes('http://', 0)) {
// 		url = url.replace('http://', 'https://');
// 		return url + '/';
// 	} else if (url.includes('/', url.length - 1)) {
// 		return 'https://' + url;
// 	} else {
// 		return 'https://' + url + '/';
// 	}
// };
