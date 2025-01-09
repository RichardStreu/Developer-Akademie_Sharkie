export function showSubMenu(id) { 
  const navBar = document.getElementById("controlNavBar");
  Array.from(navBar.querySelectorAll("button")).forEach((button) => {
    button.classList.remove("btnActive");
  });
  document.getElementById(id).classList.add("btnActive");
}
