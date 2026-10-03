const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

const SORTERS = {
  recommended: (a, b) => b.helpful - a.helpful || byDateDesc(a, b),
  newest: byDateDesc,
  highest: (a, b) => b.rating - a.rating || byDateDesc(a, b),
  lowest: (a, b) => a.rating - b.rating || byDateDesc(a, b),
};

export const filterReviews = (reviews, { sort, type, rating, query }) =>
  reviews
    .filter((review) => {
      const matchesType = type === 'all' || review.travelerType === type;
      const matchesRating = rating === 'all' || Math.round(review.rating) === Number(rating);
      const matchesQuery =
        !query || `${review.title} ${review.text} ${review.author}`.toLowerCase().includes(query);

      return matchesType && matchesRating && matchesQuery;
    })
    .sort(SORTERS[sort] ?? SORTERS.recommended);

export const formatReviewDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });