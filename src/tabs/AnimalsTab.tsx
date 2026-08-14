import { useState } from 'react'
import { useStore, animalTotal } from '../store'
import { Plus, Trash2 } from 'lucide-react'
import type { AnimalType } from '../types'

export default function AnimalsTab() {
  const animals = useStore((s) => s.animals)
  const entries = useStore((s) => s.entries)
  const addAnimal = useStore((s) => s.addAnimal)
  const removeAnimal = useStore((s) => s.removeAnimal)

  const [name, setName] = useState('')
  const [type, setType] = useState<AnimalType>('gaay')
  const [tagNumber, setTagNumber] = useState('')

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    addAnimal(name.trim(), type, tagNumber.trim() || undefined)
    setName('')
    setTagNumber('')
    setType('gaay')
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="bg-emerald-900/50 rounded-2xl p-4 border border-emerald-800 space-y-3">
        <h3 className="text-white font-bold">🐾 Naya Janwar Add Karo</h3>

        <div>
          <label className="text-emerald-400 text-xs font-semibold block mb-1">Prakar</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setType('gaay')}
              className={`py-3 rounded-lg text-base font-bold transition-colors ${
                type === 'gaay' ? 'bg-amber-500 text-emerald-950' : 'bg-emerald-950/60 text-emerald-400 border border-emerald-700'
              }`}
            >
              🐄 Gaay
            </button>
            <button
              type="button"
              onClick={() => setType('bhains')}
              className={`py-3 rounded-lg text-base font-bold transition-colors ${
                type === 'bhains' ? 'bg-blue-500 text-white' : 'bg-emerald-950/60 text-emerald-400 border border-emerald-700'
              }`}
            >
              🐃 Bhains
            </button>
          </div>
        </div>

        <div>
          <label className="text-emerald-400 text-xs font-semibold block mb-1">Naam</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="jaise: Rani, Kaali, etc."
            className="w-full bg-emerald-950/60 text-white border border-emerald-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="text-emerald-400 text-xs font-semibold block mb-1">Tag Number (optional)</label>
          <input
            type="text"
            value={tagNumber}
            onChange={(e) => setTagNumber(e.target.value)}
            placeholder="jaise: 101"
            className="w-full bg-emerald-950/60 text-white border border-emerald-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} /> Janwar Add Karo
        </button>
      </form>

      <div>
        <h3 className="text-emerald-400 text-xs font-semibold uppercase mb-2">
          Mere Janwar ({animals.length})
        </h3>
        {animals.length === 0 ? (
          <p className="text-emerald-600 text-sm text-center py-4">Abhi koi jaanwar add nahi kiya.</p>
        ) : (
          <div className="space-y-2">
            {animals.map((a) => {
              const total = animalTotal(entries, a.id)
              const entryCount = entries.filter((e) => e.animalId === a.id).length
              return (
                <div key={a.id} className="bg-emerald-900/40 rounded-xl p-3 border border-emerald-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{a.type === 'gaay' ? '🐄' : '🐃'}</span>
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {a.name}
                        {a.tagNumber && <span className="text-emerald-500 text-xs ml-1">#{a.tagNumber}</span>}
                      </p>
                      <p className="text-emerald-500 text-xs">
                        {a.type === 'gaay' ? 'Gaay' : 'Bhains'} · {entryCount} entries · {total} L kul
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`${a.name} ko delete karna hai? Saari entries bhi delete ho jayengi.`)) {
                        removeAnimal(a.id)
                      }
                    }}
                    className="text-red-400/70 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
