"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let suggestionList = document.getElementById("suggestions");
let sunn;
sunn = document.getElementById("sun");
let moonn;
moonn = document.getElementById("moon");
let risingn;
risingn = document.getElementById("rising");
sunn.addEventListener('input', () => postAndUpdate());
moonn.addEventListener('input', () => postAndUpdate());
risingn.addEventListener('input', () => postAndUpdate());
function postAndUpdate() {
    suggestionList.innerHTML = "";
    let suns = sunn.value;
    let moons = moonn.value;
    let risings = risingn.value;
    // TODO: empty the suggestionList (you want new suggestions each time someone types something new)
    //  HINT: use .innerHTML
    // TODO: add a type annotation to make this of type MatchesRequestData
    const postParameters = {
        sun: suns,
        moon: moons,
        rising: risings
    };
    let matches;
    console.log(postParameters);
    const resp = fetch("http://localhost:4567/matchresults", {
        method: 'POST',
        body: JSON.stringify(postParameters),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    resp.then(response => response.json()).then((data) => updateSuggestions(data.matches));
}
function updateSuggestions(matches) {
    // TODO: for each element in the set of matches, append it to the suggestionList
    //  HINT: use innerHTML += to append to the suggestions list
    //  NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
    //  make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
    //  This makes each element selectable via screen reader.
    suggestionList.innerHTML = "";
    for (const match of matches) {
        console.log(match);
        suggestionList.innerHTML += '<li tabindex="0">' + match + '</li>';
    }
}
document.addEventListener('keyup', (key) => __awaiter(void 0, void 0, void 0, function* () {
    if (key.key === "Q") {
        sunn.value = "Leo";
        moonn.value = "Leo";
        risingn.value = "Leo";
    }
    yield updateValues(sunn.value, moonn.value, risingn.value);
    postAndUpdate();
}));
// TODO: create an event listener to the document (document.addEventListner) that detects "keyup".
//  When a certain key of your choice is clicked, reset the values of sun, moon, and rising to your own
//  values for the sun, moon, and rising using updateValues. Then call postAndUpdate().
//  HINT: the listener callback function should be asynchronous and wait until the values are
//  updated before calling postAndUpdate().
function updateValues(sunval, moonval, risingval) {
    return __awaiter(this, void 0, void 0, function* () {
        // This line asynchronously waits 1 second before updating the values.
        // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
        yield new Promise(resolve => setTimeout(resolve, 1000));
        sunn.value = sunval;
        moonn.value = moonval;
        risingn.value = risingval;
    });
}
