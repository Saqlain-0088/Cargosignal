import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}

export default function SectionWrapper({
  children,
  className,
  dark = false,
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-24",
        dark ? "bg-[#0f0f0f] text-white" : "bg-[#0f0f0f] text-white",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </section>
  );
}
