import React from "react"
import {Spell} from '../src/__generated__/graphql'
import { gql } from "@apollo/client"

export const DMSPELLS_SPELL = gql`
  fragment DMSpells_Spell on Spell {
    name
    desc
    level
    school {
      name
    }
    ritual
    casting_time
    range
    components
    material
    duration
    classes {
      name
    }
  }
`;

type Props = {
  spell: Spell,
};

export default function DMSpell({spell}: Props) {
  return (
    <div className="flex flex-col border-solid border-2 hover:border-sky-300 bg-slate-100 p-4 rounded">
      <div className="flex flex-row text-xl justify-between">
        <div className="font-semibold text-xl">{spell.name}</div>
        <div>Level: {spell.level}</div>
      </div>
      <div>{spell.desc}</div>
      <BaseRow title="Classes" value={spell?.classes.map(cls => cls.name).join(", ")} />
      <BaseRow title="Casting Time" value={spell.casting_time} />
      <BaseRow title="Range" value={spell.range} />
      <BaseRow title="Duration" value={spell.duration} />
      <BaseRow title="School" value={spell?.school.name} />
      <BaseRow title="Components" value={spell?.components?.join(", ") ?? 'None'} />
      <BaseRow title="Material" value={spell.material ?? 'None'} />
      <BaseRow title="Ritual" value={spell.ritual ? 'true' : 'false'} />
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