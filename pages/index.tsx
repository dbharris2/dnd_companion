import React from 'react'
import Link from 'next/link'

export default function Home (): React.JSX.Element {
  const buttons = [
    { href: '/spells', value: 'Spells' },
    { href: '/monsters', value: 'Monsters' }
  ]
  return (
    <div className="flex flex-col space-y-2">
      <div className="bg-red-600 text-white p-6 text-xl font-semibold">
        D&D Companion
      </div>
      <div className="flex flex-col p-2 space-y-2">
      {buttons.map(button =>
        <Link key={button.value} href={button.href} passHref>
          <button
            type="button"
            className="w-full rounded bg-slate-800 hover:bg-slate-500 text-white text-xs uppercase p-4 font-bold">
            {button.value}
          </button>
        </Link>)}
      </div>
    </div>

  )
}
