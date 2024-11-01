import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "game-review",
    password: "", // have to remove key here
    port: 5432,
})
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let games = [
    {
        creator: 'vetexgames',
        creator_link: 'https://www.roblox.com/users/5414629/profile/',
        title: 'Arcane Odyssey',
        game_link: 'https://www.roblox.com/games/3272915504/Arcane-Odyssey-Halloween',
        date: '2019-06-08',
        visits: '109.2M',
        genre: 'RPG',
        rating: 9.26,
        game_image: 'https://tr.rbxcdn.com/180DAY-84940403ee2b433909e76c23a50b880a/256/256/Image/Webp/noFilter'
    }
];

// Page navigation
app.get("/", async(req, res)=>{
    const result = await db.query("SELECT * FROM game_list ORDER BY title ASC")
    games = result.rows;
    // console.log(games)
    res.render("index.ejs",{
        games: games,
    })
})

app.get("/edit", (req, res)=>{
    res.render("edit.ejs")
})

    app.post("/add", async(req, res)=>{
        let creator = req.body.creator;
        let creator_link = req.body['creator-link'];
        let title = req.body['game-title'];
        let game_link = req.body['game-link'];
        let release_date = req.body['release-date'];
        let visits = req.body.visits;
        let genre = req.body.genre;
        let rating = req.body.rating;
        let game_image = req.body['game-image'];

        try {
            await db.query(`
            INSERT INTO game_list (creator, creator_link, title, game_link, date, visits, genre, rating, game_image)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `,[creator, creator_link, title, game_link, release_date, visits, genre, rating, game_image]);
            res.redirect(`/`)
        } catch (error) {
            console.log(error)
        }
    });

app.get("/delete", (req, res)=>{
    res.render("delete.ejs")
})
    app.post("/remove", async(req, res)=>{
        let name = req.body['game-title'];

        try {
            await db.query(`DELETE FROM game_list WHERE title = $1`,[name])
            console.log(`Successfully delete ${name}`)
            res.redirect(`/`)
        } catch (error) {
            console.log(error)
        }
    });

app.get("/about", (req, res)=>{
    res.render("about.ejs")
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
