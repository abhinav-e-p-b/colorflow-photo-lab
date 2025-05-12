
import React from 'react';

const WaveBackground: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-0 pointer-events-none overflow-hidden">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
        className="w-full"
        preserveAspectRatio="none"
      >
        <path 
          fill="#ff6b6b" 
          fillOpacity="0.2" 
          d="M0,288L26.7,277.3C53.3,267,107,245,160,218.7C213.3,192,267,160,320,176C373.3,192,427,256,480,234.7C533.3,213,587,107,640,90.7C693.3,75,747,149,800,186.7C853.3,224,907,224,960,218.7C1013.3,213,1067,203,1120,213.3C1173.3,224,1227,256,1280,272C1333.3,288,1387,288,1413,288L1440,288L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
};

export default WaveBackground;
