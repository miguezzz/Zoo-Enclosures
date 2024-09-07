class RecintosZoo {

    constructor() {
        this.recintos = [
            // array com hash tables para representar a tabela recintos pq está categorizada com índice numérico
            // em animais, um array com hash tables para representar possiveis outros animais no mesmo recinto
            { numero: 1, bioma: ['savana'], tamanho_total: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: ['floresta'], tamanho_total: 5, animais: [] },
            { numero: 3, bioma: ['savana e rio'], tamanho_total: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: ['rio'], tamanho_total: 8, animais: [] },
            { numero: 5, bioma: ['savana'], tamanho_total: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            // objeto vai ficar melhor para representar a tabela de animais pq está categorizada por espécies
            LEAO: 	{ tamanho: 3, bioma: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        };
    }
    //  verifica se o animal existe na tabela dos animais
    isAnimalValido(animal) {
        return animal in this.animais;
    }

    // verifica se a quantidade de animais é um número e se é positivo
    isQuantidadeValida(quantidade) {
        return (Number.isInteger(quantidade) && quantidade > 0);
    }

    analisaRecintos(animal, quantidade) {

        if (!this.isAnimalValido(animal)) {
            return { erro: "Animal inválido" };
        }

        if (!this.isQuantidadeValida(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const infoAnimal = this.animais[animal];
        const espacoOcupado = infoAnimal.tamanho * quantidade;
        const recintosViaveis = [];

        // cada recinto tem que ser analisado, usarei um for each para isso
        this.recintos.forEach(recinto => {

            // regra dos carnívoros (Animais carnívoros devem habitar somente com a própria espécie)
            
            // regra do bioma adequado
            const biomaAdequado = infoAnimal.bioma.includes(recinto.bioma)


            // regra dos hipos (Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio)
            const podeHabitarComHipopotamo = animal === 'HIPOPOTAMO' && recinto.bioma === 'savana e rio';

            // verifica se o macaco tem companhia
            if (recinto.animais.length > 0) {
                const companhiaMacaco = true;
            }

            const espacoLivre = recinto.tamanho - espacoOcupado;

            // Verificar se há espaço suficiente
            const espacoSuficiente = espacoLivre >= espacoOcupado;

            // se o ambiente ja estiver ocupado, adicionar mais 1 ao espaço total necessário
            if (recinto.animais.length > 0) {
                espacoSuficiente = espacoLivre >= (tamanhoNecessario + 1);
            }
        });

        return { recintosViaveis };
    }

}

export { RecintosZoo as RecintosZoo };

// new RecintosZoo().analisaRecintos('MACACO', 2);