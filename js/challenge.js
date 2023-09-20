/* A few global variables that are used in multiple places in this code */
/* Variable to keep count */
let count = 0;
/* Form element */
const form = document.querySelector("#comment-form");
/* 'pause/resume' button */
const pauseButton = document.querySelector("#pause");

/* Function that takes a number as an argument and increments or decrements the counter by that number and updates the count variable */
const updateCounter = (num) => {
    /* Add value of num, whether positive or negative, to 'count' variable */
    count += num;
    /* Change the text of the element with the id 'counter' to the current value of the 'count' variable */
    document.querySelector("#counter").textContent = count;
}

/* Create an interval that will call the function 'updateCounter' every 1000ms, or 1 sec, and pass it an argument of 1 */
let updateCounterInterval = setInterval(updateCounter, 1000, 1);

/* Function that will pause all functionality on the page except for the pause button which is needed for the user to click to resume functionality */
const pauseFunctionality = () => {
    /* Grab all buttons on the page, make an array of them, and assign the array to a variable */
    const buttons = Array.from(document.querySelectorAll("button"));
    /* Iterate through 'buttons' */
    buttons.forEach(item => {
        /* If the id of the current 'item' in the array does not equal 'pause' */
        if (item.id !== "pause") {
            /* Change the value of the current item's disabled value to the opposite of what it is, so if it is disabled make it able and vice versa */
            item.disabled = !item.disabled
        }
    })
}

/* Function that will start and stop the counter updates along with most of the page functionality */
const pausePageFunctionality = () => {
    /* Checks if 'updateCounterInterval' has a truthy value */
    if (updateCounterInterval) {
        /* If so, stop the counter increases every sec with clearInterval */
        clearInterval(updateCounterInterval);
        /* Give 'updateCounterInterval' a value of null */
        updateCounterInterval = null;
        /* Call the function 'pauseFunctionality */
        pauseFunctionality();
        /* Change the text of the 'pauseButton' to 'resume' */
        pauseButton.textContent = "resume";
    } else {
        /* Else start the interval back up and call 'updateCounter' every 1000ms with an argument of 1 */
        updateCounterInterval = setInterval(updateCounter, 1000, 1);
        /* Call the function 'pauseFunctionality */
        pauseFunctionality();
        /* Change the text of the 'pauseButton' to 'pause' */
        pauseButton.textContent = "pause";
    }
}

/* Function that will create an li with a message of how times the user liked a specific number that takes a number as an argument */
const displayLikes = (num) => {
    /* Attempt to grab an li whose id includes 'num' */
    const li = document.querySelector(`#li-${num}`);
    /* If the li exists */
    if (li) {
        /* Update the li's 'like-count' attribute */
        li.dataset.likeCount = (li.dataset.likeCount * 1) + 1;
        /* Update the text of the li */
        li.textContent = `${num} has been liked ${li.dataset.likeCount} times`;
    } else {
        /* Else the li does not exist and must be created */
        const newLi = document.createElement("li");
        /* Assign the new li an id with a value that includes num */
        newLi.id = `li-${num}`;
        /* Assign the 'like-count' attribute of the li a value of 1 */
        newLi.dataset.likeCount = 1;
        /* Create a message for the text of the li */
        newLi.textContent = `${num} has been liked 1 time`;
        /* Grab the ul on the page */
        const ul = document.querySelector("ul");
        /* Append the li to the ul */
        ul.append(newLi);
    }
}

/* Function that will create a message that consists of the comments the user submitted */
const displayComments = () => {
    /* Grab the input where the user typed their comments and assign it to a variable */
    const comment = document.querySelector("#comment-input");
    /* Checks to make sure that the input is not blank or consists of a bunch of spaces */
    if (comment.value.trim() !== "") {
        /* Create a p element */
        const p = document.createElement("p");
        /* Assign the value of 'comment' as text for the p element */
        p.textContent = comment.value;
        /* Insert the p element just before the form element so that it appears the oldest comment remains on top of the comment area */
        form.insertAdjacentElement("beforebegin", p);
        /* Clear 'comment'  */
        comment.value = "";
    }
}

/* Add event listeners where needed */
document.querySelector("#plus").addEventListener("click", () => {
    updateCounter(1);
});

document.querySelector("#minus").addEventListener("click", () => {
    updateCounter(-1);
});

document.querySelector("#pause").addEventListener("click", pausePageFunctionality);

document.querySelector("#heart").addEventListener("click", () => {
    displayLikes(count);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    displayComments();
});