
export const getDataUser = (id) => fetch(process.env.REACT_APP_BACKEND + "user/" + id)
                                   .then(response => response.json()).then(data => data.data)
    
export const getDataActi = (id) => fetch(process.env.REACT_APP_BACKEND + "user/" + id + "/activity")
                                   .then(response => response.json()).then(data => data.data.sessions)
  
export const getDataSess = (id) => fetch(process.env.REACT_APP_BACKEND + "user/" + id + "/average-sessions")
                                   .then(response => response.json()).then(data => data.data.sessions)
  
export const getDataPerf = (id) => fetch(process.env.REACT_APP_BACKEND + "user/" + id + "/performance")
                                   .then(response => response.json()).then(data => data.data.data)