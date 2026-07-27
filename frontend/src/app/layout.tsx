import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prism | Philosophical Debate Under AI Consensus',
  description: 'Submit ethical dilemmas and receive multi-perspective AI analysis through utilitarian, deontological, and virtue ethics lenses, validated under GenLayer validator consensus.',
  openGraph: {
    title: 'Prism | Philosophical Debate Under AI Consensus',
    description: 'Ethical dilemmas analyzed through three philosophical lenses under GenLayer validator consensus.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
