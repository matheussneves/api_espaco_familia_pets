const database = require('../database/connection');

class TaskController {
    novaTarefa(request, response) {
        const {tipoDeLugar, endereco, aceitaCriancas, aceitaPets, espaçoPets, espaçoKids, banheiroTrocador, horariodeFuncionamento, instagram, avaliacao } = request.body;

        console.log(tipoDeLugar, endereco, aceitaCriancas, aceitaPets, espaçoPets, espaçoKids, banheiroTrocador, horariodeFuncionamento, instagram, avaliacao);

        database.table("tasks").insert({ tipoDeLugar, endereco, aceitaCriancas, aceitaPets, espaçoPets, espaçoKids, banheiroTrocador, horariodeFuncionamento, instagram, avaliacao , Instagram, Avaliação }).then(data => {
            console.log(data);
            response.json({ message: "Tarefa criada com sucesso!" });
        }).catch(error => {
            console.log(error);
            response.status(500).json({ error: "Ocorreu um erro ao criar a tarefa." });
        });
    };


listarTarefas(request, response) {
    database.select("*").table("tasks").then(tarefas => {
        console.log(tarefas);
        response.json(tarefas);
    }).catch(error => {
        console.log(error);
        response.status(500).json({ error: "Ocorreu um erro ao buscar as tarefas." });
    });
};

listarUmaTarefa(request,response){
    const id = request.params

    database.select("*").table("tasks").where({id:id}).then(tarefa=>{
        response.json(tarefa)
    }).catch(error=>{
        console.log(error)
    })
};

atualizarTarefa(request,response){
    const id = request.params
    const {descricao} = request.body

    database.where({id:id}).update({descricao:descricao}).table("tasks").then(data=>{
        response.json({message:"Tarefa atualizar com sucesso"})
    }).catch(error=>{
        response.json(error)

    })
};

removertarefa(request,response){
    const id = request.paramns

    database.where({id:id}).del().table("tasks").then(data=>{
        response.json({message: "Tarefa removida com sucesso"})
    }).catch(error=>{
        response.json(error)
    })
}
};
    

    


module.exports = new TaskController()