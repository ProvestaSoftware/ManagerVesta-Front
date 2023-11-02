import { authHeader, ApiConfigs } from '../_helpers'

export const payment = {
  getPaymentWithChecks,
  viewChecks,
  filterPayments, 
  destroyPayment, 

}

async function getPaymentWithChecks() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  const getUrl = `${ApiConfigs.base_url}${ApiConfigs.payment.getPaymentWithChecks}`;

  return await fetch(getUrl, requestOptions).then(handleResponse);
}
async function viewChecks(paymentId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  const getUrl = `${ApiConfigs.base_url}${ApiConfigs.payment.viewChecks.replace('{payment}', paymentId)}`;

  return await fetch(getUrl, requestOptions).then(handleResponse);
}
async function filterPayments(Filters) {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Filters),
  };
  const postUrl = `${ApiConfigs.base_url}${ApiConfigs.payment.filterPayments}`;

  return await fetch(postUrl, requestOptions).then(handleResponse);
}
async function destroyPayment(paymentId) {
  const requestOptions = {
      method: 'GET',
      headers: authHeader(),
  };
  const deleteUrl = `${ApiConfigs.base_url}${ApiConfigs.payment.destroyPayment.replace('{payment}', paymentId)}`;
  return await fetch(deleteUrl, requestOptions).then(handleResponse);
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
