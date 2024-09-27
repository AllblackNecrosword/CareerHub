import React from 'react'

const Herobanner = () => {
  return (
    <div className="text-center mt-20">
    <div className="flex flex-col gap-5 py-10">
      <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
        No. 1 Job Hunt Website
      </span>
      <h1 className="text-4xl font-bold mb-8">
        Connect with <span className="text-blue-500">Opportunities</span>
      </h1>
      <p className="mb-6 text-lg font-normal">
        Join CareerHub and unlock endless job opportunities tailored just for
        you. Start your job search today.
      </p>
      <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
        <input
          type="search"
          placeholder="Search Job"
          className="outline-none border-none w-full"
        />
        <button className="bg-blue-500 text-white p-2 rounded-r-full md:w-1/3">
          Search
        </button>
      </div>
    </div>
  </div>
  )
}

export default Herobanner
