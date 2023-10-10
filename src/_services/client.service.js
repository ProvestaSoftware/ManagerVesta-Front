import { authHeader, ApiConfigs } from '../_helpers'

export const Client = {
  add,
  updateClient
}

async function add(clientData) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(clientData),
  };

  return await fetch(
    `${ApiConfigs.base_url}${ApiConfigs.client.add}`,
    requestOptions
  ).then(handleResponse);
}
async function updateClient(clientId, clientData) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(clientData),
  };
  const updateUrl = `${ApiConfigs.base_url}${ApiConfigs.client.update.replace('{client}', clientId)}`;

  return await fetch(updateUrl, requestOptions)
    .then(handleResponse);
}

async function handleResponse(response) {
  return response.text().then(text => {
    text = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = '/login'
      }
      if (response.status === 404) {
        return null
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
