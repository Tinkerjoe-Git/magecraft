import uuid from 'uuid/v4'
export const API_ROOT = 'http://localhost:3000'

export const types = [
  'Creature',
  'Instant',
  'Sorcery',
  'Land',
  'Artifact',
  'Enchantment',
  'Planeswalker',
]

export const keysForDeckShow = {
  Creature: uuid(),
  Instant: uuid(),
  Sorcery: uuid(),
  Land: uuid(),
  Artifact: uuid(),
  Enchantment: uuid(),
  Planeswalker: uuid(),
  Sideboard: uuid(),
}
