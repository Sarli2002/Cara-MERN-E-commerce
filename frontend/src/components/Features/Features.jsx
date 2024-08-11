import React from 'react';
import "./Features.css";
import features_data from '../assets/features_data';
import FeatureBox from '../FeatureBox/FeatureBox';

function Features() {
  return (
    <div className='features section-p1'>
      {features_data.map((feBox, i) => (
        <FeatureBox key={i} id={feBox.id} name={feBox.name} image={feBox.image} />
      ))}
    </div>
  );
}

export default Features;

