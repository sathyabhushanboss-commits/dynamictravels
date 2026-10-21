// Travel blog — all posts, newest first. Content lives in posts-*.js.

import { postsKarnataka } from './posts-karnataka';
import { postsSouth } from './posts-south';

export const AUTHOR = {
  name: 'Sathyabhushan M N',
  role: 'Software developer · Digital marketer · Travel blogger',
  bio: 'Sathyabhushan M N is a software developer and digital marketer with a keen interest in tours and travel. He blogs about destinations around Bengaluru and South India, sharing practical tips to help readers plan better trips.',
};

export const POSTS = [...postsKarnataka, ...postsSouth]
  .sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug) => POSTS.find((p) => p.slug === slug);

export function relatedPosts(slug, n = 3) {
  const i = POSTS.findIndex((p) => p.slug === slug);
  return [1, 2, 3, 4].map((k) => POSTS[(i + k) % POSTS.length]).filter((p) => p.slug !== slug).slice(0, n);
}

export const formatDate = (d) =>
  new Date(`${d}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

// Booking link that pre-fills the destination in the home page widget.
export const bookHref = (post) =>
  `/?tripType=outstation&drop=${encodeURIComponent(post.place.split(' ')[0])}#book`;
