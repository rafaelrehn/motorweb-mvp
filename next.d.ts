import { Empresa } from '@/model/empresa.type';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    empresa: Empresa;
  }
}
