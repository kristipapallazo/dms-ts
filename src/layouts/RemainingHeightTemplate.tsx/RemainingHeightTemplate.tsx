import React, { FC, ReactNode } from 'react'
import classes from './RemainingHeightTemplate.module.css'

interface Props {
  children: ReactNode[]
}
const RemainingHeightTemplate: FC<Props> = (props) => {
  const { children } = props
  const [header, content] = children
  return (
    <div className={classes.container}>
      <div className={classes.header}>{header}</div>
      <div className={classes.content}>{content}</div>
    </div>
  )
}

export default RemainingHeightTemplate
