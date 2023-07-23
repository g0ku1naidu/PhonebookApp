
const express=require('express')
const cors=require('cors')

const app= express()

app.use(express.json())
const morgan=require('morgan')

app.use(morgan('tiny'))
app.use(cors())

app.use(express.static('build'))

let persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



app.get('/',(request,response)=>
        response.send("<h1>Phonebook Application</h1>")
)

app.get('/api/persons',(request,response)=>
        response.json(persons)
)

app.get('/info',(request,response)=>
{
    const phoneRecords=persons.length;
    response.send(`<p>phone has info for ${phoneRecords} people </p> <p>${new Date()} </p> `)
}
)

app.get('/api/persons/:id',(request,response)=>
{
    const id=Number(request.params.id);
    const person=persons.find(person=>person.id===id)
    
    if(!person)
    {
        response.status(404).send({error:`No Note found with id ${id}`})
    }
    else
    {
        response.json(person);
    }

})

app.delete('/api/persons/:id',(request,response)=>
{
    const id=Number(request.params.id);
    const person=persons.find(person=>person.id===id)
    if(!person)
    {
        response.status(404).send({error:`No Note found with id ${id}`})
    }
    else
    {
        persons=persons.filter(person=>person.id!==id)
        response.send(`Person with id ${id} has been deleted successfully`)
    }
})

app.post('/api/persons',(request,response)=>
{   
    const body=request.body;
    console.log(body)
    

    if(!body.name)
    {
        return response.status(400).send({error: 'name must be given'})
    }
    else
    {
        const person=persons.find(person=>person.name.toLocaleLowerCase()===body.name.toLocaleLowerCase());
        if(person)
        {
            return response.status(400).send({error: 'name must be unique'})
        }
    }
    if(!body.number)
    {
        return response.status(400).send({error: 'number must be given'})
    }

        const id=Math.floor(Math.random()*1000000)
        const newPerson=
        {
                "id":id,
                "name":body.name,
                "number":body.number
        }

        persons=persons.concat(newPerson)
        response.send(request.body)
        

})

app.put('/api/persons/:id',(request,response)=>
{
    const id=request.params.id
    response.json(request.body)
})

const port=process.env.PORT || 3001

app.listen(port,()=>console.log(`server is running on port ${port}`))