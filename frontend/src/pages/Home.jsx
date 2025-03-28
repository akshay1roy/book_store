import React from 'react'
import Header from '../components/Header'
import SpecilityMenu from '../components/SpecilityMenu'
import Recommended from '../components/Recommended'
import Banner from '../components/Banner'
import TrendingBooks from '../components/TrendingBooks'

export default function Home() {
  return (
    <div>
      <Header/>
      <SpecilityMenu/>
      <TrendingBooks/>
      <Recommended/>
      <Banner/>
    </div>
  )
}
