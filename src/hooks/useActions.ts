import { useDispatch } from "react-redux"
import { useMemo } from "react"
import {bindActionCreators} from '@reduxjs/toolkit'
import { actions } from "../store/favorites/favorites.slise"
const rootActions = {
    ...actions,
}
export const useAction = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions,dispatch), [dispatch])
}