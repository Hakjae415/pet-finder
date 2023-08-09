const express = require('express');
const app = express();
const pets = require('./seed')

app.use('/public', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.send(pets)
})

app.get('/pets', (req, res) => {
    const listAll = pets.map((pet) => {
        return `${pet.name}`
    });
    res.send(`All the pets are named ${listAll} `)
})

app.get('/pets/:name', (req, res) => {
    const pet = pets.find(p => p.name === req.params.name);
    if (pet) {
        res.send(`
        <h1>Name: ${pet.name}</h1>
        Breed: ${pet.breed}</br>
        Age: ${pet.age}</br>
        Owner: ${pet.owner}</br>
        `);
    } else {
        res.status(404).send({ error: "Pet not found!" });
    }
});

app.get('/pets/owner', (req, res) => {
    const ownerName = req.query.owner;
    const ownerPet = pets.filter((pet) => pet.owner === ownerName)

    if (ownerPet.length > 0) {
        const petsName = ownerPet.map((pet) => pet.name)
        const owner = `
            Owner: ${ownerPet[0].owner}
            Owner's Pet's: ${petsName.join(', ')}
        `
        res.send(owner)
    } else {
        res.status(404).send({ error: "Owner not found"});
    }
})

const PORT = 1337;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})