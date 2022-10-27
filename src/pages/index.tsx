import type { NextPage } from 'next'
import Layout from '@/structures/Layout'
import { Station } from '../features/hero_Features';

const Home: NextPage = () => {
  return (
    <Layout> 
      <div className='Title'>
        <h1>Spacefolio Navarro Benjamin</h1>
        <h3>en développement...</h3>
      </div>
      <div id="Station"><Station /></div> 
    </Layout>
  )
}

export default Home
