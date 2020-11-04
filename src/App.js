import React, { Component } from 'react';
import TOC from "./components/TOC"
import Subject from "./components/Subject"
import ReadContent from "./components/ReadContent"
import UpdateContent from "./components/UpdateContent"
import Control from "./components/Control"
import CreateContent from "./components/CreateContent"
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3; // 맨 마지막 배열의 id값
    this.state = {
      mode:'welcome',
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

  getReadContent(){
    var i = 0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
       // break;
      }
      i = i+1;
    }
  }

  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
     _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }else if(this.state.mode === 'create'){
      _article = <CreateContent   onSubmit={function(_title, _desc){
        //add comtent to this.state.contents
        this.max_content_id = this.max_content_id+1;
        var _contents = Array.from(this.state.contents);
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});
        // 해당 방식은 기존 데이터의 변경을 가져올 수 있어서 비추
        // this.state.contents.push( 
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        // 그래서 이런식으로 원본을 바꾸지 않는 conccat을 쓴 거야
        // concat은 복사본을 만들어서 따로 저장하는 형식임.
        //  var _contents = this.state.contents.concat(
        //    {id:this.max_content_id, title:_title, desc:_desc}
        //  )
       this.setState({
         contents:_contents,
         mode:'read',
         selected_content_id:this.max_content_id
       });
        console.log(_title,_desc);
      }.bind(this)}></CreateContent>
    }else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content}  onSubmit={
        function(_id, _title, _desc){
        //불변 원본배열을 복제해서 수정한 후 그걸 쓴다.
        var _contents = Array.from(this.state.contents); 
        var i = 0;
        while(i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i = i + 1;
        }
       
       this.setState({
         contents:_contents,
         mode:'read'
       });
        console.log(_title,_desc);
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }


  render(){
    console.log('App render');
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
         if(_mode === 'delete'){
            if(window.confirm("정말 지우시겠습니까?")){
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i< _contents.length){
                  if(_contents[i].id === this.state.selected_content_id){
                    _contents.splice(i,1);
                    break;
                  }
                i = i+1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('삭제되었습니다');
            }
         }else{
          this.setState({
            mode:_mode
          });
         }
        
       }.bind(this)}></Control>
       {this.getContent()}
      </div>
    );
  }
}

export default App;
