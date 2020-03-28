import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(      // App.js을 읽어서 App이라는 Class를 실행하고 있다. 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*
이 지점에서 이 코드가 내부적으로 state값으로 subject가 있는지 없는지 알 수 없다.
외부에서 알 필요가 없는 정보를 철처히 은닉하는 것이 좋은 사용성을 만드는 것에 핵심이다.
*/
