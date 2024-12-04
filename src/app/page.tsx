"use client";

import React, { useState } from "react";

import { useSelector } from "react-redux";
import { Button } from "@/components/Button";
import {
  Navigation,
  NavigationForm,
  NavigationNoContent,
} from "@/components/Navigation";
import { type RootState } from "@/store/store";

const NavigationPage = () => {
  const navigation = useSelector((state: RootState) => state.navigation);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleToggleForm = () => setIsOpenForm((prev) => !prev);

  if (!navigation.length) return <NavigationNoContent />;

  return (
    <div className="border-col w-full max-w-[1168px] overflow-hidden rounded-md border border-secondary-300 bg-secondary-50">
      <Navigation />

      {isOpenForm && (
        <NavigationForm
          type="add"
          className="-mt-[1px] border-t border-secondary-200 bg-secondary-50 px-6 py-4"
          handleCloseForm={handleToggleForm}
        />
      )}

      <div className="-mt-[1px] border-t border-secondary-200 px-6 py-5">
        <Button
          variant="tertiary"
          onClick={handleToggleForm}
          disabled={isOpenForm}
        >
          Dodaj pozycję menu
        </Button>
      </div>
    </div>
  );
};

export default NavigationPage;
