// App.js는 전체 라우터 역할

/*
// 리엑트 프로젝트 생성 시 기본적으로 생성되는 코드
import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}
*/
// ====================================================================================================

/* 
  // 이 코드는 리액트 앱에서 백엔드 서버와 통신하여 데이터를 받아오기 위한 테스트 코드입니다.
  // 필요 시 참고

  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import './App.css';
  
  function App() {
	
	// 백단 서버에서 받은 메시지를 저장
	const [message, setMessage] = useState('');

	// 컴포넌트가 처음 렌더링될 때 한 번만 실행되는 부분
	useEffect(() => {
		// 백엔드 API를 호출합니다.
		// proxy 설정 덕분에 전체 주소 대신 /api/hello만 적어도 됩니다.
		axios.get('/api/hello')
			.then(response => {
				setMessage(response.data.message); // 성공 시 받은 데이터를 message state에 저장
			})
			.catch(error => {
				console.error("API 호출 중 에러 발생:", error);
				setMessage("서버와 통신 중 에러가 발생했습니다.");
			});
	}, []); // []는 이 useEffect가 처음 한 번만 실행되도록 보장합니다.
	
	return (
		<div className="App">
			<header className="App-header">
				<h1>React Frontend</h1>
				<h2>서버로부터 받은 메시지:</h2>
				<p>{message}</p>
			</header>
		</div>
	);
	
}

*/


// ====================================================================================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import WebtoonDetailPage from './pages/WebtoonDetailPage'; // 웹툰 상세 페이지
import EpisodeViewerPage from './pages/EpisodeViewerPage'; // 에피소드 뷰어 페이지
import Footer from './components/common/Footer';
import './App.css'; // 레이아웃 조정을 위해)

function App() {
	return (
		<Router>
			<div className="app-container">

			{/* 
				import Header from './components/common/Header';

				<Header /> 컴포넌트는 src/components/common/Header.js 파일에 정의되어 있습니다.
				이 컴포넌트는 사이트의 상단에 고정된 헤더 역할을 합니다.
				헤더에는 로고, 내비게이션 링크, 검색창 등이 포함되어 있습니다.
			*/}
			
				<Header />

				{/* 메인 콘텐츠 영역 */}
				<main className="main-content">
					<Routes>
						{/* URL 주소가 /이면, HomePage.js 상세 설명서에 따라 조립 */}
						<Route path="/" element={<HomePage />} />

						{/* <Route path="/webtoon/:id" element={<WebtoonDetailPage />} /> */}
						{/* 다른 페이지 라우트들을 여기에 추가 */}
            			
						{/* 웹툰 상세 페이지 */}
						<Route path="/webtoon/:webtoonId" element={<WebtoonDetailPage />} />

						{/* 에피소드 뷰어 페이지 */}
						<Route path="/webtoon/:webtoonId/episode/:episodeId" element={<EpisodeViewerPage />} />

					</Routes>
				</main>

				<Footer />

			</div>
		</Router>
	);
}


// ====================================================================================================
export default App; // 이 줄은 App 컴포넌트를 다른 파일에서 사용할 수 있도록 내보내는 역할을 합니다.