import { useState } from "react";
import type { CSSProperties } from "react";
import { gallery } from "../data/gallery";

type Photo = typeof gallery[number];
export default function CommunityPhoto({ photo, className = "", style }: { photo: Photo; className?: string; style?: CSSProperties }) {
  const [source, setSource] = useState<string>(photo.src);
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={`flex items-center justify-center bg-mint p-6 text-center font-display font-bold ${className}`} style={style} role="img" aria-label={photo.alt}>{photo.caption}</div>
  ) : (
    <img src={source} alt={photo.alt} loading="lazy" decoding="async" className={`object-cover ${className}`} style={style} onError={() => source === photo.src ? setSource(photo.fallback) : setFailed(true)} />
  );
}
