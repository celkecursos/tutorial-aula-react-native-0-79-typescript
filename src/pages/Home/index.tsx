// Importa o componente StatusBar da biblioteca do Expo para controlar a barra de status do dispositivo
import { StatusBar } from 'expo-status-bar';

// Importa componentes essenciais do React Native para estilização e layout
import { Button, StyleSheet, Text, View } from 'react-native';

// Importa hooks do React: useEffect (efeitos colaterais) e useState (estado)
import { useEffect, useState } from 'react';

// Importa o hook que permite usar a navegação dentro do componente
import { useNavigation } from '@react-navigation/native';

// Importa a definição dos tipos de rotas criadas no arquivo de rotas
import { RootStackParamList } from '../../routes';

// Importa o tipo de navegação específico para o Native Stack Navigator
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Cria um tipo para a navegação da tela "UsersList"
// Isso informa ao TypeScript que esta tela faz parte do Stack Navigator
// e que pode navegar para outras rotas definidas no RootStackParamList
type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'UsersList'>;

// Importa o arquivo de configuração da API criada
import api from '../../config/api';

// Função Home
export default function Home() {

  // Usa o hook useNavigation com tipagem definida acima
  // Isso permite usar a navegação com segurança de tipos
  const navigation = useNavigation<NavigationProps>();

  // Cria um estado chamado 'messages' do tipo string para armazenar o retorno da API
  const [messages, setMessages] = useState<string>("Carregando...");

  // Função assíncrona que faz requisição GET para a API
  const pageHome = async () => {

    // Chama a rota principal da API usando GET
    await api.get('/')
      .then((response) => {
        // Quando a requisição for bem-sucedida, armazena a mensagem da resposta no estado 'messages'
        setMessages(response.data.message);
      }).catch((err: any) => {

        // Tenta pegar a mensagem do erro, se não existir usa mensagem padrão
        setMessages(err.response?.data?.message ?? "Erro: Tente novamente!");
      });
  }

  // Executa a função pageHome automaticamente quando o componente for montado
  useEffect(() => {
    pageHome();
  }, []) // Array vazio garante que o efeito só execute uma vez, ao carregar o app

  // Estrutura visual do app
  return (
    <View style={styles.container}>
      {/* Texto fixo de boas-vindas */}
      <Text>Bem-vindo à Celke!!</Text>

      {/* Botão para navegar até a tela "UsersList" (listar usuários) */}
      <Button title='Usuários' onPress={() => navigation.navigate('UsersList')} />

      {/* Exibe a mensagem vinda da API, se existir */}
      <Text>{`Mensagem da API: ${messages}`}</Text>

      {/* Exibe a barra de status padrão do Expo */}
      <StatusBar style="auto" />
    </View>
  );
}

// Objeto de estilos usando StyleSheet do React Native
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço da tela
    backgroundColor: '#fff', // Cor de fundo branca
    alignItems: 'center', // Alinha os itens no centro horizontalmente
    justifyContent: 'center', // Alinha os itens no centro verticalmente
    padding: 10, // Espaçamento interno de 10 pixels
  },
});
