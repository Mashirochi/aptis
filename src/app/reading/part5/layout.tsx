import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reading Part 3 - Match Headings | APTIS',
  description: 'Practice matching headings to paragraphs exercises for APTIS Reading Part 3',
  keywords: 'APTIS, reading, match headings, paragraph headings, English test preparation',
};

export default function ReadingPart3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}