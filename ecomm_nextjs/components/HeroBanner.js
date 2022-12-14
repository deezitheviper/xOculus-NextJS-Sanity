import React from 'react'
import Link from 'next/link'
import { urlFor } from '../utils/client'

const HeroBanner = ({heroBanner}) => {
  return (
    
    <div className='hero-banner-container'>
      <div className='overlay-bg'>
      <div>
        <p>
          {heroBanner.smallText}
        </p>
        <h3>{heroBanner.midText}</h3>
        <br/>     
        <h1>{heroBanner.largeText1}</h1> 
        <img src={urlFor(heroBanner.image[0]).url()} alt='' className='hero-banner-image' />

        <div>
          <Link href={'/product/meta-quest-2-special-edition'}>
            <button type='button'>
              {heroBanner.buttonText}
            </button>
          </Link>
          <div className='desc'>
            <h5>Description </h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default HeroBanner