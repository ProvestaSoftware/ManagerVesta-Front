function server() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8020/api'
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
    update:'client/{client}/update'
  },
 
 
}
