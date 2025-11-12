
import React, { useMemo, useState } from 'react'
import type { LoreEntry, InsertionPosition, ScanStrategy } from '@/types'
import { tagColors } from '@/utils/tagColors'

/**
 * Full-screen editor modal supporting both Simple and Advanced modes.
 * All local state is derived from a `draft` clone to allow cancelation.
 */
interface EntryEditorModalProps {
  open: boolean
  entry: LoreEntry | null
  onSave: (entry: LoreEntry) => void
  onDelete: (id: number) => void
  onClose: () => void
}

const EntryEditorModal: React.FC<EntryEditorModalProps> = ({ open, entry, onSave, onDelete, onClose }) => {
  const [mode, setMode] = useState<'simple' | 'advanced'>('simple')

  const [draft, setDraft] = useState<LoreEntry | null>(entry)
  React.useEffect(() => setDraft(entry), [entry])

  const tagClass = useMemo(() => draft?.tags ? (tagColors[draft.tags] || 'bg-thistle-500/30 text-thistle-200 border-thistle-400/40') : '', [draft?.tags])

  if (!open || !draft) return null

  const update = <K extends keyof LoreEntry>(key: K, value: LoreEntry[K]) => {
    setDraft(prev => prev ? { ...prev, [key]: value } : prev)
  }

  const handleSave = () => {
    if (draft) onSave(draft)
  }

  return (
    <div
      className="fixed inset-0 bg-thistle-200/40 modal-backdrop flex items-center justify-center z-50 p-6"
      onClick={(e) => e.target === e.currentTarget ? onClose() : undefined}
    >
      <div className="glass rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b border-thistle-300/30 p-6 bg-thistle-500/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-thistle-200">{draft.name || 'New Entry'}</h2>
            <div className="flex gap-2 items-center">
              <label className="flex items-center gap-2 text-sm text-thistle-200">
                <input type="checkbox" checked={!!draft.enabled} onChange={(e) => update('enabled', e.target.checked)} className="accent-thistle-500" />
                <span>Enabled</span>
              </label>
              <button onClick={() => onDelete(draft.id)} className="px-3 py-1.5 border border-carnation_pink-400/50 text-carnation_pink-300 rounded-lg text-sm hover:bg-carnation_pink-500/10 transition-all">
                🗑️ Delete
              </button>
              <button onClick={onClose} className="text-2xl text-thistle-300 hover:text-thistle-100 transition-all px-2">×</button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="p-6">
            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6 border-b border-thistle-300/30 pb-4">
              <button
                className={`mode-tab px-4 py-2 text-sm font-medium border-b-2 ${mode === 'simple' ? 'border-thistle-500 text-thistle-200' : 'border-transparent text-thistle-300 hover:text-thistle-200'}`}
                onClick={() => setMode('simple')}
              >
                Simple
              </button>
              <button
                className={`mode-tab px-4 py-2 text-sm font-medium border-b-2 ${mode === 'advanced' ? 'border-thistle-500 text-thistle-200' : 'border-transparent text-thistle-300 hover:text-thistle-200'}`}
                onClick={() => setMode('advanced')}
              >
                Advanced
              </button>
            </div>

            {mode === 'simple' ? (
              <div className="space-y-6">
                {/* Entry Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-thistle-200">Entry Name</label>
                  <input
                    type="text"
                    value={draft.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="e.g., Rufus the Dog"
                    className="w-full px-4 py-2 bg-white/50 border border-thistle-300/40 rounded-xl focus:border-thistle-400 focus:outline-none focus:ring-2 focus:ring-thistle-400 text-thistle-200 placeholder-thistle-300"
                  />
                  <p className="text-xs text-thistle-300 mt-1">A friendly name to identify this entry</p>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-thistle-200">What does this entry describe?</label>
                  <textarea
                    rows={6}
                    value={draft.content}
                    onChange={(e) => update('content', e.target.value)}
                    placeholder="Example: Rufus is a friendly golden retriever..."
                    className="w-full px-4 py-2 bg-white/50 border border-thistle-300/40 rounded-xl focus:border-thistle-400 focus:outline-none focus:ring-2 focus:ring-thistle-400 resize-none text-thistle-200 placeholder-thistle-300"
                  />
                  <p className="text-xs text-thistle-300 mt-1">This is what the AI will see. Write naturally!</p>
                </div>

                {/* Trigger Words */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-thistle-200">When should this appear? (Trigger Words)</label>
                  <input
                    type="text"
                    value={draft.keys}
                    onChange={(e) => update('keys', e.target.value)}
                    placeholder="Rufus, dog, retriever"
                    className="w-full px-4 py-2 bg-white/50 border border-thistle-300/40 rounded-xl focus:border-thistle-400 focus:outline-none focus:ring-2 focus:ring-thistle-400 text-thistle-200 placeholder-thistle-300"
                  />
                  <p className="text-xs text-thistle-300 mt-1">Separate words with commas. Entry activates when ANY appear.</p>
                  <div className="mt-3 p-3 bg-uranian_blue-500/20 border border-uranian_blue-400/40 rounded-xl">
                    <p className="text-xs text-uranian_blue-200">
                      <strong>💡 Tip:</strong> For "Rufus", try: <code className="bg-thistle-400/30 px-2 py-0.5 rounded">Rufus, dog, retriever</code>
                    </p>
                  </div>
                </div>

                {/* Always Active */}
                <div className="p-4 bg-fairy_tale-500/20 border border-fairy_tale-400/40 rounded-xl">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!draft.alwaysOn}
                      onChange={(e) => update('alwaysOn', e.target.checked)}
                      className="mt-1 accent-thistle-500"
                    />
                    <div>
                      <div className="font-semibold text-sm text-thistle-200">Make this always active</div>
                      <p className="text-xs text-thistle-300 mt-1">For important world rules that should always be included.</p>
                    </div>
                  </label>
                </div>

                {/* Category Tags */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-thistle-200">Category (Optional)</label>
                  <div className="flex gap-2 flex-wrap mb-2">
                    {['character','location','item','lore','rules'].map(tag => (
                      <button
                        key={tag}
                        onClick={(e) => { e.preventDefault(); update('tags', tag) }}
                        className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${draft.tags === tag ? 'ring-2 ring-carnation_pink-400' : ''} ${tagColors[tag] || 'bg-thistle-500/20 border-thistle-400/40 text-thistle-200'}`}
                      >
                        {tag[0].toUpperCase()+tag.slice(1)}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={draft.tags || ''}
                    onChange={(e) => update('tags', e.target.value)}
                    placeholder="Or type custom tags..."
                    className="w-full px-4 py-2 bg-white/50 border border-thistle-300/40 rounded-xl focus:border-thistle-400 focus:outline-none focus:ring-2 focus:ring-thistle-400 text-thistle-200 placeholder-thistle-300"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-fairy_tale-500/20 border border-fairy_tale-400/40 rounded-xl mb-4">
                  <p className="text-sm text-fairy_tale-200">⚠️ <strong>Advanced Settings</strong> - Fine-tune how entries behave. Most users won't need these!</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Position */}
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2 text-thistle-200">
                      Insertion Position
                      <span className="cursor-help text-thistle-300" title="Where in the context this entry appears">ℹ️</span>
                    </label>
                    <select
                      value={draft.position || 'after_char'}
                      onChange={(e) => update('position', e.target.value as InsertionPosition)}
                      className="w-full px-4 py-2 bg-white/50 border border-thistle-300/40 rounded-xl text-thistle-200 focus:outline-none focus:ring-2 focus:ring-thistle-400"
                    >
                      <option value="after_char">After character card (recommended)</option>
                      <option value="before_char">Before character card</option>
                      <option value="top">Top of context</option>
                      <option value="bottom">Bottom of context</option>
                      <option value="depth">At specific depth</option>
                    </select>
                  </div>

                  {/* Order */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2 text-thistle-200">
                      Priority (Order)
                      <span className="cursor-help text-thistle-300" title="Lower numbers insert first">ℹ️</span>
                    </label>
                    <input
                      type="number"
                      value={draft.order ?? 100}
                      onChange={(e) => update('order', Number(e.target.value))}
                      min={0} max={1000}
                      className="w-full px-4 py-2 bg-white/50 border border-thistle-300/40 rounded-xl text-thistle-200 focus:outline-none focus:ring-2 focus:ring-thistle-400"
                    />
                  </div>

                  {/* Depth */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2 text-thistle-200">
                      Depth
                      <span className="cursor-help text-thistle-300" title="Messages from end (0 = most recent)">ℹ️</span>
                    </label>
                    <input
                      type="number"
                      value={draft.depth ?? 4}
                      onChange={(e) => update('depth', Number(e.target.value))}
                      min={0}
                      className="w-full px-4 py-2 bg-white/50 border border-thistle-300/40 rounded-xl text-thistle-200 focus:outline-none focus:ring-2 focus:ring-thistle-400"
                    />
                  </div>

                  {/* Secondary Keys */}
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2 text-thistle-200">
                      Secondary Keys (AND logic)
                      <span className="cursor-help text-thistle-300" title="ALL these words must appear">ℹ️</span>
                    </label>
                    <input
                      type="text"
                      value={draft.secondaryKeys || ''}
                      onChange={(e) => update('secondaryKeys', e.target.value)}
                      placeholder="Optional - leave empty"
                      className="w-full px-4 py-2 bg-white/50 border border-thistle-300/40 rounded-xl text-thistle-200 placeholder-thistle-300 focus:outline-none focus:ring-2 focus:ring-thistle-400"
                    />
                  </div>

                  {/* Probability */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2 text-thistle-200">
                      Probability (%)
                      <span className="cursor-help text-thistle-300" title="Activation chance">ℹ️</span>
                    </label>
                    <input
                      type="number"
                      value={draft.probability ?? 100}
                      onChange={(e) => update('probability', Number(e.target.value))}
                      min={0} max={100}
                      className="w-full px-4 py-2 bg-white/50 border border-thistle-300/40 rounded-xl text-thistle-200 focus:outline-none focus:ring-2 focus:ring-thistle-400"
                    />
                  </div>

                  {/* Strategy */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-thistle-200">Scan Strategy</label>
                    <select
                      value={draft.strategy || 'keyword'}
                      onChange={(e) => update('strategy', e.target.value as ScanStrategy)}
                      className="w-full px-4 py-2 bg-white/50 border border-thistle-300/40 rounded-xl text-thistle-200 focus:outline-none focus:ring-2 focus:ring-thistle-400"
                    >
                      <option value="keyword">Keyword Match</option>
                      <option value="always">Always Active</option>
                      <option value="vector" disabled>Vector Search (Coming Soon)</option>
                    </select>
                  </div>

                  {/* Flags */}
                  <div className="col-span-2 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer text-thistle-200">
                      <input type="checkbox" checked={!!draft.caseSensitive} onChange={(e) => update('caseSensitive', e.target.checked)} className="accent-thistle-500" />
                      <span className="text-sm">Case sensitive matching</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-thistle-200">
                      <input type="checkbox" checked={draft.wholeWords ?? true} onChange={(e) => update('wholeWords', e.target.checked)} className="accent-thistle-500" />
                      <span className="text-sm">Match whole words only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-thistle-200">
                      <input type="checkbox" checked={!!draft.useRegex} onChange={(e) => update('useRegex', e.target.checked)} className="accent-thistle-500" />
                      <span className="text-sm">Enable regular expressions</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-thistle-300/30 p-4 bg-thistle-500/10 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border border-thistle-300/40 text-thistle-200 rounded-xl text-sm hover:bg-white/10 transition-all">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-uranian_blue-500 hover:bg-uranian_blue-400 text-white rounded-xl text-sm font-semibold shadow-lg transition-all">
            💾 Save Entry
          </button>
        </div>
      </div>
    </div>
  )
}

export default EntryEditorModal
