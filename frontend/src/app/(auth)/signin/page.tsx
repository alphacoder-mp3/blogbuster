'use server';

import { Auth } from '@/components/Auth';
import { ModeToggle } from '@/components/ui/modetoggle';

export default async function Component() {
  return (
    <>
      <div className="absolute top-2 right-2">
        <ModeToggle />
      </div>
      <div className="h-screen flex flex-col justify-center">
        <Auth type="signin" />
      </div>
    </>
  );
}
