import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
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
            console.log('로그인 성공, 토큰:', token);

            // 토큰 저장 (원한다면 localStorage 대신 cookie 등으로도 가능)
            localStorage.setItem('token', token);

            // 홈으로 이동
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
                    <a href="/register">회원가입</a>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
