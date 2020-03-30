import React, { Component } from 'react';

class TOC extends Component {     // Table Of Content
  shouldComponentUpdate(newProps, newState) {
    if(newProps.data === this.props.data) {
      return false;
    }
    return true;
  }
  render() {
    var lists = [];
    var data = this.props.data;
    var i = 0;
      while(i < data.length) {
        lists.push(
        <li key = {data[i].id}> 
          <a 
            href = {"/content/" + data[i].id}
            data-id = {data[i].id}
            onClick = {function(event) {
              event.preventDefault();
              this.props.onChangePage(event.target.dataset.id);
            }.bind(this)}
          > {data[i].title} </a> 
          {/* 
          속성값을 안쓰고 App의 state에 부여한 id값을 쓰는 방법
          <a 
            href = {"/content/" + data[i].id}
            onClick = {function(id, event) {
              event.preventDefault();
              this.props.onChangePage(id);
            }.bind(this, data[i].id)}
          > {data[i].title} </a>  */}
        </li>)
        i = i + 1;
      }
    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    );
  }
}

export default TOC;