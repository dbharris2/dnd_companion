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
        {monster.desc ? <ReactMarkdown className="prose max-w-none" remarkPlugins={[remarkGfm]}>{`${monster.desc}`}</ReactMarkdown> : null}
      </div>
    </div>
  )
}