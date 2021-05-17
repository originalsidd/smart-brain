import {Component} from 'react';

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		}
	}

	errorHandle = () => {
		const err = document.getElementById('err');
		err.removeChild(err.lastChild);
		err.appendChild(document.createElement('br'));
	}

	onNameChange = (event) => {
		this.setState({ name: event.target.value });
		this.errorHandle();
	}

	onEmailChange = (event) => {
		this.setState({ email: event.target.value });
		this.errorHandle();
	}

	onPasswordChange = (event) => {
		this.setState({ password: event.target.value });
		this.errorHandle();
	}

	onSubmitRegister = () => {
		const err = document.getElementById('err');
		let errText = '';
		fetch('https://cryptic-eyrie-45931.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user === 'incorrect form submission') {
				err.removeChild(err.lastChild);
				errText = "Field cannot be empty";
				err.appendChild(document.createTextNode(errText));
			}
			else if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
		.catch(console.log);
	}

	render() {
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
								<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="name" 
									id="name"
									onChange={this.onNameChange} 
								/>
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="email" 
									name="email-address" 
									id="email-address"
									onChange={this.onEmailChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input 
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="password" 
									name="password" 
									id="password" 
									onChange={this.onPasswordChange}	
								/>
							</div>
						</fieldset>
						<div className="">
							<input
								onClick={this.onSubmitRegister}
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								value="Register"
							/>
						</div>
						<div
							id='err'
							className='pv2 dark-red f6 dib'
						>
							<br />
						</div>
					</div>
				</main>
			</article>
		)
	}
}

export default Register;