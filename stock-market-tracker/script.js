// Function to fetch a random quote from the API
async function fetchQuote() {
  const endpoint =
    "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&_fields=title,content";

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const { content, title } = data[0];
    const quoteText = content.rendered.replace(/<\/?[^>]+(>|$)/g, "").trim();
    const quoteAuthor = title.rendered;
    return { text: quoteText, author: quoteAuthor };
  } catch (error) {
    console.error("Error fetching quote:", error);
    return null;
  }
}

// Function to update the "Tweet Quote" link with the current quote
function updateTweetLink(text, author) {
  const tweetLink = document.getElementById("tweet-quote");
  tweetLink.href = `https://twitter.com/intent/tweet?text="${encodeURIComponent(
    `${text} - ${author}`
  )}"`;
}

// Function to render the fetched quote to the DOM
async function renderQuote() {
  const quoteElement = document.getElementById("quote");
  quoteElement.innerHTML = "Loading...";

  try {
    const { text, author } = await fetchQuote();
    if (text && author) {
      quoteElement.innerHTML = `"${text}"<br>- ${author}`;
      updateTweetLink(text, author); // Call to updateTweetLink
    } else {
      quoteElement.textContent =
        "Failed to fetch a new quote. Please try again later.";
    }
  } catch (error) {
    console.error("Error rendering quote:", error);
    quoteElement.textContent =
      "Failed to fetch a new quote. Please try again later.";
  }
}

// Event listener for the "New Quote" button
document.getElementById("new-quote").addEventListener("click", renderQuote);

// Initial render of a random quote when the page loads
renderQuote();
