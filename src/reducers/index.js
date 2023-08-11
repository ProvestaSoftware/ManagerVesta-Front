import { combineReducers } from "redux";

import fournisseurs from "./fournisseurs";
import clients from "./clients";
import checks from "./checks";

export const reducers = combineReducers({
    fournisseurs,
    clients,
    checks
});