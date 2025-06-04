// Importar as dependência para navegar entre as página
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importar as páginas
import Home from "../pages/Home";
import UsersList from "../pages/Users/List";
import UsersCreate from "../pages/Users/Create";
import UsersView from "../pages/Users/View";

// Definindo o tipo das rotas (tipagem para segurança com TypeScript)
export type RootStackParamList = {
    Home: undefined; // sem parâmetros
    UsersList: undefined;
    UsersCreate: undefined;
    UsersView: { id: number}; // Recebe o ID do usuário
};

// Criando o stack navigator com os tipos definidos acima
const Stack = createNativeStackNavigator<RootStackParamList>();

// Função principal que define as rotas da aplicação
export default function Routes() {
    return (
        // Envolve toda a navegação dentro de um container que gerencia o estado da navegação
        <NavigationContainer>
            {/* Define a pilha de navegação (stack), onde as telas são empilhadas conforme navegação */}
            <Stack.Navigator>
                {/* Define cada tela com um nome e o componente associado a ela */}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen
                    name="UsersList"
                    component={UsersList}
                    options={{
                        title: 'Usuário'
                    }}
                />
                <Stack.Screen
                    name="UsersCreate"
                    component={UsersCreate}
                    options={{
                        title: 'Usuário'
                    }}
                />
                <Stack.Screen
                    name="UsersView"
                    component={UsersView}
                    options={{
                        title: 'Usuário'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}