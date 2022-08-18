import {
  SUPABASE_ANON_KEY,
  SUPABASE_PASSTHROUGH_API_URL,
} from '@lib/utils/envUtil'

export const reportIssue = async (issue: {
  issueTypeId: number
  treeId: string
}): Promise<void> => {
  const { treeId, issueTypeId } = issue
  const REQUEST_URL = `${SUPABASE_PASSTHROUGH_API_URL}/issues`

  const response = await fetch(REQUEST_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      issue_type_id: issueTypeId,
      gml_id: treeId,
    }),
  })

  if (!response.ok) {
    const error = (await response.json()) as { message: string }
    const errorParsed = JSON.parse(error.message) as { message: string }
    console.error(errorParsed.message)
    throw new Error(errorParsed.message)
  }
}
