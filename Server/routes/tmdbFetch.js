const express=require('express')
const router=express.Router()
const axios=require('axios');
const { string } = require('joi');


router.get('/netflixOrginals',(req,res)=>{
    axios.get("https://api.themoviedb.org/3/discover/tv?api_key=d6d47f39c9fd13524ea9023dc82cd9c7&with_networks=213").then(function (response) {
         res.send(response.data);
        })
        .catch(function (error) {
          res.status(404).send(error);
        });
})

router.get('/trendingAll',(req,res)=>{
  axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=d6d47f39c9fd13524ea9023dc82cd9c7").then(function (response) {
       res.send(response.data);
      })
      .catch(function (error) {
       res.status(404).send(error);
      });
})

router.get('/topRatedMovies',(req,res)=>{
  axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=d6d47f39c9fd13524ea9023dc82cd9c7").then(function (response) {
       res.send(response.data);
      })
      .catch(function (error) {
      res.status(404).send(error);
      });
})


router.get('/popularMovies',(req,res)=>{
  axios.get("https://api.themoviedb.org/3/movie/popular?api_key=d6d47f39c9fd13524ea9023dc82cd9c7").then(function (response) {
       res.send(response.data);
      })
      .catch(function (error) {
      res.status(404).send(error);
      });
})


router.get('/movieGenres',(req,res)=>{
  axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=d6d47f39c9fd13524ea9023dc82cd9c7&language=en-US").then(function (response) {
       res.send(response.data)
      })
      .catch(function (error) {
      res.status(404).send(error);
      });
})
router.get('/tvGenres',(req,res)=>{
     axios.get("https://api.themoviedb.org/3/genre/tv/list?api_key=d6d47f39c9fd13524ea9023dc82cd9c7&language=en-US").then(function (response) {
          res.send(response.data)
         })
         .catch(function (error) {
          res.status(404).send(error);
         });
   })

router.get('/movies',(req,res)=>{
     let genre=req.query.id;
     if(typeof genre!==string){
          axios.get('https://api.themoviedb.org/3/discover/movie?api_key=d6d47f39c9fd13524ea9023dc82cd9c7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate').then(function (response) {
               res.send(response.data)
      })
      .catch(function (error) {
      res.status(404).send(error)
      });       
     }else{
          axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=d6d47f39c9fd13524ea9023dc82cd9c7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${genre}`).then(function(response){
               res.send(response.data)
          }).catch(function(error){
               res.status(404).send(error);
          })
     }
  
})


router.get('/tv',(req,res)=>{
     let genre=req.query.id;
     if(typeof genre!==string){
          axios.get('https://api.themoviedb.org/3/discover/tv?api_key=d6d47f39c9fd13524ea9023dc82cd9c7&language=en-US&sort_by=popularity.desc&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0').then(function (response) {
               res.send(response.data)
      })
      .catch(function (error) {
     res.status(404).send(error);
      });      
     }else{
          axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=d6d47f39c9fd13524ea9023dc82cd9c7&language=en-US&sort_by=popularity.desc&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0&with_genres=${genre}`).then(function(response){
               res.send(response.data)
          }).catch(function(error){
               res.status(404).send(error);
          })
     }
})

router.get('/search',(req,res)=>{
     let searchQuery=req.query.searchQuery;
     console.log(searchQuery);
     if(searchQuery){
          axios.get(`https://api.themoviedb.org/3/search/multi?api_key=d6d47f39c9fd13524ea9023dc82cd9c7&language=en-US&query=${searchQuery}&page=1&include_adult=false`).then(function(response){
          if(response.data.results.length!==0){
               var stat=true
               res.send({searchResult:response.data,status:stat})
          }else{
               stat=false
               res.send({status:stat})
          }
     }).catch(function(error){
          res.status(404).send(error);
     })
     }else {
          var stat=false
          res.send({statatus:stat})
     }
})







module.exports=router