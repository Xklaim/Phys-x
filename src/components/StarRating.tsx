

interface Props {
  stars: 1 | 2 | 3;
  size?: 'sm' | 'lg';
}

export function StarRating({ stars, size = 'sm' }: Props) {
  const fontSize = size === 'lg' ? '1.25rem' : '0.875rem';
  return (
    <span className="star-rating" aria-label={`${stars} star${stars !== 1 ? 's' : ''}`} style={{ fontSize }}>
      {[1, 2, 3].map(i => (
        <span key={i} className={i <= stars ? 'star' : 'star--empty'} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}
