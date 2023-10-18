import Image from "next/image";
import FooterColumn from "./FooterColumn";
import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className="flex_start footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image
            src="/logo-purple.svg"
            alt="Flexibble Footer"
            width={115}
            height={40}
          />

          <p className="text_start text-sm font-normal mt-5 max-w-xs">
            Flexibble is the world's leading community for creatives to share,
            grow, and get hired.
          </p>
        </div>

        <div className="flex flex-wrap gap-12">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />

          <div className="flex-1 flex flex-col gap-5">
            <FooterColumn
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
            <FooterColumn
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>

          <FooterColumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />

          <div className="flex-1 flex flex-col gap-5">
            <FooterColumn
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
            <FooterColumn
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>

          <FooterColumn
            title={footerLinks[6].title}
            links={footerLinks[6].links}
          />
        </div>
      </div>

      <div className="flex_between footer_copyright">
        <p className="text-gray-100">
          &copy; Copyright Flexibble 2023. All Rights Reserved.
        </p>
        <p className="text-gray">
          <span className="text-black font-semibold">10.000</span> Projects
          submitted.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
