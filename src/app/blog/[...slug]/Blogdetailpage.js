'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import parse, { domToReact } from 'html-react-parser';
import gif from '../../assets/image/gif.gif'

const Blogdetails = ({ params }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://www.admin777.pny-trainings.com/api/featuredposts/${params}`, { cache: 'no-store' })
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData.post_detail); // Assuming post_detail is the correct structure
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    window.scrollTo(0, 0)
  }, [params]);


  if (!data) {
    return (
      <div className="loader-wrapper">
        {/* Semi-transparent background */}
        <div className="loader-overlay"></div>
        {/* Loader */}
        <div className="loaderContainer">
          {/* Use the gif as a loader */}
          <Image className="w-52 h-52" src={gif} alt="Loading..." loading='lazy' />
        </div>
      </div>
    );
  }

  const parsedDescription = parse(data.description, {
    replace: domNode => {
      if (domNode.type === 'tag') {
        if (domNode.name === 'p') {
          const props = { className: 'px-32 py-2 max-sm:p-2 text-justiify' };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
        if (domNode.name === 'h1') {
          const props = { className: 'px-32 py-2 max-sm:p-2 text-lg' };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
        if (domNode.name === 'h2') {
          const props = { className: 'px-32 py-2 max-sm:p-2 text-lg' };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
        if (domNode.name === 'h3') {
          const props = { className: 'px-32 py-2 max-sm:p-2 text-lg' };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
        if (domNode.name === 'ul') {
          const props = { className: 'px-32 py-2 max-sm:p-2' };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
        if (domNode.name === 'li') {
          const props = { className: 'px-32 py-2 max-sm:p-2' };
          return <p {...props}>{domToReact(domNode.children)}</p>;
        }
      }
    }
  });

  return (
    <>
      <main className='bg-white text-black'>


        <section className='bg-gray-200'>
          <div className="p-6 min-h-auto">
            <div className="container mx-auto">
              <div className="flex flex-wrap justify-around items-center">
                {/* <!-- Text section --> */}
                <div className="w-full lg:w-1/2 px-4">
                  <h1 className="text-3xl font-bold mb-4 text-center sm:text-left">{data.title}</h1>
                  <p className="mb-4 text-center sm:text-left">{data.description_short}</p>
                  <p className="text-center sm:text-left">Publish date: {data.published_date}</p>
                </div>

                {/* <!-- Image section --> */}
                <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-700 p-2 mt-4 lg:mt-0">
                  {/* <!-- Responsive image container --> */}
                  <div className="w-full">
                    <img className="w-full h-52 md:h-96" src={data.post_image_thumb} alt="" loading='lazy' />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {parsedDescription}
      </main>
    </>
  );
}

export default Blogdetails;
