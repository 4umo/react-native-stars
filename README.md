# react-native-stars

[![NPM](https://nodei.co/npm/react-native-stars.png?downloads=true)](https://nodei.co/npm/react-native-stars/)

`react-native-stars` is a versatile react native star review component with half star compatibility and custom images, star sizes, star count, star spacing, and value display.

<p align="center">
  <img src="https://github.com/extrct/react-native-stars/master/example-images/rn-stars.gif" alt="basics gif" width="" height=""/>
  <img src="https://github.com/extrct/react-native-stars/master/example-images/rn-stars-android.gif" alt="basics gif android" width="" height=""/>
</p>

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
  i. [Basics](#basics)
  ii. [Modes](#modes)
  iii. [Props](#props)
  iv. [Image Input](#image-input)
3. [Contributing](#contributing)

## Installation

```sh
npm install react-native-stars --save
```

## Usage

### Basics

#### For Display

```js
// ...

<View style={{alignItems:'center'}}>
  <Stars
    value={3.67}
    spacing={8}
    count={5}
    starSize={40}
    backingColor='cornsilk'
    fullStar= {require('../../images/starFilled.png')}
    emptyStar= {require('../../images/starEmpty.png')}/>
</View>

// ...
```

#### For Input

```js
// ...

<View style={{alignItems:'center'}}>
  <Stars
        half={true}
        rating={2.5}
        update={(val)=>{this.setState({stars: val})}}
        spacing={4}
        starSize={40}
        count={5}
        fullStar={require('./images/starFilled.png')}
        emptyStar={require('./images/starEmpty.png')}
        halfStar={require('./images/starHalf.png')}/>
</View>

// ...
```

### Modes  

#### Selection Mode  

Rating is dynamic; changes with user input, calls update function prop. This is the default mode. Use the `rating` prop to define a default star value on page load. Use `half` prop to allow for half star input granularity.

#### Display Mode

Rating is static; for displaying an aggregate value as a proportion of stars. Activated by passing a `value` prop - overrides the presence of any Selection Mode specific props. Defaults to bar cutoff proportion - overridden by `opacity` prop which maps star values to opacity as a percentage instead.

### Props

| Prop | Type | Description | Required | Default |
|---|---|---|---|---|
|**`fullStar`**|`image`| of the form `require('./path/to/image.png')` |`Yes`|`NA`|
|**`emptyStar`**|`image`| see above |`Yes`|`NA`|
|**`halfStar`**|`image`| see above |`No`|`null`|
|**`count`**|`int`|the total number of stars|`No`|`5`|
|**`starSize`**|`int`|width,height of individual star|`No`|`30`|
|**`rating`**|`int or X.5`| (in Selection Mode) initial default rating |`No`|`0`|
|**`update`**|`function`| (in Selection Mode) function to be run on ratings selection ex: `update={(val)=> this.setState({stars: val})}` |`No`|`()=>{}`|
|**`spacing`**|`number`| pixel amount of separation between each star|`No`|`0`|
|**`value`**|`number between 0 and count`| (passing any value sets to Display Mode) star value to be displayed eg. 3.6 (of 5), 7.8 (of 10) |`No`|`null`|
|**`backingColor`**|`bool`| (in Display Mode) color behind the component (cannot be transparent)|`No`|`white`|
|**`opacity`**|`bool`|(in Display Mode) displays star values as opacity percentages (0 - 1.0)|`No`|`false`|
|**`half`**|`bool`|(in Selection Mode) allows for half star ratings|`No`|`false`|

### Image Input

props `fullStar`, `emptyStar`, and `halfStar` expect image files with transparent backgrounds (.pngs), close to uniform dimensions, consistency between images (both fullStar.png and emptyStar.png are 100px/100px). Half star images are expected to be cropped as though they were full, with the center of the image intersecting the right edge of the half star object. If you're using Adobe Illustrator you can check the ['Use Artboards' box](https://github.com/extrct/react-native-stars/master/example-images/export.png) to ensure that empty space in the artboard is included during the export to .png. Half star images can, but don't need to have full outlines - both formats below are acceptible.

example compatible images:

<p align="center">
  <img src="https://github.com/extrct/react-native-stars/master/example-images/stars.jpg" alt="Example star formats" width="" height=""/>
</p>

## Contributing

Pull Requests for new features and bugfixes are welcome! :)

## License

[MIT License](http://opensource.org/licenses/mit-license.html)