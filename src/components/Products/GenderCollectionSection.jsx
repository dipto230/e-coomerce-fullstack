import React from 'react'
import mensCollectionImg from '../../assets/mens-collection.webp'
import womensCollectionImg from '../../assets/womens-collection.webp';
const GenderCollectionSection = () => {
  return (
      <section className='py-16 px-4 lg:px-0'>
          <div className='container mx-auto flex flex-col md:flex-row gap-8'>
              {/*womens collection*/}
              <div className='relative flex-1'>
                  <img src={womensCollectionImg} alt='womens-collection' className='w-full h-[780px] object-cover' />
                  <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                      <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                          Women's Collection
                      </h2>
                  </div>
              </div>
          </div>

    </section>
  )
}

 

export default GenderCollectionSection