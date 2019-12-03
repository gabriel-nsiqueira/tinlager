import React from 'react';
import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import api from '../../services/api';

import { Container, Logo, Input, ErrorMessage, Button, ButtonText, SignUpLink, SignUpLinkText } from './styles';

export default class SignIn extends React.Component {
	static navigationOptions = {
		header: null
	};
	state = {
		email: '777',
		password: 'nimda',
		error: ''
	};
	handleEmailChange = (email) => {
		this.setState({ email });
	};

	handlePasswordChange = (password) => {
		this.setState({ password });
	};

	handleCreateAccountPress = () => {
		this.props.navigation.navigate('SignUp');
	};
	handleSignInPress = async () => {
		if (this.state.email.length === 0 || this.state.password.length === 0) {
			this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
		} else {
			try {
				const response = await api.post('/authenticate', {
					email: this.state.email,
					password: this.state.password
				});

				const resetAction = StackActions.reset({
					index: 0,
					actions: [
						NavigationActions.navigate({ routeName: 'App', params: { token: response.data.token } })
					]
				});
				this.props.navigation.dispatch(resetAction);
			} catch (_err) {
				if (_err == 'Request failed with status code 401') {
					this.setState({ error: 'Não autorizado, verifique seus credenciais!' });
				} else {
					this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
				}

				alert(_err);
			}
		}
	};
	render() {
		return (
			<Container>
				<StatusBar hidden />
				<Logo source={require('../../images/logo-small.png')} resizeMode="contain" />
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
				<Button onPress={this.handleSignInPress}>
					<ButtonText>Entrar</ButtonText>
				</Button>
				<SignUpLink onPress={this.handleCreateAccountPress}>
					<SignUpLinkText>Criar conta grátis</SignUpLinkText>
				</SignUpLink>
			</Container>
		);
	}
}
