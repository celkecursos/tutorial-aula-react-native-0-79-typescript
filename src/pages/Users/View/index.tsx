// useCallback - A função não será recriada a cada renderização, somente quando a dependências
// useState - Adicionar estado ao componente
import { useCallback, useState } from 'react';

// Importa componentes essenciais do React Native para estilização e layout
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

// Importa o hook que permite usar a navegação dentro do componente
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

// Importa a definição dos tipos de rotas criadas no arquivo de rotas
import { RootStackParamList } from '../../../routes';

// Importa o tipo de navegação específico para o Native Stack Navigator
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Cria um tipo para a navegação da tela "UsersList"
// Isso informa ao TypeScript que esta tela faz parte do Stack Navigator
// e que pode navegar para outras rotas definidas no RootStackParamList
type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'UsersList'>;

// Crie o tipo da rota para acessar os parâmetros
type RouteProps = RouteProp<RootStackParamList, 'UsersView'>;

// Importa o arquivo de configuração da API criada
import api from '../../../config/api';

// Função cadastrar usuários
export default function UsersView() {

    // Receber o id do registro
    const route = useRoute<RouteProps>();
    const { id } = route.params;

    // Armazenar os dados do usuário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Usa o hook useNavigation com tipagem definida acima
    // Isso permite usar a navegação com segurança de tipos
    const navigation = useNavigation<NavigationProps>();

    // Recuperar os dados do usuário da API
    const getUser = async () => {

        // Fazer a requisição para a API e receber os dados do usuário
        await api.get(`users/${id}`)
            .then((response) => { // Acessar o then quando a API retornar status sucesso
                // console.log(response.data);
                setName(response.data.user.name);
                setEmail(response.data.user.email);
            }).catch((err) => { // Acessar o catch quando a API retornar status erro
                Alert.alert("Ops", err.response?.data?.erros ?? "Erro ao carregar dados do usuário!");
            });
    }

    // Executar quando o usuário carregar a tela e chamar a função getUser
    useFocusEffect(
        useCallback(() => {
            getUser();
        }, [id])
    );

    // Estrutura visual do app
    return (
        <View style={styles.container}>

            {/* Cabeçalho */}
            <View style={styles.header}>
                {/* Texto fixo editar usuários */}
                <Text style={styles.title}>Visualizar</Text>

                {/* Botão para navegar até a tela "UsersEdit" (editar usuário) */}
                <Button title='Editar' onPress={() => navigation.navigate('UsersEdit', { id })}></Button>
            </View>

            <Text>ID: {id}</Text>
            <Text>Nome: {name}</Text>
            <Text>E-mail: {email}</Text>

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
        flexDirection: 'row',      // Alinha os itens na horizontal
        justifyContent: 'space-between', // Um na esquerda e outro na direita
        alignItems: 'center',      // Alinha verticalmente no centro
        marginBottom: 20,          // Espaço abaixo do cabeçalho
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
    },
});
