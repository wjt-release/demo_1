import { useEffect } from 'react';

export const useEvent = (event: string, handler: (e: any) => void, passive = false) => {
  useEffect(() => {
    // initiate the event handler
    window.addEventListener(event, handler, passive);

    // this will clean up the event every time the component is re-rendered
    return () => {
      window.removeEventListener(event, handler);
    };
  }, [event, handler, passive]);
};
