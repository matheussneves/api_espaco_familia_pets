const database = require('../database/connection');

class TaskController {
    novoLugar(request, response) {
        const {nome,tipo_lugar,endereco,aceita_criancas,aceita_pets,espaco_pets,espaco_kids,banheiro_trocador,horario,instagram_link,avaliacao} = request.body;
        console.log(nome,tipo_lugar,endereco,aceita_criancas,aceita_pets,espaco_pets,espaco_kids,banheiro_trocador,horario,instagram_link,avaliacao);

        database.table("lugares").insert({ nome,tipo_lugar,endereco,aceita_criancas,aceita_pets,espaco_pets,espaco_kids,banheiro_trocador,horario,instagram_link,avaliacao }).then(data => {
            console.log(data);
            response.json({ message: "Lugar criado com sucesso!" });
        }).catch(error => {
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro ao criar a lugar." });
        });
    };

listarLugares(request, response) {
    console.log(request.query)
    const where = {};
    if (request.query.aceita_criancas == "S") {where.aceita_criancas = "Sim"} else if (request.query.aceita_criancas == "N") {where.aceita_criancas = "Não"}
    if (request.query.aceita_pets == "S") {where.aceita_pets = "Sim"} else if (request.query.aceita_pets == "N") {where.aceita_pets = "Não"}
    if (request.query.espaco_pets == "S") {where.espaco_pets = "Sim"} else if (request.query.espaco_pets == "N") {where.espaco_pets = "Não"}
    if (request.query.espaco_kids == "S") {where.espaco_kids = "Sim"} else if (request.query.espaco_kids == "N") {where.espaco_kids = "Não"}
    if (request.query.banheiro_trocador == "S") {where.banheiro_trocador = "Sim"} else if (request.query.banheiro_trocador == "N") {where.banheiro_trocador = "Não"}
    if (request.query.toString() == {}){
        console.log("tudo")
        database.select("*").table("vw_informacoes_lugares").then(lugar=>{response.json(lugar.map((item) => ({ ...item, imagens: item.imagens.split(',') })))
    }).catch(error=>{
        console.log({error})
        response.json({error})
    })
    } else if (request.query.nome == '' && request.query.tipo_lugar == '' ) {
        console.log(3)
        database.select("*").table("vw_informacoes_lugares").where(where).then(lugar=>{response.json(lugar.map((item) => ({ ...item, imagens: item.imagens.split(',') })))
    }).catch(error=>{
        console.log({error})
        response.json({error})
    })
    } else if(request.query.nome == ''  && !request.query.tipo_lugar == '' ){
        console.log(1)
    database.select("*").table("vw_informacoes_lugares").where(where).whereILike('tipo_lugar', `%${request.query.tipo_lugar }%`).then(lugar=>{response.json(lugar.map((item) => ({ ...item, imagens: item.imagens.split(',') })))
    }).catch(error=>{
        console.log({error})
        response.json({error})
    })
    } else if (request.query.tipo_lugar == '' && !request.query.nome == '') {
        console.log(2)
        database.select("*").table("vw_informacoes_lugares").where(where).WhereILike('nome', `%${request.query.nome}%`).then(lugar=>{response.json(lugar.map((item) => ({ ...item, imagens: item.imagens.split(',') })))
    }).catch(error=>{
        console.log({error})
        response.json({error})
    })
    }  else  {
        console.log(4)
        database.select("*").table("vw_informacoes_lugares").where(where).whereILike('tipo_lugar', `%${request.query.tipo_lugar }%`).orWhereILike('nome', `%${request.query.nome}%`).then(lugar=>{response.json(lugar.map((item) => ({ ...item, imagens: item.imagens.split(',') })))
    }).catch(error=>{
        console.log({error})
        response.json({error})
    })
    }
};

atualizarLugar(request,response){
    const id = request.query
    const {nome,tipo_lugar,endereco,aceita_criancas,aceita_pets,espaco_pets,espaco_kids,banheiro_trocador,horario,instagram_link,avaliacao} = request.body;
    database.where({id:id}).update({nome:nome,tipo_lugar:tipo_lugar,endereco:endereco,aceita_criancas:aceita_criancas,aceita_pets:aceita_pets,espaco_pets:espaco_pets,espaco_kids:espaco_kids,banheiro_trocador:banheiro_trocador,horario:horario,instagram_link:instagram_link,avaliacao:avaliacao}).table("lugares").then(data=>{
        response.json({message:"Lugar atualizado com sucesso"})
    }).catch(error=>{
        response.json(error)

    })
};

removerlugar(request,response){
    const id = request.paramns

    database.where({id:id}).del().table("lugares").then(data=>{
        response.json({message: "Lugar removido com sucesso"})
    }).catch(error=>{
        response.json(error)
    })
}
};
    

    


module.exports = new TaskController()