import Navbar from '@/components/common/Navbar'
import Todos from '@/components/home/Todos'
import React from 'react'

const HomePage = () => {
  return (
    <section>
      <Navbar />
      <Todos />
    </section>
  )
}

export default HomePage