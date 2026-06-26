export default function TestimonialItem({ review }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow border border-gray-200">
      <p className="text-gray-800 italic">"{review.comment}"</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-gray-950 font-bold">{review.name}</span>
        <span className="text-brand-primary text-sm font-semibold">{review.rating} Stars</span>
      </div>
    </div>
  );
}

