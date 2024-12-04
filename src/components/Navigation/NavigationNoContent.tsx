import { useState } from "react";

import { Button } from "@/components/Button";
import { IconPlusCircle } from "@/components/Icon";
import { NavigationForm } from "@/components/Navigation";

export const NavigationNoContent = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleToggleForm = () => setIsOpenForm((prev) => !prev);

  if (isOpenForm)
    return <NavigationForm type="add" handleCloseForm={handleToggleForm} />;

  return (
    <div className="border-col flex w-full max-w-[1168px] flex-col items-center justify-center rounded-md border border-secondary-200 bg-secondary-50 p-6">
      <h3 className="text-base font-semibold text-secondary-700">
        Menu jest puste
      </h3>
      <p className="mt-1 text-secondary-500">
        W tym menu nie ma jeszcze żadnych linków.
      </p>

      <Button className="mt-6" variant="primary" onClick={handleToggleForm}>
        <IconPlusCircle />
        Dodaj pozycję menu
      </Button>
    </div>
  );
};
