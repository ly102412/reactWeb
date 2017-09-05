import React,{Component} from "react";
import axios from "axios";
import {BackTop} from "antd";
import NewsComments from "./News_comments";

export default class NewsDetail extends Component {

  state = {
    news:{}
  };

  componentDidMount(){
    const {uniquekey} = this.props.params;
    this.showNewsDetail(uniquekey)
  };

  componentWillReceiveProps (newProps) {
    this.showNewsDetail(newProps.params.uniquekey)
  };

  showNewsDetail (uniquekey) {
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        const news = response.data;
        this.setState({news});

        document.title = news.title
      });
  };

  render() {

    const {news} = this.state;
    const {uniquekey} = this.props.params;

    return (
      <div style={{padding: '10px'}}>
        <div  className="mobileDetailsContainer" dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
        <hr/>
        <NewsComments uniquekey={uniquekey}></NewsComments>
        <BackTop></BackTop>
      </div>
    )
  }
}
