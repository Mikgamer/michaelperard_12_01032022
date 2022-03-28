/**
 * Get user default data
 * 
 * @return {Object} Return the user default data from the backend REST API
 */
export const getDataUser = (id) => fetch(process.env.REACT_APP_BACKEND + "user/" + id)
                                   .then(response => response.json()).then(data => data.data)

/**
 * Get user activity
 * 
 * @return {Object[]} Return the user activity from the backend REST API
 */
export const getDataActi = (id) => fetch(process.env.REACT_APP_BACKEND + "user/" + id + "/activity")
                                   .then(response => response.json()).then(data => data.data.sessions)
                                   
/**
 * Get user average sessions
 * 
 * @return {Object[]} Return the user average sessions from the backend REST API
 */
export const getDataSess = (id) => fetch(process.env.REACT_APP_BACKEND + "user/" + id + "/average-sessions")
                                   .then(response => response.json()).then(data => data.data.sessions)

/**
 * Get user performance
 * 
 * @return {Object[]} Return the user performance from the backend REST API
 */
export const getDataPerf = (id) => fetch(process.env.REACT_APP_BACKEND + "user/" + id + "/performance")
                                   .then(response => response.json()).then(data => data.data.data)