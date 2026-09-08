import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  as?: ElementType;
};

/** Page-level max-width + gutter wrapper. Use for every section's inner content. */
export function Container({
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
