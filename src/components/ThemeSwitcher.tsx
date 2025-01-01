'use client'

import * as React from 'react'
import { Laptop, Moon, Sun, SunMoon } from 'lucide-react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
type Theme = "light" | "dark" | "system" | "switch"
export function ThemeSwitcher() {
  // Add theme state with default value of 'theme-light'
  const [theme, setThemeState] = React.useState<Theme>("light")

  // When component mounts, check if dark mode is enabled and set theme state accordingly
  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setThemeState(isDarkMode ? "dark" : "light")
  }, [])

  // When component mount or theme state changes,
  // update the document element class
  React.useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)

    document.documentElement.classList[isDark ? "add" : "remove"]("dark")
  }, [theme])

  const tarnsitionTable = {
    light: "dark",
    dark: "system",
    system: "switch",
    switch: "light",
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          let newTheme = tarnsitionTable[theme]
          if (newTheme === "switch") {
            newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark"
          }
          setThemeState(newTheme as Theme)
        }
        }
      >
        {/*         <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
 */}      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setThemeState('light')}>
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setThemeState('dark')}>
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setThemeState('system')}>
            <Laptop className="mr-2 h-4 w-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}