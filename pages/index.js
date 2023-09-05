import { useState } from 'react';
import MBTIForm from './MBTIForm';
import ImageDisplay from './ImageDisplay';
// import logo from './floz.png';
const logoUrl = "https://i0.wp.com/flozdesign.com/wp-content/uploads/2023/03/cropped-flozlogo2white-03.png?fit=656%2C294&ssl=1";

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch('/api/openai', {
      method: 'POST',
      body: JSON.stringify({ value: inputValue }),
    });

    if (response.ok) {
      const chat = await response.json();
      setImagePrompt(chat.choices[0].text);
      console.log(chat.choices[0].text);
    } else {
      console.error('Error:', response.statusText);
    }

    const img_response = await fetch('/api/stablediffusion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: `residential architecture, exterior design, high res, ultra detailed, photorealistic, octane render ${imagePrompt}` }),
    });

    if (img_response.ok) {
      const data = await img_response.json();
      setImageUrl(data[0]);
      console.log(data[0]);
    } else {
      console.error('Error:', img_response.statusText);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-green-500 to-cyan-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <MBTIForm inputValue={inputValue} setInputValue={setInputValue} handleSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
      {loading && (
        <div className="mt-12 flex justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      )}
      <div className="mt-12 flex justify-center">
        {imagePrompt && (
          <div className="max-w-md mx-auto">
            <p dangerouslySetInnerHTML={{ __html: `<strong>This is the characteristics of your dream house!</strong> <br /> ${imagePrompt}` }}></p>
          </div>
        )}
      </div>
      <ImageDisplay imageUrl={imageUrl} loading={loading} />
      <div className="mt-12 flex justify-center">
        <a href="https://flodesigners.com/" target="_blank" rel="noopener noreferrer">
          <img src={logoUrl} alt="Logo" />
        </a>
      </div>
      
      <style jsx>{`
        .loader {
          animation: spin 1s linear infinite;
          border-top-color: #3498db;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Home;