function server() {
  return process.env.REACT_APP_API_URL ?? 'https://crm-api.ccachaar.tn/api'
}

export const ApiConfigs = {
  base_url: server() + '/',
  root_url: server(),
  /* -------------------------------- */

  checkclient: {
    getAll: 'check-client/',
    filter: 'check-client/client_checks/filter',
  },
  check: {
    checkDueDateExists: 'check/check-due-date-exists',
    update: 'check/{check}/update',
  },
  setting: {
    index: 'setting/',
    store: 'setting/',
  },
  statistics: {
    totalImpressions: 'statistique/',
    filterByDate: 'statistique/filter-by-date',

  },
  client: {
    add: 'client/',
    add: 'client/',
    update:'client/{client}/update'
  },
  payment : {
    getPaymentWithChecks: 'payment/payments/withChecks', 
    viewChecks: 'payment/{payment}/view-checks',
    filterPayments: 'payment/payments/filter/filter_data',
    destroyPayment: 'payment/payment/{payment}',
    updateNumFac : 'payment/paiement/{id}/update-numero-de-facture'
  },
  imprimante: {
    index: 'imprimante/',
    store: 'imprimante/',
    getById: 'imprimante/{id}', 
  },
}
