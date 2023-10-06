function server() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://crm-api.ccachaar.tn/api'
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
  },
  setting: {
    index: 'setting/',
    store: 'setting/',
  },
  statistics: {
    totalImpressions: 'statistique/',
  },
 
 
}
