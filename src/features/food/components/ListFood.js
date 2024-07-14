import { foods } from "@/dummy/food";
import { useGetFood } from "@/features/dashboard/hooks/useGetFood";
import { formatRupiah } from "@/helpers/formatRupiah";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegImage } from "react-icons/fa";

export const ListFood = () => {
  const id = React.useId();
  const { data } = useGetFood({isLanding: true});

  const halfFoods = React.useMemo(() => {
    return data?.filter((_, idx) => idx < 5);
  }, [data]);

  if (!halfFoods) return <></>;

  return (
    <div className="flex flex-col gap-y-4">
      {halfFoods.map((item) => (
        <Link
          href={`/foods/${item.id}`}
          key={`${id}-${item.title}`}
          className="cursor-pointer bg-base-300 border w-full overflow-hidden rounded-lg"
        >
          <div className="h-32 bg-base-300/10 flex justify-center items-center text-base-100">
            {!item.image && <FaRegImage className="text-6xl" />}
            {item.image && (
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="p-2">
            <p className="text-xs truncate">{item.title}</p>
            <p className="text-sm font-semibold">{formatRupiah(item.price)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
