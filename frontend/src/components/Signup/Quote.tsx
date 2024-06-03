export const Quote = () => {
  return (
    <div className="bg-slate-200 dark:bg-zinc-700  h-screen flex flex-col justify-center px-4">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="text-gray-500 dark:text-gray-400 text-3xl font-bold">
            {' '}
            &quot;The customer service I received was exceptional. The support
            team went above and beyond to address my concerns.&quot;{' '}
          </div>
          <div className="max-w-full text-gray-500 dark:text-gray-400 text-xl font-semibold mt-4">
            Julies Winfield
          </div>

          <div className="max-w-full text-slate-400 dark:text-neutral-500 text-md font-semibold">
            CEO, Acme Corp
          </div>
        </div>
      </div>
    </div>
  );
};
