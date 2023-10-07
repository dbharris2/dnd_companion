import React, { useState } from 'react';
import { gql, useQuery } from "@apollo/client";
import {Monster} from '../src/__generated__/graphql'
import LoadingIndicator from '../components/loading-indicator';
import DMMonster, { DMMONSTERS_MONSTER } from '../components/monster';

const MonstersQuery = gql`
  query Monsters($name: String, $limit: Int!, $skip: Int) {
    monsters(name: $name, limit: $limit, skip: $skip) {
      ...DMMonsters_Monster
    }
  }
  ${DMMONSTERS_MONSTER}
`;

const PAGINATION_AMOUNT = 10;

function useMonsterFilters() {
  const [filter, setFilter] = useState<string>();
  const updateFilter = (value: string) => setFilter(value);
  return {
    models: { filter },
    operations: { updateFilter },
  };
}


export default function Monsters() {
  const { operations, models } = useMonsterFilters();
  const { data, loading, error, fetchMore, refetch } = useQuery(MonstersQuery, {
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
        variables: {skip: data?.monsters?.length ?? 0},
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
        <div className={data?.monsters.length === 0 ? "h-0" : "h-full" + "w-full overflow-scroll space-y-2"} onScroll={handleScroll}>
          {data?.monsters.map((monster: Monster, index: number) => <DMMonster key={index} monster={monster} />)}
        </div>
        {loading ? <LoadingIndicator /> : null}
    </div>
  )
}