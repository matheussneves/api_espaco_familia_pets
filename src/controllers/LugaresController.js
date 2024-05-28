const database = require('../database/connection');

class TaskController {
    novoLugar(request, response) {
        const {nome,tipo_lugar,endereco,aceita_criancas,aceita_pets,espaco_pets,espaco_kids,banheiro_trocador,horario,avaliacao,imagens} = request.body;
         database.table("lugares").insert({ nome,tipo_lugar,endereco,aceita_criancas,aceita_pets,espaco_pets,espaco_kids,banheiro_trocador,horario,avaliacao }).then(data => {
            console.log(data);
            response.json({ message: "Lugar criado com sucesso!" });
        }).catch(error => {
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro ao criar a lugar." });
        });
        imagens.map((url) => {
            database.table("fotos").insert({id_lugares:(database.table("lugares").max('id')),url:url }).then()
        })
        console.log(request.body)
    };

listarLugares(request, response) {
    const where = {};
    if(request.query.id === undefined){
        if (request.query.aceita_criancas == "S") {where.aceita_criancas = "Sim"} else if (request.query.aceita_criancas == "N") {where.aceita_criancas = "Não"}
        if (request.query.aceita_pets == "S") {where.aceita_pets = "Sim"} else if (request.query.aceita_pets == "N") {where.aceita_pets = "Não"}
        if (request.query.espaco_pets == "S") {where.espaco_pets = "Sim"} else if (request.query.espaco_pets == "N") {where.espaco_pets = "Não"}
        if (request.query.espaco_kids == "S") {where.espaco_kids = "Sim"} else if (request.query.espaco_kids == "N") {where.espaco_kids = "Não"}
        if (request.query.banheiro_trocador == "S") {where.banheiro_trocador = "Sim"} else if (request.query.banheiro_trocador == "N") {where.banheiro_trocador = "Não"}
        if (request.query.toString() == '{}'){
            database.select("*").table("vw_informacoes_lugares").then(lugar=>{response.json(lugar.map((item) => ({ ...item, imagens: item.imagens.split(',') })))
        }).catch(error=>{
            console.log({error})
            response.json({error})
        })
        } else if (request.query.nome == undefined && request.query.tipo_lugar == undefined ) {
            database.select("*").table("vw_informacoes_lugares").where(where).then(lugar=>{response.json(lugar.map((item) => ({ ...item, imagens: item.imagens.split(',') })))
        }).catch(error=>{
            console.log({error})
            response.json({error})
        })
        } else if(request.query.nome ==  undefined  && !request.query.tipo_lugar == undefined ){
        database.select("*").table("vw_informacoes_lugares").where(where).whereILike('tipo_lugar', `%${request.query.tipo_lugar }%`).then(lugar=>{response.json(lugar.map((item) => ({ ...item, imagens: item.imagens.split(',') })))
        }).catch(error=>{
            console.log({error})
            response.json({error})
        })
        } else if (request.query.tipo_lugar == undefined && !request.query.nome == undefined) {
            database.select("*").table("vw_informacoes_lugares").where(where).WhereILike('nome', `%${request.query.nome}%`).then(lugar=>{response.json(lugar.map((item) => ({ ...item, imagens: item.imagens.split(',') })))
        }).catch(error=>{
            console.log({error})
            response.json({error})
        })
        }  else  {
            database.select("*").table("vw_informacoes_lugares").where(where).whereILike('tipo_lugar', `%${request.query.tipo_lugar}%`).orWhereILike('nome', `%${request.query.nome}%`).then(lugar=>{response.json(lugar.map((item) => ({ ...item, imagens: item.imagens.split(',') })))
        }).catch(error=>{
            console.log({error})
            response.json({error})
        })
        }
    }else{
        database.select("*").table("vw_informacoes_lugares").where('id',request.query.id).then(lugar=>{response.json(lugar.map((item) => ({ ...item, imagens: item.imagens.split(',') })))
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
    const id = request.params.id
    database.table("fotos").where('id_lugares',id).del().then()
    database.table("lugares").where('id',id).del().then(data=>{
        response.json({message: "Lugares removido com sucesso"})
    }).catch(error=>{
        response.json(error)
    });
}
};
    

    


module.exports = new TaskController()