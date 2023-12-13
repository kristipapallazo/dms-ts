import React, { useState } from 'react'
import { App as AntdApp, ConfigProvider } from 'antd'
import './App.css'
import CodeEditor from './components/CodeEditor/CodeEditor'
import './components/Antd/Antd.css'

function App() {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<string>('def')
  const [error, setError] = useState<boolean>(false)
  const fetchData = async () => {
    const STATIC_URL = 'http://localhost:8101/dms-app/all-scripts'
    try {
      setLoading(true)
      setError(false)
      const app = 'test' // Replace with your app name

      const url = `${STATIC_URL}/${app}`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        // body: JSON.stringify({ devel }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data: any = await response.json()
      console.log('data', data)
      setData(JSON.stringify(data))
    } catch (error: any) {
      console.error('Error fetching data:', error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <ConfigProvider theme={{}}>
      <AntdApp>
        <div className="app">
          {loading ? (
            <div style={{ color: 'red', textAlign: 'center' }}>loading</div>
          ) : (
            <>
              <button onClick={fetchData}>request</button>
              <div>
                <span>data/error: </span>
                <span>{error || data}</span>
              </div>
              <div>
                <CodeEditor />
              </div>
            </>
          )}
        </div>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
