import { setTopScores, setScoreboard } from "../../actions/gameActions";
import { getScoreboardRows } from "../../requests";
import { getOnlyScores, getTopSortedScores } from "../../utils/gameUtils.js";

// get the response from the api, use func to process data...
// ...save processed data to the redux store.
export const getScoreBoardThunk = (partitionKey, howMany) => dispatch => {
    getScoreboardRows(partitionKey)
        .then(response => getTopSortedScores(response.data, howMany))
        .then(processedData => {
            dispatch(setScoreboard(processedData));
            return getOnlyScores(processedData);

        }).then(onlyScores => dispatch(setTopScores(onlyScores))
        ).catch(err => alert(`Ops! Something is Wrong with the Scoreboard load:${err.message}`));
};