import { Spinner } from '@chakra-ui/react';
import { LoaderProps } from 'src/interface';

import './index.css';

const Loader: React.FC<LoaderProps> = ({
  thickness,
  speed,
  color,
  emptyColor,
  size,
}) => {
  return (
    <>
      <Spinner
        thickness={thickness}
        speed={speed}
        color={color}
        emptyColor={emptyColor}
        size={size}
      />
    </>
  );
};

export default Loader;
