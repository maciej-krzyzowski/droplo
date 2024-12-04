import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import {
  type TNavigationItem,
  type TNavigationFormType,
} from "@/types/navigation";
import { NavigationList } from "@/components/NavigationList";
import { IconMove } from "@/components/Icon";
import { Button } from "@/components/Button";

import { NavigationForm } from "@/components/NavigationForm";

export const NavigationListItem = ({ item }: { item: TNavigationItem }) => {
  const [typeForm, setTypeForm] = useState<TNavigationFormType>(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  return (
    <li
      ref={setNodeRef}
      className={clsx("", isDragging && "opacity-50")}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "default",
      }}
      {...attributes}
    >
      <div className="-ml-[1px] -mt-[1px] flex gap-1 rounded-l-md border-y border-l border-secondary-200 bg-white px-6 py-5">
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
          <Button variant="tertiary" className="rounded-r-none">
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
        <NavigationList navigation={item.children} className="pl-16" />
      )}
      {typeForm && (
        <NavigationForm
          type={typeForm}
          item={item}
          className="bg-secondary-50 py-4 pl-16 pr-6"
          handleCloseForm={() => setTypeForm(null)}
        />
      )}
    </li>
  );
};
