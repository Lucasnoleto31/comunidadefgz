import { redirect } from "next/navigation";

// Preserva a query string no redirect — links com UTM (YouTube, Instagram)
// apontam para a raiz e os parâmetros precisam chegar em /comunidade.
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") qs.set(key, value);
    else if (Array.isArray(value)) for (const v of value) qs.append(key, v);
  }
  const suffix = qs.toString();
  redirect(suffix ? `/comunidade?${suffix}` : "/comunidade");
}
