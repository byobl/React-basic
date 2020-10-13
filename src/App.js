import React, { Component } from 'react';
import TOC from "./components/TOC"
import Subject from "./components/Subject"
import ReadContent from "./components/ReadContent"
import Control from "./components/Control"
import CreateContent from "./components/CreateContent"
//import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:'read',
      selected_content_id:2,
      subject:{title:'WEB', sub:'word wide web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JS', desc:'JS is for interactive'}
      ]
    }
  }
  render(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i+1;
      }
     _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'create'){
      _article = <CreateContent   onSubmit={function(_title, _desc){
        console.log(_title,_desc);
      }.bind(this)}></CreateContent>
    }
    return (
      <div className="App">
       <Subject
       title={this.state.subject.title}
       sub={this.state.subject.sub}
       onClickPage={function(){
         this.setState({mode:'welcome'});
       }.bind(this)}>
       </Subject>
       {/* <header>
             <h1><a href="/" onClick={function(e){
               console.log(e);
               e.preventDefault(); //html 기본태그의 기능을 쓰지 않을때(여기서는 <a></a>기능 X)
               //this.state.mode = 'welcome' ==> 이렇게 하면 X
               this.setState({
                 mode:'welcome'
               });
              }.bind(this)}>{this.state.subject.title}</a></h1>
             {this.state.sub}           
        </header> */}
       <TOC 
         onChangePage={function(id){
         this.setState({
           mode:'read',
           selected_content_id : Number(id)
        });
       }.bind(this)}
       data={this.state.contents}>
       </TOC>
       <Control onChangeMode={function(_mode){
         this.setState({
           mode:_mode
         });
       }.bind(this)}></Control>
       {_article}
      </div>
    );
  }
}

export default App;
