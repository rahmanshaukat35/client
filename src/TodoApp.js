import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const initialState = {
	title: '',
	location: '',
	description: '',
};

const TodoApp = () => {
	const [state, setState] = useState(initialState);
	const URL = 'http://localhost:8000';
	const handleChange = (e) => {
		setState((s) => ({ ...s, [e.target.name]: e.target.value }));
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post(`${URL}/addTodo`, state)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});

		// let { title, location, description } = state;
		// title = title.trim();
		// location = location.trim();
		// description = description.trim();
		// if (title.length < 3) {
		// 	return window.notify('Title length should be at least 3 chars', 'error');
		// }
		// if (location.length < 3) {
		// 	return window.notify('Please enter location', 'error');
		// }
		// if (description.length < 10) {
		// 	return window.notify('Please enter description', 'error');
		// }
		// let formData = { title, location, description };
	};
	return (
		<div className='py-5 home d-flex justify-content-center align-items-center'>
			<div className='container'>
				<div className='row'>
					<div className='col'>
						<div className='card p-3 p-md-4 p-lg-5'>
							<form onSubmit={handleSubmit}>
								<div className='row'>
									<div className='col'>
										<h2 className='text-center mb-4'>Add Todo</h2>
									</div>
								</div>
								<div className='row'>
									<div className='col-12 col-md-6 mb-3'>
										<input
											type='text'
											className='form-control'
											name='title'
											placeholder='Enter Title'
											onChange={handleChange}
										/>
									</div>
									<div className='col-12 col-md-6 mb-3'>
										<input
											type='text'
											className='form-control'
											name='location'
											placeholder='Enter Location'
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className='row mb-4'>
									<div className='col'>
										<textarea
											name='description'
											rows='5'
											className='form-control'
											placeholder='Enter Description'
											onChange={handleChange}
										></textarea>
									</div>
								</div>
								<div className='row'>
									<div className='col'>
										<button className='btn btn-danger w-100'>'Add Todo'</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoApp;
