import React, { Component } from 'react';
class ReadContent extends Component{
    render() {
      return (
        <body>
             <h1>{this.props.title}</h1>
             {this.props.desc}           
        </body>
      );
    }
}
    export default ReadContent;