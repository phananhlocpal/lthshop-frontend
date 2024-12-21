export default function Banner() {
  return (
    <div className="relative overflow-hidden bg-white mt-10 mb-10">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Summer styles are finally here
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              This year, our new summer collection will shelter you from the
              harsh elements of a world that doesn't care if you live or die.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dahzoj4fy/image/upload/v1733241720/l9eaozhwnhwarg4k0syo.png"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dahzoj4fy/image/upload/v1733241753/rooxlgx9rrkowtqpn0zu.webp"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dahzoj4fy/image/upload/v1733242102/m9var44z2iqi2wvd9j6g.webp"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dahzoj4fy/image/upload/v1734741745/h4koj8o7f5n1e9mfyrat.webp"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dahzoj4fy/image/upload/v1734742002/d6iwxlshjbzej2hdkfu2.webp"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dahzoj4fy/image/upload/v1734742500/e5hcuwc2o1wryb6vyhtr.webp"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dahzoj4fy/image/upload/v1734742151/bnkewv4b5aenxdehqcaa.webp"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="mt-4 px-6 py-3 text-white text-sm rounded-full transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
