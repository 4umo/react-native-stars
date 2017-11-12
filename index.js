'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

export default class StarReview extends Component {
  constructor(props){
    super(props);
    this.state = {
        rating: props.rating
    };

    this.ratingMode = this.ratingMode.bind(this);
    this.halfRatingMode = this.halfRatingMode.bind(this);
    this.displayBar = this.displayBar.bind(this);
    this.displayOpaque = this.displayOpaque.bind(this);
    this.star = this.star.bind(this);
  }

  displayBar(){
    var partial = this.props.value - Math.floor(this.props.value);
    var blockStyle = {height: this.props.starSize, width: this.props.starSize * (1.0 - partial), backgroundColor: this.props.backingColor};
    var emptyBlockStyle = {height: this.props.starSize, width: this.props.starSize * partial, backgroundColor: 'transparent'};
    var starStyle = {height: this.props.starSize, width: this.props.starSize, backgroundColor:this.props.backingColor};
    var stars = [];
      for(var i = 1; i < this.props.count + 1; i++){
        if(i == Math.floor(this.props.value) + 1){
          //partial star
          stars.push(
            <View key={i} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
              <ImageBackground style={starStyle} source={this.props.fullStar}>
                <View style={{flexDirection: 'row'}}>
                 <View style={emptyBlockStyle}></View>
                 <View style={blockStyle}></View>
                </View>
                <Image style={{height: this.props.starSize, width: this.props.starSize, backgroundColor:'transparent', position:'absolute'}} source={this.props.emptyStar}/>
              </ImageBackground>
            </View>
          );
        }else if(i > Math.floor(this.props.value) + 1){
          //empty stars
          stars.push(
            <View key={i} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
              <Image style={starStyle} source={this.props.emptyStar}/>
            </View>
          );
        }else{
          //filled stars
          stars.push(
            <View key={i} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
              <Image style={starStyle} source={this.props.fullStar}/>
            </View>
          );
        }
      }
      return(
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>{stars}</View>
        </View>
      );
  }


  displayOpaque(){
    var partial = this.props.value - Math.floor(this.props.value);
    var starStyle = {height: this.props.starSize, width: this.props.starSize, opacity: 1.0, backgroundColor:'transparent'};
    var stars = [];
    for(var i = 1; i < this.props.count + 1; i++){
      if(i == Math.floor(this.props.value) + 1){
        //partial star
        stars.push(
          <View key={i} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
            <ImageBackground style={starStyle} source={this.props.emptyStar}>
              <Image style={{
                height: this.props.starSize,
                width: this.props.starSize,
                opacity: partial,
                backgroundColor:'transparent'}} source={this.props.fullStar}/>
            </ImageBackground>
          </View>
        );
      }else if(i > Math.floor(this.props.value) + 1){
        //empty stars
        stars.push(
          <View key={i} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
            <Image style={starStyle} source={this.props.emptyStar}/>
          </View>
        );
      }else{
        //filled stars
        stars.push(
          <View key={i} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
            <Image style={starStyle} source={this.props.fullStar}/>
          </View>
        );
      }
    }
    return(
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>{stars}</View>
      </View>
    );
  }

  halfStar(val,starImg,halfImg){
    return(
      <View key={val} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
        <ImageBackground style={{width: this.props.starSize, height: this.props.starSize}} source={starImg}>
          <Image style={{width: this.props.starSize, height: this.props.starSize}} source={halfImg}/>
        </ImageBackground>
        <View style={{flexDirection: 'row', position: 'absolute'}}>
              <TouchableOpacity style={{height:this.props.starSize,width:this.props.starSize/2}} disabled={this.props.disabled} onPress={()=>{
                this.setState({rating: val - 0.5});
                this.props.update(val - 0.5);
              }}/>
              <TouchableOpacity style={{height:this.props.starSize,width:this.props.starSize/2}} disabled={this.props.disabled} onPress={()=>{
                this.setState({rating: val});
                this.props.update(val);
              }}/>
            </View>
      </View>
    );
  }

  halfRatingMode(){
    var stars = [];
    for(var i = 1; i < this.props.count + 1; i++){
      var starImg = (i <= this.state.rating) ? this.props.fullStar : this.props.emptyStar;
      var halfImg = (this.state.rating + 0.5 == i) ? this.props.halfStar : null;
      stars.push(
        this.halfStar(i,starImg,halfImg)
      );
    }
    return(
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {stars}
      </View>
    );
  }

  star(val,starImg){
    return(
      <View key={val} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
        <TouchableOpacity disabled={this.props.disabled} onPress={()=>{
          this.setState({rating: val});
          this.props.update(val);
        }}>
          <Image style={{width: this.props.starSize, height: this.props.starSize}} source={starImg}/>
        </TouchableOpacity>
      </View>
    );
  }

  ratingMode(){
    var stars = [];
    for(var i = 1; i < this.props.count + 1; i++){
      var starImg = (i <= this.state.rating) ? this.props.fullStar : this.props.emptyStar;
      stars.push(
        this.star(i,starImg)
      );
    }
    return(
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {stars}
      </View>
    );
  }

  render() {
    let view = this.props.value == null ? (this.props.half ? this.halfRatingMode() :this.ratingMode()) : (this.props.opacity ? this.displayOpaque() : this.displayBar());
    return (
      <View>
        {view}
      </View>
    );
  }
}

StarReview.propTypes = {
  value: PropTypes.number,
  count: PropTypes.number,
  rating: PropTypes.number,
  emptyStar: PropTypes.number.isRequired,
  fullStar: PropTypes.number.isRequired,
  halfStar: PropTypes.number,
  update: PropTypes.func,
  starSize: PropTypes.number,
  backingColor: PropTypes.string,
  opacity: PropTypes.bool,
  half: PropTypes.bool,
  spacing: PropTypes.number,
  disabled: PropTypes.bool,
};

StarReview.defaultProps = {
  fullStar: require('./example-images/starFilled.png'),
  halfStar: require('./example-images/starHalf.png'),
  emptyStar: require('./example-images/starEmpty.png'),
  disabled: false,
  value: null,
  count: 5,
  rating: 0,
  starSize: 30,
  update: ()=>{},
  backingColor: 'white',
  opacity: false,
  half: false,
  spacing: 0
};
