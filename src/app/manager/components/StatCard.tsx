import { cva, VariantProps } from "class-variance-authority";
import { ArrowUp, ArrowDown } from "lucide-react";

const statCardStyles = cva(
  "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between",
  {
    variants: {
      intent: {
        primary: "border-t-4 border-red-600",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

const changeStyles = cva("text-sm font-semibold flex items-center", {
  variants: {
    type: {
      increase: "text-green-500",
      decrease: "text-red-500",
    },
  },
});

interface StatCardProps extends VariantProps<typeof statCardStyles> {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: React.ReactNode;
}

export function StatCard({
  title,
  value,
  change,
  changeType,
  icon,
}: StatCardProps) {
  return (
    <div className={statCardStyles()}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        {icon}
      </div>
      <div>
        <p className="text-3xl font-bold mt-2">{value}</p>
        <div className={changeStyles({ type: changeType })}>
          {changeType === "increase" ? (
            <ArrowUp className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 mr-1" />
          )}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
}
