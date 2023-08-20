import { combineReducers } from "redux";

import fournisseurs from "./fournisseurs";
import clients from "./clients";
import checks from "./checks";
import payments from "./payments";
import auth from "./auth";

export const reducers = combineReducers({
    fournisseurs,
    clients,
    checks,
    payments,
    auth
});