import React, { Component } from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import Content from './components/Content';
import './App.css';

class App extends Component {   
  constructor(props) {    
  super(props);
    this.state = {
      mode : 'welcome',      // welcome or read 
      subject : {title : 'WEB', subTitle : "World Wide Web"},
      welcome : {title : 'Welcome', desc : 'Hello, React!!'},
      contents : [
        {id : 1, title : 'HTML', desc : 'HTML is for Information'},
        {id : 2, title : 'CSS', desc : 'CSS is for design'},
        {id : 3, title : 'Jacascript', desc : 'Javascript for Interactive'}
      ]
    }
  }

  render() {
    var _title, _desc = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    return (
      <div className="App">
        {/* <Subject
          title = {this.state.subject.title}
          subTitle = {this.state.subject.subTitle}> 
        </Subject> */}

        <header>
          <h1><a href="/" onClick={function(event) {
            event.preventDefault();
            // this.state.mode = 'welcome'
            this.setState({
              mode : 'welcome'
            });
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.subTitle}
        </header>

        <TOC data = {this.state.contents}></TOC>   
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;

/*
Component
1. react가 갖고 있는 Component라는 클래스를 App에 상속하여 하나의 클래스를 생성한다.
2. 자바스크립트의 class 내에 소속된 method는 function이 생략된다. 따라서 render()는 function render()와 같다. 
3. Component를 만들 때는 반드시 하나의 최상위 태그로 시작해야한다. 
4. 이 파일은 유사 javascript이다. 웹의 콘솔은 이 코드를 전혀 이해하지 못한다. react는 이 문법을 자바스크립트가 이해할 수 있는 코드로 변환한다. 따라서 웹의 확장프로그램을 이용해 element의 구성을 

Props(stands for properties)
1. html code를 client로 쏘기 위해 렌더링(?)함수에 매개변수로 값을 주는 것과 비슷한 맥락이다. 
2. Props는 사용자가 컴포넌트를 사용하는 입장에서 중요한 것, state는 props의 값에 따라 내부에 구현에 필요한 데이터들이라고 할 수 있다. 
3. component를 생긴대로 쓰지말고 기본적인 동작을 여러개로 바꾸고 싶을 때 사용자에게 제공하는 것이 props이다. 사용자는 알 필요가 없이 컴포넌트 내부적으로 사용되는 것을 state라고 한다. 이 두가지는 철저하게 구분되어 있어야 한다. 복합적으로 다양한 일들을 할 때 필요한 state를 살펴보자. 그 과정에서 porps를 더 잘 이해할 수 있을 것이다.
4. 기존에 props로 저장되어 있는 것이 하드코딩되어 있는 것 보다 state로 만들고 그 값을 props로 전달하게.

State
constructor(props) {    
    super(props);

  }
1. 어떤 컴포넌트가 실행될 때 render함수보다 먼저 실행되면서 그 컴포넌트를 초기화시키는 함수
2. 초기화가 끝나면 this.state = 
3. 즉, 상위 컴포넌트인 App의 상태를 하위 컴포넌트(subject, TOC, content)로 전달하고 싶을 때는 상위 컴포넌트에 state로서 만들고 하위 컴포넌트에 props값으로 전달 할 수 있다.

Key
1. <TOC data = {this.state.contents}></TOC> - 하위 컴포넌트에 상위 컴포넌트에서 생성자로서 만든 state값을 넣어주고 있다. 
2. 자동으로 list를 생성하는 기능을 넣으면 이런 에러가 난다.
Warning: Each child in a list should have a unique "key" prop.
즉, 각각의 key라고 하는 prop을 가져야 한다는 뜻. 이것은 react가 내부적으로 list를 구분짓기 위해서 요청하는 것.

정리 - state와 porps의 관계. 부모 App의 입장에서는 state라고 하는 내부정보를 사용하고 자식에게 전달할 때는 props를 통해 전달하고 있다. 즉, App입장에서는 TOC가 어떻게 동작하는지 알 필요가 없다. 그냥 data라고 하는 props로는 어떤 형태의 데이터를 전달하면 되는가?, 사용자의 입장에서 알아야 할 것만 알면 된다.  

event, state, props and function render
목표 = 각각의 링크를 클릭 -> App 컴포넌트의 state가 바뀜 -> 해당 값이 Content의 props값으로 전달 -> 동적인 어플리케이션
react에서 props나 state의 값이 바뀌면 state를 갖고 있는 컴포넌트의 render함수가 다시 호출된다. 그 하위에 있는 컴포넌트들의 render도 다시 호출된다. 어떤 html을 render할지 결정하는 것이 render()이기 때문이다. 즉, props나 state가 바뀌면 화면이 다시 그려진다. 당연히 순서는 상위 컴포넌트 -> 하위이다.

자, 그렇다면 javascript를 이용하여 'Click'이라는 이벤트가 발생했을 때, state값의 mode가 바뀌면 될 것 같다. 

onClick - a태그는 click했을 때, href로 set 해놓은 곳으로 이동하는 기능이 내재되어 있다. 그렇게 되면 react는 다시한번 re-rending이 된다. 이 기능을 막으려면 이어서 실행되는 함수의 첫번 째 매개변수로 들어오는 객체에 preventDefault()를 실행시켜서 기능을 막아준다. 즉, 페이지 전환이 일어나지 않는다.

이전에 state와 이벤트를 연결시켜보자. WEB이라는 a태그를 클릭했을 때, state의 mode값을 바꾸려고 한다. 

render() 함수 안에서의 다른 함수는 this의 scope가 render() 함수의 this와 같지 않다. 함수 안에서의 this는 가리키는 곳이 없다. 따라서 그렇게 사용하려면 'cannot read property 'state' of undefined가 발생한다. render() 함수의 this를 사용하려면 다른 함수의 끝에 .bind(this)를 명시하여 상위 함수의 this값을 binding시켜야 한다. 
하지만 이것만으론 부족하다. 위에 처럼 바꾸면 react는 state값이 바뀌었다는 것을 모른다. 따라서 state 값을 이 함수 안에서 재정의 해주어야 한다. 
*/