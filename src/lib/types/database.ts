// best would be to generate this using some tool
export interface Database {
  api: {
    Views: {
      [_ in never]: never
    }
    Functions: {
      /**
       * This Function is not yet implemented in the database
       */
      rainfall: {
        Args: {
          id: string
        }
        Returns: {
          date: string
          rainfall_in_mm: number
        }[]
      }
      login: {
        Args: {
          username: string
          pass: string
        }
        Returns: {
          token: string
        }
      }
    }
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
          issue_type_id: number
          created_at?: string
          tree_id: string
        }
        Update: {
          issue_type_id?: number
          created_at?: string
          tree_id?: string
        }
      }
    }
  }
}
