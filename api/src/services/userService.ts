class UserService {
    async createUser(){
        console.log('Executado com sucesso!');

        return 'Teste bem sucedido';
    }

    async myUser(){
        const { name, email } = { name: 'Luiz Dias', email: 'luiz@gmail.com'};
        return {name, email};
    }
}

export { UserService };