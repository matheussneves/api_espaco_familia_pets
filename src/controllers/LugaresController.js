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
    const where = {};
    if (request.body.aceita_criancas == true) {where.aceita_criancas = "Sim"} else if (request.body.aceita_criancas == false) {where.aceita_criancas = "Não"}
    if (request.body.aceita_pets == true) {where.aceita_pets = "Sim"} else if (request.body.aceita_pets == false) {where.aceita_pets = "Não"}
    if (request.body.espaco_pets == true) {where.espaco_pets = "Sim"} else if (request.body.espaco_pets == false) {where.espaco_pets = "Não"}
    if (request.body.espaco_kids == true) {where.espaco_kids = "Sim"} else if (request.body.espaco_kids == false) {where.espaco_kids = "Não"}
    if (request.body.banheiro_trocador == true) {where.banheiro_trocador = "Sim"} else if (request.body.banheiro_trocador == false) {where.banheiro_trocador = "Não"}
    database.select("*").table("vw_informacoes_lugares").where(where).whereILike('tipo_lugar', `%${request.body.tipo_lugar}%`).orWhereILike('nome', `%${request.body.nome}%`).then(lugar=>{
        response.json(lugar.map((item) => ({ ...item, imagens: item.imagens.split(',') })))
    }).catch(error=>{
        console.log({error})
        response.json({error})
    })
};

atualizarLugar(request,response){
    const id = request.params
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