import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { NavigationListItem } from "@/components/NavigationListItem";
import { type TNavigationItem } from "@/types/navigation";

export const NavigationList = ({
  navigation,
  className,
  parent,
}: {
  navigation: TNavigationItem[];
  parent: boolean;
  className?: string;
}) => {
  return (
    <SortableContext
      items={navigation.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <ul className={`${className} gap-2`}>
        {navigation.map((item, index) => (
          <NavigationListItem
            key={item.id}
            item={item}
            parent={parent}
            index={index}
            isLastIndex={index === navigation.length - 1}
          />
        ))}
      </ul>
    </SortableContext>
  );
};
