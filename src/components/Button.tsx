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
      ? "bg-primary-400 text-white"
      : "border border-primary-600 text-primary-600 font-bold";

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
