import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'FBT Recovery Estimator',
  description:
    'Enter your annual TikTok Shop revenue and see your estimated FBT recovery in real time. Free audit, no credit card, results in 24 hours.',
  openGraph: {
    title: 'How Much Could You Recover?',
    description:
      'Free FBT recovery audit for TikTok Shop sellers. See your estimated recovery in real time.',
    images: ['/fbtrecovery.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Could You Recover?',
    description:
      'Free FBT recovery audit for TikTok Shop sellers. See your estimated recovery in real time.',
    images: ['/fbtrecovery.jpg'],
  },
};

export default function FbtRecoveryPage() {
  return (
    <main className="min-h-screen bg-[#0b0b14] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl">
        <Image
          src="/fbtrecovery.jpg"
          alt="How Much Could You Recover? — FBT recovery estimator"
          width={1800}
          height={1400}
          priority
          className="w-full h-auto rounded-2xl shadow-2xl"
        />
      </div>
    </main>
  );
}
