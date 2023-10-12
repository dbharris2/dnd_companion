import { gql } from "@apollo/client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type Monster } from "src/__generated__/graphql";

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

interface Props {
  monster: Monster;
}

export default function DMMonster({ monster }: Props): React.JSX.Element {
  return (
    <div className="flex flex-row space-x-2 hover:border-sky-300 bg-slate-100 border-solid border-2 p-2 rounded w-full">
      {monster.image != null ? (
        <img
          className="object-contain w-1/4"
          src={`https://www.dnd5eapi.co${monster.image}`}
        />
      ) : null}
      <div className="flex flex-col w-full">
        <div className="font-semibold text-xl">{monster.name}</div>
        <div className="italic lowercase">
          {monster.size} {monster.type}, {monster.alignment}
        </div>
        {monster.desc != null ? (
          <ReactMarkdown
            className="prose max-w-none"
            remarkPlugins={[remarkGfm]}
          >{`${monster.desc}`}</ReactMarkdown>
        ) : null}
        <BaseRow
          title="Armor Class"
          value={monster?.armor_class?.[0]?.value ?? 0}
        />
        <BaseRow title="Hit Points" value={monster.hit_points} />
        <ReactMarkdown
          className="prose max-w-none"
          remarkPlugins={[remarkGfm]}
        >{`
  | STR | DEX | CON | INT | WIS | CHA |
  | --- | --- | --- | --- | --- | --- |
  | ${monster.strength} | ${monster.dexterity} | ${monster.constitution} | ${monster.intelligence} | ${monster.wisdom} | ${monster.charisma} |
        `}</ReactMarkdown>
      </div>
    </div>
  );
}

function BaseRow({
  title,
  value,
}: {
  title: string;
  value: number | string;
}): React.JSX.Element {
  return (
    <div className="flex flex-row">
      <div className="font-semibold mr-2">{title}:</div>
      <div>{value}</div>
    </div>
  );
}
