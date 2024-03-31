'use server';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
      <div className="space-y-2">
        {type === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="email">Username</Label>
            <Input id="email" placeholder="Enter your username" type="text" />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="johndoe@example.com" type="email" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link className="ml-auto inline-block text-sm underline" href="#">
              Forgot Password?
            </Link>
          </div>
          <Input id="password" type="password" />
        </div>
        <Button className="w-full">
          {' '}
          {type === 'signin' ? 'Sign In' : 'Sign Up'}
        </Button>
      </div>
    </div>
  );
};
