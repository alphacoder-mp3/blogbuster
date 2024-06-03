'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FormEvent, useState, ChangeEvent } from 'react';
import { SigninInput, SignupInput } from '@blazedglimmer/common';

export const ClientAuth = ({ type }: { type: 'signup' | 'signin' }) => {
  const [formData, setFormData] = useState<SigninInput | SignupInput>({
    username: '',
    name: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Assuming you have an API route at '/api/submitForm'
    const formURL =
      type === 'signin'
        ? 'https://backend.forgodworksss.workers.dev/api/v1/user/signin'
        : 'https://backend.forgodworksss.workers.dev/api/v1/user/signup';

    try {
      const response = await fetch(formURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Handle success (e.g., show a success message)
        console.log('Form submitted successfully');
      } else {
        // Handle error (e.g., show an error message)
        console.error('Error submitting form');
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
    </form>
  );
};
