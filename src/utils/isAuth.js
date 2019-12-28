const myTooken='hkzf_token'
export const TOKEN=()=>window.localStorage.getItem(myTooken)
export const removeToken=()=>window.localStorage.removeItem(myTooken)
export const isAuth=()=>!!TOKEN()