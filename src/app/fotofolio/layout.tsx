// Fotofolio section shell. Sets data-section="fotofolio" so globals.css swaps to
// the quiet neutral, image-forward, minimal-chrome token set.
export default function FotofolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="section" data-section="fotofolio">
      {children}
    </div>
  );
}
