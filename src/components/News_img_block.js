import React,{Component,PropTypes} from "react";
import {Card} from "antd";
import {Link} from "react-router";
import axios from "axios"

export default class App extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    cardTitle: PropTypes.string.isRequired,
    cardWidth: PropTypes.string.isRequired,
    imageWidth: PropTypes.string.isRequired
  };

  state = {
    newsArr: null
  };

  componentDidMount(){
    const {type,count} = this.props;
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
    axios.get(url)
      .then(respone => {
        const newsArr = respone.data;
        newsArr.map(({uniquekey, title, author_name, thumbnail_pic_s}) => ({uniquekey, title, author_name,thumbnail_pic_s}))
        this.setState({newsArr});
      });
  };

  render () {

    const {cardTitle,imageWidth,cardWidth,type} = this.props;
    const {newsArr} = this.state;
    const imageStyle = {
      width: imageWidth,
      height: "89px",
      display: "block"
    };
    const titleStyle = {
      width: imageWidth,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
    const newsList = !newsArr
      ? <h2>正在加载中</h2>
      : (
        newsArr.map((news,index) => (
          <div key={index} className="imageblock">
            <Link to={`/news_detail/${news.uniquekey}/${type}`}>
              <div>
                <img src={news.thumbnail_pic_s} style={imageStyle}/>
              </div>
              <div className="custom-card">
                <h3 style={titleStyle}>{news.title}</h3>
                <p>{news.author_name}</p>
              </div>
            </Link>
          </div>
        ))
      )

    return (
      <Card title={cardTitle} style={{width: cardWidth}} className="topNewsList">
        {
          newsList
        }
      </Card>
    )
  }
};
