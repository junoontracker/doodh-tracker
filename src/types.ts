// Animal types
export type AnimalType = 'gaay' | 'bhains'

// A single milk record — one animal, one time slot, one date
export interface MilkEntry {
  id: number
  date: string       // YYYY-MM-DD
  animalId: number
  animalName: string
  animalType: AnimalType
  session: 'morning' | 'evening'  // subah / shaam
  liters: number
  note?: string
  createdAt: number
}

export interface Animal {
  id: number
  name: string
  type: AnimalType
  tagNumber?: string
  createdAt: number
}

export type Tab = 'home' | 'entry' | 'stats'
