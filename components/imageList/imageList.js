import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

class ImageList extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
      openPopUp: false,
    }
	}
  componentWillReceiveProps(props){
    this.props = props
  }
  displayList = () => {
    let list = []
    let styles = {
      imageDiv: {
        height: 100,
        width: 100,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
      },
      image: {
        height: 'inherit'
      }
    };
    this.props.list.map((data, index)=> {
      list.push(
        <div style={styles.imageDiv}>
          <img src={data.imageUrl.imageUrl} style={styles.image}/>
          <label>{data.imageUrl.text}</label>
        </div>
      )
    })
    return list
  }


   render() {
      return (
        <div id="enclosingDiv">
          {
            this.props.list.length > 0 ?
            this.displayList()
            : "No images to display"
          }
        </div>
      );
   }
}


export default ImageList;
