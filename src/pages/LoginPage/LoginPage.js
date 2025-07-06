// src/pages/LoginPage/LoginPage.js
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import { UserContext } from '../../contexts/UserContext'; // ✅ context import

function LoginPage() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext); // ✅ context 사용
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                email,
                password,
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            // ✅ 토큰으로 사용자 정보 요청
            const userInfoRes = await axios.get('http://localhost:8080/api/user-info', {
                headers: { Authorization: `Bearer ${token}` },
            });

            // ✅ context에 사용자 정보 저장
            setUser(userInfoRes.data);

            // ✅ 홈 또는 마이페이지로 이동
            navigate('/');
        } catch (error) {
            console.error('로그인 실패:', error.response?.data || error.message);
            setErrorMsg(error.response?.data || '로그인에 실패했습니다.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>로그인</h2>

                <label>이메일</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>비밀번호</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {errorMsg && <p className="error-message">{errorMsg}</p>}

                <button type="submit">로그인</button>

                <div className="login-footer">
                    <span>계정이 없으신가요?</span>
                    <Link to="/register">회원가입</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
