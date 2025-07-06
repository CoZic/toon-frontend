// src/pages/MyProfilePage.js
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './MyProfilePage.css';

function MyProfilePage() {
    const { user, loading } = useContext(UserContext);

    if (loading) return <div className="profile-loading">로딩 중...</div>;
    if (!user) return <div className="profile-error">로그인이 필요합니다.</div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                {user.profileImageUrl && (
                    <div className="profile-image-wrapper">
                        <img src={user.profileImageUrl} alt="프로필 이미지" className="profile-image" />
                    </div>
                )}
                <h2>{user.username} 님의 프로필</h2>
                <div className="profile-item">
                    <span className="label">이메일</span>
                    <span className="value">{user.email}</span>
                </div>
                <div className="profile-item">
                    <span className="label">로그인 방식</span>
                    <span className="value">{user.providerId || '일반'}</span>
                </div>
                <div className="profile-item">
                    <span className="label">계정 상태</span>
                    <span className="value">{user.status}</span>
                </div>
            </div>
        </div>
    );
}

export default MyProfilePage;
