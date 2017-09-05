import React,{Component} from "react";
import {Row,Col,Tabs,Card,Upload,Icon,Modal} from "antd";
import {Link} from "react-router"
import axios from "axios";

const TabPane = Tabs.TabPane;

export default class UserCenter extends Component {

  state = {
    collections: [],
    comments: [],
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };

  componentDidMount () {
    const userId = localStorage.getItem("userId");
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;

    axios.get(url)
      .then(response => {
        const collections = response.data;
        this.setState({collections});
      });

    url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;

    axios.get(url)
      .then(response => {
        const comments = response.data;
        this.setState({comments});
      });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {

    const {collections,comments} = this.state;
    const collectionList = collections.length
      ? collections.map((collection,index) => (
        <Card key={index} title={collection.uniquekey} extra={<Link to={`/news_detail/${collection.uniquekey}/top`}>查看</Link>}>
          {collection.Title}
        </Card>
      ))
      : <h3>没有收藏的文章，去收藏一些吧</h3>

    const commentList = comments.length
      ? comments.map((comment,index) => (
        <Card key={index} title={`于${comment.datetime}评论了${comment.uniquekey}`} extra={<Link to={`/news_detail/${comment.uniquekey}/top`}>查看</Link>}>
          {comment.Comments}
        </Card>
      ))
      : <h3>没有评论</h3>

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Row>
        <Col key="0" span={1}></Col>
        <Col key="1" span={22}>
          <Tabs>
            <TabPane key="0" tab="我的收藏列表">
              {collectionList}
            </TabPane>
            <TabPane key="1" tab="我的评论列表">
              {commentList}
            </TabPane>
            <TabPane key="2" tab="头像设置">
              <div className="clearfix">
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
            </TabPane>
          </Tabs>
        </Col>
        <Col key="2" span={1}></Col>
      </Row>
    )
  }
}
