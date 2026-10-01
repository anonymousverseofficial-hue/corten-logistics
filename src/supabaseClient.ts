import { createClient } from '@supabase/supabase-js'

declare global {
	interface ImportMeta {
		readonly env: {
			readonly VITE_SUPABASE_URL: string
			readonly VITE_SUPABASE_ANON_KEY: string
		}
	}
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)