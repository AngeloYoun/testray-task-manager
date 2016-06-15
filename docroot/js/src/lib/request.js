// export function getFormData(data) {
// 	const formData = new FormData();

// 	Object.keys(data).forEach(
// 		key => formData.append(WatsonConstants.namespace + key, data[key])
// 	);

// 	return formData;
// }

export function serializeQueryString(data) {
	const str = Object.keys(data).map(
		key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
	);

	return str.join('&');
}

export default request => {
	const {controller, controllerMethod} = request;

	const method = request.method || 'GET';

	let requestURL = `http://172.16.19.102:8080/web/guest/home/-/testray/${controller}/${controllerMethod}`;

	// const headers = new Headers(
	// 	{
	// 		Authorization: `Basic ${btoa('test@liferay.com:test')}`,
	// 		Origin: 'http://www.example-social-network.com'
	// 	}
	// );

	const requestSettings = {
		headers: {
			Origin:'test'
		},
		credentials: 'include',
		method,
		mode: 'cors'
	};

	const requestParams = request.data || {};

	if (method === 'GET') {
		requestURL += `?${serializeQueryString(requestParams)}`;
	}
	else {
		requestSettings.body = getFormData(requestParams);
	}

	return fetchURL(requestURL, requestSettings);
};

export function fetchURL(requestURL, requestSettings) {
	return fetch(requestURL, requestSettings).then(
		response => response.json()
	).then(
		json => {
			const {data, message, status} = json;

			let retVal = json;

			if (status && (message || data)) {
				retVal = json.status === 200 ? json.data || json.message : Promise.reject(json.message);
			}

			return retVal;
		},
		() => Promise.reject('Failed to parse response.')
	);
}