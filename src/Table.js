import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [document, setDocument] = useState([]);
	const [filterDocument, setFilterDocument] = useState([]);
	const URL = 'http://localhost:8000';

	useEffect(() => {
		axios
			.get(`${URL}/readTodos`)
			.then((res) => {
				const { data } = res;
				setFilterDocument(data);
				setDocument(data);
			})
			.catch((err) => {
				console.error('err', err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);
	const handleSearch = (e) => {
		let text = e.target.value;
		setFilterDocument(
			document.filter((doc) =>
				doc.title.toLowerCase().includes(text.toLowerCase())
			)
		);
	};
	const handleEdit = (todo) => {
		console.log('edit todo', todo);
		axios
			.patch(`${URL}/updateTodo`, todo)
			.then((res) => {
				console.log('updated data', res);
			})
			.catch((err) => {
				console.error('error', err);
			});
	};
	const handleDelete = (todo) => {
		console.log('delete todo', todo);
		axios
			.post(`${URL}/deleteTodo`, todo)
			.then((res) => {
				console.log('Delete data', res);
				if (res.data === 'Todo deleted') {
					let documentsAfterDelete = document.filter(
						(doc) => doc._id !== todo._id
					);
					setDocument(documentsAfterDelete);
				}
			})
			.catch((err) => {
				console.error('error', err);
			});
	};

	return (
		<div className='py-5 home d-flex justify-content-center align-items-center'>
			<div className='container'>
				<div className='row'>
					<div className='col'>
						<div className='card p-3 p-md-4 p-lg-5'>
							<div className='row'>
								<div className='col-12 col-md-6 offset-md-3'>
									<h2 className='text-center mb-4'>Todos</h2>
									<input
										type='search'
										className='form-control'
										onChange={handleSearch}
										placeholder='Search'
									/>
								</div>
							</div>
							<div className='row'>
								<div className='col'>
									{!isLoading ? (
										<table className='table'>
											<thead>
												<tr>
													<th scope='col'>#</th>
													<th scope='col'>Title</th>
													<th scope='col'>Location</th>
													<th scope='col'>Description</th>
													<th scope='col'>Action</th>
												</tr>
											</thead>
											<tbody>
												{filterDocument.map((todo, i) => {
													return (
														<tr key={i}>
															<th scope='row'>{i + 1}</th>
															<td>{todo.title}</td>
															<td>{todo.location}</td>
															<td>{todo.description}</td>
															<td>
																<button
																	className='btn btn-info btn-sm me-2'
																	onClick={() => handleEdit(todo)}
																>
																	Edit
																</button>
																<button
																	className='btn btn-danger btn-sm'
																	onClick={() => handleDelete(todo)}
																>
																	Delete
																</button>
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									) : (
										<div className='d-flex justify-content-center align-items-center'>
											<span className='spinner spinner-border'></span>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Table;
