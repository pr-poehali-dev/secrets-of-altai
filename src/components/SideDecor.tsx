const SYMBOLS_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/9d2bb523-b5ac-4670-8555-5fffaacd463a.png';

export default function SideDecor() {
  return (
    <>
      {/* LEFT */}
      <div className="side-decor side-decor--left" aria-hidden="true">
        <div
          className="side-decor-symbols"
          style={{ backgroundImage: `url(${SYMBOLS_IMG})`, backgroundPosition: 'left top' }}
        />
        <div className="side-decor-vignette side-decor-vignette--left" />
      </div>

      {/* RIGHT */}
      <div className="side-decor side-decor--right" aria-hidden="true">
        <div
          className="side-decor-symbols"
          style={{ backgroundImage: `url(${SYMBOLS_IMG})`, backgroundPosition: 'right bottom' }}
        />
        <div className="side-decor-vignette side-decor-vignette--right" />
      </div>
    </>
  );
}
