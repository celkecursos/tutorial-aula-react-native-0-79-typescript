// Importar as dependência para navegar entre as página
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importar as páginas
import Home from "../pages/Home";
import UsersList from "../pages/Users/List";

// Definindo o tipo das rotas (tipagem para segurança com TypeScript)
export type RootStackParamList = {
    Home: undefined; // sem parâmetros
    UsersList: undefined;
};

// Criando o stack navigator com os tipos definidos acima
const Stack = createNativeStackNavigator<RootStackParamList>();

// Função principal que define as rotas da aplicação
export default function Routes(){
    return (
        // Envolve toda a navegação dentro de um container que gerencia o estado da navegação
        <NavigationContainer>
            {/* Define a pilha de navegação (stack), onde as telas são empilhadas conforme navegação */}
            <Stack.Navigator>
                {/* Define cada tela com um nome e o componente associado a ela */}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="UsersList" component={UsersList} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}