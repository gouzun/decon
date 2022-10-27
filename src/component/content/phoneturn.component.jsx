import React, { Suspense } from 'react';

const Spline = React.lazy(() => import('@splinetool/react-spline'));


const PhoneTurn = () => {
  return (
    <div className="h-full w-full">
      <Suspense fallback={<div className='flex justify-center items-center text-md font-bold'>3D IMAGE LOADING...</div>}>
        <Spline scene="https://prod.spline.design/GpXDm7Uh63wnsNSW/scene.splinecode" />
      </Suspense>
    </div >
  );
}

export default PhoneTurn;
