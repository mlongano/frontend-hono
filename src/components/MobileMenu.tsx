import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import MenuItems from "./MenuItems";

export default function MobileMenu() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent side="left">
          <MenuItems />
        </SheetContent>
      </Sheet>
    </div>
  );
}
