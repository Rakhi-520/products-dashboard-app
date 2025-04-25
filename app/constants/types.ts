import { ReactNode } from "react";

// ------------------- NAVIGATION -------------------
export interface Route {
  title: string;
  path: string | "";
  icon: ReactNode;
  elink?: string;
  eicon?: ReactNode;
}

export interface Element {
  element: ReactNode;
}

export type NavItem = Route | Element;
export type Navs = NavItem[];

// ------------------- NOTIFICATIONS -------------------
export interface NotifItem {
  id: number;
  type?: string;
  sender?: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
}

export type Notifs = NotifItem[];

// ------------------- THEME -------------------
export type ColorMode = "system" | "light" | "dark";

// ------------------- PRODUCT -------------------
export interface Prd {
  id: number;
  title: string;
  summary: string;
  description?: string; 
  quantity: number;
  score: number;
  price: number;
  brand: string;
  image: string;
}

export type Prds = Prd[];

// ------------------- DASHBOARD CARDS -------------------

// Clean string union for card types shown on dashboard
export type CardCategory = "sales" | "profit" | "orders" | "customers";

// Used for items in todayBrief.json (dashboard)
export interface BriefCard {
  type: CardCategory;
  value: number | string;
  percent: number;
}

// Optional: used for analytics-style cards (if needed in CardBrief)
export interface CardBriefData {
  title: string;
  amount: number | string;
  value: number;
  icon: JSX.Element;
}


