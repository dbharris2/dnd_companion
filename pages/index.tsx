import Head from 'next/head';
import DMSpell, { DMSPELLS_SPELL } from '../components/spell';
import React from 'react';
import { gql, useQuery } from "@apollo/client";
import {Spell} from '../src/__generated__/graphql'

const SpellsQuery = gql`
  query Spells($limit: Int!, $skip: Int) {
    spells(limit: $limit, skip: $skip) {
      ...DMSpells_Spell
    }
  }
  ${DMSPELLS_SPELL}
`;

const PAGINATION_AMOUNT = 10;

export default function Home() {
  const { data, loading, error, fetchMore } = useQuery(SpellsQuery, {
    variables: {
      limit: PAGINATION_AMOUNT,
    }
  });

  const handleScroll = ({ currentTarget }: {currentTarget: any}) => {
    const shouldFetchMore = currentTarget.scrollTop + currentTarget.clientHeight >= currentTarget.scrollHeight;
    if (shouldFetchMore) {
      fetchMore({
        variables: {limit: PAGINATION_AMOUNT, skip: data?.spells?.length ?? 0},
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 

      <main className="bg-zinc-200">
        <div className="h-screen overflow-scroll" onScroll={handleScroll}>
          {data?.spells.map((spell: Spell, index: number) => <DMSpell key={index} spell={spell} />)}
        </div>
      </main>
    </div>
  )
}
