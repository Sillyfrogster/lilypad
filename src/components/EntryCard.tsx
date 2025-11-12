
import React from 'react'
import type { LoreEntry } from '@/types'
import { tagColors } from '@/utils/tagColors'

/**
 * Compact card view for an entry. Clicking the card opens the editor.
 */
interface EntryCardProps {
  entry: LoreEntry
  onClick: (id: number) => void
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onClick }) => {
  const tagClass = tagColors[entry.tags] || 'bg-thistle-500/30 text-thistle-200 border-thistle-400/40'
  const triggerSummary = entry.keys
    ? `Triggers: ${entry.keys.split(',')[0].trim()}${entry.keys.split(',').length > 1 ? '...' : ''}`
    : 'Always active'

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(entry.id)}
      onKeyDown={(e) => (e.key === 'Enter' ? onClick(entry.id) : null)}
      className="p-4 bg-white/40 border border-thistle-300/40 rounded-xl hover:border-carnation_pink-400/60 hover:shadow-xl cursor-pointer transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-thistle-200">{entry.name}</h3>
          <p className="text-xs text-thistle-300 mt-1 line-clamp-2">{entry.content}</p>
        </div>
        <div className="flex flex-col gap-1 ml-3">
          {entry.enabled ? (
            <span className="text-xs px-2 py-0.5 bg-uranian_blue-500/30 text-uranian_blue-200 rounded-full border border-uranian_blue-400/40">Active</span>
          ) : (
            <span className="text-xs px-2 py-0.5 bg-thistle-500/30 text-thistle-300 rounded-full border border-thistle-400/40">Disabled</span>
          )}
          {entry.alwaysOn && (
            <span className="text-xs px-2 py-0.5 bg-fairy_tale-500/30 text-fairy_tale-200 rounded-full border border-fairy_tale-400/40">Always</span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between text-xs mt-3">
        <div className="text-thistle-300">
          {entry.keys ? (
            <span>Triggers: <span className="text-carnation_pink-400 font-medium">{triggerSummary.replace('Triggers: ', '')}</span></span>
          ) : (
            <span className="text-fairy_tale-400 font-medium">{triggerSummary}</span>
          )}
        </div>
        {entry.tags && <span className={`px-2 py-0.5 ${tagClass} rounded-full text-xs border`}>{entry.tags}</span>}
      </div>
    </div>
  )
}

export default EntryCard
