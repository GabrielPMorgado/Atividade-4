// Classe base Contribuinte
class Contribuinte {
    constructor(nome, documento, rendaBruta) {
        this.nome = nome;
        this.documento = documento;
        this.rendaBruta = rendaBruta;
    }

    calcImposto() {
        throw new Error("Este método deve ser implementado nas subclasses");
    }
}

// Classe PessoaFisica que herda de Contribuinte
class PessoaFisica extends Contribuinte {
    constructor(nome, documento, rendaBruta, sexo) {
        super(nome, documento, rendaBruta);
        this.sexo = sexo;
    }

    calcImposto() {
        const renda = this.rendaBruta;
        let aliquota = 0;
        let deducao = 0;

        if (renda > 1400.00 && renda <= 2100.00) {
            aliquota = 0.10;
            deducao = 100;
        } else if (renda > 2100.00 && renda <= 2800.00) {
            aliquota = 0.15;
            deducao = 270;
        } else if (renda > 2800.00 && renda <= 3600.00) {
            aliquota = 0.25;
            deducao = 500;
        } else if (renda > 3600.00) {
            aliquota = 0.30;
            deducao = 700;
        }

        return renda * aliquota - deducao;
    }
}

// Classe PessoaJuridica que herda de Contribuinte
class PessoaJuridica extends Contribuinte {
    constructor(nome, documento, rendaBruta, anoFundacao) {
        super(nome, documento, rendaBruta);
        this.anoFundacao = anoFundacao;
    }

    calcImposto() {
        return this.rendaBruta * 0.10;
    }
}

// Classe GrupoDeContribuintes para gerenciar os contribuintes
class GrupoDeContribuintes {
    constructor() {
        this.contribuintes = [];
    }

    // Adiciona um contribuinte (PessoaFisica ou PessoaJuridica) na lista
    addContribuinte(contribuinte) {
        this.contribuintes.push(contribuinte);
    }

    // Retorna o total de imposto devido por todos os contribuintes
    getTotalImposto() {
        return this.contribuintes.reduce((total, contribuinte) => {
            return total + contribuinte.calcImposto();
        }, 0);
    }

    // Retorna a porcentagem de contribuintes do sexo feminino
    getPorcentagemContribuintesFeminino() {
        const totalFeminino = this.contribuintes.filter(contribuinte => 
            contribuinte instanceof PessoaFisica && contribuinte.sexo === 'Feminino').length;

        return (totalFeminino / this.contribuintes.length) * 100;
    }
}

// Exemplo de uso:

// Criando instâncias de PessoaFisica e PessoaJuridica
const gabriel = new PessoaFisica('Gabriel', '123.456.789-00', 2500, 'Masculino');
const ana = new PessoaFisica('Ana', '987.654.321-00', 3200, 'Feminino');
const empresa = new PessoaJuridica('Empresa X', '12.345.678/0001-99', 100000, 2001);

// Criando o grupo de contribuintes
const grupo = new GrupoDeContribuintes();
grupo.addContribuinte(gabriel);
grupo.addContribuinte(ana);
grupo.addContribuinte(empresa);

// Calculando o total de imposto e a porcentagem de contribuintes do sexo feminino
console.log('Total de imposto:', grupo.getTotalImposto());
console.log('Porcentagem de contribuintes femininos:', grupo.getPorcentagemContribuintesFeminino(), '%');
