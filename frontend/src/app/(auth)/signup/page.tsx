import { Auth } from '@/components/Auth';
import { Quote } from '@/components/Signup/Quote';
import { ModeToggle } from '@/components/ui/modetoggle';

const Signup = () => {
  return (
    <>
      <div className="absolute top-2 right-2">
        <ModeToggle />
      </div>
      <div className="md:grid grid-cols-2 hidden">
        <div className="h-screen flex flex-col justify-center">
          <Auth type="signup" />
        </div>
        <Quote />
      </div>
      <div className="h-screen flex flex-col justify-center md:hidden">
        <Auth type="signup" />
      </div>
    </>
  );
};
export default Signup;
