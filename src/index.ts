import { Config, BallProps } from './interface'
import { getBall, getSpan, addClass, removeClass } from './util'

class BounceBall {
  constructor (config: Config) {
    const { id, text, speed = 10, ballStyle = {}, textStyle = {} } = config
    this.id = id
    this.text = text
    this.speed = speed
    this.ballStyle = ballStyle
    this.textStyle = textStyle
    this.timers = []
    this.ballPropsArray = []
    this.$id = document.getElementById(this.id) as HTMLElement
    this.$ball = getBall()
    this.init()
  }

  readonly id: string
  text: string
  speed: number
  ballStyle: object
  textStyle: object
  timers: number[]
  ballPropsArray: BallProps[]
  $id: HTMLElement
  $ball: HTMLDivElement

  private append (element: HTMLElement) {
    this.$id && this.$id.appendChild(element)
  }

  private init () {
    const contentArray: string[] = this.text.split(' ')
    this.append(this.$ball)

    for (let i = 0, len = contentArray.length; i < len; i++) {
      const text = contentArray[i]

      const $text = getSpan(text, 'text')
      this.append($text)

      const textLen = $text.offsetWidth

      if (i + 1 < contentArray.length) {
        this.append(getSpan(' '))
      }
      const ballLeft = $text.offsetLeft + textLen / 2

      const ballProps: BallProps = {
        left: ballLeft,
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

    this.$ball.style.left = `${ballProps.left}px`
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