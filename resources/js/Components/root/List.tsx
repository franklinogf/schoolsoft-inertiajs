import { Variants } from "framer-motion";
import * as motion from "framer-motion/client";
interface ListProps {
  items: {
    title: string;
    description: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
}
const item: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};
export function List({ items }: ListProps) {
  return (
    <ul className="w-full divide-y">
      {items.map(({ title, description, Icon }) => (
        <motion.li
          key={title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={item}
          className="flex w-full flex-col items-center p-10 sm:flex-row"
        >
          <div className="icon inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-secondary sm:mr-10">
            {Icon && <Icon className="size-8 bg-secondary stroke-2 text-primary" />}
          </div>
          <div className="mt-6 w-full flex-grow text-center sm:mt-0 sm:text-left">
            <h3 className="mb-2 text-xl font-bold md:mb-1">{title}</h3>
            <p className="paragraph text-muted-foreground">{description}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
