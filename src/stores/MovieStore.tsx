import { Movie } from "../types";
import { filter_server } from "../routes";


export const fetchMovie : (id:number)=>Promise<Movie> = async (id:number)=>{
    const data : any = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`).then((response)=>(response.json())).catch((err)=>{
        console.log(err);
    });
    return data["data"]["movie"];
};

export const fetchMovieIds: (filter_data: any) => Promise<number[]> = async (
  filter_data: any
) => {
  const request_body = JSON.stringify(filter_data);
  const data: any = await fetch(filter_server.get_movies, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      'Content-Type': "application/json"
    },
    body: request_body,
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
  return data;
  // return ([
  //     {
  //         id: 1,
  //         title: "Marvel1",
  //         title_long: "Marvel CU"
  //     },
  //     {
  //         id: 2,
  //         title: "Marvel2",
  //         title_long: "Marvel CU"
  //     },
  //     {
  //         id: 3,
  //         title: "Marvel3",
  //         title_long: "Marvel CU"
  //     }
  // ])
};
