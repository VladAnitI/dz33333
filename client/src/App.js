import { useState } from 'react';
import './App.css';

function App() {
	const [allUsers, setAllUsers] = useState([]);

	const [allUsersNumb, setAllUsersNumb] = useState(0);
	const [allProdNumb, setAllProdNumb] = useState(0);
	const [allPriceNumb, setAllPriceNumb] = useState(0);

	const [inputS3, setInputS3] = useState('');
	const [userById, setUserById] = useState('');

	const [inputS4, setInputS4] = useState('');
	const [withProd, setWithProd] = useState([]);

	const [inputS51, setInputS51] = useState('');
	const [inputS52, setInputS52] = useState('');
	const [inputS53, setInputS53] = useState('');
	const [newAnyUser, setNewAnyUser] = useState('');

	const [inputS6, setInputS6] = useState('');
	const [userConst, setUserConst] = useState([]);

	const [inputS7, setInputS7] = useState('');
	const [usersDelete, setUsersDelete] = useState([]);

	const [inputS8, setInputS8] = useState([]);
	const [sort, setSort] = useState('');

	// selection 1
	const getAllUsers = () => {
		fetch('http://localhost:3002/users')
			.then((res) => res.json())
			.then((data) => {
				setAllUsers(data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// selection 2
	const getAllUsersNumb = () => {
		fetch('http://localhost:3002/users')
			.then((res) => res.json())
			.then((data) => {
				setAllUsersNumb(data.length);
				let result = 0;
				let result2 = 0.0;
				data.forEach((el) => {
					result += el.products.length;
					result2 += el.products.reduce((accum, el) => {
						return (accum = accum + el.price);
					}, 0);
				});
				setAllProdNumb(result);
				setAllPriceNumb(result2);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// selection 3
	const getUserById = () => {
		fetch(`http://localhost:3002/users`)
			.then((res) => res.json())
			.then((data) => {
				let result = '';
				data.forEach((el) => {
					if (Number(el.id) === Number(inputS3)) {
						result = el.nickname;
					}
				});
				if (result === '') {
					setUserById('Пользователь не найден');
				} else {
					setUserById(result);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// selection 4
	const getWithProd = () => {
		fetch('http://localhost:3002/users')
			.then((res) => res.json())
			.then((data) => {
				let arr = [];
				data.forEach((elem) => {
					elem.products.forEach((el) => {
						if (el.name === inputS4) {
							arr.push(elem.nickname);
						}
					});
				});
				setWithProd(arr);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// selection 5
	const setAnyUser = () => {
		fetch(`http://localhost:3002/users/${inputS53}/${inputS51}/${inputS52}`)
			.then((res) => res.json())
			.then((data) => {
				setNewAnyUser(true);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// selection 6
	const getUserMostThenCost = () => {
		fetch(`http://localhost:3002/users`)
			.then((res) => res.json())
			.then((data) => {
				let numb = Number(inputS6);
				let arr = [];
				data.forEach((elem) => {
					if (
						elem.products.reduce((accum, el) => {
							return (accum += el.price);
						}, 0) > numb
					) {
						arr.push(elem.nickname);
					}
				});
				setUserConst(arr);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// selection 7
	const setDeleteUsers = () => {
		fetch(`http://localhost:3002/delete/${Number(inputS7)}`)
			.then((res) => res.json())
			.then((data) => {
				setUsersDelete(data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// selection 8
	const sortUsers = () => {
		fetch(`http://localhost:3002/sorting/${sort}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setInputS8(data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div className="container">
			<div className="section-1">
				<button
					className="button-1"
					onClick={() => {
						getAllUsers();
					}}
				>
					btn
				</button>
				<div className="result result-1">
					{allUsers.map((el) => (
						<span key={el._id}>{el.nickname + ' '}</span>
					))}
				</div>
			</div>

			<div className="section-2">
				<button
					className="button-2"
					onClick={() => {
						getAllUsersNumb();
					}}
				>
					btn
				</button>
				<div className="result result-2">
					{`Пользователей ${allUsersNumb}, товаров ${allProdNumb}, общая цена ${allPriceNumb}`}
				</div>
			</div>
			<div className="section-3">
				<input
					type="text"
					className="input input-3"
					onChange={(e) => {
						setInputS3(e.target.value);
					}}
				/>
				<button
					className="button-3"
					onClick={() => {
						getUserById();
					}}
				>
					btn
				</button>
				<div className="result result-3">{userById}</div>
			</div>
			<div className="section-4">
				<input
					type="text"
					className="input input-4"
					onChange={(e) => {
						setInputS4(e.target.value);
					}}
				/>
				<button
					className="button-4"
					onClick={() => {
						getWithProd();
					}}
				>
					btn
				</button>
				<div className="result result-4">{withProd}</div>
			</div>
			<div className="section-5">
				<div className="inputs">
					<input
						type="text"
						className="input input-51"
						onChange={(e) => {
							setInputS51(e.target.value);
						}}
					/>
					<input
						type="text"
						className="input input-52"
						onChange={(e) => {
							setInputS52(e.target.value);
						}}
					/>
					<input
						type="text"
						className="input input-53"
						onChange={(e) => {
							setInputS53(e.target.value);
						}}
					/>
				</div>
				<button
					className="button-5"
					onClick={() => {
						setAnyUser();
					}}
				>
					btn
				</button>
				<div className="result result-5">{newAnyUser}</div>
			</div>
			<div className="section-6">
				<input
					type="text"
					className="input input-6"
					onChange={(e) => {
						setInputS6(e.target.value);
					}}
				/>
				<button
					className="button-6"
					onClick={() => {
						getUserMostThenCost();
					}}
				>
					btn
				</button>
				<div className="result result-6">{userConst}</div>
			</div>
			<div className="section-7">
				<input
					type="text"
					className="input input-7"
					onChange={(e) => {
						setInputS7(e.target.value);
					}}
				/>
				<button
					className="button-7"
					onClick={() => {
						setDeleteUsers();
					}}
				>
					btn
				</button>
				<div className="result result-7">{usersDelete}</div>
			</div>
			{/* ---------------------- */}
			<div className="section-8">
				<input
					type="text"
					className="input input-8"
					onChange={(e) => {
						setSort(e.target.value);
					}}
				/>
				<button
					className="button-8"
					onClick={() => {
						sortUsers();
					}}
				>
					btn
				</button>
				<div className="result result-8">
					{inputS8.map((el, i) => {
						return <span key={i}>{el.nickname}</span>;
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
