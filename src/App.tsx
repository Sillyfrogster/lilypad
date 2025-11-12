
import React from 'react'
import AnimatedBackground from '@/components/AnimatedBackground'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import EntryList from '@/components/EntryList'
import HelpModal from '@/components/modals/HelpModal'
import EntryEditorModal from '@/components/modals/EntryEditorModal'
import type { LoreEntry } from '@/types'
import { sampleEntries as initial } from '@/data/sampleEntries'
import { ToastProvider, useToast } from '@/utils/toast'

/**
 * App shell coordinates global state (entries, modals) and layout.
 * For simplicity we keep state local; swap to Zustand or Redux if desired.
 */
const Shell: React.FC = () => {
  const { show } = useToast()
  const [helpOpen, setHelpOpen] = React.useState(false)
  const [entries, setEntries] = React.useState<LoreEntry[]>(initial)
  const [editingId, setEditingId] = React.useState<number | null>(null)

  const editing = React.useMemo(() => entries.find(e => e.id === editingId) || null, [entries, editingId])

  const openEditor = (id?: number) => {
    if (id) { setEditingId(id) }
    else {
      const fresh: LoreEntry = { id: Date.now(), name: '', content: '', keys: '', enabled: true, tags: '', alwaysOn: false }
      setEntries(prev => [fresh, ...prev])
      setEditingId(fresh.id)
    }
  }

  const saveEntry = (e: LoreEntry) => {
    setEntries(prev => prev.map(x => x.id === e.id ? e : x))
    setEditingId(null)
    show('✅ Entry saved successfully!')
  }

  const deleteEntry = (id: number) => {
    setEntries(prev => prev.filter(x => x.id !== id))
    setEditingId(null)
    show('🗑️ Entry deleted')
  }

  const totals = React.useMemo(() => {
    const total = entries.length
    const active = entries.filter(e => e.enabled).length
    const alwaysOn = entries.filter(e => e.alwaysOn).length
    return { total, active, alwaysOn }
  }, [entries])

  return (
    <div className="min-h-screen overflow-hidden relative">
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-uranian_blue-900 via-light_sky_blue-800 to-thistle-900" />
      <AnimatedBackground />

      <div className="relative z-10">
        <Header
          onHelp={() => setHelpOpen(true)}
          onImport={() => show('📥 Import feature coming soon!')}
          onExport={() => show('📤 Export feature coming soon!')}
        />

        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-[280px_1fr] gap-6 h-[calc(100vh-88px)] overflow-hidden">
          <Sidebar
            total={totals.total}
            active={totals.active}
            alwaysOn={totals.alwaysOn}
            onNewLorebook={() => show('➕ New lorebook feature coming soon!')}
          />
          <main className="overflow-y-auto">
            <EntryList
              entries={entries}
              onAdd={() => openEditor()}
              onOpen={(id) => openEditor(id)}
            />
          </main>
        </div>
      </div>

      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
      <EntryEditorModal
        open={editing != null}
        entry={editing}
        onSave={saveEntry}
        onDelete={deleteEntry}
        onClose={() => setEditingId(null)}
      />
    </div>
  )
}

const App: React.FC = () => (
  <ToastProvider>
    <Shell />
  </ToastProvider>
)

export default App
