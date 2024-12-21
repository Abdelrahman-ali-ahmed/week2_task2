document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputtext");
    const addBtn = document.getElementById("add");
    const listContainer = document.getElementById("listContainer");
  
    // Function to update the display of all list items
    function updateListDisplay() {
        const storedList = JSON.parse(localStorage.getItem("list")) || [];
        listContainer.innerHTML = ""; // Clear the current list
      
        storedList.forEach((value, index) => {
          // Create a container for each list item
          const itemContainer = document.createElement("div");
          itemContainer.className = "list-item";
      
          // Add the value in a <p> tag
          const valueElement = document.createElement("p");
          valueElement.textContent = value;
          valueElement.id = `item-${index}`;
          itemContainer.appendChild(valueElement);
      
          // Create a div for buttons
          const itemBtns = document.createElement("div");
          itemBtns.className = "items-btns";
      
          // Add Delete button
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.className = "delete";
          deleteButton.addEventListener("click", () => deleteItem(index));
          itemBtns.appendChild(deleteButton);
      
          // Add Edit button
          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.className = "edit";
          editButton.addEventListener("click", () => editItem(index));
          itemBtns.appendChild(editButton);
      
          // Add Mark button
          const markButton = document.createElement("button");
          markButton.textContent = "Mark";
          markButton.className = "mark";
          markButton.addEventListener("click", () => markItem(valueElement));
          itemBtns.appendChild(markButton);
      
          // Append the buttons div to the item container
          itemContainer.appendChild(itemBtns);
      
          // Append the item container to the list container
          listContainer.appendChild(itemContainer);
        });
      }
  
    // Function to delete an item
    function deleteItem(index) {
      const storedList = JSON.parse(localStorage.getItem("list")) || [];
      storedList.splice(index, 1); // Remove the item at the given index
      localStorage.setItem("list", JSON.stringify(storedList)); // Save the updated list
      updateListDisplay(); // Refresh the display
    }
  
    // Function to edit an item
    function editItem(index) {
      const storedList = JSON.parse(localStorage.getItem("list")) || [];
      const newValue = prompt("Edit the item:", storedList[index]);
      if (newValue !== null) {
        storedList[index] = newValue; // Update the item value
        localStorage.setItem("list", JSON.stringify(storedList)); // Save the updated list
        updateListDisplay(); // Refresh the display
      }
    }
  
    // Function to mark an item
    function markItem(element) {
      element.style.textDecoration =
        element.style.textDecoration === "line-through" ? "none" : "line-through";
    }
  
    // Event listener for the Add button
    addBtn.addEventListener("click", () => {
      const inputValue = inputText.value;
      if (inputValue) {
        const list = JSON.parse(localStorage.getItem("list")) || [];
        list.push(inputValue);
        localStorage.setItem("list", JSON.stringify(list));
        updateListDisplay();
        inputText.value = ""; // Clear the input field
      } else {
        alert("Please enter some text!");
      }
    });
  
    // Initialize the display on page load
    updateListDisplay();
  });