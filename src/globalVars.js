export const API_ROOT = 'http://localhost:3000'
import { v4 as uuid } from 'uuid'

export async function fetchCARDS() {
  return await fetch('http://localhost:3000/cards').then((r) => r.json())
}

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
