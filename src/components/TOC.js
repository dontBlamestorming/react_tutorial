import React, { Component } from 'react';

class TOC extends Component {     // Table Of Content
  render() {
    var lists = [];
    var data = this.props.data;
    var i = 0;
      while(i < data.length) {
        lists.push(<li key = {data[i].id}> <a href={"/content/" + data.id}> {data[i].title} </a> </li>)
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