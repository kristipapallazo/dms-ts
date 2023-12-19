import React, { FC, useEffect, useState } from 'react'
import { Editor } from '@monaco-editor/react'
import classes from './CodeEditor.module.css'
import { STATIC_URL } from '../../Global/Global'
import { Value, setStateFn } from '../../types/general'
import { Button, Spin } from 'antd'
import { Theme } from '@monaco-editor/react'

interface Props {
  // value: string
}

const handleGetCodeValue = async (
  script: string,
  setLoading: setStateFn<boolean>,
  setData: setStateFn<Value>,
  URL = STATIC_URL
) => {
  // const url: string = `${URL}/getScriptsContent`
  // const url: string = `${URL}/getScriptsContent/${script}`
  // http://localhost:8101/dms-app
  const url = `${STATIC_URL}/getScriptsContent/${script}`
  try {
    setLoading(true)
    const headers = { 'Content-Type': 'application/json' }
    const res = await fetch(url, { method: 'POST', headers })
    if (!res.ok) throw new Error()
    const data = await res.json()
    const finalData: string = data.content
    setData(finalData)
  } catch (e) {
    console.error('e', e)
  } finally {
    setLoading(false)
  }
}
const handleSubmit = async (URL = STATIC_URL) => {
  // const url = `${URL}/set`
}

const LANGS_ARR = ['typescript', 'javascript']

const CodeEditor: FC<Props> = (props) => {
  const [value, setValue] = useState<Value>(undefined)
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState<string>('')
  const [theme, setTheme] = useState<Theme>('vs-dark')
  const [openConfModal, setOpenConfModal] = useState<boolean>(false)

  const {} = props
  useEffect(() => {
    setLang(LANGS_ARR[0])
    handleGetCodeValue('script1', setLoading, setValue)
  }, [])

  const handleEditorChange = (value: Value, event: any) => {
    console.log('value:', value)
    setValue(value)
  }

  if (loading) return <Spin />
  return (
    <div className={classes.container}>
      <Editor
        theme={theme}
        height="90vh"
        language={lang}
        defaultValue={'no value'}
        value={value}
        onChange={handleEditorChange}
      />
      <div>
        <Button
          onClick={() => {
            handleSubmit()
          }}
          type="primary"
        >
          Save changes
        </Button>
        <Button
          onClick={() => {
            handleGetCodeValue('script1', setLoading, setValue)
          }}
          type="primary"
        >
          Reload code
        </Button>
        <Button
          onClick={() => {
            setOpenConfModal(true)
          }}
          type="primary"
        >
          conf
        </Button>
      </div>
    </div>
  )
}

export default CodeEditor
