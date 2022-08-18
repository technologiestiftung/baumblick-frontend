const DOT_REPLACE_CHAR = '---'

export const treeIdToUrlSlug = (treeId: string): string =>
  treeId.replaceAll('.', DOT_REPLACE_CHAR)

export const treeUrlSlugToId = (urlSlug: string): string =>
  urlSlug.replaceAll(DOT_REPLACE_CHAR, '.')
