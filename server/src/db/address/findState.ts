import { executeDbQueryDirect } from "../executeDbQuery";
import query from "../query";

type StateResponse = {
    stateId: string;
    stateName: string;
};

const findState = async (state: string, countryId: string) => {
    const result = await executeDbQueryDirect<StateResponse>(async () => {
        return await query("SELECT * FROM tblStates WHERE state = ? AND countryId = ?", [state, countryId]);
    }, "findState");

    return result;
};

export default findState;   