import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingImage({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Server-rendered images can finish loading before hydration attaches onLoad.
  useEffect(() => {
    setLoaded(Boolean(ref.current?.complete && ref.current.naturalWidth));
  }, [src]);

  return (
    <>
      {!loaded && <Skeleton className="image-skeleton" aria-hidden />}
      <img
        ref={ref}
        src={src}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        {...props}
      />
    </>
  );
}
