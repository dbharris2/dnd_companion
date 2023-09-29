import Head from 'next/head';
import useSWR from 'swr';
import Spell from '../components/spell';
import React from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/staticdata', fetcher);
 
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 

      <main>
        {data.spells.map((spell: any) => <Spell spell={spell} />)}
      </main>
    </div>
  )
}
