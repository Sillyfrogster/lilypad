
import React from 'react'
import { Button } from '@/components/ui/Button'

/**
 * Sidebar: current lorebook selector, quick stats, and quick guide.
 * Non-critical actions display toasts (placeholders for now).
 */
interface SidebarProps {
  total: number
  active: number
  alwaysOn: number
  onNewLorebook: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ total, active, alwaysOn, onNewLorebook }) => {
  return (
    <aside className="space-y-4 overflow-y-auto">
      {/* Lorebook Selector */}
      <div className="glass rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm text-thistle-200">Current Lorebook</h2>
          <button onClick={onNewLorebook} className="text-xs text-carnation_pink-400 hover:text-carnation_pink-300 font-semibold">+ New</button>
        </div>
        <select className="w-full bg-white/50 border border-thistle-300/40 rounded-xl px-3 py-2 text-sm text-thistle-200 focus:outline-none focus:ring-2 focus:ring-thistle-400">
          <option>The Golden City</option>
          <option>Fantasy World</option>
          <option>Sci-Fi Setting</option>
        </select>
      </div>

      {/* Quick Stats */}
      <div className="glass rounded-2xl p-4 shadow-xl">
        <h3 className="font-semibold text-sm mb-3 text-thistle-200">Quick Stats</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-thistle-300">Total Entries:</span>
            <span className="font-semibold text-thistle-100">{total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-thistle-300">Active:</span>
            <span className="text-uranian_blue-400 font-semibold">{active}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-thistle-300">Always On:</span>
            <span className="text-fairy_tale-400 font-semibold">{alwaysOn}</span>
          </div>
        </div>
      </div>

      {/* Quick Guide */}
      <div className="glass rounded-2xl p-4 shadow-xl bg-uranian_blue-500/20">
        <h3 className="font-semibold text-sm mb-2 text-uranian_blue-200">💡 Quick Guide</h3>
        <ul className="text-xs space-y-2 text-thistle-200">
          <li>• <strong>Entries</strong> add info to your chats</li>
          <li>• <strong>Triggers</strong> are words that activate them</li>
          <li>• Start simple, add details later!</li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
