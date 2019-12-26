export interface Config {
  id: string
  text: string
  speed?: number
  ballStyle?: object
  textStyle?: object
}

export interface BallProps {
  left: number
  textLen: number
  textIndex: number
}
