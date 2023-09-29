import Head from 'next/head';
import DMSpell, { DMSPELLS_SPELL } from '../components/spell';
import React from 'react';
import { gql } from "@apollo/client";
import createApolloClient from "../apollo-client";
import {Spell} from '../src/__generated__/graphql'

export default function Home({spells}: {spells: Array<Spell>}) {
  if (!spells) return <div>Loading...</div>;
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 

      <main>
        {spells.map((spell: Spell) => <DMSpell spell={spell} />)}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: gql`
      query Spells {
        spells {
          ...DMSpells_Spell
        }
      }
      ${DMSPELLS_SPELL}
    `,
  });
  return {
    props: {
      spells: data.spells,
    },
  };
}
