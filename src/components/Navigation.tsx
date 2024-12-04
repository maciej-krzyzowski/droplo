import { useSelector, useDispatch } from "react-redux";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { type RootState } from "@/store/store";
import { NavigationList } from "@/components/NavigationList";
import { moveItem } from "@/store/navigationSlice";

export const Navigation = () => {
  const dispatch = useDispatch();
  const navigation = useSelector((state: RootState) => state.navigation);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.id == null || active.id === over?.id) return;
    
    dispatch(
      moveItem({
        oldIndex: navigation.findIndex((item) => item.id === active.id),
        newIndex: navigation.findIndex((item) => item.id === over.id),
      }),
    );
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <NavigationList navigation={navigation} />
    </DndContext>
  );
};
