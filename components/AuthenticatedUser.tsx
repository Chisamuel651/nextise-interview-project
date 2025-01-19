import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const AuthenticatedUser = (WrappedComponent: React.ComponentType<any>) => {
    const ProtectedComponent = (props: any) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if(!token){
                router.push('/login');
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    }

    return ProtectedComponent;
}

export default AuthenticatedUser
