const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d113c88db9mshc6317bd52a4dce9p18dbf6jsna768a18414e6",
    "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
  },
};

const btn = document.getElementById("get_btn");
btn.addEventListener("click", () => {
  fetch(
    "https://online-movie-database.p.rapidapi.com/title/get-most-popular-movies?currentCountry=US&purchaseCountry=US&homeCountry=US",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let popular_movies_tt = response.slice(0, 5);
      fetch_detail(popular_movies_tt);
    })
    .catch((err) => console.error(err));

  let image_big_container = document.querySelector(".flex-box");

  let popular_movie_arr;
  const fetch_detail = (popular_movies_tt) => {
    popular_movie_arr = popular_movies_tt.map((movie) => {
      let len = movie.length;
      len = len - (7 + 1);
      // console.log(len);
      return movie.substr(7, len);
    });

    console.log(popular_movie_arr);
    console.log(fetch_detail);

    const imge_store = popular_movie_arr.map((get_img) => {
      fetch(
        "https://online-movie-database.p.rapidapi.com/title/get-details?tconst=" +
          get_img,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response.image.url);
          let new_url = response.image.url;
          let image_container = document.createElement("div");
          image_container.className = "col";
          const img = document.createElement("img");
          img.src = new_url;
          image_container.appendChild(img);
          image_big_container.appendChild(image_container);
        })
        .catch((err) => console.error(err));
    });
  };
});

const search_bar = document.querySelector("#search");
console.log(search_bar);
const item_container = document.querySelector(".item_container");
search_bar.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("text").value;
  console.log(input);
  fetch(
    "https://online-movie-database.p.rapidapi.com/title/find?q=" + input,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      document.querySelector(".item_container").textContent = " ";

      let popular_movies = document.querySelector(".popular_movies");
      // popular_movies.className = "container-fluid ";
      popular_movies.textContent = " ";
      let show = response.results;
      // show = show.slice(0, 15);
      console.log(show);
      let url = show.map((item) => {
        let id = item.id;
        console.log(id);
        let len = id.length;
        len = len - (7 + 1);
        id = id.substr(7, len);
        console.log(id);

        let innerdiv = document.createElement("div");
        innerdiv.className = "col";
        const movie_name = document.createElement("h3");
        movie_name.innerText = item.title;
        const search_img = document.createElement("img");
        search_img.src = item.image.url;
        innerdiv.setAttribute("id", id);
        innerdiv.setAttribute("target", "_blank");
        innerdiv.appendChild(search_img);
        innerdiv.appendChild(movie_name);
        item_container.appendChild(innerdiv);

        innerdiv.addEventListener("click", (e) => {
          e.preventDefault();
          const get_id = innerdiv.getAttribute("id");

          fetch(
            "https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=" +
              get_id +
              "&currentCountry=US",
            options
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              let movie_title = response.title.title || "UnKnown";
              let image_url = response.title.image.url || "Undefined";
              let rating = response.ratings.rating || "Undefined";
              let rating_count = response.ratings.ratingCount || "Undefined";
              let author = response.plotSummary.author || "UnKnown";
              let info = response.plotSummary.text || "NULL";
              let movies_type = response.genres || "NULL";

              let popular_movies = document.querySelector(".popular_movies");
              // popular_movies.className = "container-fluid ";
              popular_movies.textContent = " ";
              let flex_box_detail = document.createElement("div");
              flex_box_detail.className = "container-sm flex-box-detail";
              let image = document.createElement("img");
              image.className = "movie_image";
              image.src = image_url;

              let container_lg = document.createElement("div");
              container_lg.className = "detail container-lg";
              let h1 = document.createElement("h1");
              h1.innerText = movie_title;
              let flex = document.createElement("div");
              flex.className = "flex";
              let h5 = document.createElement("h5");
              h5.innerText = "Rating :";
              let span1 = document.createElement("span");
              h5.appendChild(span1);
              span1.innerText = rating;
              let h6 = document.createElement("h5");
              h6.innerText = "Rating Count :";
              let span2 = document.createElement("span");
              span2.innerText = rating_count;
              h6.appendChild(span2);

              flex.appendChild(h5);
              flex.appendChild(h6);

              container_lg.appendChild(h1);
              container_lg.appendChild(flex);

              flex_box_detail.appendChild(image);
              flex_box_detail.append(container_lg);

              let movitype = document.createElement("div");

              let h3 = document.createElement("h3");
              h3.innerText = "Types of Movie";

              movitype.appendChild(h3);

              movies_type.map((type) => {
                let li = document.createElement("li");
                li.innerText = type;
                movitype.appendChild(li);
              });

              container_lg.appendChild(movitype);

              let outline = document.createElement("div");
              outline.className = "outline";

              let author_tag = document.createElement("h3");
              author_tag.innerText = author;

              let p = document.createElement("p");
              p.className = "praghraph";
              p.innerText = info;

              outline.appendChild(author_tag);
              outline.appendChild(p);

              container_lg.appendChild(outline);

              popular_movies.appendChild(flex_box_detail);
            })
            .catch((err) => console.error(err));
        });
        return item.image.url;
      });
      // console.log(url);
    })
    .catch((err) => console.error(err));
});
