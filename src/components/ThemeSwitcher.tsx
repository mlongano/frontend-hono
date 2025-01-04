"use client";
import { Laptop, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
type Theme = "light" | "dark" | "system";

function toggleDarkClass(theme: Theme) {
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList[isDark ? "add" : "remove"]("dark");
}

export function ThemeSwitcher() {
  // Add theme state with default value of 'theme-light'

  // When component mounts, check if dark mode is enabled and set theme state accordingly

  // When component mount or theme state changes,
  // update the document element class
  const updateThemeClass = (theme: Theme) => {
    toggleDarkClass(theme);
    console.log("Try to write to localstorage theme: ", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <>
      <Button variant="ghost" size="icon">
        {" "}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              updateThemeClass("light");
            }}
          >
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              updateThemeClass("dark");
            }}
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              updateThemeClass("system");
            }}
          >
            <Laptop className="mr-2 h-4 w-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
