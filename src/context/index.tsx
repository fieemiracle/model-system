import { ReactNode, createContext, useState } from 'react'
import { DialogueI } from '../service/types'

type ContextProviderProps = {
  children: ReactNode
}

type ContextControllerProps = {
  history: DialogueI[],
  setHistory: (history: DialogueI[]) => void
  isRendering: boolean,
  setIsRendering: (rendering: boolean) => void
  showSider: boolean
  setShowSider: (rendering: boolean) => void
  dark: boolean
  setDark: (rendering: boolean) => void
}
export const ConfigControllerContext = createContext<ContextControllerProps | null>({
  history: [],
  setHistory: () => {},
  isRendering: false,
  setIsRendering: () => {},
  showSider: true,
  setShowSider: () => {},
  dark: false,
  setDark: () => {}
})


export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [history, setHistory] = useState<DialogueI[]>([])
  const [isRendering, setIsRendering] = useState(false)
  const [showSider, setShowSider] = useState(true)
  const [dark, setDark] = useState(false)

  return (
    <ConfigControllerContext.Provider
      value={{
        history, setHistory,
        isRendering, setIsRendering,
        showSider, setShowSider,
        dark, setDark
      }}
    >
      {children}
    </ConfigControllerContext.Provider>
  )
}
