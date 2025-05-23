import Image from "next/image";

interface CardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  genre: string;
  isNew: boolean;
}

const Card = (props: CardProps) => {
  return (
    <div className="border-[0.5px] border-[#8F8F8F] rounded-2xl p-6 flex flex-col gap-5 h-[436px] w-[380px]">
      <Image
        src={props.image}
        alt={props.name}
        width={300}
        height={100}
        className="rounded-t-2xl min-w-[332px] w-full h-60"
      />
      <div className="text-gray-300 font-bold text-base">{props.genre}</div>
      <div className="flex w-full justify-between text-gray-600 font-bold text-lg max-h-6">
        <div className="text-ellipsis overflow-hidden whitespace-nowrap">
          {props.name}
        </div>
        <div>${props.price}</div>
      </div>
      <button
        type="button"
        className="w-full rounded-lg border border-gray-600 h-14 text-gray-600 font-bold"
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default Card;
