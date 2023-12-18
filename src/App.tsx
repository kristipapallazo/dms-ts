import React, { useEffect, useState } from 'react'
import { App as AntdApp, ConfigProvider, Layout, Spin } from 'antd'
import CodeEditor from './components/CodeEditor/CodeEditor'
import ProjectTree from './components/ProjectTree/ProjectTree'
import { ProjectContent, SelectedFile } from './types/general'
import classes from './App.module.css'
import './components/Antd/Antd.css'

const App = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(undefined)
  const [projectContent, setProjectContent] =
    useState<ProjectContent>(undefined)

  // const fetchData = async () => {
  //   const STATIC_URL = 'http://localhost:8101/dms-app/all-scripts'
  //   try {
  //     setLoading(true)
  //     setError(false)
  //     const app = 'test' // Replace with your app name

  //     const url = `${STATIC_URL}/${app}`
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Add any other headers if needed
  //       },
  //       // body: JSON.stringify({ devel }),
  //     })

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`)
  //     }

  //     const data: any = await response.json()
  //     console.log('data', data)
  //     setData(JSON.stringify(data))
  //   } catch (error: any) {
  //     console.error('Error fetching data:', error)
  //     setError(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {}, [])

  if (loading) return <Spin />
  return (
    <ConfigProvider theme={{}}>
      <AntdApp>
        <Layout
          className={`${classes.app} ${
            selectedFile ? classes.selectedFile : ''
          }`}
        >
          {/* <button onClick={fetchData}>request</button> */}
          {/* <div>
                <span>data/error: </span>
                <span>{error || data}</span>
              </div> */}

          <ProjectTree
            projectContent={projectContent}
            setProjectContent={setProjectContent}
          />
          {selectedFile && <CodeEditor />}
        </Layout>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
