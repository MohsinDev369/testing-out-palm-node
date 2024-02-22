const generate = document.getElementById("generate");
const animalName = document.getElementById("animalName");
const display = document.getElementById("display");

generate.addEventListener("click", () => {
  generate.setAttribute("disabled", "disabled");
  display.innerText = "Data loading...";
  const inputValue = animalName.value;
  aiRes().then((data) => {
    display.innerText = JSON.stringify(data);
  })
  generate.removeAttribute("disabled");
});

async function aiRes() {
    const res = await fetch('/api/ai?animalName=' + animalName.value);
    const data = await res.json();
    return data;
}