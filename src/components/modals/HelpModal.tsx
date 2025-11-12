
import React from 'react'

/**
 * Simple modal with beginner tips and a close button.
 */
interface HelpModalProps {
  open: boolean
  onClose: () => void
}

const HelpModal: React.FC<HelpModalProps> = ({ open, onClose }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-thistle-200/40 modal-backdrop flex items-center justify-center z-50 p-6" onClick={(e) => e.target === e.currentTarget ? onClose() : undefined}>
      <div className="glass rounded-2xl shadow-2xl max-w-2xl max-h-[80vh] overflow-auto">
        <div className="border-b border-thistle-300/30 p-6 bg-thistle-500/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-thistle-200">Getting Started with Lorebooks</h2>
            <button onClick={onClose} className="text-2xl text-thistle-300 hover:text-thistle-100 transition-all px-2">×</button>
          </div>
        </div>
        <div className="p-6 space-y-4 text-sm">
          <section>
            <h3 className="font-semibold text-carnation_pink-400 mb-2">Tips for Beginners</h3>
            <ul className="list-disc list-inside space-y-1 text-thistle-200 ml-2">
              <li>Start with 3-5 important entries</li>
              <li>Keep content clear and concise</li>
              <li>Use multiple trigger words</li>
              <li>Test and refine as you go</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default HelpModal
