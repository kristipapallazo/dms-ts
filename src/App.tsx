import { useState } from 'react'
import { App as AntdApp, ConfigProvider, Layout, Spin } from 'antd'
import CodeEditor from './components/CodeEditor/CodeEditor'
import ProjectTree from './components/ProjectTree/ProjectTree'
import { SelectedFile } from './types/general'
import classes from './App.module.css'
import './components/Antd/Antd.css'
import SelectFileContainer from './components/SelectFileContainer/SelectFileContainer'

const App = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(undefined)

  if (loading) return <Spin />
  return (
    <ConfigProvider theme={{}}>
      <AntdApp>
        <Layout className={classes.app}>
          <ProjectTree setSelectedFile={setSelectedFile} />
          {selectedFile ? (
            <CodeEditor selectedFile={selectedFile!} />
          ) : (
            <SelectFileContainer />
          )}
        </Layout>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
