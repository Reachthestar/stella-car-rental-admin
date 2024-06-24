const ADMIN_TOKEN = 'ADMIN_TOKEN'

export const setAdminToken = (token) => localStorage.setItem(ADMIN_TOKEN,token)
export const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN)
export const removeAdminToken = () => localStorage.removeItem(ADMIN_TOKEN)