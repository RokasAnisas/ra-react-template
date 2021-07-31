import React, { FC } from 'react';

import Caption from '@/components/Caption';

const Home: FC = () => {
  const className = 'home';

  return (
    <div className={className}>
      <Caption label="Edit 'src/views/Home' to see changes on this screen" />
    </div>
  );
};

export default Home;
