import { Config, BallProps } from './interface'
import { getBall, getSpan, addClass, removeClass } from './util'

class BounceBall {
  constructor (config: Config) {
    const { id, text, speed = 6, ballStyle = {}, textStyle = {} } = config
    this.id = id
    this.text = text
    this.speed = speed
    this.ballStyle = ballStyle
    this.textStyle = textStyle
    this.contentArray = []
    this.timers = []
    this.ballPropsArray = []
    this.$id = document.getElementById(this.id) as HTMLElement
    this.$ball = getBall()
    this.init()
    this.bounce()
  }

  readonly id: string
  text: string
  speed: number
  ballStyle: object
  textStyle: object
  contentArray: string[] // 文案数组
  timers: number[]
  ballPropsArray: BallProps[]
  $id: HTMLElement
  $ball: HTMLDivElement

  private append (element: HTMLElement) {
    this.$id && this.$id.appendChild(element)
  }

  private init () {
    this.contentArray = this.text.split(' ')
    // 添加小球
    this.append(this.$ball)
  }

  private bounce () {
    for (let i = 0, len = this.contentArray.length; i < len; i++) {
      const text = this.contentArray[i]

      const $text = getSpan(text, 'text')
      this.append($text)

      const textLen = $text.offsetWidth

      if (i + 1 < this.contentArray.length) {
        this.append(getSpan(' '))
      }
      const ballLeft = $text.offsetLeft + textLen / 2
      const ballTop = $text.offsetTop

      const ballProps: BallProps = {
        left: ballLeft,
        top: ballTop,
        textLen,
        textIndex: i
      }
      this.ballPropsArray.push(ballProps)
    }
  }

  private animateBall (ballProps: BallProps) {
    const leftDuration = `${ballProps.textLen * this.speed}ms`
    const topDuration = `${ballProps.textLen * this.speed / 2}ms`

    this.$ball.style.transitionDuration = `${leftDuration}, ${topDuration}`

    const ballOffsetLeft = this.$ball.offsetLeft
    const delta = ballProps.left - ballOffsetLeft
    const ballHalfWay = delta + ballOffsetLeft

    this.$ball.style.left = `${ballHalfWay}px`
    this.$ball.style.top = '-1em'

    const halfwayReached = ballProps.textLen * this.speed / 2
    let timer = setTimeout(() => {
      this.$ball.style.left = `${ballProps.left}px`
      this.$ball.style.top = '0px'

      timer = setTimeout(() => {
        addClass(this.$id.querySelectorAll('.text')[ballProps.textIndex] as HTMLSpanElement, 'highlight')
      }, halfwayReached)
      this.timers.push(timer)
    }, halfwayReached)
    this.timers.push(timer)
  }

  run () {
    if (this.timers.length) {
      this.reset()
    }

    let incrementingDelay = 0
    let timer = 0
    this.$ball.style.display = 'block'
    for (let i = 0, len = this.ballPropsArray.length; i < len; i++) {
      const ballProps = this.ballPropsArray[i]
      timer = setTimeout(() => {
        this.animateBall(ballProps)
      }, incrementingDelay)

      this.timers.push(timer)
      incrementingDelay += ballProps.textLen * this.speed
    }
    timer = setTimeout(() => {
      this.$ball.style.display = 'none'
    }, incrementingDelay)
    this.timers.push(timer)
  }

  reset () {
    this.timers.forEach(time => {
      clearTimeout(time)
    })
    this.timers.length = 0
    this.$ball.style.left = '0'
    const texts = this.$id.querySelectorAll('.text')
    texts.forEach(el => {
      removeClass(el as HTMLElement, 'highlight')
    })
  }
}

export default BounceBall