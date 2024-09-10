class RecintosZoo {

    constructor() {
        this.recintos = [
            // array com hash tables para representar a tabela recintos pq está categorizada com índice numérico
            // em animais, um array com hash tables para representar possiveis outros animais no mesmo recinto
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
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

    // verifica se a quantidade de animais é um número inteiro e se é positivo
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
            let espacoLivreAtual = recinto.tamanhoTotal - espacoOcupado;

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

            // verificação de carnívoros no recinto
            const temCarnivoros = recinto.animais.some(a => this.animais[a.especie].carnivoro);
            // verifica se todos os carnívoros são da mesma espécie
            const mesmoCarnivoro = recinto.animais.every(a => a.especie === animal);

            // regra dos carnívoros (Animais carnívoros devem habitar somente com a própria espécie)
            if (infoAnimal.carnivoro) {
                // qualquer espécie diferente não será tolerada pelos carnívoros!!!
                if (recinto.animais.some(a => a.especie !== animal)) {
                    // se houver qualquer outro animal ou carnívoro diferente no recinto, não pode adicionar
                    biomaAdequado = false;
                }
            } else {
                // se o animal não é carnívoro, mas já há carnívoros no recinto, também não pode habitar
                if (temCarnivoros) {
                    biomaAdequado = false;
                }
            }

            // if caso animal seja o macaco
            // verifica se o macaco tem companhia
            // se o macaco nao tiver companhia, o bioma não será adequado para ele.
            if (animal === 'MACACO' && quantidade === 1) {
                biomaAdequado = recinto.animais.length > 0; // se houver mais animais, biomaAdequado será true
            }

            // adiciona recinto no array (caso seja viável)
            if (biomaAdequado && espacoSuficiente) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivreDepois} total: ${recinto.tamanhoTotal})`);
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