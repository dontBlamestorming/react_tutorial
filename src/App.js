import React, { Component } from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import Control from './components/Control';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import './App.css';

class App extends Component {   
  constructor(props) {    
  super(props);
    this.maxContentId = 3;
    this.state = {
      mode : 'welcome',      // welcome or read 
      selectedContentId : 2,
      subject : {title : 'WEB', subTitle : "World Wide Web"},
      welcome : {title : 'Welcome', desc : 'Hello, React!!'},
      contents : [
        {id : 1, title : 'HTML', desc : 'HTML is for Information'},
        {id : 2, title : 'CSS', desc : 'CSS is for design'},
        {id : 3, title : 'Jacascript', desc : 'Javascript for Interactive'}
      ]
    }
  }

  getReadContent() {
    var i = 0;
      while(i < this.state.contents.length) {
        var contents = this.state.contents[i];
        if(contents.id === this.state.selectedContentId) {
          return contents;
          break;
        }
        i = i + 1;
    }
  }

  getContent() {
    var _title, _desc, _article = null;

    if(this.state.mode === 'welcome') {

      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;

    } else if (this.state.mode === 'read') {
      var _contents = this.getReadContent();
      _article = <ReadContent title={_contents.title} desc={_contents.desc}></ReadContent>

    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc) {
        this.maxContentId = this.maxContentId + 1;

        var _contents = Array.from(this.state.contents);
        _contents.push({
          id : this.maxContentId, title : _title, desc : _desc
        })

        this.setState({
          mode : 'read',
          contents : _contents,
          selectedContentId : this.maxContentId
        })
      }.bind(this)}></CreateContent>

    } else if ( this.state.mode === 'update') {
      var _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc) {
        var _contents = Array.from(this.state.contents);

        var i = 0;
        while(i < _contents.length) {
          if(_contents[i].id === _id) {
            _contents[i] = {id : _id, title : _title, desc : _desc};
            break;
          }
          i = i + 1;
        }
        this.setState({
          mode : 'read',
          contents : _contents
        })
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render() {
    return (
      <div className="App">
        <Subject
          title = {this.state.subject.title}
          subTitle = {this.state.subject.subTitle}
          onChangePage = {function() {
            this.setState({ mode : 'welcome'});
          }.bind(this)}
        > 
        </Subject>

        <TOC 
          onChangePage = {function(id) {
            this.setState({
              mode : 'read',
              selectedContentId : Number(id)  // convert data type
            });
          }.bind(this)}
          data = {this.state.contents}>
        </TOC> 

        <Control
          onChangeMode={function(_mode) {
            this.setState({
              mode : _mode
            });
          }.bind(this)}>
        </Control>
        {this.getContent()}
        
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
즉 react에서는 이벤트 함수 안에서 기존의 state값을 변경하기 위해서는 2가지 조치가 필요하다.

1.  이벤트 함수가 끝나는 지점에서 .bind(this)로 this의 scope를 이벤트 함수까지 확장
2.  이벤트 함수 내에서 state값을 재정의.

왜 이벤트 함수 내에서 'this.state.mode = 'welcome''와 같이 state값을 직접 변경하는 것이 아니라 따로 재정의하는 것일까? setState() 함수를 쓰는 이유가 무엇일까?
생성자 : App이라는 컴포넌트가 생성될 때 가장 먼저 실행되는 함수
생성자가 이미 생성된 이후에 동적으로 state값을 바꾸기 위해서는 위의 방식을 쓰면 안된다. setState함수에 변경하고 싶은 값을 객체형태로 주어야 한다. react입장에서는 전자의 경우엔 값의 변경 그 자체를 인식하지 못한다. 이미 set되어 있는 값을 생성자를 통해서가 아니고서는 오피셜하게 바꾼 것이 아니기 때문이다. 더욱 엄밀하게는 '값'은 이미 바뀌었지만 react가 전혀 인식하지 못한다.  

내 태그에 이벤트를 만들어서 그 컴포넌트 또는 태그를 사용하는 사람들로 하여금 이벤트 프로그래밍을 할 수 있도록 해본적은 없을 것이다. 이벤트를 만드는 생산자가 되어보자.
1. Subject 컴포넌트에 이벤트(내 입장에서)를 만들었다(onChangePage). 그리고 함수를 설치했다.
2. 그리고 Subject의 실제 값에서 빌트인 되어 있는 onClick이라는 이벤트 함수에서 onChangePage를 호출한다. 빌트인 이벤트와 커스텀 이벤트를 바인딩하는 작업같다.

(어렵다)
자동으로 생성되고있는 글목록에 내가 클릭한 목록의 본문이 표시되게 하는 방법. (속성을 이용하여)
기본적으로 mode는 read이며 state에 selectedContentId라는 값을 하나 주자. 이 것은 나중에 하위 컴포넌트(TOC)에서 state값을 동적으로 변경하여 해당 값의 결과에 따라 Content가 결정되게 할 것이다. DB에서 테이블 두개를 바인딩 하는 작업과 비슷하다. state.content에도 id값이 있기 때문에 이 두개의 값을 기준으로 title와 contents가 결정되는 것이다. 즉, content[]에 있는 값을 반복문으로 돌리고 selectedContentId와 값이 같은 경우 결과를 표시하면 된다. 그렇다면 문제는 이제 특정한 글목록을 선택했을 때, selectedContentId를 어떻게 결정지어 줄 것인가다. 하위 컴포넌트는 상위 state의 값을 변경하여 rendering 시킬 수 있다. 위의 코드에서는 App의 함수를 TOC가 실행시킬 수 있다. TOC는 Click이라는 이벤트를 관리할 수 있는 코드를 갖고 있다. 따라서 '어떤' 목록을 클릭했는지는 이벤트 객체를 좀 더 살펴보자. 이벤트 객체는 target이라는 속성을 갖고있는데, 이것은 이 이벤트가 발생한 태그, 즉 a태그를 가리킨다. 그렇다면 data-id의 값에 접근할 수 있다는 것이다. 여기서 'data'는 target 속성 내부에 있는 dataset의 속성에 'id'를 준다는 뜻이다. 즉 이 id값을 onChangePage의 함수를 호출할 때 인자로 /App에 넘겨주면 이 값이 selectedContentId라는로서 state 값을 재정의 할 수 있게 되는 것이다. 

props are read-only 
Content 컴포넌트에서 이것을 사용하는 쪽(App)에서는 title이라는 props를 통해 값을 주입할 수 있다. 
'<Content title={_title} desc={_desc}></Content>'
하지만 Content에서 전달된 title의 값을 바꾸려고하면 error
Content.js
this.props.title = 'Something' - error

without redux
상위 컴포넌트가 하위 컴포넌트에 값을 전달할 때는, props를 통해 전달한다. 그렇다면 하위 컴포넌트가 상위 컴포넌트에 값을 전달할 때는 event를 통해 한다. 

with redux
데이터를 각각의 컴포넌트에 분산보관이 아니라 하나의 저장소(store)에 넣고 그 값이 바뀌면 그 데이터와 관련된 모든 컴포넌트가 자동으로 바뀌게 하는 것

delete의 기능을 사용하고자 할때는 a태그를 쓰면 나중에 큰 문제가 발생할 수 있다. session이나 cookie같은 소프트웨어가 적용된 웹페이지는 사용자의 로그를 기록하는 것인데 이런 웹페이지에서는 delete의 적용 자체를 기록하기 때문에 다음에 의도치 않은 삭제기능이 일어날 수 있기 때문이다. input태그와 같은 단순 operation으로 처리하는 것이 바람직하다. 

onSubmit - form태그에 설치하는 이벤트로서 하위 항목의 input태그의 submit이 일어나게 되면 해당 이벤트 객체의 함수가 자동으로 실행된다. 이것은 react의 기능이 아니라 html의 고유한 기능이다.

maxContentId를 state값이 아닌 this에 따로 값을 준 이유는 이 코드는 데이터를 추가할 때 id를 비교하는 용도로만 사용될 것이고 이것 자체가 rendering될 필요는 없기 때문이다. 

state에다가 값을 추가할 때에는 원본을 수정하지 말고 복사하여 추가해라.
1. push - 원본에 value 추가 - 비추천 
2. concat - 원본이 아닌 새로운 변수에 value 추가

왜?
지금 App.js는 비효율적인 면을 갖고있다. TOC가 redering되기 위해 필요한 데이터는 state의 contents[]이다. 이 내용이 바뀌면 TOC 컴포넌트의 render가 다시 실행 될 것이다. 이 말은 즉슨, 만약 contents가 바뀌지 않는다면 TOC의 render()는 호출될 필요가 없다. 그러나 현재 코드에서는 사용자의 모든 act에 TOC의 render()가 실행되고 있다. react는 이러한 이슈를 방지하기 위해 shouldComponentUpdate()라는 함수를 만들었다. 이 함수의 return이 false라면 react는 그 밑의 render()함수를 읽지 않는다. 

또한 shouldComponentUpdate의 매개변수는 newProps, newState로 약속이 되어 있다. 
 -console.log(newProps, 'A');
 -console.log(this.props.data, 'B');
B에서는 render()가 호출되지 못하였기 때문에 state.content[] 값을 그대로 갖고온다. 하지만 newProps는 추가된 값까지 가져오는 것을 볼 수 있다. 즉, 전자는 배열값을 가져오지만 후자는 변경값을 갖고온다. 

만약 쓸데없는 redering을 막기위해 shouldComponentUpdate를 사용했고, 원본값과 변경값을 비교하여 변경값이 있을 때만 TOC가 render된다는 조건을 추가했다고 치자. 이 때, state.contents[]를 push로서 값을 추가했다면 TOC에서 this.props.data를 했을 때 원본 배열에 값을 추가하였기 때문에 shouldComponentUpdate함수 내에 if문으로 조건을 붙일 수 없다. 그러나 concat()을 사용한다면 원본값은 두고 그 원본값을 복제하여 변경값을 추가한다음 render()하기 때문에 원본값과 변경값을 비교할 수 있는 환경을 만들 수 있다. 
공부할 것 -> newProps가 어떻게 post방식으로 submit된 값을 가져오는지?

원본을 바꾸지 않는다 -> 불변성 -> immutable
concat()을 사용하지 않고 같은 메커니즘을 이용할 수도 있다. concat()은 기존의 배열을 '복제'한다고 했는데 다른 코드를 통해 배열을 복제하면 되기 때문이다.
var newContents = Array.from(this.state.contents)
newContents.push({
  id : this.maxContentId, title : _title, desc : _desc
})
객체를 복제해보자. 
var a = {name : "dave"};
var b = Object.assign({}, a);
하지만 a !== b 이다.

update는 read와 create가 결합된 기능이다. 
상위 컴포넌트인 App에서 getReadContent()를 통해 state.contents[i].id === selectedContentId의 return된 배열을 data라는 prop을 통해 하위 컴포넌트인 UpdateContent에 삽입했다. 그 다음 input의 value속성에 삽입된 데이터의 title를 넣고 출력은 가능하지만 수정이 불가능하다. 왜냐하면 수정이 가능하다는 것은 write이 가능하다는 말인데 props는 read-only이다. 따라서 이러한 형태(value={this.props.data.title})로 값을 주면 안된다. 방법은 value에 넣고 있는 props를 state화 시켜주는 것이다. 상위 컴포넌트(App)에서 state를 생성자를 만들고 state값을 주는 방법과 같이 하위 컴포넌트에도 충분히 같은방법으로 state를 만들 수 있다. 그리고 꼭 잊으면 안되는 것은 props를 변수처럼 줄 수 있는 방법은 state를 거쳐야 한다는 것이다. value={this.state.title} 이런식으로 value값을 줄 수 있을 것이다. 하지만 이렇게 한다고 해서 적용되지는 않는다. 왜냐하면 지금까지는 환경을 만들어 준 것이고 이제 직접 state의 값을 바꿔주는 작업을 해야한다. 

update를 하려면 어디에다가 update를 할 것인지에 대한 식별자가 필요하다. 보통 id와 같은 값은 존재하지만 사용자에게 굳이 보일필요가 없기 때문에 hidden form을 사용한다. 

*/