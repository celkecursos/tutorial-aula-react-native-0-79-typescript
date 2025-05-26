// Importa componentes essenciais do React Native para estilização e layout
import { Button, StyleSheet, Text, View } from 'react-native';

// Importa o hook que permite usar a navegação dentro do componente
import { useNavigation } from '@react-navigation/native';

// Importa a definição dos tipos de rotas criadas no arquivo de rotas
import { RootStackParamList } from '../../../routes';

// Importa o tipo de navegação específico para o Native Stack Navigator
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Cria um tipo para a navegação da tela "UsersList"
// Isso informa ao TypeScript que esta tela faz parte do Stack Navigator
// e que pode navegar para outras rotas definidas no RootStackParamList
type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'UsersList'>;

// Função listar usuários
export default function UsersList() {

  // Usa o hook useNavigation com tipagem definida acima
  // Isso permite usar a navegação com segurança de tipos
  const navigation = useNavigation<NavigationProps>();

  // Estrutura visual do app
  return (
    <View style={styles.container}>
      {/* Texto fixo listar usuários */}
      <Text>Listar Usuários</Text>

      {/* Botão para voltar a tela "Home" */}
      <Button title='Home' onPress={() => navigation.goBack()} />
      
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
