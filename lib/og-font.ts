// Poppins para as imagens geradas (favicon, ícone e compartilhamento),
// baixada só com os glifos usados. Se a busca falhar no build, a imagem
// sai com a fonte padrão em vez de quebrar.
export async function loadPoppins(
  weight: 300 | 400 | 600 | 700,
  text: string
): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Poppins:wght@${weight}&text=${encodeURIComponent(text)}`
      )
    ).text();
    const url = css.match(
      /src: url\((.+?)\) format\('(opentype|truetype)'\)/
    )?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}
