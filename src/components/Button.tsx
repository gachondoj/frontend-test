interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "gray" | "white";
  disabled?: boolean;
  small?: boolean;
}

const Button = ({
  children,
  onClick,
  variant,
  disabled,
  small,
}: ButtonProps) => {
  const className =
    variant === "gray"
      ? "bg-gray-400 text-white"
      : "border border-gray-600 text-gray-600 font-bold";

  return (
    <button
      onClick={onClick}
      type="button"
      className={`px-6 py-4 rounded-lg w-full ${className} ${
        small ? "md:w-fit" : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
