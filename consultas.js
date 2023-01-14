const res = require('express/lib/response')
const {Pool}=require('pg')
const pool=new Pool({
    host:'localhost',
    user:'postgres',
    password:'1234',
    database:'likeme',
    allowExitOnIdle:true
})

const getPosts=async()=>{
    const consult="SELECT * FROM posts"
    const {rows:result}=await pool.query(consult)
    console.log(result)
    return result
}


const postPosts=async(titulo,img,descripcion,likes)=>{
    const consult="INSERT INTO posts VALUES(DEFAULT,$1,$2,$3,$4)"
    const values=[titulo,img,descripcion,likes]
    const result=await pool.query(consult,values)
    console.log("Registro agregado con exito")
    return result
    

}

const modificarLikes=async(likes,id)=>{
    const consulta="UPDATE posts SET likes=$1 WHERE id=$2"
    const values=[likes,id]
    const result=await pool.query(consulta,values)
    
}

const eliminarPosts=async(id)=>{
    const consulta="DELETE FROM posts WHERE id=$1"
    const values=[id]
    const result=await pool.query(consulta,values)
}

/* postPosts("Pruebaq","https://images.hola.com/imagenes/mascotas/20221020219416/razas-perros-toy/1-154-385/razas-de-perro-toy-t.jpg","prueba Q",1) */

module.exports={getPosts,postPosts,modificarLikes,eliminarPosts}