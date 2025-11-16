"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitsearch = async () => {
    if (query.trim()) {
      setLoading(true);
      try {
        const response = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            model: 'llama3-8b-8192',
            messages: [
              {
                role: 'user',
                content: `Give a short and simple explanation about: ${query}`,
              },
            ],
            temperature: 0.7,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer REMOVED',
            },
          }
        );

        const result = response.data.choices[0].message.content;
        alert(result); 
      } catch (error) {
        console.error('AI Error:', error);
        alert('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='flex justify-between items-center w-full fixed top-0 left-0 z-10 px-6 py-4 border-b bg-white shadow-md'>
      <div className='lg:text-4xl text-blue-300 font-bold'>HUB</div>

      <div className='lg:hidden'>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>

      <ul className={`lg:flex items-center space-y-4 lg:space-y-0 space-x-0 lg:space-x-6 mt-4 lg:mt-0 
        ${menuOpen ? 'block absolute top-20 left-0 w-full bg-white px-6 py-4 shadow-md' : 'hidden'} 
        lg:static lg:bg-transparent lg:flex-row lg:w-auto`}>

        <li className="hover:bg-green-200 rounded-full cursor-pointer px-5 py-3 flex items-center gap-2 font-bold">
          <span className="material-symbols-outlined text-black">home</span>
          <Link href="/" className="text-black font-bold">Home</Link>
        </li>

        <li className="hover:bg-green-200 rounded-full cursor-pointer px-5 py-3 flex items-center gap-2 font-bold">
          <span className="material-symbols-outlined text-black">settings</span>
          <Link href="/Paidcompain" className="text-black font-bold">Jobs</Link>
        </li>

        <li className="hover:bg-green-200 rounded-full cursor-pointer px-5 py-3 flex items-center gap-2 font-bold">
          <span className="material-symbols-outlined text-black">person</span>
          <Link href="/About" className="text-black font-bold">About Us</Link>
        </li>

        <li>
          <input
            className='ml-0 lg:ml-6 mt-2 lg:mt-0 px-4 py-2 border border-green-200 rounded-full'
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitsearch();
            }}
            placeholder='Search...'
          />
          <button className='text-black ml-2' onClick={submitsearch}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

