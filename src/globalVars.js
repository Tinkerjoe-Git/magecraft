export const API_ROOT = 'http://localhost:3000'

export async function fetchCARDS(arg) {
  return await fetch(`https://localhost:3000/${arg}`).then((r) => r.json())
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

// export const keysForDeckShow = {
//   Creature: uuidv4(),
//   Instant: uuidv4(),
//   Sorcery: uuidv4(),
//   Land: uuidv4(),
//   Artifact: uuidv4(),
//   Enchantment: uuidv4(),
//   Planeswalker: uuidv4(),
//   Sideboard: uuidv4(),
// }
