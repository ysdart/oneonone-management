import { useCallback, useState } from 'react'

export default function useToggle(initial: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initial)
  const toggle = useCallback(() => setValue((v) => !v), [])
  return [value, toggle]
}


