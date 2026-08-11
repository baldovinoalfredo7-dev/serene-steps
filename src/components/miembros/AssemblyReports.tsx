import { FlyerGallery } from "@/components/miembros/FlyerGallery";
import {
  categoryDescriptions,
  categoryLabels,
  categoryOrder,
  type Assembly,
} from "@/lib/asambleas-data";

/** Galerías de una Asamblea: RSG → Comité de Área → Comités Especiales */
export function AssemblyReports({ assembly }: { assembly: Assembly }) {
  return (
    <div className="space-y-10">
      {categoryOrder.map((key, i) => (
        <section key={key} id={key} className="scroll-mt-24">
          <div className="mb-4 border-b border-brand/10 pb-3">
            <h3 className="font-serif text-xl italic text-brand">
              {i + 1}. {categoryLabels[key]}
            </h3>
            <p className="mt-1 text-sm text-ink/70">{categoryDescriptions[key]}</p>
          </div>
          <FlyerGallery items={assembly[key]} />
        </section>
      ))}
    </div>
  );
}
