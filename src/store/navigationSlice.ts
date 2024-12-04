import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";
import { type TNavigationItem } from "@/types/navigation";

type TAddItemPayload = {
  parentId?: string;
  item: TNavigationItem;
};

type TRemoveItemPayload = { id: string };

type TEditItemPayload = {
  id: string;
  updateItem: Partial<TNavigationItem>;
};

type TMoveItemPayload = {
  oldIndex: number;
  newIndex: number;
};

const initialState: TNavigationItem[] = [
  {
    id: "1",
    name: "Diamenty Forbes'a 1",
    url: "https://www.forbes.pl/diamenty",
  },
  {
    id: "2",
    name: "Diamenty Forbes'a 2",
    url: "https://www.forbes.pl/diamenty",
  },
  {
    id: "3",
    name: "Diamenty Forbes'a 3",
    url: "https://www.forbes.pl/diamenty",
  },
];

const navigationSlice = createSlice({
  name: "navigation",
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TAddItemPayload>) => {
      const { parentId, item } = action.payload;

      if (!parentId) return [...state, item];

      const addItemRecursively = (items: TNavigationItem[]) => {
        items.forEach((current) => {
          if (current.id === parentId) {
            current.children = [...(current.children || []), item];
          } else if (current.children) {
            addItemRecursively(current.children);
          }
        });
      };

      addItemRecursively(state);
    },

    editItem: (state, action: PayloadAction<TEditItemPayload>) => {
      const editItemRecursively = (items: TNavigationItem[]) => {
        items.forEach((item) => {
          if (item.id === action.payload.id) {
            Object.assign(item, action.payload.updateItem);
          } else if (item.children) {
            editItemRecursively(item.children);
          }
        });
      };

      editItemRecursively(state);
    },

    removeItem: (state, action: PayloadAction<TRemoveItemPayload>) => {
      const removeItemRecursively = (
        items: TNavigationItem[],
      ): TNavigationItem[] =>
        items
          .filter((item) => item.id !== action.payload.id)
          .map((item) => ({
            ...item,
            children: removeItemRecursively(item.children || []),
          }));

      return removeItemRecursively(state);
    },

    moveItem: (state, action: PayloadAction<TMoveItemPayload>) => {
      const { oldIndex, newIndex } = action.payload;

      return arrayMove(state, oldIndex, newIndex);
    },
  },
});

export const { addItem, removeItem, editItem, moveItem } =
  navigationSlice.actions;
export default navigationSlice.reducer;