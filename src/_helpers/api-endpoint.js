function server() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8020/api'
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
 
}