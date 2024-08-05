import React from 'react'

type Props = {
  children: JSX.Element | JSX.Element[]
}

export function PageLayout({children}: Props) {
  return (
    <div className='card card-flush '>
      <div className='card-body'>{children}</div>
    </div>
  )
}
