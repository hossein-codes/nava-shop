"use client";

import { useUi } from "@/lib/store/ui-context";
import { MobileSearchScreen } from "./SearchBox";
import CategorySheet from "./CategorySheet";
import QuickView from "./QuickView";
import Toast from "./Toast";

export default function ShellOverlays() {
  const { searchOpen, closeSearch, quickViewId } = useUi();

  return (
    <>
      <MobileSearchScreen open={searchOpen} onClose={closeSearch} />
      <CategorySheet />
      {quickViewId && <QuickView />}
      <Toast />
    </>
  );
}
