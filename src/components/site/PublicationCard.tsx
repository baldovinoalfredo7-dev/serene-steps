import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Publication } from "@/lib/literatura-data";

export function PublicationCard({ item }: { item: Publication }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand/10 bg-paper shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand/20 hover:shadow-lift">
      <Link
        to="/literatura/$slug"
        params={{ slug: item.slug }}
        className="flex h-full flex-col"
      >
        <div className="aspect-[2/3] w-full overflow-hidden rounded-t-2xl bg-soft">
          {item.cover ? (
            <img
              src={item.cover}
              alt={`Portada de ${item.title}`}
              width={800}
              height={1200}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-soft text-brand/60">
              <BookOpen className="size-8" strokeWidth={1.5} />
              <span className="px-4 text-center text-xs uppercase tracking-[0.2em]">
                Portada próximamente
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-serif text-lg leading-[1.25] text-brand">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">{item.summary}</p>
          <span className="btn-aa mt-6 w-full text-xs uppercase tracking-[0.1em]">
            Conocer la publicación <ArrowRight className="size-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
