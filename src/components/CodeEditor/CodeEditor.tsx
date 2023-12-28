import React, { FC, useEffect, useState } from 'react'
import { Editor } from '@monaco-editor/react'
import { STATIC_URL } from '../../Global/Global'
import { SetStateFn, TreeNode, Value } from '../../types/general'
import { Button, Spin } from 'antd'
import { Theme } from '@monaco-editor/react'
import classes from './CodeEditor.module.css'

const handleGetCodeValue = async (
  selectedFile: TreeNode,
  setLoading: SetStateFn<boolean>,
  setData: SetStateFn<Value>,
  URL = STATIC_URL
) => {
  const { name, path } = selectedFile
  const url = `${STATIC_URL}/get-file-content/${name}`
  try {
    setLoading(true)
    const headers = { 'Content-Type': 'application/json' }
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ path }),
    })
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

interface CodeEditorProps {
  selectedFile: TreeNode
}
const CodeEditor: FC<CodeEditorProps> = (props) => {
  const { selectedFile } = props
  const [value, setValue] = useState<Value>(undefined)
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState<string>('')
  const [theme, setTheme] = useState<Theme>('vs-dark')
  const [openConfModal, setOpenConfModal] = useState<boolean>(false)

  useEffect(() => {
    setLang(LANGS_ARR[0])
    handleGetCodeValue(selectedFile, setLoading, setValue)
  }, [selectedFile])

  const handleEditorChange = (value: Value, event: any) => {
    setValue(value)
  }

  if (loading) return <Spin />
  return (
    <div className={classes.container}>
      <Editor
        height="90vh"
        theme={theme}
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
            handleGetCodeValue(selectedFile, setLoading, setValue)
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
