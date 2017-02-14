# react-native-stars

  
[//]: # ([![NPM](https://nodei.co/npm/react-native-stars.png?downloads=true)](https://nodei.co/npm/react-native-stars/))
  

`react-native-stars` is a versatile react native star review component with half star compatibility and custom images, star sizes, star count, star spacing, and value display.

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
        rating={2.5}
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
    value={3.67}
    spacing={8}
    count={5}
    starSize={40}
    backingColor='cornsilk'
    fullStar= {require('../../images/starFilled.png')}
    emptyStar= {require('../../images/starEmpty.png')}/>
</View>
```

### Modes  

#### Selection Mode 

For when you want to use the component as a user input. User selection calls the functioned passed to the `update` prop. This is the default mode. Use the `rating` prop to define a default star value on page load. Use `half` prop to allow for half star input granularity.

#### Display Mode

For when you want to display an aggregate value. The rating will remain static unless updated through `value` prop. Passing any `value` data will activate this mode and will override the presence of any Selection Mode specific props. Display mode defaults to a straight bar proportion - overridden by `opacity` prop which maps star values to opacity as a percentage instead.

### Props

| Prop | Type | Description | Required | Default |
|---|---|---|---|---|
|**`fullStar`**|image| of the form `require('./path/to/image.png')`|Yes|NA|
|**`emptyStar`**|image| see above |Yes|NA|
|**`halfStar`**|image| see above |No|`null`|
|**`count`**|int|the total number of stars|No|`5`|
|**`starSize`**|int|width,height of individual star|No|`30`|
|**`rating`**|0 <= `rating` <= `count`| (in Selection Mode) initial default rating, int x or x.5 only |No|`0`|
|**`update`**|function| (in Selection Mode) function to be run on ratings selection ex: `update={(val)=> this.setState({stars: val})}` |No|`()=>{}`|
|**`spacing`**|number| pixel amount of separation between each star|No|`0`|
|**`value`**|0 <= `value` <= `count`| (passing any value sets to Display Mode) star value to be displayed eg. 3.6 (of 5), 7.8 (of 10) |No|`null`|
|**`backingColor`**|bool| (in Display Mode) color behind the component (cannot be transparent)|No|`white`|
|**`opacity`**|bool|(in Display Mode) displays star values as opacity percentages (0 - 1.0)|No|`false`|
|**`half`**|bool|(in Selection Mode) allows for half star ratings|No|`false`|

### Image Input

props `fullStar`, `emptyStar`, and `halfStar` expect image files with transparent backgrounds (.pngs), close to uniform dimensions, consistency between images (both fullStar.png and emptyStar.png are 100px/100px). Half star images are expected to be cropped as though they were full, with the center of the image intersecting the right edge of the half star object. If you're using Adobe Illustrator you can check the ['Use Artboards' box](https://cloud.githubusercontent.com/assets/9997548/22914446/87f94d72-f23e-11e6-9822-00be59ec2c1a.png) to ensure that empty space in the artboard is included during the export to .png. Half star images can, but don't need to have full outlines - both formats below are acceptible.

example compatible images:

![stars](https://cloud.githubusercontent.com/assets/9997548/22914475/a6ff5dec-f23e-11e6-86b8-01e74eee6e90.jpg)

I've included a set in example-images if you need something basic.

## Contributing

Pull Requests for new features and bugfixes are welcome! :)

## License

[MIT License](http://opensource.org/licenses/mit-license.html)