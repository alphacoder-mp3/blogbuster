/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7tDyD2fwNFO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Component() {
  return (
    <div className="flex max-w-sm w-full items-center space-x-2 border border-gray-300 rounded-lg overflow-hidden">
      <Input
        className="w-full border-0 h-10"
        placeholder="Search"
        type="search"
      />
      <Button className="h-10 p-2 rounded-lg" variant="ghost">
        <SearchIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
