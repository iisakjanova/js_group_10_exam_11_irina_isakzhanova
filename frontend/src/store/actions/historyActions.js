import history from "../../history";

export const historyReplace = payload => {
    return () => {
        history.replace(payload);
    };
};