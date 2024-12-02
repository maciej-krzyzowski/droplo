"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/Button";
import { IconSearch } from "@/components/Icon";
import { Input } from "@/components/Input";

type TForm = {
  name: string;
  url: string;
};

export const NavigationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>();

  const onSubmit: SubmitHandler<TForm> = (data) => console.log(data);

  return (
    <div className="w-full rounded-md border border-secondary-300 px-6 py-5">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button variant="tertiary">Anuluj</Button>
          <Button variant="secondary" type="submit">
            Dodaj
          </Button>
        </div>
      </form>
    </div>
  );
};
