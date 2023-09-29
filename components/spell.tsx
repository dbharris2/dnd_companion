import React from "react"

type Spell = {
  name: string,
  classes: string,
  level: number,
  school: string,
  ritual: boolean,
  castingTime: string,
  range: string,
  components: string,
  material: string,
  duration: string,
  description: string,
  source: string,
  page: number
}

export default function Spell({spell}: {spell: Spell}) {
  return (
    <div className="flex flex-col border-solid border-2 hover:border-sky-300 bg-slate-100 m-2 p-2 rounded">
      <div className="flex flex-row text-xl justify-between">
        <div className="font-semibold text-xl">{spell.name}</div>
        <div>Level: {spell.level}</div>
      </div>
      <div>{spell.description}</div>
      <BaseRow title="Classes" value={spell.classes} />
      <BaseRow title="Casting Time" value={spell.castingTime} />
      <BaseRow title="Range" value={spell.range} />
      <BaseRow title="Duration" value={spell.duration} />
      <BaseRow title="School" value={spell.school} />
      <BaseRow title="Components" value={spell.components} />
      <BaseRow title="Material" value={spell.material} />
      <BaseRow title="Ritual" value={spell.ritual ? 'true' : 'false'} />
      <div>{spell.source} p.{spell.page}</div>
    </div>
  )
}

function BaseRow({title, value}: {title: string, value: string}) {
  return (
    <div className="flex flex-row">
      <div className="font-semibold mr-2">{title}:</div>
      <div>{value}</div>
    </div>
  )
}