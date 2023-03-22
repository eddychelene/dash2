import { Flex, Stack, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { useContext } from 'react';
import { Input } from '../components/Form/Input';
import { Button } from '../components/Form/Button';
import { AuthContext } from '../contexts/AuthContext';
import Head from 'next/head';
import { withSSRGuest } from '../utils/withSSRGuest';

import  Logo  from '../assets/logo.png';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
});

export default function SignIn() {
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async data => {
    await signIn(data);
  };

  return (
    <>
      <Head>
        <title>Login | MK Seguros</title>
      </Head>
      <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center" flexDirection='column'>
        <Image src={Logo} alt="Logotipo" width={200} height={50}/>
        <Flex
          as="form"
          width="100%"
          maxWidth={400}
          p={[6, 8]}
          borderRadius={8}
          flexDirection="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              name="email"
              type="email"
              placeholder="Seu email"
              {...register('email')}
              error={errors.email}
              bg="gray.100"
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              {...register('password')}
              error={errors.password}
              bg="gray.100"
            />
          </Stack>
          <Button
            type="submit"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
          <Link href="/forgot-password" passHref>
            <ChakraLink alignSelf="center" mt="4">
              <Text color="gray.500">Esqueci minha senha</Text>
            </ChakraLink>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async ctx => {
  return {
    props: {}
  };
});