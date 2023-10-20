import Image from "next/image";
import { MouseEventHandler } from "react";

type ButtonProps = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  submitting?: boolean | false;
  type?: "button" | "submit";
  bgColor?: string;
  textColor?: string;
};

const Button = ({
  title,
  leftIcon,
  rightIcon,
  handleClick,
  submitting,
  type,
  bgColor,
  textColor,
}: ButtonProps) => (
  <button
    type={type || "button"}
    disabled={submitting || false}
    className={`flex_center gap-3 px-4 py-3 
        ${textColor ? textColor : "text-white"} 
        ${
          submitting ? "bg-black/50" : bgColor ? bgColor : "bg-primary-purple"
        } rounded-xl text-sm font-medium max-md:w-full`}
    onClick={handleClick}
  >
    {leftIcon && (
      <Image src={leftIcon} width={15} height={15} alt="left icon" />
    )}
    {title}
    {rightIcon && (
      <Image src={rightIcon} width={15} height={15} alt="right icon" />
    )}
  </button>
);

export default Button;
