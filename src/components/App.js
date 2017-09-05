import React,{Component} from "react";
import NewsHeader from "./News_header";
import NewsFooter from "./News_footer";
import "../componentCss/pc.css";

export default class App extends Component {
  render () {
    return (
      <div>
        <NewsHeader></NewsHeader>
        {this.props.children}
        <NewsFooter></NewsFooter>
      </div>
    );
  };
};