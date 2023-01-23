import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox'
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terca-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sabado'
]

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent){
    event.preventDefault()

    if (!title || weekDays.length === 0) {
      return
    }

    await api.post('habits', {
      title,
      weekDays
    })

    setTitle('')
    setWeekDays([])

    alert('Habit created successfully')

  }

  function handleToggleWeekDay(weekDayIndex: number) {
    if(weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercicios, dormir bem, etc... "
        className="p-4 rounded-l mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <label htmlFor="week_days" className="font-semibold leading-tight mt-4">
        Qual a recorrencia?
      </label>

      <div className="mt-6 flex flex-col gap-3">
        {
          availableWeekDays.map((weekDay, idx) => (
            <Checkbox.Root
              key={weekDay}
              className='flex items-center gap-3 group'
              checked={weekDays.includes(idx)}
              onCheckedChange={() => handleToggleWeekDay(idx)}
            >
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 bg-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors"
              >
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white text-xl leading-tight">
                {weekDay}
              </span>
            </Checkbox.Root>
          ))
        }
      </div>

      <button
        type="submit" 
        className="mt-6 rounded-lg p-4 gap-3 flex items-center font-semibold bg-green-600 justify-center hover:bg-gray-500 transition-colors"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}