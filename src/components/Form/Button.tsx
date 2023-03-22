import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface ButtonProps extends ChakraButtonProps {
}

export function Button({children,isLoading,type}: ChakraButtonProps, ref) {
  return (
    <ChakraButton
      type={type}
      mt="6"
      colorScheme="blue"
      size="lg"
      isLoading={isLoading}
    >
      {children}
    </ChakraButton>
);
}

