
import type { LoreEntry } from '@/types'

/**
 * Seed entries shown on first load.
 */
export const sampleEntries: LoreEntry[] = [
  { id: 1, name: 'Rufus the Hound', content: "Rufus is a golden retriever with a knack for finding lost relics. He belongs to Aria, the city archivist.", keys: 'Rufus, golden retriever, dog', enabled: true, tags: 'character', alwaysOn: false },
  { id: 2, name: 'The Golden City', content: 'An ancient metropolis of gleaming towers and vast archives, where knowledge is the highest treasure.', keys: 'Golden City, city, metropolis', enabled: true, tags: 'location', alwaysOn: false },
  { id: 3, name: 'Magic System', content: "Magic requires spoken incantations in the old tongue. All spells drain the caster's stamina proportionally to their power.", keys: '', enabled: true, tags: 'rules', alwaysOn: true },
  { id: 4, name: 'Aria the Archivist', content: "Aria is the head archivist of the Golden City. She's dedicated, curious, and has encyclopedic knowledge of history.", keys: 'Aria, archivist', enabled: true, tags: 'character', alwaysOn: false },
  { id: 5, name: 'The Old Tongue', content: 'An ancient language used for magic. Few can speak it fluently. Written in flowing, curved script.', keys: 'old tongue, ancient language, magic language', enabled: false, tags: 'lore', alwaysOn: false },
]
