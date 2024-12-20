import { useInView } from 'react-intersection-observer';

export function LazyImage({ src, alt, className }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <img ref={ref} alt={alt} className={className} src={inView ? src : ''} />
  );
}
