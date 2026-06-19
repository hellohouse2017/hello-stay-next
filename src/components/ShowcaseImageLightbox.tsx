import Image from "next/image";
import type { ShowcaseImage } from "./PropertyShowcasePage";

export default function ShowcaseImageLightbox({
  image,
  label,
}: {
  image: ShowcaseImage;
  label: string;
}) {
  const lightboxId = "showcase-map-lightbox";

  return (
    <>
      <a
        href={`#${lightboxId}`}
        className="showcase-location-card__image-button"
        aria-label={label}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          unoptimized
          sizes="(max-width: 820px) 100vw, 420px"
        />
      </a>

      <div className="showcase-image-lightbox" id={lightboxId}>
        <a className="showcase-image-lightbox__backdrop" href="#traffic-map" aria-label="關閉" />
        <div className="showcase-image-lightbox__content">
          <a className="showcase-image-lightbox__close" href="#traffic-map" aria-label="關閉">
            x
          </a>
          <div className="showcase-image-lightbox__frame">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              unoptimized
              sizes="92vw"
              className="showcase-image-lightbox__image"
            />
          </div>
          <p className="showcase-image-lightbox__caption">{image.alt}</p>
        </div>
      </div>
    </>
  );
}
