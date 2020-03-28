import React, { Component } from 'react';

class TOC extends Component {     // Table Of Content
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

export default TOC;