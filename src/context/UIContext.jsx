import { useCallback, useReducer, createContext, useMemo } from 'react';

const INIT_STATE = { showConversationList: false, sizeWindow: 'lg', isShowInfor: false };

export const UIContext = createContext({ showConversationList: false, sizeWindow: 'lg', isShowInfor: false });

const uiReducer = (state, action) => {
  switch(action.type) {
    case 'TOGGLE_CONVER_LIST': {
      return {
        ...state,
        showConversationList: !state.showConversationList 
      }
    }
    case 'TOGGLE_CONVER_INFOR': {
      return {
        ...state,
        isShowInfor: !state.isShowInfor
      }
    }
    case 'HIDE_CONVER_INFOR': {
      return {
        ...state,
        isShowInfor: false
      }
    }
    case 'SET_SIZE_WINDOW': {
      return {
        ...state,
        sizeWindow: action.payload
      }
    }
    case 'HIDE_CONVER_LIST': {
      return {
        ...state,
        showConversationList: false
      }
    }
    default:
      return state;
  }
}

const toggleConverList = () => ({type: 'TOGGLE_CONVER_LIST'})
const setSizeWindow = (payload) => ({type: 'SET_SIZE_WINDOW', payload})
const hideConversationList = () => ({type: 'HIDE_CONVER_LIST'})
const toggleConverInfor = () => ({type: 'TOGGLE_CONVER_INFOR'})
const hideConverInfor = () => ({type: 'HIDE_CONVER_INFOR', })


const UIProvider = ({ children }) => {
  const [uiState, dispatch] = useReducer(uiReducer, INIT_STATE);

  const toggleConversationListHandler = useCallback(() => {
    dispatch(toggleConverList());
    dispatch(hideConverInfor());
  }, [])

  const hideConversationListHandler = useCallback(() => {
    dispatch(hideConversationList());
  }, [])

  const setSizeWindowHandler = useCallback((size) => { 
      size < 768 ? dispatch(setSizeWindow('sm'))
      : size < 1023 ? dispatch(setSizeWindow('md'))
        : dispatch(setSizeWindow('lg'))
  }, [])

  const toggleConverInforHandler = useCallback(() => {
    dispatch(toggleConverInfor())
    dispatch(hideConversationList())
  }, [])

  const hideConverInforHandler = useCallback(() => {
    dispatch(hideConverInfor())
  }, [])

  const value = useMemo(() => {
    return {
      ...uiState,
      onToggleConversationList: toggleConversationListHandler,
      onResize: setSizeWindowHandler,
      onHideConversationList: hideConversationListHandler,
      onToggleConverInfor: toggleConverInforHandler,
      onHideConverInfor: hideConverInforHandler
    }
  }, [toggleConversationListHandler, uiState, setSizeWindowHandler])

  return <UIContext.Provider value={value} >
    {children}
  </UIContext.Provider>
}

export default UIProvider;
