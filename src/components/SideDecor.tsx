const IMG_LEFT  = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/5fac316d-64c6-4625-99c7-4aea636dbafb.png';
const IMG_RIGHT = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/09d4ce4e-8d66-42f5-b774-59ce1a133796.png';

export default function SideDecor() {
  return (
    <>
      <div className="side-decor side-decor--left" aria-hidden="true">
        <img src={IMG_LEFT} alt="" className="side-decor-img" />
        <div className="side-decor-fade side-decor-fade--left" />
      </div>

      <div className="side-decor side-decor--right" aria-hidden="true">
        <img src={IMG_RIGHT} alt="" className="side-decor-img" />
        <div className="side-decor-fade side-decor-fade--right" />
      </div>
    </>
  );
}
