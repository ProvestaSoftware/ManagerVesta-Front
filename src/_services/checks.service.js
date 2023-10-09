import { authHeader, ApiConfigs } from '../_helpers'

export const Checks = {
  checkDueDateExists,
  updateCheck
}

async function checkDueDateExists(dueDate) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ dueDate }),
  };

  return await fetch(
    `${ApiConfigs.base_url}${ApiConfigs.check.checkDueDateExists}`,
    requestOptions
  ).then(handleResponse);
}
async function updateCheck(checkId, updatedData) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  };
  const updateUrl = `${ApiConfigs.base_url}${ApiConfigs.check.update.replace('{check}', checkId)}`;

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
