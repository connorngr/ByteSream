"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fetchUser } from "@/app/api/authApi";
import { User } from "@/types";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const loadUser = async (token: string) => {
        try {
            const data = await fetchUser(token);
            setUser(data.user);
        } catch (error) {
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!loading && pathname?.startsWith('/admin')) {
            if (!user || user.role !== 'ADMIN') {
                router.push('/');
            }
        }
    }, [pathname, user, loading]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            loadUser(token);
        } else {
            setLoading(false);
        }
    }, []);
    const login = async (token: string) => {
        localStorage.setItem("token", token);
        await loadUser(token);
        router.push("/");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/auth/login");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
