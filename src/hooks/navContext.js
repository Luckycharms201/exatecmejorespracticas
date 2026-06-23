import { createContext, useContext } from "react";

/** Contexto con el objeto de navegación (useNavigation) para slides que
 *  necesitan controlar la navegación, ej. el Journey interactivo. */
export const NavContext = createContext(null);
export const useNav = () => useContext(NavContext);
