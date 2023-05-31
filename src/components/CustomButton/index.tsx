import { Button } from '@chakra-ui/react';
import { ButtonProps } from 'src/interface/index';

const CustomButton: React.FC<ButtonProps> = ({
  value,
  onClick,
  colorScheme,
  variant,
  className,
  disabled,
  width,
}) => {
  return (
    <>
      <Button
        onClick={(e) => onClick(e)}
        colorScheme={colorScheme}
        variant={variant}
        className={className}
        disabled={disabled}
        width={width}
        mt={2}
      >
        {value}
      </Button>
    </>
  );
};

export default CustomButton;
