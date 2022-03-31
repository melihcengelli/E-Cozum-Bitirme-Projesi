import { configureStore } from '@reduxjs/toolkit'
import WorkFields from './workfields'
import Open from './modal'
import GetWorkFieldInfo from './boardinfo'
import BoxItemsModal from './boxitemsmodal'
import authReducer from './authSlice'
import boardReducer from './addworkfieldSlice'
import listReducer from './listSlice'
import Addlistopen from './addListModalStore'
import Card from './cardSlice'
import Carddetailopen from './CardDetailModalStore'
import Titleupdate from './titleUpdateModalStore'

export default configureStore({
  reducer: {
    workfields : WorkFields,
    open : Open,
    getworkfieldinfo : GetWorkFieldInfo,
    boxitemsmodal : BoxItemsModal,
    auth : authReducer,
    board : boardReducer,
    list : listReducer,
    addlistopen : Addlistopen,
    card : Card,
    carddetailopen : Carddetailopen,
    titleupdate : Titleupdate,

  }
})