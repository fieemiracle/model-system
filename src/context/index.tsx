import { ReactNode, createContext, useState } from 'react'
import { DialogueI } from '../service/types'

type ContextProviderProps = {
  children: ReactNode
}

type ContextControllerProps = {
  history: DialogueI[],
  setHistory: (history: DialogueI[]) => void,
  isRendering: boolean,
  setIsRendering: (rendering: boolean) => void
}
export const ConfigControllerContext = createContext<ContextControllerProps | null>({
  history: [],
  setHistory: () => {},
  isRendering: false,
  setIsRendering: () => {},
})


export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [history, setHistory] = useState<DialogueI[]>([])
  const [isRendering, setIsRendering] = useState(false)

  return (
    <ConfigControllerContext.Provider
      value={{
        history, setHistory,
        isRendering, setIsRendering
      }}
    >
      {children}
    </ConfigControllerContext.Provider>
  )
}
