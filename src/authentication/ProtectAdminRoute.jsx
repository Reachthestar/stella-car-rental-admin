import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/auth-context"

export default function ProtectAdminRoute({ children }) {
    const { admin, isAdminLoading } = useAuth()
    if (!admin && !isAdminLoading) {
        return <Navigate to="/login" />
    }
    return (
        <>
            {children}
        </>
    )
}
