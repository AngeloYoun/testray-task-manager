export function getFormData(data) {
	const formData = new FormData();

	Object.keys(data).forEach(
		key => formData.append(WatsonConstants.namespace + key, data[key])
	);

	return formData;
}

export function serializeQueryString(data) {
	const str = Object.keys(data).map(
		key => `${WatsonConstants.namespace}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
	);

	return str.join('&');
}

export default request => {
	const {controller, controllerMethod} = request;

	const method = request.method || 'POST';

	let requestURL = `${WatsonConstants.urls.baseURL}/${controller}/${controllerMethod}`;

	const requestSettings = {
		credentials: 'same-origin',
		method
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