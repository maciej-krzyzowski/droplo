import { useState, type CSSProperties } from "react";
import { useDispatch } from "react-redux";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { removeItem } from "@/store/navigationSlice";
import {
  type TNavigationItem,
  type TNavigationFormType,
} from "@/types/navigation";
import { NavigationList, NavigationForm } from "@/components/Navigation";
import { IconMove } from "@/components/Icon";
import { Button } from "@/components/Button";

interface NavigationListItemProps {
  item: TNavigationItem;
  parent: boolean;
  isDragOverlay?: boolean;
  className?: string;
  index?: number;
  isLastIndex?: boolean;
}

export const NavigationListItem = ({
  item,
  isDragOverlay = false,
  parent,
  className,
  isLastIndex,
  index,
}: NavigationListItemProps) => {
  const dispatch = useDispatch();
  const [typeForm, setTypeForm] = useState<TNavigationFormType>(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: isDragOverlay,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: "default",
    position: isDragOverlay ? "relative" : undefined,
    zIndex: isDragOverlay ? 999 : undefined,
    boxShadow: "none",
  };

  const handleRemove = () => {
    dispatch(removeItem({ id: item.id }));
  };

  const content = (
    <>
      <div
        className={clsx(
          `${className} -ml-[1px] flex gap-1 border-y border-l border-secondary-200 bg-white px-6 py-5`,
          {
            "border-t-0": index == 0,
            "-mt-[1px]": index && index > 0,
            "rounded-bl-md": isLastIndex || item.children?.length,
            "rounded-bl-none": isLastIndex && !parent,
            "border-b-0": isLastIndex && !parent && !typeForm,
          },
        )}
      >
        <div
          className="flex size-10 cursor-grab items-center justify-center text-secondary-500"
          {...listeners}
        >
          <IconMove />
        </div>
        <div>
          <p className="font-semibold text-secondary-700">{item.name}</p>
          <span className="mt-[6px] text-secondary-500">{item.url}</span>
        </div>
        <div className="ml-auto flex justify-items-end">
          <Button
            variant="tertiary"
            className="rounded-r-none"
            onClick={handleRemove}
          >
            Usuń
          </Button>
          <Button
            variant="tertiary"
            className="rounded-none border-x-0"
            onClick={() => setTypeForm("edit")}
          >
            Edytuj
          </Button>
          <Button
            variant="tertiary"
            className="rounded-l-none"
            onClick={() => setTypeForm("add")}
          >
            Dodaj pozycje menu
          </Button>
        </div>
      </div>
      {item.children && (
        <NavigationList
          navigation={item.children}
          className="bg-secondary-50 pl-16"
          parent={item.id ? true : false}
        />
      )}
      {!isDragOverlay && typeForm && (
        <NavigationForm
          type={typeForm}
          item={item}
          className={clsx("bg-secondary-50 py-4 pr-6", {
            "pl-16": typeForm === "add",
            "pl-8": typeForm === "edit",
          })}
          handleCloseForm={() => setTypeForm(null)}
        />
      )}
    </>
  );

  if (isDragOverlay) {
    return (
      <li className="list-none" style={style as CSSProperties}>
        {content}
      </li>
    );
  }

  return (
    <li
      ref={setNodeRef}
      style={style as CSSProperties}
      {...attributes}
      aria-describedby="DndDescribedBy-0"
    >
      {content}
    </li>
  );
};
