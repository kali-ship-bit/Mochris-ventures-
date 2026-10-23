import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  initialRequests,
  initialItems,
  initialPages,
  initialCompany,
  type Request,
  type Item,
  type BusinessPage,
  type CompanyDetails,
} from "@/lib/admin/data";
type Store = {
  requests: Request[];
  setRequests: Dispatch<SetStateAction<Request[]>>;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
  pages: BusinessPage[];
  setPages: Dispatch<SetStateAction<BusinessPage[]>>;
  company: CompanyDetails;
  setCompany: Dispatch<SetStateAction<CompanyDetails>>;
};
const Context = createContext<Store | null>(null);
export function AdminProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState(initialRequests);
  const [items, setItems] = useState(initialItems);
  const [pages, setPages] = useState(initialPages);
  const [company, setCompany] = useState(initialCompany);
  return (
    <Context.Provider
      value={{ requests, setRequests, items, setItems, pages, setPages, company, setCompany }}
    >
      {children}
    </Context.Provider>
  );
}
export function useAdmin() {
  const store = useContext(Context);
  if (!store) throw new Error("Admin provider missing");
  return store;
}
