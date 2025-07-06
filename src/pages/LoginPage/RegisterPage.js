import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMsg('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/register', {
                username,
                email,
                password
            });

            setSuccessMsg(response.data); // ex: "회원가입이 성공적으로 완료되었습니다."
            setErrorMsg('');

            // 성공 시 1초 후 로그인 페이지로 이동
            setTimeout(() => navigate('/login'), 1000);

        } catch (error) {
            console.error('회원가입 실패:', error.response?.data || error.message);
            setErrorMsg(error.response?.data || '회원가입 중 오류가 발생했습니다.');
            setSuccessMsg('');
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <h2>회원가입</h2>

                <label>닉네임</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

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

                <label>비밀번호 확인</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                {errorMsg && <p className="error-message">{errorMsg}</p>}
                {successMsg && <p className="success-message">{successMsg}</p>}

                <button type="submit">회원가입</button>

                <div className="register-footer">
                    <span>이미 계정이 있으신가요?</span>
                    <Link to="/login">로그인</Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
