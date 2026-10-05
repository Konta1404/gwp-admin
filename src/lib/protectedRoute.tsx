import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken } from "./auth";

export const withAuth = (WrappedComponent: React.FC) => {
    return function AuthenticatedComponent(props: Record<string, never>) {
        const [loading, setLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const token = getToken();

            if (!token) {
                router.replace("/login");
            } else {
                setLoading(false);
            }
        }, [router]);

        if (loading) return <p>Loading...</p>;
        return <WrappedComponent {...props} />;
    };
};
