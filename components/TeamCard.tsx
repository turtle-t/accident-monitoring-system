import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  img: string;
}

export default function TeamCard({ name, role, img }: TeamCardProps) {
  return (
    <div className="
      p-5 
      rounded-xl 
      text-center 
      transform 
      transition 
      duration-300 
      hover:scale-105 
      hover:shadow-2xl 
      backdrop-blur-md 
      bg-white/10 
      dark:bg-white/5
      border 
      border-white/20
    ">

      <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-lg shadow-md border border-white/20">
        <Image
          src={img}
          alt={name}
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-wide">
        {name}
      </h3>

      <p className="text-gray-300 dark:text-gray-400 text-sm mt-1">
        {role}
      </p>
    </div>
  );
}
