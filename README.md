# Bounce Bal

We only provide JS logic, add the corresponding classname for DOM, css style is up to you.

![](https://www.dengwb.com/dist/static/bounce-ball/bounce-ball.gif)

## Use

Yarn or NPM

```bash
$ yarn add -D bounce-ball
```

```js
import BounceBall from 'bounce-ball'

const bounceBall = new BounceBall({
  id: 'main',
  text: 'Goodbye 2019 Hello 2020'
})

bounceBall.run()

// <div id="main"></div>
```

## Example

```bash
$ git clone git@github.com:dengwb1991/bounce-ball.git

$ cd bounce-ball

$ yarn

$ yarn start
```

## API

 Attribute | Type | Default | Description 
 --- | ---  | --- | --- 
 id | string | - | Element id
 text | string | - | Displayed text
 speed | number | 6 | Speed of the animation

## Events

Attribute | Value | Description
---- | --- | ---
run | - | The ball starts to move
reset | - | Reset all parameters

## From

[Ball Bouncing On Text](https://codepen.io/dengwb1991/pen/rNayaXP)