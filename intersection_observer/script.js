const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      // if (entry.isIntersecting) observer.unobserve(entry.target); //removing items from observer so it does not need to load again e.g. images
    });
    console.log(entries);
  },
  {
    //options
    threshold: 1, // how much of the div is actually on the screen before it loads
    // rootMargin:"100 px", // sets the root root margin usefull for preloading the images goes in both +ve and -ve directions
    // root:  // setting a root container can be any parent container
  }
);
cards.forEach((card) => {
  observer.observe(card);
});

const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return loadNewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector(".card:last-child"));
  },
  {
    rootMargin: "100px", //adds new cards before it hits the last element 
  }
);

lastCardObserver.observe(document.querySelector(".card:last-child"));

const cardContainer = document.querySelector(".card-container");

function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New Card";
    card.classList.add("card");
    observer.observe(card);
    cardContainer.append(card);
  }
}
