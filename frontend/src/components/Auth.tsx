'use server';
import { ClientAuth } from './ClientAuth';
import Link from 'next/link';

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          {type === 'signin' ? 'Sign In' : 'Create an account'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {type === 'signin' && 'Already have an account?'}
        </p>
        {type === 'signup' && (
          <div className="text-slate-400 dark:text-gray-400">
            Already have an account?
            <Link className="pl-2 underline" href={'/signin'}>
              {' '}
              Login
            </Link>
          </div>
        )}
      </div>
      <ClientAuth type={type} />
    </div>
  );
};
