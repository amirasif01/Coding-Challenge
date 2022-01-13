const db = require ('../dbConfig')

// connect js with database
class Posts {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.author = data.author
        this.body = data.body
        this.post_id = data.postId
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const postsData = await db.query(`SELECT * FROM posts;`)
                const posts = postsData.rows.map(d => new Post(d))
                resolve(posts);
            } catch (err) {
                reject("Error retrieving posts")
            }
        })
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let dogData = await db.query(`SELECT * FROM dogs WHERE id = $1;`, [ id ]);
                let dog = new Dog(dogData.rows[0]);
                resolve (dog);
            } catch (err) {
                reject('Dog not found');
            }
        });
    }

    static findByOwner (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let dogsData = await db.query(`SELECT * FROM dogs WHERE ownerId = $1;`, [ id ]);
                const dogs = dogsData.rows.map(d => new Dog(d))
                resolve (dogs);
            } catch (err) {
                reject('Error retrieving owner\'s dogs');
            }
        });
    }

    static create(name, age){
        return new Promise (async (resolve, reject) => {
            try {
                let dogData = await db.query(`INSERT INTO dogs (name, age) VALUES ($1, $2) RETURNING *;`, [ name, age ]);
                let newDog = new Dog(dogData.rows[0]);
                resolve (newDog);
            } catch (err) {
                reject('Error creating dog');
            }
        });
    }

    update() {
        return new Promise (async (resolve, reject) => {
            try {
                let updatedDogData = await db.query(`UPDATE dogs SET age = age + 1 WHERE id = $1 RETURNING *;`, [ this.id ]);
                let updatedDog = new Dog(updatedDogData.rows[0]);
                resolve (updatedDog);
            } catch (err) {
                reject('Error updating dog');
            }
        });
    }

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                await db.query(`DELETE FROM dogs WHERE id = $1;`, [ this.id ]);
                resolve('Dog was deleted')
            } catch (err) {
                reject('Dog could not be deleted')
            }
        })
    }

}

module.exports = Posts;