import { Header } from 'antd/es/layout/layout'
import React, { FC, ReactNode } from 'react'
import classes from './Header.module.css'

interface Props {
  children: ReactNode
}

const AntdHeader: FC<Props> = (props) => {
  const { children } = props
  return <Header className={classes.header}>{children}</Header>
}

export default AntdHeader
