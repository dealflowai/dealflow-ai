import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { supabase } from './supabase'

export const useSupabaseAuth = () => {
  const { isSignedIn, getToken } = useAuth()

  useEffect(() => {
    if (!isSignedIn) return

    ;(async () => {
      const jwt = await getToken({ template: 'supabase' })
      if (!jwt) return
      // v2 API ↓
      await supabase.auth.setSession({
        access_token: jwt,
        refresh_token: ''  // can be empty when you only need RLS
      })
    })()
  }, [isSignedIn])
}
