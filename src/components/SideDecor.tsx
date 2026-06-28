const IMG_LEFT  = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/files/9258c7df-6bec-443e-bcf0-fd9d7c13f5ee.jpg';
const IMG_RIGHT = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/files/4b4a8772-7213-4dd4-ab86-2a54d23f7852.jpg';

export default function SideDecor() {
  return (
    <>
      {/* LEFT — night scene: golden maral, black wolf, stars */}
      <div className="side-decor side-decor--left" aria-hidden="true">
        <img src={IMG_LEFT} alt="" className="side-decor-img" />
        <div className="side-decor-fade side-decor-fade--left" />
      </div>

      {/* RIGHT — sunrise scene: flaming maral on peak, valley */}
      <div className="side-decor side-decor--right" aria-hidden="true">
        <img src={IMG_RIGHT} alt="" className="side-decor-img" />
        <div className="side-decor-fade side-decor-fade--right" />
      </div>
    </>
  );
}
