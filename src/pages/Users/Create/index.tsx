// useCallback - A função não será recriada a cada renderização, somente quando a dependências
// useState - Adicionar estado ao componente
import { useCallback, useState } from 'react';

// Importa componentes essenciais do React Native para estilização e layout
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Importa o hook que permite usar a navegação dentro do componente
import { useFocusEffect, useNavigation } from '@react-navigation/native';

// Importa a definição dos tipos de rotas criadas no arquivo de rotas
import { RootStackParamList } from '../../../routes';

// Importa o tipo de navegação específico para o Native Stack Navigator
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Cria um tipo para a navegação da tela "UsersList"
// Isso informa ao TypeScript que esta tela faz parte do Stack Navigator
// e que pode navegar para outras rotas definidas no RootStackParamList
type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'UsersList'>;

// Validar os dados do formulário
import * as yup from 'yup';

// Importa o arquivo de configuração da API criada
import api from '../../../config/api';

// Interface para os dados do usuário.
interface User {
    id: number;
    name: string;
    email: string;
}

// Função cadastrar usuários
export default function UsersCreate() {

    // Armazenar os dados do usuário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Usa o hook useNavigation com tipagem definida acima
    // Isso permite usar a navegação com segurança de tipos
    const navigation = useNavigation<NavigationProps>();

    // Processar/submeter os dados do formulário
    const addUser = async () => {

        // Validar o formulário com Yup
        if(!(await validateForm())) return;

        // Requisição para a API indicando a rota e os dados
        await api.post('users', { name, email })
            .then((response) => { // Acessar o then quando a API retornar status sucesso
                // console.log(response.data);
                Alert.alert("Sucesso", response.data.message);

                // Redirecionar o usuário para tela listar usuários
                navigation.reset({
                    index: 1, // Após resetar a tela UsersList será a tela ativa (visível).
                    routes: [
                        { name: 'Home' },       // índice 0
                        { name: 'UsersList' },  // índice 1 (rota ativa)
                    ],
                });

            }).catch((err) => { // Acessar o catch quando a API retornar status erro
                console.log(err.response.data);
                Alert.alert("Ops", err.response?.data?.message ?? "Tente novamente!");
            });
    }

    // Validar o formulário com Yup
    const validationSchema = yup.object().shape({
        name: yup.string()
            .required("Necessário preencher o campo nome!"),
        email: yup.string()
            .required("Necessário preencher o campo e-mail!")
            .email("Necessário preencher e-mail válido!")
    });

    // Função assíncrona para validar o formulário
    const validateForm = async () => {
        try {
            // Tenta validar os dados 'name' e 'email' usando o schema definido
            // 'abortEarly: false' garante que retorne todos os erros, não só o primeiro
            await validationSchema.validate(
                { name, email },
                { abortEarly: false }
            );

            // Se a validação for bem-sucedida, retorna true
            return true;
        } catch (error) {

            // Verifica se o erro é uma instância de ValidationError do yup
            if(error instanceof yup.ValidationError){
                // Exibe um alerta com todos os erros separados por quebra de linha
                Alert.alert('Ops', error.errors.join('\n'));
            }

            // Retorna false indicando que a validação falhou
            return false;
        }
    }

    // Estrutura visual do app
    return (
        <View style={styles.container}>

            {/* Cabeçalho */}
            <View style={styles.header}>
                {/* Texto fixo cadastrar usuários */}
                <Text style={styles.title}>Cadastrar</Text>
            </View>

            {/* Campo Nome */}
            <Text style={styles.label}>* Nome</Text>
            <TextInput
                style={styles.input}
                placeholder='Digite seu nome completo'
                autoCorrect={false}
                value={name}
                onChangeText={setName}
            />

            {/* Campo E-mail */}
            <Text style={styles.label}>* E-mail</Text>
            <TextInput
                style={styles.input}
                placeholder='Digite seu melhor e-mail'
                autoCorrect={false}
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
            />

            {/* Observação */}
            <Text style={styles.note}>* Campo obrigatório</Text>

            {/* Botão */}
            <TouchableOpacity style={styles.button} onPress={addUser}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            {/* Botão para voltar a tela "Home" */}
            {/* <Button title='Home' onPress={() => navigation.goBack()} /> */}

        </View>
    );
}

// Objeto de estilos usando StyleSheet do React Native
const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa todo o espaço da tela
        backgroundColor: '#fff', // Cor de fundo branca
        // alignItems: 'center', // Alinha os itens no centro horizontalmente
        // justifyContent: 'center', // Alinha os itens no centro verticalmente
        padding: 10, // Espaçamento interno de 10 pixels
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },
    note: {
        fontSize: 13,
        color: 'red',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#2e86de',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
});
