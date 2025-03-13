import Link from "next/link";
import { ReactNode } from "react"; // Import ReactNode

export default function PagePreview({ title, link, content }: { title: string, link: string, content: ReactNode }) {
  return (
    <section className="py-20 px-6 text-center">
      <h1 className="text-4xl font-semibold text-accent">{title}</h1>
      <div className="mt-4 max-w-3xl mx-auto p-4 bg-[var(--novar-blue-light)] rounded-lg shadow-md">
        {content}
      </div>
      <Link href={link} className="mt-4 inline-block btn-primary">
        View Full Page
      </Link>
    </section>
  );
}
