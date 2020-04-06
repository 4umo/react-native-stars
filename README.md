# react-native-stars

[![NPM](https://nodei.co/npm/react-native-stars.png?downloads=true)](https://nodei.co/npm/react-native-stars/)

**react-native-stars** is a versatile react native star review component with half star compatibility and custom images, star sizes, star count, star spacing, and value display.

![rn-stars](https://cloud.githubusercontent.com/assets/9997548/22914360/0f69f5d2-f23e-11e6-82a5-ce0a4986d611.gif)

![rn-stars-android](https://cloud.githubusercontent.com/assets/9997548/22914409/551f6d46-f23e-11e6-9f7e-beda9e712929.gif)

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Basics](#basics)
4. [Modes](#modes)
5. [Props](#props)
6. [Image Input](#image-input)
7. [Contributing](#contributing)

## Installation

```sh
npm install react-native-stars --save
```

## Usage

### Basics

#### For Selection

```js
<View style={{alignItems:'center'}}>
  <Stars
    half={true}
    default={2.5}
    update={(val)=>{this.setState({stars: val})}}
    spacing={4}
    starSize={40}
    count={5}
    fullStar={require('./images/starFilled.png')}
    emptyStar={require('./images/starEmpty.png')}
    halfStar={require('./images/starHalf.png')}/>
</View>
```

#### For Display

```js
<View style={{alignItems:'center'}}>
  <Stars
    display={3.67}
    spacing={8}
    count={5}
    starSize={40}
    fullStar= {require('./images/starFilled.png')}
    emptyStar= {require('./images/starEmpty.png')}/>
</View>
```

#### Custom Components for Stars
![custom components](https://user-images.githubusercontent.com/6295083/35113671-e4532a5c-fc47-11e7-992b-515bced482d5.png)
```js
import { StyleSheet } from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

<View style={{alignItems:'center'}}>
  <Stars
    default={2.5}
    count={5}
    half={true}
    starSize={50} {/* must be set to the size of the custom component if in selection mode */}
    fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
    emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
    halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
  />
</View>

const styles = StyleSheet.create({
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  }
});
```

### Modes  

#### Selection Mode

For when you want the component to respond to user input. Pressing the stars (or half stars) will call the function passed to the `update` property. This is the default mode. Use the `default` property to define a default rating on render. Use the `half` property to allow for half star input granularity. If a non-whole value (eg. `2.5`) is passed into `default` and the `half` property isn't set to true, the default value will be truncated down to the nearest whole number.

#### Display Mode

For when you want to display an aggregate value. The value displayed will remain static unless updated through `display` property. Passing any value passed into the `display` property will activate this mode and override the presence of any Selection Mode specific properties. Display mode defaults to a straight bar proportion - overridden by `opacity` property which maps star values to opacity as a percentage instead.

### Props

| Prop | Type | Description | Required | Default |
|---|---|---|---|---|
|**`fullStar`**|image or component| Image of the form `require('./path/to/image.png')`, Component may be any valid, square React component.|Yes|NA|
|**`emptyStar`**|image or component| see above |Yes|NA|
|**`halfStar`**|image or component| see above |No|`null`|
|**`count`**|int|the total number of stars|No|`5`|
|**`starSize`**|int|width,height of individual star|No|`30`|
|**`default`**|0 <= `default` <= `count`| (in Selection Mode) initial default rating, int x or x.5 (x.5 only works if `half` is true)|No|`0`|
|**`update`**|function| (in Selection Mode) function to be run on a given star selection selection ex: `update={(val)=> this.setState({stars: val})}` |No|`()=>{}`|
|**`spacing`**|number| pixel amount of separation between each star|No|`0`|
|**`display`**|0 <= `display` <= `count`| (passing any value sets to Display Mode) star value to be displayed eg. 3.6 (of 5), 7.8 (of 10) |No|`null`|
|**`opacity`**|bool|(in Display Mode) displays star values as opacity percentages (0 - 1.0)|No|`false`|
|**`half`**|bool|(in Selection Mode) allows for half star ratings|No|`false`|
|**`disabled`**|bool|Disables onPress/buttons in Selection mode|No|`false`|

### Image Input

Props `fullStar`, `emptyStar`, and `halfStar` may be either components or image files.

Custom components may be any valid, uniformly dimensioned React component / element. When using custom components in selection mode, `starSize` must be set, otherwise the buttons will not function properly.

Images should have transparent backgrounds (.pngs), close to uniform dimensions, consistency between images (both fullStar.png and emptyStar.png are 100px/100px). Half star images are expected to be cropped as though they were full, with the center of the image intersecting the right edge of the half star object. If you're using Adobe Illustrator you can check the ['Use Artboards' box](https://cloud.githubusercontent.com/assets/9997548/22914446/87f94d72-f23e-11e6-9822-00be59ec2c1a.png) to ensure that empty space in the artboard is included during the export to .png. Half star images can, but don't need to have full outlines - both formats below are acceptible.

example compatible images:

![stars](https://cloud.githubusercontent.com/assets/9997548/22914475/a6ff5dec-f23e-11e6-86b8-01e74eee6e90.jpg)

I've included a set in example-images if you need something basic.

### Roadmap

✅**Custom Components** `fullStar`, `halfStar`, `emptyStar` properties now accept component inputs rather than exclusively image inputs.

✅**Display Mode Transparency** non-transparent backingColor no longer required for display mode.

_ **Dev Upgrades** adding typescript, linting, and react best practices

_ **Display Mode Interpolation** marginal partial star display amounts like 0.1 and 0.9 often look 'too small' or 'too big'. This feature would use interpolation to create a more natural look and feel for partial display amounts.

_ **Cycle Selection** for half star selection mode - instead of two halves of a star each having its own button + update value, the entire star is one button - behaving like a 3-stage toggle when clicked in succession. Values will cycle between 0 -> 0.5 -> 1 -> 0 and will respect the default parameter on initialization.

_ **Slide Selection** capability - component respects a continuous user input, updating component rating state according to the half/full star granularity configuration (defaults to full star)

## Contributing

Pull Requests for new features and bugfixes are welcome! :)

## License

[MIT License](http://opensource.org/licenses/mit-license.html)
