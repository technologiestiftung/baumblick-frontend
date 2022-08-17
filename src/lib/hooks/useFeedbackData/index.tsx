import { supabase } from '@lib/requests/supabase'
import { useEffect } from 'react'
import useSWR from 'swr'

const LOCAL_STORAGE_PREFIX = 'issue-'

interface RawIssueType {
  issue_type_id: string
  gml_id: string
}

interface RawIssueTypeType {
  id: string
  title: string
  description: string
  image_id?: {
    image_url: string
  } | null
}

export interface IssueTypeType {
  id: string
  title: string
  description: string
  imageUrl: string | null
  alreadySubmitted: boolean
}

type UseFeedbackDataType = (treeId: string) => {
  issues: IssueTypeType[] | null
  isLoading: boolean
  error: Error | null
  reportIssue: (issueTypeId: string) => Promise<void>
}

const getIssueTypeTypes = async (treeId: string): Promise<IssueTypeType[]> => {
  const { data, error } = await supabase.from<RawIssueTypeType>('issue_types')
    .select(`
    id,
    title,
    description,
    image_id (
      image_url
    )
  `)

  if (error) throw error
  if (!data || data.length === 0) throw new Error('No issu types found!')
  return data.map((issueTypeType) => ({
    ...issueTypeType,
    imageUrl: issueTypeType.image_id?.image_url || null,
    alreadySubmitted: getIfAlreadySubmitted(issueTypeType.id, treeId),
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

const getLocalStorageKey = (treeId: string, issueTypeId: string): string =>
  `${LOCAL_STORAGE_PREFIX}-${treeId}-${issueTypeId}`

const getIssueReporter =
  (treeId: string) =>
  async (issueTypeId: string): Promise<void> => {
    const { error } = await supabase.from<RawIssueType>('issue').insert({
      issue_type_id: issueTypeId,
      gml_id: treeId,
    })
    if (error) throw error
    window.localStorage.setItem(
      getLocalStorageKey(treeId, issueTypeId),
      new Date().toISOString()
    )
  }

const getIfAlreadySubmitted = (
  issueTypeId: string,
  treeId: string
): boolean => {
  const lsItem = window.localStorage.getItem(
    getLocalStorageKey(treeId, issueTypeId)
  )
  if (!lsItem) return false
  const date = new Date(lsItem)
  const dateToday = new Date(formatDate())
  if (date > dateToday) return true
  return false
}

export const useFeedbackData: UseFeedbackDataType = (treeId) => {
  const { data, error } = useSWR<IssueTypeType[], Error>('issue_types', () =>
    getIssueTypeTypes(treeId)
  )

  useEffect(() => {
    cleanLocalStorage()
  }, [])

  return {
    issues:
      data?.map((item) => ({
        ...item,
        alreadySubmitted: getIfAlreadySubmitted(item.id, treeId),
      })) || null,
    isLoading: data === null,
    error: error || null,
    reportIssue: getIssueReporter(treeId),
  }
}
