"use client";

import { createContext, useContext, useId } from "react";
import { cn } from "@/lib/utils/cn";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  listId: string;
  panelId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within Tabs");
  return ctx;
}

export interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  const listId = useId();
  const panelId = useId();
  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange,
        listId,
        panelId,
      }}
    >
      <div className={cn("flex flex-col", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
  const { listId } = useTabs();
  return (
    <div
      role="tablist"
      id={listId}
      aria-label="Test categories"
      className={cn(
        "flex flex-wrap gap-1 border-b border-zinc-200 dark:border-zinc-700 mb-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const { value: selected, onValueChange, listId, panelId } = useTabs();
  const isSelected = selected === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={panelId}
      id={`${listId}-${value}`}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => onValueChange(value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onValueChange(value);
        }
      }}
      className={cn(
        "px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950",
        isSelected
          ? "text-amber-600 dark:text-amber-400 border-b-2 border-amber-500 bg-transparent -mb-px"
          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border-b-2 border-transparent",
        className
      )}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const { value: selected, panelId, listId } = useTabs();
  if (selected !== value) return null;
  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={`${listId}-${value}`}
      className={cn("outline-none", className)}
    >
      {children}
    </div>
  );
}
