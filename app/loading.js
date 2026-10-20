import CabLoader from '@/components/CabLoader';

// Shown by Next.js while a page is loading during navigation.
export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-cream">
      <CabLoader />
    </main>
  );
}
