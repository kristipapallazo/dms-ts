import { FC } from 'react'
import AntdHeader from '../../Antd/Header/Header'
import { Button } from 'antd'
import { SelectedFile, SetStateFn } from '../../../types/general'

interface HeaderProps {
  fetchProjectContent: () => void
  setSelectedFile: SetStateFn<SelectedFile>
}

const ProjectTreeHeader: FC<HeaderProps> = (props) => {
  const { fetchProjectContent, setSelectedFile } = props
  const reloadCode = () => {
    fetchProjectContent()
    setSelectedFile(undefined)
  }

  return (
    <AntdHeader>
      <Button type="primary" onClick={reloadCode}>
        Reload project tree
      </Button>
    </AntdHeader>
  )
}

export default ProjectTreeHeader
