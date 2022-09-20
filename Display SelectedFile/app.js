const inputFile = document.querySelector('input');
const preview = document.getElementById('preview');
const button =document.getElementsByTagName('button')[0];

inputFile.addEventListener('change', fileHandler, false);
button.addEventListener('click', clicked, false);


function fileHandler (){
    const fileImage = this.files[0];
    if(!fileImage.type.startsWith('image/')){
        console.log('not an image');
    }
    const img = document.createElement('img');
    img.file = fileImage;
    img.classList.add('image');
    preview.appendChild(img);

    const reader = new FileReader();
    reader.onload = (e) => { img.src = e.target.result; };
    reader.readAsDataURL(fileImage)
}

function clicked(){
    let fileImage = inputFile.files[0].name;
    console.log(fileImage);
    //Here you can post to the database or you somewhere else.
}