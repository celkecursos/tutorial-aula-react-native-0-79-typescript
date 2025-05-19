// Importa a biblioteca Axios para fazer requisições HTTP
import axios from "axios";

// Cria uma instância personalizada do Axios com configurações específicas
const api = axios.create({
    // Define a URL base para todas as requisições feitas com essa instância
    // Substituir o IP 192.168.15.200 pelo IP da máquina que está rodando a API
    // Para descobrir o IP local no Windows, use o comando 'ipconfig' no terminal
    baseURL: 'http://192.168.15.200:8080/'
});

// Exporta a instância configurada do Axios para ser usada em outros arquivos do projeto
export default api;