import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { type Spell } from '../src/__generated__/graphql'
import { gql } from '@apollo/client'

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
`

interface Props {
  spell: Spell
}

export default function DMSpell ({ spell }: Props): React.JSX.Element {
  // Ensure that the markdown renders properly
  const markdown = spell.desc.reduce((accumulator, curr) => {
    // Ensure tables render properly by ensuring all rows stay together
    if (curr.startsWith('|')) return accumulator.concat(curr).concat('\n')
    // Ensure unsupported ##### renders properly
    else if (curr.startsWith('#####')) return accumulator.concat('\n\n').concat(curr.slice(1)).concat(' ####\n')
    // Add a newline between paragraphs
    else return accumulator.concat('\n\n').concat(curr)
  })
  return (
    <div className="flex flex-col border-solid border-2 hover:border-sky-300 bg-slate-100 p-4 rounded">
      <div className="flex flex-row text-xl justify-between">
        <div className="font-semibold text-xl">{spell.name}</div>
        <div>Level: {spell.level}</div>
      </div>
      <ReactMarkdown className="prose max-w-none" remarkPlugins={[remarkGfm]}>{`${markdown}`}</ReactMarkdown>
      <span><br /></span>
      <BaseRow title="Classes" value={spell?.classes.map(cls => cls.name).join(', ')} />
      <BaseRow title="Casting Time" value={spell.casting_time} />
      <BaseRow title="Range" value={spell.range} />
      <BaseRow title="Duration" value={spell.duration} />
      <BaseRow title="School" value={spell?.school.name} />
      <BaseRow title="Components" value={spell?.components?.join(', ') ?? 'None'} />
      <BaseRow title="Material" value={spell.material ?? 'None'} />
      <BaseRow title="Ritual" value={spell.ritual ? 'true' : 'false'} />
    </div>
  )
}

function BaseRow ({ title, value }: { title: string, value: string }): React.JSX.Element {
  return (
    <div className="flex flex-row">
      <div className="font-semibold mr-2">{title}:</div>
      <div>{value}</div>
    </div>
  )
}
