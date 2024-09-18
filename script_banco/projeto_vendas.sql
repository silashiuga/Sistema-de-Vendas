CREATE DATABASE projeto_vendas;
USE projeto_vendas;

CREATE TABLE administradores(
	codigo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(60) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    PRIMARY KEY(codigo)
);

CREATE TABLE vendedores(
	codigo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(60) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    PRIMARY KEY(codigo)
);

CREATE TABLE clientes(
	codigo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    rua VARCHAR(50) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    PRIMARY KEY(codigo)
);

CREATE TABLE categorias(
	codigo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    ativo INT NOT NULL,
    PRIMARY KEY(codigo)
);

CREATE TABLE produtos(
	codigo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(50) NOT NULL,
    estoque INT NOT NULL,
    valor DECIMAL(8,2) NOT NULL,
    ativo INT NOT NULL,
    codigo_categoria INT NOT NULL,
    PRIMARY KEY(codigo),
    FOREIGN KEY (codigo_categoria) REFERENCES categorias(codigo)
);


CREATE TABLE compras(
	codigo INT NOT NULL AUTO_INCREMENT,
    codigo_cliente INT NOT NULL,
    codigo_vendedor INT NOT NULL,
    data_compra DATE NOT NULL,
    valor DECIMAL(8,2) NOT NULL,
    PRIMARY KEY(codigo),
    FOREIGN KEY (codigo_cliente) REFERENCES clientes(codigo),
    FOREIGN KEY (codigo_vendedor) REFERENCES vendedores(codigo)
);

CREATE TABLE items_compras(
	codigo INT NOT NULL AUTO_INCREMENT,
    quantidade INT NOT NULL,
    valor_unitario DECIMAL(8,2) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    codigo_produto INT NOT NULL,
    codigo_compra INT NOT NULL,
    PRIMARY KEY(codigo),
    FOREIGN KEY (codigo_produto) REFERENCES produtos(codigo),
    FOREIGN KEY (codigo_compra) REFERENCES compras(codigo)
);

/*Adicioando administrador ao sistema, a email admin@email.com senha de acesso é 53892 */
INSERT INTO administradores (nome, email, senha, cpf) VALUES ('Admin', 'admin@email.com', '$2a$10$egrUdh4EsBABvC1y2A/NFO3UXyOKgeajFXGYrJLZRZg..8u.DmZbO', '123.654.321-34');
