import Skeleton from './Helper/Skeleton';

const Card = ({ data, image, eyebrow, title, description, meta }) => {
  return (
    <li className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30 transition-colors duration-200 hover:border-[#ff4655]/70">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-[#101728] to-[#26080f]">
        {image ? (
          <Skeleton src={image} alt={description || title || data?.displayName} />
        ) : (
          <span className="font-display text-4xl text-white/20">VI</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070914] via-transparent to-transparent" />
      </div>
      <div className="space-y-3 p-5">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ffb3ba]">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl text-white">{title}</h2>
        {description && (
          <p className="line-clamp-3 text-sm leading-6 text-slate-300">
            {description}
          </p>
        )}
        {meta && (
          <p className="rounded-full border border-white/10 bg-black/25 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            {meta}
          </p>
        )}
      </div>
    </li>
  );
};

export default Card;
