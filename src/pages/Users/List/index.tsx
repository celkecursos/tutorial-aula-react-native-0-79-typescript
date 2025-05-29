// useCallback - A função não será recriada a cada renderização, somente quando a dependências
// useState - Adicionar estado ao componente
import { useCallback, useState } from 'react';

// Importa componentes essenciais do React Native para estilização e layout
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

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

// Importa o arquivo de configuração da API criada
import api from '../../../config/api';

// Interface para os dados do usuário.
interface User {
  id: number;
  name: string;
  email: string;
}

// Função listar usuários
export default function UsersList() {

  // Armazenar os dados dos usuários
  const [users, setUsers] = useState<User[]>([]);

  // Usa o hook useNavigation com tipagem definida acima
  // Isso permite usar a navegação com segurança de tipos
  const navigation = useNavigation<NavigationProps>();

  // Recuperar os usuários da API
  const getUsers = async () => {

    // Fazer a requisição para a API e receber a lista de usuários
    await api.get(`users`)
      .then((response) => { // Acessar o then quando a API retornar status sucesso

        // console.log(response.data);
        // Atribuir os dados retornado da API
        setUsers(response.data);

      }).catch((err: any) => { // Acessar o catch quando a API retornar status erro
        Alert.alert("Ops", err.response?.data?.erros ?? "Tente novamente!");
      });
  }

  // Executar quando o usuário carregar a tela e chamar a função getUsers
  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, [])
  );

  // Estrutura visual do app
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1}}>
      <View style={styles.container}>

        {/* Cabeçalho com título e botão */}
        <View style={styles.header}>
          {/* Texto fixo listar usuários */}
          <Text style={styles.title}>Listar</Text>

          {/* Botão para navegar até a tela "UsersCreate" (cadastrar usuário) */}
          <Button title='Cadastrar' onPress={() => navigation.navigate('UsersCreate')}></Button>
        </View>

        {/* Ler a lista de usuários */}
        {users.map((user) => {
          // Imprimir os dados do usuário
          return (
            <View key={user.id}>
              <Text>ID: {user.id} </Text>
              <Text>Nome: {user.name} </Text>
              <Text>E-mail: {user.email} </Text>
              <Text></Text>
            </View>
          )
        })}

        {/* Botão para voltar a tela "Home" */}
        {/* <Button title='Home' onPress={() => navigation.goBack()} /> */}

      </View>
    </ScrollView>
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
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
  header: {
    flexDirection: 'row',      // Alinha os itens na horizontal
    justifyContent: 'space-between', // Um na esquerda e outro na direita
    alignItems: 'center',      // Alinha verticalmente no centro
    marginBottom: 20,          // Espaço abaixo do cabeçalho
  },
});
