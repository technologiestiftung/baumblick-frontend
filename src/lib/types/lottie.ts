export type JSONValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonObject
  | JsonArray

interface JsonObject {
  [property: string]: JSONValue
}

type JsonArray = Array<JSONValue>
