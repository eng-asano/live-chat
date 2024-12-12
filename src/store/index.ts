import { atom } from 'jotai'

export type ActiveNav = 'chat' | 'sign-out' | undefined

/** 選択中のナビゲーション */
export const activeNavAtom = atom<ActiveNav>()
