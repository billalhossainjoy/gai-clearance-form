import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Div: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn("bg-secondary p-6 rounded space-y-3 border", className)}>
      {children}
    </div>
  );
};
export default Div;
