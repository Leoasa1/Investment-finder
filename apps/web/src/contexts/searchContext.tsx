import React, { useState, createContext, useContext } from 'react';

interface IGlobalContextProps {
	budget: any;
	zip: any;
	setBudget: (user: any) => void;
	setZip: (user: any) => void;
}

export const GlobalContext = createContext<IGlobalContextProps>({
	budget: '',
	zip: '',
	setBudget: () => {},
	setZip: () => {},
});

export const GlobalContextProvider = (props: any) => {
	const [currentBudget, setCurrentBudget] = useState('');
	const [currentZip, setCurrentZip] = useState('');

	return (
		<GlobalContext.Provider
			value={{
				budget: currentBudget,
				zip: currentZip,
				setBudget: setCurrentBudget,
				setZip: setCurrentZip,
			}}
		>
			{props.children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
