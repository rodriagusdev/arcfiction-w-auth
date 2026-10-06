import { SvgArrowLeft, SvgArrowRight } from './Svgs';

interface Props {
  id: string;
  children: JSX.Element[] | JSX.Element;
}

export default function MediaSlider({ id, children }: Props) {
  const slideToLeft = () => {
    const slider = document.getElementById(id);
    if (slider) slider.scrollBy({ left: -450, behavior: 'smooth' });
  };

  const slideToRight = () => {
    const slider = document.getElementById(id);
    if (slider) slider.scrollBy({ left: 450, behavior: 'smooth' });
  };

  return (
    <div className="relative group/slider w-full">
      <button
        onClick={slideToLeft}
        aria-label="Scroll Left"
        className="z-20 hidden md:flex items-center justify-center absolute -left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-red-600 text-white backdrop-blur-md border border-zinc-700/60 shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <SvgArrowLeft />
        </div>
      </button>

      <div
        id={id}
        className="px-4 sm:px-10 py-3 overflow-x-auto no-scrollbar scroll-smooth flex items-center"
      >
        {children}
      </div>

      <button
        onClick={slideToRight}
        aria-label="Scroll Right"
        className="z-20 hidden md:flex items-center justify-center absolute -right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-red-600 text-white backdrop-blur-md border border-zinc-700/60 shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <SvgArrowRight />
        </div>
      </button>
    </div>
  );
}
