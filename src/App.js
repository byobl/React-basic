import React, { Component } from 'react';
import TOC from "./components/TOC"
import Subject from "./components/Subject"
import ReadContent from "./components/ReadContent"
import Control from "./components/Control"
import CreateContent from "./components/CreateContent"
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3; // 맨 마지막 배열의 id값
    this.state = {
      mode:'read',
      selected_content_id:2,
      subject:{title:'Byobl', sub:'BoB 9th team \'Byobl\''},
      welcome:{title:'Welcome', desc:'Hello, Byoble and React!!'},
      contents:[
        {id:1, title:'Block-chain', desc:'Block-chain을 통한 교육인증 서비스 제작'},
        {id:2, title:'자기주권', desc:'자기주권 인증 플랫폼'},
        {id:3, title:'뵤블팀 짱짱', desc:'다들 화이팅'}
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
        //add comtent to this.state.contents
        this.max_content_id = this.max_content_id+1;
        // 해당 방식은 기존 데이터의 변경을 가져올 숭 있어서 비추
        // this.state.contents.push( 
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        // 그래서 이런식으로 conccat을 쓴 거야
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        )
       this.setState({
         contents:_contents
       });
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
