<template>
   <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
         <a class="navbar-brand" href="#">MEVN</a>
       </nav>


       <div class="container mt-5">
           <div class="row">
               <div class="col-md-5">
                   <div class="card border-primary">
                       <div class="card-header">
                         
                       </div>
                       <div class="card-body">
                         
                         <form @submit.prevent="sendTask" >
                               <h5 class="lead text-center"></h5>
                            <div class="form-group">
                                <input type="text" v-model="task.title" class="form-control" placeholder="add task">
                            </div>
                           <div class="form-group">
                               <textarea name="" id=""  v-model="task.description" rows="2" class="form-control" placeholder="insert description"></textarea>
                            </div>
                          
                          <div v-if="activo">
                             <button class="btn btn-warning btn-block">editar</button>
                          </div>
                          <div v-else>
                                <button class="btn btn-success btn-block">crear</button>
                          </div>
                          
                          </form>
                       
                       </div>
                     </div>
                  </div>
                   <div class="col-md-7">
                       <table class="table table-bordered">
                           <thead>
                               <th>title</th>
                                <th>description</th>
                           </thead>
                           <tbody>
                               <tr v-for="(task, index) of tasks" :key="index">
                                   <td>{{task.title}}</td>
                                   <td>{{task.description}}</td>
                                   <td>
                                       <button @click="deleteTask(task._id)" class="btn btn-danger btn-sm">delete
                                           
                                        </button>
                                    </td>
                                   <td><button class="btn btn-warning btn-sm" @click="updateTask(task._id)">edit</button></td>
                               </tr>
                           </tbody>
                       </table>
                   </div>
            
           </div>
       </div>
   </div>
</template>






<script>

export default {
    name:"App",

    data(){

        return {
            
            task : { title: '', description:''},
            tasks : [],
            activo : false 
        }
    },

    created() {
        this.getTasks()
    },

    methods: {
        getTasks(){
             fetch('api/task')
             .then(res =>res.json())
             .then(data => {  
             this.tasks = data
             })

        },
       
        deleteTask(id){
             fetch('api/task/'+ id ,{
                 method: 'delete',
                 headers: {
                   'Content-Type': 'application/json'
               }
             }).then(res => res.json())
             .then(data => console.log(data))
               this.getTasks()
        },

        updateTask(id){
            this.activo = true
           fetch('api/task/'+id)
           .then(res=> res.json())
           .then(data => {
               this.task.title = data.title;
               this.task.description = data.description
               this.task.id = data._id
           })
            

        },


        sendTask(){
                if(this.activo ==false){
                    fetch('/api/task',{
                    method:'post',
                    body: JSON.stringify(this.task),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    }).then(res=>res.json())
                    .then(data => console.log(data))
                    
                    this.task.title = ""
                    this.task.description=""
                    this.getTasks();
                }else {

                     fetch('api/task/'+ this.task.id,{
                         method:'PUT',
                         body:JSON.stringify(this.task),
                         headers: {
                             'Content-Type':'application/json'
                         }
                     }).then(res=>res.json())
                        .then(data=>console.log(data))
                            this.task.title = ""
                            this.task.description=""
                          this.getTasks();
                          this.activo = false
                }
            },


     

    }

}
</script>

