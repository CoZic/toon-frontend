/* 리엑트 프로젝트 생성 시 기본적으로 생성되는 코드

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

export default App;
*/

// 이 코드는 리액트 앱에서 백엔드 서버와 통신하여 데이터를 받아오기 위한 코드입니다.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // 서버에서 받은 메시지를 저장할 state
  const [message, setMessage] = useState('');

  // 컴포넌트가 처음 렌더링될 때 한 번만 실행되는 부분
  useEffect(() => {
    // 백엔드 API를 호출합니다.
    // proxy 설정 덕분에 전체 주소 대신 /api/hello만 적어도 됩니다.
    axios.get('/api/hello')
      .then(response => {
        setMessage(response.data); // 성공 시 받은 데이터를 message state에 저장
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

export default App;
