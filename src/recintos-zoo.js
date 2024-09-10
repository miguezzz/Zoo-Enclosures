class RecintosZoo {

    constructor() {
        this.recintos = [
            // array com hash tables para representar a tabela recintos pq está categorizada com índice numérico
            // em animais, um array com hash tables para representar possiveis outros animais no mesmo recinto
            { numero: 1, bioma: ['savana'], tamanho_total: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: ['floresta'], tamanho_total: 5, animais: [] },
            { numero: 3, bioma: ['savana', 'rio'], tamanho_total: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: ['rio'], tamanho_total: 8, animais: [] },
            { numero: 5, bioma: ['savana'], tamanho_total: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            // objeto vai ficar melhor para representar a tabela de animais pq está categorizada por espécies
            LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
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
        let tamanhoNecessario = infoAnimal.tamanho * quantidade;
        const recintosViaveis = [];

        // cada recinto tem que ser analisado, usarei um for each para isso
        this.recintos.forEach(recinto => {

            // regra do bioma adequado
            let biomaAdequado = recinto.bioma.some(b => infoAnimal.bioma.includes(b));

            // espaço ocupado pelos animais dentro do recinto (antes da inserção)
            const espacoOcupado = recinto.animais.reduce((total, atual) => {
                return total + (this.animais[atual.especie].tamanho * atual.quantidade);
            }, 0);

            // cálculo de espaço livre antes da inserção
            let espacoLivreAtual = recinto.tamanho_total - espacoOcupado;

            // se o ambiente ja estiver ocupado com outra espécie, adicionar mais 1 ao espaço total necessário
            if ((recinto.animais.length > 0) && (recinto.animais.some(a => a.especie !== animal))) {
                espacoLivreAtual -= 1;
            }

            // Verificar se há espaço suficiente
            let espacoSuficiente = espacoLivreAtual >= tamanhoNecessario;

            // cálculo de espaço livre depois da inserção
            const espacoLivreDepois = espacoLivreAtual - tamanhoNecessario;

            // regra dos hipos (Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio)
            // const podeHabitarComHipopotamo = animal === 'HIPOPOTAMO' && recinto.bioma === 'savana e rio';

            // regra dos carnívoros (Animais carnívoros devem habitar somente com a própria espécie)
            // const temCarnivoros = recinto.animais.some(a => this.animais[a.especie].carnivoro);
            // const podeHabitar = carnivoro ? animaisPresentes.every(a => a === animal) : !temCarnivoros;

            // if caso animal seja o macaco
            // verifica se o macaco tem companhia
            // se o macaco nao tiver companhia, o bioma não será adequado para ele.
            if (animal === 'MACACO' && quantidade === 1) {
                biomaAdequado = recinto.animais.length > 0; // se houver mais animais, biomaAdequado será true
            }

            // adiciona recinto no array (caso seja viável)
            if (biomaAdequado && espacoSuficiente) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivreDepois} total: ${recinto.tamanho_total})`);
            }

        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }

}

export { RecintosZoo as RecintosZoo };

// new RecintosZoo().analisaRecintos('MACACO', 2);