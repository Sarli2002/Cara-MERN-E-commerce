import React from 'react';
import BannerBox from '../SmallBannerBox/SmallBannerBox';
import BannerBoxData from "../assets/SmallBannerBoxData";
import "./SmallBanner.css"
function Smallbaner() {
  return (
    <div className='sm-banner section-p1'>
      {BannerBoxData.map((banner, i) => (
        <BannerBox
          key={i}
          id={banner.id}
          heading={banner.heading}
          deal={banner.deal}
          backgroundImage={banner.backgroundImage}  // Corrected prop name
          des={banner.des}
        />
      ))}
    </div>
  );
}

export default Smallbaner;
