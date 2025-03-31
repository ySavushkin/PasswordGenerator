function toggleForm() {
  let loginContainer = document.getElementById("loginContainer");
  let registerContainer = document.getElementById("registerContainer");
  
  if (loginContainer.style.display === "none") {
      loginContainer.style.display = "block";
      registerContainer.style.display = "none";
  } else {
      loginContainer.style.display = "none";
      registerContainer.style.display = "block";
  }
}