import React from 'react'
import {logo} from '../assets'

function Hero() {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full flex-row mb-10 pt-3'>
        <img src={logo} alt='Sum-logo' className='w-28 object-contain'/>

        <button onClick={()=>window.open('https://github.com/arifh331/Article-Summarizer')} className='black_btn'>
            GitHub
        </button>

      </nav>

      <h1 className='head_text'>
        Summarize Articles with <br className='max-md:hidden' />
        <span className='orange_gradient'>OpenAI GPT-4</span>
      </h1>

      <h2 className='desc'>Make your reading easier on you through this open-source article summarizer that will deliver clear and concise summaries</h2>


    </header>
  )
}

export default Hero