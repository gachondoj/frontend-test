import Link from "next/link";

interface BackLinkProps {
  href: string;
  content: string;
}

const BackLink = ({ href, content }: BackLinkProps) => {
  return (
    <Link href={href} className="w-full flex items-start gap-2">
      <i className="ri-arrow-left-line" />
      <div>{content}</div>
    </Link>
  );
};

export default BackLink;
