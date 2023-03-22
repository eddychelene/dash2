import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['mkseguros-admin.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }

    try {
      return await fn(ctx);
    } catch (err) {
      destroyCookie(ctx, 'mkseguros-admin.token');
      console.log("ok")

      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }
  };
}
