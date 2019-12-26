import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import BounceBall from '../src'

let bounceBall: any = null

const Main: React.SFC = () => {
  useEffect(() => {
    bounceBall = new BounceBall({
      id: 'main',
      text: 'Goodbye 2019 Hello 2020'
    })
  }, [])

  const run = () => bounceBall.run()

  return (
    <>
      <p className="btn" onClick={ run }>Run</p>
      <div id="main"></div>
    </>
  )
}

ReactDOM.render(
  <>
    <Main></Main>
  </>,
  document.getElementById('app')
)