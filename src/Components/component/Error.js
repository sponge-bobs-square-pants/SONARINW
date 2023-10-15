// import React from 'react'
// import '../Pages/MainPage.css'
// const Error = () => {
//   return <div className='section section-center text-center'>
//     <h2> There was an error...</h2>
//   </div>
// }

// export default Error

import React, { useState, useEffect } from 'react';
import '../Pages/MainPage.css';

const Error = () => {
  const errorMessages = [
    'There was an error...',
    'There was an error..',
    'There was an error.',
  ];

  const [errorMessageIndex, setErrorMessageIndex] = useState(0);

  useEffect(() => {
    // Function to update the error message index every 0.5 seconds
    const updateErrorMessage = () => {
      // Calculate the next index, looping back to the beginning if necessary
      const nextIndex = (errorMessageIndex + 1) % errorMessages.length;
      setErrorMessageIndex(nextIndex);
    };

    // Set an interval to update the error message index every 0.5 seconds (500 milliseconds)
    const intervalId = setInterval(updateErrorMessage, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [errorMessageIndex]);

  return (
    <div className='section section-center text-center'>
      <h2>{errorMessages[errorMessageIndex]}</h2>
    </div>
  );
};

export default Error;
