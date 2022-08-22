import { reportIssue } from '@lib/requests/reportIssue'
import { supabase } from '@lib/requests/supabase'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const LOCAL_STORAGE_PREFIX = 'issue'

interface RawIssueTypeType {
  id: number
  title: string
  description: string
  image_url: string | null
}

export interface IssueTypeType {
  id: number
  title: string
  description: string
  imageUrl: string | null
  alreadyReported: boolean
}

type UseFeedbackDataType = (
  treeId: string,
  csrfToken: string
) => {
  issues: IssueTypeType[] | null
  isLoading: boolean
  error: string | null
  reportIssue: (issueTypeId: number) => Promise<void>
}

const getIssueTypes = async (treeId: string): Promise<IssueTypeType[]> => {
  const { data, error } = await supabase.from<RawIssueTypeType>('issue_types')
    .select(`
    id,
    title,
    description,
    image_url
  `)

  if (error) throw error
  if (!data || data.length === 0) throw new Error('No issu types found!')
  return data.map((issueTypeType) => ({
    ...issueTypeType,
    imageUrl: issueTypeType.image_url || null,
    alreadyReported: getIfAlreadyReported(issueTypeType.id, treeId),
  }))
}

const addLeadingZeros = (n: number): string => {
  if (n <= 9) return `0${n}`
  return `${n}`
}

const formatDate = (d: Date = new Date()): string =>
  [
    d.getFullYear(),
    '-',
    addLeadingZeros(d.getMonth()),
    '-',
    addLeadingZeros(d.getDate()),
  ].join('')

const cleanLocalStorage = (): void => {
  if (typeof window === 'undefined') return
  const localStorageIssues = Object.keys(localStorage).filter((key) =>
    key.startsWith(`${LOCAL_STORAGE_PREFIX}-`)
  )
  localStorageIssues.forEach((key) => {
    const itemTimestamp = window.localStorage.getItem(key)
    if (itemTimestamp) {
      const date = new Date(itemTimestamp)
      const dateToday = new Date(formatDate())
      if (date > dateToday) return
      window.localStorage.removeItem(key)
    }
  })
}

const getLocalStorageKey = (treeId: string, issueTypeId: number): string =>
  `${LOCAL_STORAGE_PREFIX}-${treeId}-${issueTypeId}`

const getIfAlreadyReported = (issueTypeId: number, treeId: string): boolean => {
  const lsItem = window.localStorage.getItem(
    getLocalStorageKey(treeId, issueTypeId)
  )
  if (!lsItem) return false
  const date = new Date(lsItem)
  const dateToday = new Date(formatDate())
  if (date > dateToday) return true
  return false
}

export const useFeedbackData: UseFeedbackDataType = (treeId, csrfToken) => {
  const {
    data,
    error: sdkError,
    mutate,
  } = useSWR<IssueTypeType[], Error>('issue_types', async () => {
    setIssueError(null)
    return getIssueTypes(treeId)
  })
  const [issueError, setIssueError] = useState<string | null>(null)

  useEffect(() => {
    cleanLocalStorage()
  }, [])

  return {
    issues:
      data?.map((item) => ({
        ...item,
        alreadyReported: getIfAlreadyReported(item.id, treeId),
      })) || null,
    isLoading: data === null,
    error: issueError || sdkError?.message || null,
    reportIssue: async (issueTypeId: number): Promise<void> => {
      setIssueError(null)
      try {
        await reportIssue({ issueTypeId, treeId, csrfToken })
        window.localStorage.setItem(
          getLocalStorageKey(treeId, issueTypeId),
          new Date().toISOString()
        )
        void mutate()
      } catch (error) {
        setIssueError((error as Error).message)
        return
      }
    },
  }
}
