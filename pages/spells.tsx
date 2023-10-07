import DMSpell, { DMSPELLS_SPELL } from '../components/spell';
import React, { useState } from 'react';
import { gql, useQuery } from "@apollo/client";
import {Spell} from '../src/__generated__/graphql'
import LoadingIndicator from '../components/loading-indicator';

const SpellsQuery = gql`
  query Spells($name: String, $limit: Int!, $skip: Int) {
    spells(name: $name, limit: $limit, skip: $skip) {
      ...DMSpells_Spell
    }
  }
  ${DMSPELLS_SPELL}
`;

const PAGINATION_AMOUNT = 10;

function useSpellFilters() {
  const [filter, setFilter] = useState<string>();
  const updateFilter = (value: string) => setFilter(value);
  return {
    models: { filter },
    operations: { updateFilter },
  };
}


export default function Spells() {
  const { operations, models } = useSpellFilters();
  const { data, loading, error, fetchMore, refetch } = useQuery(SpellsQuery, {
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: PAGINATION_AMOUNT,
      offset: 0,
    },
  });

  const handleScroll = ({ currentTarget }: {currentTarget: any}) => {
    const shouldFetchMore = currentTarget.scrollTop + currentTarget.clientHeight >= currentTarget.scrollHeight;
    if (shouldFetchMore) {
      fetchMore({
        variables: {skip: data?.spells?.length ?? 0},
      });
    }
  };

  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="flex flex-col h-screen space-y-2 items-center p-2">
      <input 
        className="w-full bg-zinc-200 border-solid border-2 focus:border-sky-300 rounded px-4"
        type="text" 
        placeholder="Search..." 
        onChange={e => operations.updateFilter(e.target.value)}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            refetch({ name: models.filter});
          }
        }} 
        />
        <div className={data?.spells.length === 0 ? "h-0" : "h-full" + "h-full overflow-scroll space-y-2"} onScroll={handleScroll}>
          {data?.spells.map((spell: Spell, index: number) => <DMSpell key={index} spell={spell} />)}
        </div>
        {loading ? <LoadingIndicator /> : null}
    </div>
  )
}