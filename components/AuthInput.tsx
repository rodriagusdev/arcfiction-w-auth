interface Props {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

export default function AuthInput({ id, onChange, value, label, type = 'text' }: Props) {
  return (
    <div className="relative w-full">
      <input
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        className="block w-full px-4 pt-6 pb-2 text-sm font-medium text-white bg-zinc-900/80 border border-zinc-700/80 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600 transition-all peer h-14"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-xs text-zinc-400 duration-150 transform -translate-y-2.5 scale-90 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:scale-90 peer-focus:-translate-y-2.5 peer-focus:text-red-500 font-medium"
      >
        {label}
      </label>
    </div>
  );
}
