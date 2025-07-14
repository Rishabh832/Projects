
// ==== normal code =====
const togglebutton = document.getElementById("toggleButton");

// Initialize a toggle state
let istogglebutton = false;

// console.log(togglebutton);

let hide_items = document.getElementsByClassName("hide_items");
// console.log(hide_items);

togglebutton.addEventListener("click", () => {
    console.log("i am");

    // Toggle the state
    istogglebutton = !istogglebutton;


    const firstnav = document.getElementById("first");
    firstnav.classList.toggle("expanded");
    // console.log(firstnav.children[0].children);
    
    if (istogglebutton) {
        firstnav.style.cssText = "display: flex; flex-direction: column; justify-content: center; align-items: center; gap:21px;";

    }
    else {
        firstnav.style.cssText = "display: flex; flex-direction: column; justify-content: center; align-items: center; gap:0px"

    }

    for (let element of hide_items) {
        // console.log(element);
        element.classList.toggle("hidden_content");  
    }
    
});


// classList ---> it allows to work with class names in an efficient manner
/*
    add() ---> It will add new class name
    remove() --> It will remove the class name
    replace() --> It will replace the class name with another name.
    contains() --> It will check the class name exists or not and returns a boolean value.
    toggle() --> It will check class nams is present or not.
                 If present  -- it will remove 
                 If not present  -- it will add
*/

// ? API Integration


const api = "AIzaSyCP2s9ZWBo-NnLRj3pkWWNzpasr5RIXWl4";

const searchHTTP="https://www.googleapis.com/youtube/v3/search?";
const CHANNEL_HTTP="https://www.googleapis.com/youtube/v3/channels?"


let callyoutubeapi = async (search_query = "") => {
    let search_params = new URLSearchParams({
        key: api,
        part: "snippet",
        q: search_query,  // ✅ use passed query
        maxResults: 50,
        type: "video",
        regionCode: "IN",
});


    let res = await fetch (searchHTTP+search_params);
    let data = await res.json();
    // console.log(data.items);


     // We want thumbnail url(done) , channelIcon(pending) , title(done) , channelName(done) , video link(done)

     data.items.map((video_data, ind)=>{
        // console.log(video_data);
        // console.log(video_data.id.videoId);
        // console.log(`https://www.youtube.com/watch?v=${video_data.id.videoId}`);
        // console.log(video_data.snippet.channelId);
        // console.log(video_data.snippet.title);
        // console.log(video_data.snippet.channelTitle);
        // console.log(video_data.snippet.thumbnails.high.url);

        getchannelIcon(video_data)
     });
};


let getchannelIcon = async video_data =>{
    let channel_params = new URLSearchParams({
        key: api, // M
        part: "snippet", // M,
        id: video_data.snippet.channelId,
    });

    let res = await fetch (CHANNEL_HTTP+channel_params);
    let data = await res.json();

    // console.log(data);
    // console.log(data.items);
    // console.log(data.items[0].snippet);
    // console.log(data.items[0].snippet.thumbnails);
    // console.log(data.items[0].snippet.thumbnails.high);
    // console.log(data.items[0].snippet.thumbnails.high.url);
    let channelIcon = data.items[0].snippet.thumbnails.high.url;
    
    // work on DOM
    console.log(video_data);
    console.log(channelIcon);

    appendvideoinContainer(video_data, channelIcon);
};

// to create video

let appendvideoinContainer = (video_data, channelIcon)=>{
    main_content.innerHTML += `
    <a href="https://www.youtube.com/watch?v=${video_data.id.videoId}">

    <main class="video_container">
                <article class="imageBox">
                  <img src="${video_data.snippet.thumbnails.high.url}" alt="" />
                </article>
                <article class="infoBox">
                  <div class="images">
                    <img src="${channelIcon}" alt="" />
                  </div>
                  <div>
                    <p>
                     ${video_data.snippet.title}
                    </p>
                    <p class="channelName">${video_data.snippet.channelTitle}</p>
                  </div>
                </article>
              </main>
    </a>  
    `

};

let main_content = document.getElementById("main_content");
let search_button = document.getElementById("search_button");
// console.log(search_button);

search_button.addEventListener("click", () => {
  console.log("event triggered");

  let user_input = document.getElementById("user_input").value;
  console.log("You made a request  for", user_input, "data");
  main_content.innerHTML = "";

  callyoutubeapi(user_input);
});
const defaultQueries = ["trending", "Bollywood", "Cricket", "Technology", "Comedy", "News", "Motivation"];
const randomQuery = defaultQueries[Math.floor(Math.random() * defaultQueries.length)];


callyoutubeapi(randomQuery);



