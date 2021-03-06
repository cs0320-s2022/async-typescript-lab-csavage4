let suggestionList = document.getElementById("suggestions") as HTMLUListElement

let sunn: HTMLInputElement
sunn = document.getElementById("sun") as HTMLInputElement

let moonn: HTMLInputElement
moonn = document.getElementById("moon") as HTMLInputElement

let risingn: HTMLInputElement
risingn = document.getElementById("rising") as HTMLInputElement

sunn.addEventListener('input',() => postAndUpdate())
moonn.addEventListener('input',() => postAndUpdate())
risingn.addEventListener('input',() => postAndUpdate())

type MatchesRequestData = {
  sun: string
  moon: string
  rising: string
}

type Matches = {
  matches: Array<string>
}

function postAndUpdate(): void {
  suggestionList.innerHTML = "";
  let suns = sunn.value
  let moons = moonn.value
  let risings = risingn.value

  // TODO: empty the suggestionList (you want new suggestions each time someone types something new)
  //  HINT: use .innerHTML

  // TODO: add a type annotation to make this of type MatchesRequestData
  const postParameters: MatchesRequestData ={
    sun: suns,
    moon: moons,
    rising: risings
  };

  let matches : Matches;

  console.log(postParameters)
  const resp: Promise<Response> = fetch("http://localhost:4567/matchresults",{
    method: 'POST',
    body: JSON.stringify(postParameters),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
    },
  })
  resp.then(response => response.json()).then((data: Matches) => updateSuggestions(data.matches));

}

function updateSuggestions(matches: string[]): void {
  // TODO: for each element in the set of matches, append it to the suggestionList
  //  HINT: use innerHTML += to append to the suggestions list
  //  NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
  //  make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
  //  This makes each element selectable via screen reader.
  suggestionList.innerHTML = "";
  for(const match of matches){
    console.log(match)
    suggestionList.innerHTML += '<li tabindex="0">'+ match + '</li>';
  }
}

document.addEventListener('keyup', async(key) =>{
  if (key.key === "Q") {
    sunn.value = "Leo";
    moonn.value = "Leo";
    risingn.value = "Leo";
  }
  await updateValues(sunn.value, moonn.value, risingn.value);
  postAndUpdate();
})
// TODO: create an event listener to the document (document.addEventListner) that detects "keyup".
//  When a certain key of your choice is clicked, reset the values of sun, moon, and rising to your own
//  values for the sun, moon, and rising using updateValues. Then call postAndUpdate().
//  HINT: the listener callback function should be asynchronous and wait until the values are
//  updated before calling postAndUpdate().

async function updateValues(sunval: string, moonval: string, risingval: string): Promise<void>{
  // This line asynchronously waits 1 second before updating the values.
  // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
  await new Promise(resolve => setTimeout(resolve, 1000));

  sunn.value = sunval;
  moonn.value = moonval;
  risingn.value = risingval;
}
