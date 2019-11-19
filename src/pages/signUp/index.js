import React from 'react';
import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import api from '../../services/api';

import {
	Container,
	Logo,
	Input,
	ErrorMessage,
	Button,
	ButtonText,
	SignInLink,
	SignInLinkText,
	SuccessMessage
} from './styles';

export default class SignIn extends React.Component {
	static navigationOptions = {
		header: null
	};
	state = {
		email: 'andre@supergeeks.com.br',
		password: '123456',
		username: 'andre',
		error: '',
		success: ''
	};
	handleUsernameChange = (username) => {
		this.setState({ username });
	};

	handleEmailChange = (email) => {
		this.setState({ email });
	};

	handlePasswordChange = (password) => {
		this.setState({ password });
	};

	handleSignInPress = () => {
		this.props.navigation.navigate('SignIn');
	};
	handleSignUpPress = async () => {
		if (this.state.email.length === 0 || this.state.password.length === 0) {
			this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
		} else {
			try {
				await api.post('/register', {
					username: this.state.username,
					email: this.state.email,
					password: this.state.password,
					coins: 50
				});

				this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login', error: '' });

				setTimeout(this.goToLogin, 2500);
			} catch (_err) {
				this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
				alert(_err);
			}
		}
	};

	goToLogin = () => {
		const resetAction = StackActions.reset({
			index: 0,
			actions: [ NavigationActions.navigate({ routeName: 'SignIn' }) ]
		});
		this.props.navigation.dispatch(resetAction);
	};
	render() {
		return (
			<Container>
				<StatusBar hidden />
				<Logo source={require('../../images/logo-small.png')} resizeMode="contain" />
				<Input
					placeholder="Nome de Usuario"
					value={this.state.username}
					onChangeText={this.handleUsernameChange}
					autoCapitalize="none"
					autoCorrect={false}
				/>
				<Input
					placeholder="Endereço de e-mail"
					value={this.state.email}
					onChangeText={this.handleEmailChange}
					autoCapitalize="none"
					autoCorrect={false}
				/>
				<Input
					placeholder="Senha"
					value={this.state.password}
					onChangeText={this.handlePasswordChange}
					autoCapitalize="none"
					autoCorrect={false}
					secureTextEntry
				/>
				{this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
				{this.state.success.length !== 0 && <SuccessMessage>{this.state.success}</SuccessMessage>}
				<Button onPress={this.handleSignUpPress}>
					<ButtonText>Criar Conta</ButtonText>
				</Button>
				<SignInLink onPress={this.handleSignInPress}>
					<SignInLinkText>Já tem uma conta?</SignInLinkText>
				</SignInLink>
			</Container>
		);
	}
}
