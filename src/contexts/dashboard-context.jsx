import { createContext, useContext, useEffect, useState } from "react"
import dashboardApi from "../apis/dashboard"

const DashboardContext = createContext()

export default function DashboardContextProvider({ children }) {
    const [dashboardData, setDashboardData] = useState(null)
    const [isDashboardDataLoading, setIsDashboardDataLoading] = useState(true)

    const fetchData = async () => {
        try {
            const dataRes = await dashboardApi.getDashboardData()
            setDashboardData(dataRes.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsDashboardDataLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <DashboardContext.Provider value={{
            dashboardData,
            isDashboardDataLoading
        }}>
            {children}
        </DashboardContext.Provider>
    )
}

export function useDashboard() {
    return useContext(DashboardContext)
}


