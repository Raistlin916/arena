export const ONLINE_NUMBER_CHANGE = 'ONLINE_NUMBER_CHANGE';
export const START_SEARCH = 'START_SEARCH';

export const changeOnlineNum = number => {
	return { 
		type: ONLINE_NUMBER_CHANGE,
		number
	};
};

export const startSearch = () => {
	return {
		type: START_SEARCH
	}
}