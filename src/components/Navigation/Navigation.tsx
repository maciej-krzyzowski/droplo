import { useSelector, useDispatch } from "react-redux";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  type DragStartEvent,
  rectIntersection,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { useState } from "react";
import { type RootState } from "@/store/store";
import { NavigationList, NavigationListItem } from "@/components/Navigation";
import { moveItem } from "@/store/navigationSlice";
import { type TNavigationItem } from "@/types/navigation";

export const Navigation = () => {
  const dispatch = useDispatch();
  const navigation = useSelector((state: RootState) => state.navigation);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  );

  const findItemPath = (
    items: TNavigationItem[],
    id: string,
    parentId: string | null = null,
    index = 0,
  ): { parentId: string | null; index: number } | undefined => {
    if (items.findIndex((item) => item.id === id) !== -1) {
      return { parentId, index: items.findIndex((item) => item.id === id) };
    }

    for (const item of items) {
      if (item.children?.length) {
        const found = findItemPath(item.children, id, item.id, index);
        if (found) return found;
      }
    }
  };

  const findItemById = (
    items: TNavigationItem[],
    searchId: string,
  ): TNavigationItem | undefined => {
    for (const item of items) {
      if (item.id === searchId) {
        return item;
      }
      if (item.children?.length) {
        const found = findItemById(item.children, searchId);
        if (found) return found;
      }
    }
    return undefined;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const activeItemPath = findItemPath(navigation, active.id as string);
    const overItemPath = findItemPath(navigation, over.id as string);

    if (!activeItemPath || !overItemPath) return;

    if (activeItemPath.parentId !== overItemPath.parentId) return;

    dispatch(
      moveItem({
        itemId: active.id as string,
        oldParentId: activeItemPath.parentId,
        newParentId: activeItemPath.parentId,
        oldIndex: activeItemPath.index,
        newIndex: overItemPath.index,
      }),
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <NavigationList navigation={navigation} parent={false} />
      <DragOverlay>
        {activeId && (
          <NavigationListItem
            item={findItemById(navigation, activeId) as TNavigationItem}
            isDragOverlay
            parent={false}
            className="rounded-md"
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};
