function server() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8020/api'
}

export const ApiConfigs = {
  base_url: server() + '/check-client',
  root_url: server(),
  /* -------------------------------- */

  checkclient: {
    getAll: '/',   
    filter: '/client_checks/filter',                 
    // search: '/recompense/search/keyword',
  },
 
}
