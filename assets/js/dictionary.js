const body = document.querySelector('body');
const sourceUrl = document.querySelector('.source-url');
const mainTitle = document.querySelector('.main-title');
const fontSelect = document.getElementById("fontFamily")

switchTheme.addEventListener('click', changeTheme);

function changeTheme() {
    body.classList.toggle('dark-mode');
    searchInput.classList.toggle('dark-mode-input');
    fontSelect.classList.toggle('dark-mode-font');
    sourceUrl.classList.toggle('dark-mode-source');
}

searchInput.addEventListener('keydown', inputValue)
function inputValue(e) {
  if(e.key === "Enter") {
    let searchWord = searchInput.value.trim();
    init(searchWord);
  }

}
inputValue()

async function init(searchWord) {
  data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`).then(response => response.json());
  renderDictionary(data)
}

function renderDictionary(data) {
  // mainTitle.innerHTML = ""
  for (const x of data) {
    mainTitle.innerHTML = 
    `
      <div class="title">
        <div>
          <h1>${x.word}</h1>
          <span>${x.phonetic}</span>
        </div>
        <img src="assets/img/play-icon.png" alt="">
      </div>
      <div class="noun">
        <h3>Meaning</h3>
        <ul class="meaining-list">
          ${x.meanings[0].definitions.map(def => `<li class="meaning-item">${def.definition}</li>`).join('')}
        </ul>
        <div>
          <h5>Synonyms</h5>
          ${x.meanings[0].synonyms.map(synonym =>`<h6>${synonym}</h6>`).join('')}
        </div>
      </div>
      <div class="verb">
        <h3>Meaning</h3>
        <ul class="meaining-list">
          ${x.meanings[1].definitions.map(def => `<li class="meaning-item">${def.definition}</li>`).join('')}

        </ul>
      </div>
      <div class="source">
        <p>Source</p>
        <a href="${x.sourceUrls[0]}" class="source-url">${x.sourceUrls[0]}<img src="assets/img/external-link.svg" alt=""></a>
      </div>
    `
    
  }
}

fontSelect.addEventListener('click', function() {
  const selectedFont = fontSelect.value;
  console.log(selectedFont);
  if(selectedFont === "Mono") {
    body.style.fontFamily = "Inconsolata"
  }else if(selectedFont === "Sans-serif") {
    body.style.fontFamily = "Inter"
  }
})
