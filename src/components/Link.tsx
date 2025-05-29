import Link from "next/link";

type LinkProps = {
  children: React.ReactNode;
  disabled?: boolean;
} & ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

const MyLink = ({ href, onClick, children, disabled }: LinkProps) => {
  if (href) {
    return (
      <Link
        className={disabled ? "cursor-auto" : ""}
        aria-disabled={disabled}
        href={disabled ? "" : href}
      >
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default MyLink;
