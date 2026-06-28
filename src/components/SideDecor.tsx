const IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/ea2402d9-1244-4d15-af91-f415a97f7988.png';

export default function SideDecor() {
  return (
    <>
      {/* LEFT — shows the left half of the image (night scene) */}
      <div className="side-decor side-decor--left" aria-hidden="true">
        <div
          className="side-decor-bg"
          style={{
            backgroundImage: `url(${IMG})`,
            backgroundSize: '200% 100%',
            backgroundPosition: 'left top',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="side-decor-fade side-decor-fade--left" />
      </div>

      {/* RIGHT — shows the right half of the image (sunset scene) */}
      <div className="side-decor side-decor--right" aria-hidden="true">
        <div
          className="side-decor-bg"
          style={{
            backgroundImage: `url(${IMG})`,
            backgroundSize: '200% 100%',
            backgroundPosition: 'right top',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="side-decor-fade side-decor-fade--right" />
      </div>
    </>
  );
}
