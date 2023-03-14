interface CardProps {
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  size?: 'small' | 'medium';
}

/**
 * Primary UI component for user interaction
 */
const Card = ({ name, size, imageSrc, imageAlt, href, description }: CardProps) => {
  return (
    <div key={name} className={`group relative ${size == 'medium' ? 'max-w-lg' : 'max-w-3xl'}`}>
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
        <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover object-center" />
      </div>
      <h3 className="mt-6 text-sm text-gray-500">
        <a href={href}>
          <span className="absolute inset-0" />
          {name}
        </a>
      </h3>
      <p className="text-base font-semibold text-gray-900">{description}</p>
    </div>
  );
};

Card.componentProps = {
  name: String,
  description: String,
  imageSrc: String,
  imageAlt: String,
  href: String,
  size: String,
};

export default Card;
