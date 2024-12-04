import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { NavigationListItem } from "@/components/NavigationListItem";
import { type TNavigationItem } from "@/types/navigation";

export const NavigationList = ({
  navigation,
  className,
}: {
  navigation: TNavigationItem[];
  className?: string;
}) => {
  return (
    <SortableContext
      items={navigation.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <ul className={className}>
        {navigation.map((item) => (
          <NavigationListItem key={item.id} item={item} />
        ))}
      </ul>
    </SortableContext>
  );
};
