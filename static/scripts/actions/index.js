export const ONLINE_NUMBER_CHANGE = 'ONLINE_NUMBER_CHANGE';

export const onlineIncrement = number => {
	return { 
		type: ONLINE_NUMBER_CHANGE,
		number
	};
}