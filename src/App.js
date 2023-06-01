import React from 'react';
import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle';
import TodoApp from './TodoApp';
import Table from './Table';

const App = () => {
	return (
		<>
			<TodoApp />
			<Table />
		</>
	);
};

export default App;
