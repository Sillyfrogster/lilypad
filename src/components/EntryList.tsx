
import React, { useMemo, useState } from 'react'
import type { LoreEntry } from '@/types'
import EntryCard from '@/components/EntryCard'

/**
 * List of entries with a simple search filter and add button.
 */
interface EntryListProps {
  entries: LoreEntry[]
  onAdd: () => void
  onOpen: (id: number) => void
}

const EntryList: React.FC<EntryListProps> = ({ entries, onAdd, onOpen }) => {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return entries
    return entries.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.content.toLowerCase().includes(q) ||
      e.keys.toLowerCase().includes(q) ||
      e.tags.toLowerCase().includes(q)
    )
  }, [entries, query])

  return (
    <div className="glass rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg text-thistle-200">Entries ({filtered.length})</h2>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search entries..."
            className="px-4 py-2 bg-white/50 border border-thistle-300/40 rounded-xl text-sm text-thistle-200 placeholder-thistle-300 focus:outline-none focus:ring-2 focus:ring-thistle-400 w-64"
          />
          <button onClick={onAdd} className="px-4 py-2 bg-carnation_pink-500 hover:bg-carnation_pink-400 rounded-xl text-sm font-semibold text-white shadow-lg transition-all">
            + Add Entry
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {filtered.map(e => <EntryCard key={e.id} entry={e} onClick={onOpen} />)}
      </div>
    </div>
  )
}

export default EntryList
