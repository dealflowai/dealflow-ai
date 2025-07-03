import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useSupabaseAuth } from '../lib/useSupabaseAuth'

type Buyer = {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  markets: string[] | null
  status: string
}

export default function BuyersPage() {
  useSupabaseAuth()

  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')

  // fetch rows once on mount
  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase
        .from('buyers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) console.error(error)
      else setBuyers(data as Buyer[])
      setLoading(false)
    })()
  }, [])

  // quick-add row
  const addBuyer = async () => {
    if (!name.trim()) return
    const { data, error } = await supabase
      .from('buyers')
      .insert({ name })
      .select()
      .single()                          // v2 syntax
    if (error) console.error(error)
    else setBuyers(prev => [data as Buyer, ...prev])
    setName('')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Buyers</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Buyer name"
          className="border rounded px-3 py-1 w-64"
        />
        <button
          onClick={addBuyer}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {loading ? (
        'Loading…'
      ) : (
        <table className="min-w-full text-left text-sm border">
          <thead>
            <tr className="border-b">
              <th className="py-1 px-2">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Markets</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map(b => (
              <tr key={b.id} className="border-b">
                <td className="py-1 px-2">{b.name}</td>
                <td>{b.email ?? '—'}</td>
                <td>{b.phone ?? '—'}</td>
                <td>{b.markets?.join(', ') ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
