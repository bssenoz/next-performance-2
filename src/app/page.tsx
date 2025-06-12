'use client'

import React from 'react';
import PerformancePatterns from '../components/PerformancePatterns'
import TodoList from '../components/todoList'
import Counter from '../components/counter'
import Search from '../components/search'
import Form from '../components/form'

import RHF from '../components/rhf'

const Home = () => {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <RHF />
        
        <TodoList />
        
        <PerformancePatterns />
        
        <Counter />

        <Search />

        <Form />
      </div>
    </main>
  );
};

export default Home;
