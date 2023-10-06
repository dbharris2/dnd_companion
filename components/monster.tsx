import React from "react"
import {Monster} from '../src/__generated__/graphql'
import { gql } from "@apollo/client"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const DMMONSTERS_MONSTER = gql`
  fragment DMMonsters_Monster on Monster {
    name
    desc
    image
    armor_class {
      value
    }
    hit_points
    strength
    dexterity
    constitution
    intelligence
    wisdom
    charisma
    type
    size
    alignment
  }
`;

type Props = {
  monster: Monster,
};

export default function DMMonster({monster}: Props) {
  return (
    <div className="flex flex-row">
      {monster.image ? <img className="object-cover w-1/4" src={`https://www.dnd5eapi.co${monster.image}`} /> : null}
      <div className="flex flex-col border-solid border-2 hover:border-sky-300 bg-slate-100 p-4 rounded w-full">
        <div className="font-semibold text-xl">{monster.name}</div>
        <div className="italic lowercase">{monster.size} {monster.type}, {monster.alignment}</div>
        {monster.desc ? <ReactMarkdown className="prose max-w-none" remarkPlugins={[remarkGfm]}>{`${monster.desc}`}</ReactMarkdown> : null}
        <BaseRow title="Armor Class" value={monster?.armor_class?.[0]?.value ?? 0} />
        <BaseRow title="Hit Points" value={monster.hit_points} />
        <ReactMarkdown className="prose max-w-none" remarkPlugins={[remarkGfm]}>{`
  | STR | DEX | CON | INT | WIS | CHA |
  | --- | --- | --- | --- | --- | --- |
  | ${monster.strength} | ${monster.dexterity} | ${monster.constitution} | ${monster.intelligence} | ${monster.wisdom} | ${monster.charisma} |
        `}</ReactMarkdown>
      </div>
    </div>
  )
}

function BaseRow({title, value}: {title: string, value: string | number}) {
  return (
    <div className="flex flex-row">
      <div className="font-semibold mr-2">{title}:</div>
      <div>{value}</div>
    </div>
  )
}