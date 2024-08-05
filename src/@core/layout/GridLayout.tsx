import React from 'react'

type Props = {
  children: JSX.Element | JSX.Element[]
}

export function GridLayout({children}: Props) {
  return (
    <div className='row'>
      <div className='card card-px-0 shadow'>
        <div className='card-body'>{children}</div>
      </div>
    </div>
  )
}
