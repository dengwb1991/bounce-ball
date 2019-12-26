export const getBall = (): HTMLDivElement => {
  const ball = document.createElement('div')
  ball.className = 'ball'
  return ball
}

export const getSpan = (text: string, className?: string): HTMLSpanElement => {
  const span = document.createElement('span')
  span.innerText = text
  if (className) {
    span.className = className
  }
  return span
}

export const addClass = (el: HTMLSpanElement, className: string) => {
  if (el.className) {
    const originClassName = el.className
    el.className = `${originClassName} ${className}`
  } else {
    el.className = className
  }
}

export const removeClass = (el: HTMLSpanElement, className: string) => {
  const elClassName = el.className
  const arr = elClassName.split(' ')
  const newArr: string[] = []
  arr.forEach(item => {
    if (item !== className) {
      newArr.push(item)
    }
  })
  el.className = newArr.join('')
}