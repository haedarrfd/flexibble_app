import Link from "next/link";

type FooterColumnProps = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: FooterColumnProps) => {
  return (
    <div className="footer_column">
      <h4 className="font-semibold">{title}</h4>
      <ul className="flex flex-col gap-3 font-normal">
        {links.map((link) => (
          <Link key={link} href="/">
            {link}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
