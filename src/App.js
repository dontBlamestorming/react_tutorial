import React, { Component } from 'react';
import './App.css';

class Article extends Component {
  render() {
    return (
      <article>
        <h2>HTML</h2>
        HTML is HyperText MarkUp Language.
      </article>
    );
  }
}

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
            <li><a href="1.html">HTML</a></li>
            <li><a href="2.css">CSS</a></li>
            <li><a href="3.Javascript">Javascript</a></li>
        </ul>
      </nav>
    );
  }
}

class Subject extends Component {
  render() {
    return (
      <header>
        <h1>WEB</h1>
        world wide web!
      </header>
    );
  }
}

class App extends Component {     // 이것이 Component를 만드는 코드다.
  render() {
    return (
      <div className="App">
        <Subject></Subject>
        <Nav></Nav>
        <Article></Article>
      </div>
    );
  }
}

export default App;

/*
1. react가 갖고 있는 Component라는 클래스를 App에 상속하여 하나의 클래스를 생성한다.
2. 자바스크립트의 class 내에 소속된 method는 function이 생략된다. 따라서 render()는 function render()와 같다. 
3. Component를 만들 때는 반드시 하나의 최상위 태그로 시작해야한다. 
4. 이 파일은 유사 javascript이다. 웹의 콘솔은 이 코드를 전혀 이해하지 못한다. react는 이 문법을 자바스크립트가 이해할 수 있는 코드로 변환한다. 
*/