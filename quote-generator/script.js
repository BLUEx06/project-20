const fetchQuoteURL = "https://type.fit/api/quotes";
const tweetQuoteAPI = "https://twitter.com/intent/tweet";

let fetchedQuotes = [];
let failedFetchCounts = 0;

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loadingSpinner = document.getElementById("loader");

function showLoadingSpinner() {
  quoteContainer.hidden = true;
  loadingSpinner.hidden = false;
}
function hideLoadingSpinner() {
  quoteContainer.hidden = false;
  loadingSpinner.hidden = true;
}

function newQuote() {
  showLoadingSpinner();
  const randomIndex = Math.floor(Math.random() * fetchedQuotes.length);
  const randomQuote = fetchedQuotes[randomIndex];
  const { author, text } = randomQuote;
  // update content
  // if quote text is too long, apply "long quote" class to div
  // check if author === null
  if (text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = text;
  authorText.textContent = author ? author : "Unknown";
  hideLoadingSpinner();
}

async function fetchQuotes() {
  try {
    showLoadingSpinner();
    const response = await fetch(fetchQuoteURL); // return a promise
    fetchedQuotes = await response.json(); // turn into an object
    newQuote();
  } catch (error) {
    console.log(error);
    if (failedFetchCounts <= 5) {
      failedFetchCounts++;
      console.log(failedfetchCounts);

      fetchQuotes();
    } else {
      fetchedQuotes = localQuotes;
      newQuote();
    }
  }
}
fetchQuotes();

// tweet function
function tweetQuote() {
  const URL = `${tweetQuoteAPI}?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(URL, "_blank");
}

// events
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);
