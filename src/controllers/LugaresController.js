const database = require('../database/connection');

class TaskController {
    novoLugar(request, response) {
        const {id,nome,tipo_lugar,endereco,aceita_criancas,aceita_pets,espaco_pets,espaco_kids,banheiro_trocador,horario,instagram_link,avaliacao} = request.body;

        console.log(id,nome,tipo_lugar,endereco,aceita_criancas,aceita_pets,espaco_pets,espaco_kids,banheiro_trocador,horario,instagram_link,avaliacao);

        database.table("lugares").insert({ id,nome,tipo_lugar,endereco,aceita_criancas,aceita_pets,espaco_pets,espaco_kids,banheiro_trocador,horario,instagram_link,avaliacao }).then(data => {
            console.log(data);
            response.json({ message: "Lugar criado com sucesso!" });
        }).catch(error => {
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro ao criar a lugar." });
        });
    };

listarLugares(request, response) {
    database.select("*").table("vw_informacoes_lugares").then(lugares => {
        response.json(lugares);
    }).catch(error => {
        console.log(error);
        response.status(500).json({ error: "Ocorreu um erro ao buscar as lugares." });
    });
};

listarUmLugar(request,response){
    const id = request.params.id
    database.select("*").table("vw_informacoes_lugares").where('id',id).then(lugar=>{
        response.json(lugar)
    }).catch(error=>{
        console.log(error)
    })
};

listarImagemPorLugarId(request,response){
    const id = request.params.id
    database.select("*").table("fotos").where('id_lugares',id).then(foto=>{
        response.json(foto)
    }).catch(error=>{
        console.log(error)
    })
};

atualizarLugar(request,response){
    const id = request.params
    const {descricao} = request.body

    database.where({id:id}).update({descricao:descricao}).table("lugares").then(data=>{
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