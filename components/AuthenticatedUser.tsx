import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const AuthenticatedUser = (Home: () => React.JSX.Element) => {
    const ProtectedComponent = (props: any) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if(!token){
                router.push('/login');
            }
        }, [router])
    }

    return ProtectedComponent;
}

export default AuthenticatedUser
