import { useContext } from 'react'
import { ConfigControllerContext } from '../index'

export const useConfig = () => {
  const context = useContext(ConfigControllerContext)
  if (!context) {
    throw new Error('useConfig must be used within a ContextProvider')
  }
  return context
}