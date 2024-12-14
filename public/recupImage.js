
// const inputElement = document.getElementById("inputForPicture");

// inputElement.addEventListener("change", handleFiles, false);
// function handleFiles() {
//   const fileList =
//     this.files; /* on peut désormais manipuler la liste de fichiers */
//     console.log(fileList)
//     let imageDiv = document.createElement("image");

//     if (fileList.length > 0) {
//         const file = fileList[0]; // sélectionne le premier fichier du FileList
//         const reader = new FileReader();
//         reader.onload = function(event) {
//           const imageData = event.target.result;
//           imageDiv.src = imageData; // définit la source de l'image avec le résultat de la lecture
//         };
//         reader.readAsDataURL(file); // lit le fichier et convertit le résultat en une chaîne de base64
//       }
//     imageDiv.width = "400px";
//     imageDiv.height = "400px";
//     document.getElementById("majorBody").appendChild(imageDiv);
// }