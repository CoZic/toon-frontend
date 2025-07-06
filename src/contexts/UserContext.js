// src/contexts/UserContext.js
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        setLoading(false);
        return;
    }

    axios.get('http://localhost:8080/api/user-info', {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
        console.log("✅ 사용자 정보 불러오기 성공:", res.data)
        setUser(res.data);
    })
    .catch(err => {
        console.error("❌ 사용자 정보 불러오기 실패:", err);
        localStorage.removeItem("token");
        alert('❌ 사용자 정보 가져오기 실패:\n' + (err.response?.data || err.message));
    })
    .finally(() => setLoading(false));
}, []);


    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}
