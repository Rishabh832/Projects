let prompt = document.querySelector("#prompt");
let chatcontainer = document.querySelector(".chat-container");
let imagebtn = document.querySelector("#image");
let image = document.querySelector("#image img");
let imageinput = document.querySelector("#imageUpload");

const Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBQvlbmZNibfECb-bqadal-CR3UY7FzZls";

let user = {
  message: null,
  file: {
    mime_type: null,
    data: null
  }
};

async function generateResponse(aichatbox) {
  let text = aichatbox.querySelector(".ai-chat-area");
  let RequestOption = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "contents": [{
        "parts": [
          { "text": user.message },
          ...(user.file.data ? [{ "inline_data": user.file }] : [])
        ]
      }]
    })
  };

  try {
    let response = await fetch(Api_url, RequestOption);
    let data = await response.json();

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      text.innerHTML = apiResponse;
    } else {
      text.innerHTML = " No response from AI.";
    }
  } catch (error) {
    console.log(error);
    text.innerHTML = " Error getting response.";
  } finally {
    chatcontainer.scrollTo({ top: chatcontainer.scrollHeight, behavior: "smooth" });
    image.src = `img.svg`;
    image.classList.remove("choose");
    user.file = {};
  }
}

function createchatbox(html, classes) {
  let div = document.createElement("div");
  div.innerHTML = html;
  div.classList.add(classes);
  return div;
}

function handlechatresponse(usermessage) {
  user.message = usermessage.trim();
  if (!user.message && !user.file.data) return;

  let html = `
    <img src="images/user-log.jpg" alt="" id="userimage" width="10%">
    <div class="user-chat-area">
      ${user.message}
      ${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg"/>` : ""}
    </div>`;

  prompt.value = "";

  let userchatbox = createchatbox(html, "user-chat-box");
  chatcontainer.appendChild(userchatbox);
  chatcontainer.scrollTo({ top: chatcontainer.scrollHeight, behavior: "smooth" });

  setTimeout(() => {
    let html = `
      <img src="images/chat-bot-logo.jpg" alt="" id="aiImage" width="13%">
      <div class="ai-chat-area">
        <img src="loading/loader.svg" alt="" class="load" width="50px">
      </div>`;

    let aichatbox = createchatbox(html, "ai-chat-box");
    chatcontainer.appendChild(aichatbox);
    generateResponse(aichatbox);
  }, 600);
}

prompt.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handlechatresponse(prompt.value);
  }
});

imageinput.addEventListener("change", () => {
  const file = imageinput.files[0];
  if (!file) return;

  let reader = new FileReader();
  reader.onload = (e) => {
    let base64str = e.target.result.split(",")[1];
    user.file = {
      mime_type: file.type,
      data: base64str
    };
    image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
    image.classList.add("choose");
  };
  reader.readAsDataURL(file);
});

imagebtn.addEventListener("click", () => {
  imageinput.click();
});
