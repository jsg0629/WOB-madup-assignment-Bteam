import { useState } from 'react'
import { useMount } from 'react-use'

export { useClickAway, useInterval, usePrevious, useMount, useUnmount } from 'react-use'
export { useState, useEffect, useLayoutEffect, useCallback, useContext, useMemo, useReducer, useRef } from 'react'

export { useKeys } from './useKeys'
export { useSendApi } from './useSendApi'
export { useTimeoutFn } from './useTimeoutFn'

export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)
  useMount(() => setMounted(true))
  return mounted
}