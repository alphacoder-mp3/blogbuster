'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FormEvent, useState, ChangeEvent } from 'react';
import { SigninInput, SignupInput } from '@blazedglimmer/common';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';

export const ClientAuth = ({ type }: { type: 'signup' | 'signin' }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<SigninInput | SignupInput>({
    username: '',
    name: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formURL = `${process.env.NEXT_PUBLIC_BASE_URL}/user/${type}`;
    try {
      const response = await fetch(formURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        const token = data.jwt;
        Cookies.set('token', token, { expires: 7 }); // Setting the token in cookie, The token will expire in 7 days
        setTimeout(() => router.push('/'), 1000);
        toast.success('Logged in successfully');
      } else {
        console.error('Error submitting form');
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      {type === 'signup' && (
        <div className="space-y-2">
          <Label htmlFor="email">Username</Label>
          <Input
            id="username"
            placeholder="Enter your username"
            type="text"
            name="username"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="johndoe@example.com"
          type="email"
          name="email"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({
              ...formData,
              username: e.target.value,
            })
          }
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link className="ml-auto inline-block text-sm underline" href="#">
            Forgot Password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          name="password"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />
      </div>
      <Button className="w-full">
        {' '}
        {type === 'signin' ? 'Sign In' : 'Sign Up'}
      </Button>
      <p aria-live="polite" className="sr-only" role="status"></p>
      <Toaster richColors />
    </form>
  );
};
