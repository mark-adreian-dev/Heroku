'use client'

import Header from '@/app/Components/Header'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const error = ({ error }: {error: Error, reset: ()=> void}) => {
  const router = useRouter()
  return (
    <>
      <Header />
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='flex justify-center items-center flex-col'>
          <h6 className='text-center text-white text-6xl font-black mb-6 tablet:text-8xl desktop:text-9xl desktop:leading-[8rem]'>Ops Sorry!</h6>
          <p className='text-center text-lg text-accent w-80 font-normal mb-12 desktop:text-xl desktop:leading-7'>Something went wrong! Please try refreshing the page</p>
          <div className='buttons'>       
            <button className='btn bg-accent border-accent text-darker-blue hover:bg-white mr-4' onClick={() => location.reload()}>
              Refresh
            </button>
            <Link href="/" scroll={false}>
              <button className='btn bg-transparent text-accent border-accent hover:text-darker-blue  hover:bg-accent'>
                Homepage
              </button>
            </Link> 
          </div>
        </div>
      </div>
    </>
  )
}

export default error