import { FC } from 'react'
import AntdHeader from '../../Antd/Header/Header'
import { Button } from 'antd'

interface HeaderProps {
  getProjectContent: () => void
}

const ProjectTreeHeader: FC<HeaderProps> = (props) => {
  const { getProjectContent } = props

  return (
    <AntdHeader>
      <Button type="primary" onClick={getProjectContent}>
        Reload project tree
      </Button>
    </AntdHeader>
  )
}

export default ProjectTreeHeader
