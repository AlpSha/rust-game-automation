'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Search({ placeholder, name }: { placeholder: string, name: string }) {
  const searchParams = useSearchParams()
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete('page');
    if (term) {
      params.set(name, term);
    } else {
      params.delete(name);
    }
    replace(`${pathName}?${params.toString()}`);
  }, 300);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);


  const [iconClass, setIconClass] = useState('');

  const handleFocus = () => {
    setIconClass(isDarkMode ? 'text-gray-300' : 'text-gray-500');
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input className="peer"
             placeholder={placeholder}
             onChange={(e) => handleSearch(e.target.value)}
             onFocus={handleFocus}
             onAbort={() => setIconClass(isDarkMode ? 'text-gray-300' : 'text-gray-500')}
             defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon
        className={`input-icon ${iconClass}`}/>
    </div>
  );
}
