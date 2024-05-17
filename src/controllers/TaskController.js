const database = require('../database/connection');

class TaskController {
    novoLugar(request, response) {
        const {tipoDeLugar, endereco, aceitaCriancas, aceitaPets, espaçoPets, espaçoKids, banheiroTrocador, horariodeFuncionamento, instagram, avaliacao } = request.body;

        console.log(tipoDeLugar, endereco, aceitaCriancas, aceitaPets, espaçoPets, espaçoKids, banheiroTrocador, horariodeFuncionamento, instagram, avaliacao);

        database.table("tasks").insert({ tipoDeLugar, endereco, aceitaCriancas, aceitaPets, espaçoPets, espaçoKids, banheiroTrocador, horariodeFuncionamento, instagram, avaliacao , Instagram, Avaliação }).then(data => {
            console.log(data);
            response.json({ message: "Lugar criado com sucesso!" });
        }).catch(error => {
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro ao criar a lugar." });
        });
    };

    listarLugares(request, response) {
    database.select("*").table("lugar").then(lugares => {
        console.log(lugares);
        response.json(lugares);
    }).catch(error => {
        console.log(error);
        response.status(500).json({ error: "Ocorreu um erro ao buscar as lugares." });
    });
};

listarUmLugar(request,response){
    const id = request.params
    database.select("*").table("lugar").where({id:id}).then(lugar=>{
        response.json(lugar)
    }).catch(error=>{
        console.log(error)
    })
};

atualizarLugar(request,response){
    const id = request.params
    const {descricao} = request.body

    database.where({id:id}).update({descricao:descricao}).table("lugar").then(data=>{
        response.json({message:"Lugar atualizado com sucesso"})
    }).catch(error=>{
        response.json(error)

    })
};

removerlugar(request,response){
    const id = request.paramns

    database.where({id:id}).del().table("lugar").then(data=>{
        response.json({message: "Lugar removido com sucesso"})
    }).catch(error=>{
        response.json(error)
    })
}
};
    

    


module.exports = new TaskController()