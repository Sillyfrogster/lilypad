
import React from 'react'
import { Button } from '@/components/ui/Button'

/**
 * Top bar with brand, actions, and entry-points to modals.
 */
interface HeaderProps {
  onHelp: () => void
  onImport: () => void
  onExport: () => void
}

const Header: React.FC<HeaderProps> = ({ onHelp, onImport, onExport }) => {
  return (
    <header className="border-b border-thistle-300/30 bg-white/20 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-thistle-500 to-carnation_pink-500 flex items-center justify-center text-2xl shadow-lg">
            🪷
          </div>
          <div>
            <h1 className="text-2xl font-bold text-thistle-200">Lilypad</h1>
            <p className="text-xs text-thistle-300">Your World in Words</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onHelp}>❓ Help</Button>
          <Button variant="outline" onClick={onImport}>📥 Import</Button>
          <Button onClick={onExport}>📤 Export</Button>
        </div>
      </div>
    </header>
  )
}

export default Header
