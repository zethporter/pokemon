import { cn } from "#/lib/utils";

export const Loading = ({
  className,
}: {
  className?: string | (() => string);
}) => {
  return (
    <div
      className={cn(
        "w-full flex justify-center animate-bounce p-10",
        className,
      )}
    >
      <img src={"/CharizardSprite.png"} alt="Loading..." />
    </div>
  );
};
