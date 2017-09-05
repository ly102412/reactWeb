import React,{Component} from "react";
import {Tabs,Carousel} from "antd"
import MobileNewsBlock from "./MobileNewsBlock"
import carousel_1 from "../images/carousel_1.jpg";
import carousel_2 from "../images/carousel_2.jpg";
import carousel_3 from "../images/carousel_3.jpg";
import carousel_4 from "../images/carousel_4.jpg";

const TabPane = Tabs.TabPane;


export default class App extends Component {
  render () {
    return (
      <Tabs>
        <TabPane tab="头条" key="top">
          <div  style={{width: '100%'}} >
            <Carousel autoplay>
              <div>
                <img src={carousel_1} />
              </div>
              <div>
                <img src={carousel_2}/>
              </div>
              <div>
                <img src={carousel_3}/>
              </div>
              <div>
                <img src={carousel_4}/>
              </div>
            </Carousel>
            <MobileNewsBlock count={6} type="top"></MobileNewsBlock>
          </div>
        </TabPane>
        <TabPane tab="社会" key="shehui">
          <MobileNewsBlock count={20} type="shehui"/>
        </TabPane>
        <TabPane tab="国内" key="guonei">
          <MobileNewsBlock count={20} type="guonei"/>
        </TabPane>
        <TabPane tab="国际" key="guoji">
          <MobileNewsBlock count={20} type="guoji"/>
        </TabPane>
        <TabPane tab="娱乐" key="yule">
          <MobileNewsBlock count={20} type="yule"/>
        </TabPane>
        <TabPane tab="体育" key="tiyu">
          <MobileNewsBlock count={20} type="tiyu"/>
        </TabPane>
        <TabPane tab="科技" key="keji">
          <MobileNewsBlock count={20} type="keji"/>
        </TabPane>
        <TabPane tab="时尚" key="shishang">
          <MobileNewsBlock count={20} type="shishang"/>
        </TabPane>
      </Tabs>
    )
  }
};