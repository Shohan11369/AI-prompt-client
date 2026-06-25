export default function TestimonialItem({ review }) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow border border-white/5">
      <p className="text-slate-300 italic">"{review.comment}"</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-white font-bold">{review.name}</span>
        <span className="text-brand-primary text-sm">{review.rating} Stars</span>
      </div>
    </div>
  );
}

