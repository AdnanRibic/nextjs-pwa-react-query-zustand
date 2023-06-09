import Head from 'next/head'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'
import { useStore } from '../store/index'

const A = () => {
  const characters = useStore(state => state.characters);
  const setCharacters = useStore(state => state.setCharacters);

  const fetchCharacters = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    return response.json()
  }

  useQuery({
    queryKey: ['characters'],
    queryFn: () => fetchCharacters(),
    onSuccess: (data) => setCharacters(data.results),
    networkMode: 'always',
  })

  return (
  <>
    <Head>
      <title>next-pwa example | Route a</title>
    </Head>
    <h1>This is route /a</h1>
    <h2>
      <Link href='/'>Go to Home</Link>
    </h2>
    <h2>
      <Link href='/a'>Go to route /a</Link>
    </h2>
    <h2>
      <Link href='/b'>Go to route /b</Link>
    </h2>
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Status</th>
          <th>Species</th>
        </tr>
      </thead>
      <tbody>
        {characters ? characters.map((character, index) => (
          <tr key={index}>
            <td><img src={character.image} alt={character.name} width="100"/></td>
            <td>{character.name}</td>
            <td>{character.status}</td>
            <td>{character.species}</td>
          </tr>
        )) : <div>Nothing to see...</div>}
      </tbody>
    </table>
  </>
)}

export default A
