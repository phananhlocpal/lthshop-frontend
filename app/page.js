import React from 'react';
import Recommender from '@/components/home/Recommender';
import Banner from '@/components/home/Banner';

function Home() {
  return (
    <>
      <div className='hero'>
        <div className='hero-circle'></div>
        <img className='hero-img' src="https://res.cloudinary.com/dahzoj4fy/image/upload/v1734125970/dlxbl4w8hx7cszxdwlkw.png" alt=""/>
      </div>
      <div className='hero-about'>
        <div>
          <p>LIMITED OFFER</p>
          <h3>SAVE 10%</h3>
          <p>USE DISCOUNT</p>
          <button>10 OFF</button>
        </div>
      </div>
      <Banner></Banner>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_580,c_limit/438be954-bd2c-4741-b0eb-3f9e2202580c/image.png"
                alt="Sabrina 2"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-lg font-bold">Sabrina 2</h3>
                <p className="text-sm">Made For Hoopers Who Do It All</p>
                <button className="mt-3 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200">
                  Shop
                </button>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_580,c_limit/033cfe32-c8b9-4f79-9878-9fd4a1ca3f97/image.png"
                alt="Air Max 90"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-lg font-bold">Air Max 90</h3>
                <p className="text-sm">For Your 90s Vibes</p>
                <button className="mt-3 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200">
                  Shop
                </button>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_580,c_limit/a0e243fe-e765-44da-a1a6-59423bf77788/image.png"
                alt="Kids"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-lg font-bold">Kids</h3>
                <p className="text-sm">Running Gear</p>
                <button className="mt-3 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200">
                  Shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='container'>
        <Recommender />
        <div className="bg-neutral-100 py-16">
          <div className="max-w-screen-xl px-4 mx-auto w-full grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div to="/sneakers/nike">
              <img src="https://images.squarespace-cdn.com/content/v1/5e31b33a1b5911193c47e7b5/279b45e0-3243-4e58-aee2-dd18403e2085/nike-swoosh-logo.jpeg" alt="Nike" className="w-full object-cover sm:h-full" />
              <div className="mt-4">
                <a className="font-semibold uppercase" href="/sneakers/nike">Nike</a>
              </div>
            </div>
            <div to="/sneakers/adidas">
              <img src="https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg" alt="Adidas" className="w-full object-cover sm:h-full" />
              <div className="mt-4">
                <a className="font-semibold uppercase" href="/sneakers/adidas">Adidas</a>
              </div>
            </div>
            <div to="/sneakers/jordan">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/1200px-Jumpman_logo.svg.png" alt="Jordan" className="w-full object-cover sm:h-full" />
              <div className="mt-4">
                <a className="font-semibold uppercase" href="/sneakers/jordan">Jordan</a>
              </div>
            </div>
            <div to="/sneakers/new-balance">
              <img src="https://logowik.com/content/uploads/images/new-balance.jpg" alt="New Balance" className="w-full object-cover sm:h-full" />
              <div className="mt-4">
                <a className="font-semibold uppercase" href="/sneakers/new-balance">New Balance</a>
              </div>
            </div>
          </div>
        </div>
        {/* Sign up */}
        <div className="relative overflow-hidden">
          <img src="https://migogkbh.dk/wp-content/uploads/2023/01/Skaermbillede-2023-01-26-kl.-10.12.43-1200x686.png" alt="" className="absolute h-full w-full object-cover brightness-50" />
          <div className="max-w-screen-xl px-4 mx-auto w-full relative flex flex-col py-24 md:flex-row md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white">Subscribe to our newsletter</h2>
              <p className="mt-4 text-lg text-gray-200">Get the latest news and updates</p>
            </div>
            <div className="mt-6 flex overflow-hidden rounded-md">
              <input type="email" placeholder="Enter your email" className="h-12 w-full border-none bg-black/50 px-4 text-white focus:outline-none" />
              <button className="h-12 whitespace-nowrap bg-black px-4 text-white">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;