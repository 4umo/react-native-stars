import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native'

export default class StarReview extends Component {
  constructor(props) {
    super(props)
    // 'value' and 'rating' are deprecated and have become 'display' and 'default'
    this.displayValue = props.display || props.value
    this.defaultRating = props.default || props.rating
    this.state = {
      rating: this.defaultRating
    }
    this.isReactElement = React.isValidElement
  }

  componentDidUpdate(prevProps) {
    let previousDefaultRating = prevProps.rating || prevProps.default
    let defaultRating = this.props.rating || this.props.default
    if (previousDefaultRating !== defaultRating) {
      this.setState({
        rating: defaultRating,
      })
    }
  }

  createPartialStar(partial, blockStyle, emptyBlockStyle, starStyle) {
    return this.props.opacity ?
      this.isReactElement(this.props.fullStar) ?
        <View style={{opacity: partial}}>
          {this.props.fullStar}
        </View>
        :
        <ImageBackground style={starStyle} source={this.props.emptyStar}>
          <Image style={{
            height: this.props.starSize,
            width: this.props.starSize,
            opacity: partial,
            backgroundColor:'transparent'}} source={this.props.fullStar}/>
        </ImageBackground>
      :
      this.isReactElement(this.props.fullStar) ?
        <View style={{flexDirection: 'row'}}>
          <View>{this.props.emptyStar}</View>
          <View style={{maxWidth: `${Math.round(partial * 100)}%`, overflow: 'hidden', position: 'absolute'}}>{this.props.fullStar}</View>
        </View>
        :
        <ImageBackground style={starStyle} source={this.props.emptyStar}>
          <View style={{flexDirection: 'row'}}>
            <View style={blockStyle}>
              <Image style={{height: this.props.starSize, width: this.props.starSize, backgroundColor: 'transparent', position: 'absolute' }} source={this.props.fullStar}/>
            </View>
            <View style={emptyBlockStyle}></View>
          </View>
        </ImageBackground>
  }

  displayMode() {
    const partial = this.displayValue - Math.floor(this.displayValue)
    const emptyBlockStyle = {height: this.props.starSize, width: this.props.starSize * (1.0 - partial), backgroundColor: 'transparent'}
    const blockStyle = {height: this.props.starSize, width: this.props.starSize * partial, backgroundColor: 'transparent', overflow: 'hidden'}
    const starStyle = {height: this.props.starSize, width: this.props.starSize, backgroundColor: this.props.backingColor}
    const spacingStyle = {paddingLeft: this.props.spacing / 2, paddingRight: this.props.spacing / 2}
    const stars = []
    for (let i = 1; i < this.props.count + 1; i++) {
      if (i == Math.floor(this.displayValue) + 1) {
        //partial star
        const partialStarComponent =
          <View key={i} style={spacingStyle}>
            {this.createPartialStar(partial, blockStyle, emptyBlockStyle, starStyle)}
          </View>

        stars.push(partialStarComponent)
      } else if (i > Math.floor(this.displayValue) + 1) {
        //empty stars
        const emptyStarComponent = this.isReactElement(this.props.emptyStar) ?
          <View style={spacingStyle} key={i}>{this.props.emptyStar}</View>
          :
          <View key={i} style={spacingStyle}>
            <Image style={starStyle} source={this.props.emptyStar}/>
          </View>

        stars.push(emptyStarComponent)
      } else {
        //filled stars
        const starComponent = this.isReactElement(this.props.fullStar) ?
          <View style={spacingStyle} key={i}>{this.props.fullStar}</View>
          :
          <View key={i} style={spacingStyle}>
            <Image style={starStyle} source={this.props.fullStar}/>
          </View>

        stars.push(starComponent)
      }
    }
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>{stars}</View>
      </View>
    )
  }

  createHalfStarMember(index, star, halfStar) {
    // if not a halfStar, either fullStar or emptyStar
    let starComponent = halfStar || star
    starComponent = this.isReactElement(starComponent) ?
      starComponent
      :
      <ImageBackground style={{width: this.props.starSize, height: this.props.starSize}} source={star}>
        <Image style={{width: this.props.starSize, height: this.props.starSize}} source={halfStar}/>
      </ImageBackground>

    return (
      <View key={index} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
        {starComponent}
        <View style={{flexDirection: 'row', position: 'absolute'}}>
          <TouchableOpacity style={{height: this.props.starSize, width: this.props.starSize/2}} disabled={this.props.disabled} onPress={()=>{
            this.setState({rating: index - 0.5})
            this.props.update(index - 0.5)
          }}/>
          <TouchableOpacity style={{height: this.props.starSize, width: this.props.starSize/2}} disabled={this.props.disabled} onPress={()=>{
            this.setState({rating: index})
            this.props.update(index)
          }}/>
        </View>
      </View>
    )
  }

  halfRatingMode() {
    const stars = []
    for (let i = 1; i < this.props.count + 1; i++) {
      const star = (i <= this.state.rating) ? this.props.fullStar : this.props.emptyStar
      const halfStar = (this.state.rating + 0.5 == i) ? this.props.halfStar : null
      stars.push(
        this.createHalfStarMember(i, star, halfStar)
      )
    }
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {stars}
      </View>
    )
  }

  createFullStarMember(index, star) {
    const starComponent = this.isReactElement(star) ?
      star
      :
      <Image style={{width: this.props.starSize, height: this.props.starSize}} source={star}/>

    return (
      <View key={index} style={{paddingLeft: this.props.spacing/2, paddingRight: this.props.spacing/2}}>
        <TouchableOpacity disabled={this.props.disabled} onPress={()=>{
          this.setState({rating: index})
          this.props.update(index)
        }}>
          {starComponent}
        </TouchableOpacity>
      </View>
    )
  }

  fullRatingMode() {
    const stars = []
    for (let i = 1; i < this.props.count + 1; i++) {
      const star = (i <= this.state.rating) ? this.props.fullStar : this.props.emptyStar
      stars.push(
        this.createFullStarMember(i, star)
      )
    }
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {stars}
      </View>
    )
  }

  render() {
    const view = this.displayValue == null ?
      (this.props.half ? this.halfRatingMode() : this.fullRatingMode())
      :
      this.displayMode()
    return (
      <View>
        {view}
      </View>
    )
  }
}

StarReview.propTypes = {
  display: PropTypes.number,
  count: PropTypes.number,
  default: PropTypes.number,
  emptyStar: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  fullStar: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  halfStar: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  update: PropTypes.func,
  starSize: PropTypes.number,
  opacity: PropTypes.bool,
  half: PropTypes.bool,
  spacing: PropTypes.number,
  disabled: PropTypes.bool,
}

StarReview.defaultProps = {
  fullStar: require('./example-images/starFilled.png'),
  halfStar: require('./example-images/starHalf.png'),
  emptyStar: require('./example-images/starEmpty.png'),
  disabled: false,
  display: null,
  count: 5,
  default: 0,
  starSize: 30,
  update: () => {},
  opacity: false,
  half: false,
  spacing: 0
}
