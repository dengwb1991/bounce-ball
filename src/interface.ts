export interface Config {
  id: string
  text: string
  speed?: number
  ballStyle?: object
  textStyle?: object
}

export interface BallProps {
  left: number
  top: number
  textLen: number
  textIndex: number
}
