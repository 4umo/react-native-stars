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

    this.isReactElement = React.isValidElement;

    this.ratingMode = this.ratingMode.bind(this);
    this.halfRatingMode = this.halfRatingMode.bind(this);
    this.displayBar = this.displayBar.bind(this);
    this.displayOpaque = this.displayOpaque.bind(this);
    this.star = this.star.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rating !== nextProps.rating) {
      this.setState({
        rating: nextProps.rating,
      });
    }
  }

  displayBar(){
    let partial = this.props.value - Math.floor(this.props.value);
    let blockStyle = {height: this.props.starSize, width: this.props.starSize * (1.0 - partial), backgroundColor: this.props.backingColor};
    let emptyBlockStyle = {height: this.props.starSize, width: this.props.starSize * partial, backgroundColor: 'transparent'};
    let starStyle = {height: this.props.starSize, width: this.props.starSize, backgroundColor:this.props.backingColor};
    let stars = [];
      for(let i = 1; i < this.props.count + 1; i++){
        if(i == Math.floor(this.props.value) + 1){
          //partial star
          let halfStarComponent = this.isReactElement(this.props.halfStar) ?
            <View key={i}>{this.props.halfStar}</View>
            :
            <View key={i} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
              <ImageBackground style={starStyle} source={this.props.fullStar}>
                <View style={{flexDirection: 'row'}}>
                 <View style={emptyBlockStyle}></View>
                 <View style={blockStyle}></View>
                </View>
                <Image style={{height: this.props.starSize, width: this.props.starSize, backgroundColor:'transparent', position:'absolute'}} source={this.props.emptyStar}/>
              </ImageBackground>
            </View> ;

          stars.push(halfStarComponent);
        }else if(i > Math.floor(this.props.value) + 1){
          //empty stars
          let emptyStarComponent = this.isReactElement(this.props.emptyStar) ?
            <View key={i}>{this.props.emptyStar}</View>
            :
            <View key={i} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
              <Image style={starStyle} source={this.props.emptyStar}/>
            </View> ;

          stars.push(emptyStarComponent);
        }else{
          //filled stars
          let starComponent = this.isReactElement(this.props.fullStar) ?
            <View key={i}>{this.props.fullStar}</View>
            :
            <View key={i} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
              <Image style={starStyle} source={this.props.fullStar}/>
            </View> ;

          stars.push(starComponent);
        }
      }
      return(
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>{stars}</View>
        </View>
      );
  }


  displayOpaque(){
    let partial = this.props.value - Math.floor(this.props.value);
    let starStyle = {height: this.props.starSize, width: this.props.starSize, opacity: 1.0, backgroundColor:'transparent'};
    let stars = [];
    for(let i = 1; i < this.props.count + 1; i++){
      if(i == Math.floor(this.props.value) + 1){
        //partial star
        let halfStarComponent = this.isReactElement(this.props.halfStar) ?
          <View key={i} style={{opacity: partial}}>
            {this.props.halfStar}
          </View>
          :
          <View key={i} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
            <ImageBackground style={starStyle} source={this.props.emptyStar}>
              <Image style={{
                height: this.props.starSize,
                width: this.props.starSize,
                opacity: partial,
                backgroundColor:'transparent'}} source={this.props.fullStar}/>
            </ImageBackground>
          </View> ;

          stars.push(halfStarComponent);
      }else if(i > Math.floor(this.props.value) + 1){
        //empty stars
        let emptyStarComponent = this.isReactElement(this.props.emptyStar) ?
          <View key={i}>{this.props.emptyStar}</View>
          :
          <View key={i} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
            <Image style={starStyle} source={this.props.emptyStar}/>
          </View>

        stars.push(emptyStarComponent);
      }else{
        //filled stars
        let starComponent = this.isReactElement(this.props.fullStar) ?
          <View key={i}>{this.props.fullStar}</View>
          :
          <View key={i} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
            <Image style={starStyle} source={this.props.fullStar}/>
          </View>

        stars.push(starComponent);
      }
    }
    return(
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>{stars}</View>
      </View>
    );
  }

  halfStar(val, _star, _halfStar){
    let halfStarComponent = _halfStar || _star;
    let isComponent = this.isReactElement(halfStarComponent);
    halfStarComponent = isComponent ? halfStarComponent :
      (<ImageBackground style={{width: this.props.starSize, height: this.props.starSize}} source={_star}>
        <Image style={{width: this.props.starSize, height: this.props.starSize}} source={_halfStar}/>
      </ImageBackground> );

    return(
      <View key={val} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
        {halfStarComponent}
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
    let stars = [];
    for(let i = 1; i < this.props.count + 1; i++){
      let _star = (i <= this.state.rating) ? this.props.fullStar : this.props.emptyStar;
      let _halfStar = (this.state.rating + 0.5 == i) ? this.props.halfStar : null;
      stars.push(
        this.halfStar(i, _star, _halfStar)
      );
    }
    return(
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {stars}
      </View>
    );
  }

  star(val, _star){
    let isComponent = this.isReactElement(_star);
    let starComponent = isComponent ? _star :
      ( <Image style={{width: this.props.starSize, height: this.props.starSize}} source={_star}/> );

    return(
      <View key={val} style={!isComponent && {paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
        <TouchableOpacity disabled={this.props.disabled} onPress={()=>{
          this.setState({rating: val});
          this.props.update(val);
        }}>
          {starComponent}
        </TouchableOpacity>
      </View>
    );
  }

  ratingMode(){
    let stars = [];
    for(let i = 1; i < this.props.count + 1; i++){
      let _star = (i <= this.state.rating) ? this.props.fullStar : this.props.emptyStar;
      stars.push(
        this.star(i, _star)
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
  emptyStar: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  fullStar: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  halfStar: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
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
