// best would be to generate this using some tool
export interface Database {
  api: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    Views: {}
    // eslint-disable-next-line @typescript-eslint/ban-types
    Functions: {}
    Tables: {
      issue_types: {
        Row: {
          id: number
          title: string
          description: string
          image_url: string | null
        }
        // eslint-disable-next-line @typescript-eslint/ban-types
        Insert: {}
        // eslint-disable-next-line @typescript-eslint/ban-types
        Update: {}
      }
      issues: {
        Row: {
          id: number
          issue_type_id: number
          created_at: string
          tree_id: string
        }
        Insert: {
          id: number
          issue_type_id: number
          created_at: string
          tree_id: string
        }
        Update: {
          id: number
          issue_type_id: number
          created_at: string
          tree_id: string
        }
      }
    }
  }
}
