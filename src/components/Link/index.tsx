import React, { FC } from "react";

interface LinkProps {
  children: React.ReactNode | string;
  href: string;
  target?: "_blank";
}

export const Link: FC<LinkProps> = ({ children, href, ...props }) => {
  return (
    <a href={href} {...props} className="hover:text-sky-400">
      {children}
    </a>
  );
};
