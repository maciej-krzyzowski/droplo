import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useForm, type SubmitHandler } from "react-hook-form";

import { addItem, editItem } from "@/store/navigationSlice";
import { Button } from "@/components/Button";
import { IconSearch } from "@/components/Icon";
import { Input } from "@/components/Input";
import {
  type TNavigationForm,
  type TNavigationFormType,
  type TNavigationItem,
} from "@/types/navigation";

type TProps = {
  handleCloseForm: () => void;
  type: TNavigationFormType;
  item?: TNavigationItem;
  className?: string;
};

export const NavigationForm = ({
  handleCloseForm,
  type = "add",
  item,
  className,
}: TProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TNavigationForm>({
    defaultValues:
      type === "edit"
        ? {
            name: item?.name || "",
            url: item?.url || "",
          }
        : {},
  });

  const onSubmit: SubmitHandler<TNavigationForm> = useCallback(
    (data) => {
      const { name, url } = data;

      if (type === "edit" && item?.id) {
        dispatch(editItem({ id: item.id, updateItem: { name, url } }));
      } else {
        const randomId = Math.random().toString(36).substr(2, 9);
        dispatch(
          addItem({
            parentId: item?.id,
            item: {
              name,
              url,
              id: randomId,
            },
          }),
        );
      }

      handleCloseForm();
    },
    [dispatch, handleCloseForm, item, type],
  );
  return (
    <div className={className}>
      <form
        className="rounded-md border border-secondary-300 bg-white px-6 py-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="name"
          label="Nazwa"
          placeholder="np. Promocje"
          error={errors.name?.message}
          {...register("name", {
            required: "Pole wymagane",
          })}
        />
        <Input
          className="mt-3"
          id="url"
          label="Link"
          placeholder="Wklej lub wyszukaj"
          icon={<IconSearch />}
          {...register("url")}
        />

        <div className="mt-5 flex gap-x-2">
          <Button variant="tertiary" onClick={handleCloseForm}>
            Anuluj
          </Button>
          <Button variant="secondary" type="submit">
            Dodaj
          </Button>
        </div>
      </form>
    </div>
  );
};
