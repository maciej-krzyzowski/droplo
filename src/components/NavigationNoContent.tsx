import { Button } from "@/components/Button";
import { IconPlusCircle } from "@/components/Icon";

export const NavigationNoContent = () => {
  return (
    <div className="border-col bg-secondary-50 flex w-full max-w-[1168px] flex-col items-center justify-center rounded-md border border-secondary-200 p-6">
      <h3 className="text-secondary-700 text-base font-semibold">Menu jest puste</h3>
      <p className="text-secondary-500 mt-1">W tym menu nie ma jeszcze żadnych linków.</p>

      <Button className="mt-6" variant="primary">
        <IconPlusCircle />
        Dodaj pozycję menu
      </Button>
    </div>
  );
};
