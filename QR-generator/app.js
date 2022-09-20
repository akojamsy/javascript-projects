const generatorDiv = document.querySelector('.generate');
const scannerDiv = document.querySelector('.scan');
const scannerSection = document.querySelector('.scanner');
const generatorSection = document.querySelector('.generator');
const container = document.querySelector('.container');


scannerSection.style.display = 'none'
generatorDiv.classList.add('active')

generatorDiv.addEventListener('click', function(){
    scannerDiv.classList.remove('active')
    generatorDiv.classList.add('active')
    container.classList.remove('qr__scanner')
    generatorSection.style.display = 'block'
    scannerSection.style.display = 'none'
})

scannerDiv.addEventListener('click', function(){
    generatorDiv.classList.remove('active')
    scannerDiv.classList.add('active')
    container.classList.add('qr__scanner')
    scannerSection.style.display = 'block'
    generatorSection.style.display = 'none'
})

//Gerator login begins here
const genInput = document.querySelector('.generator__form input');
const genButton = document.querySelector('.generator__form button');
const genImgContainer = document.querySelector('.generated__img');
const genImg = document.querySelector('.generated__img img');
const genDownloadBtnContainer = document.querySelector('.generator__btn');
const genDownloadLink = document.querySelector('.generator__btn .btn__link');

let imgUrl = ''

genButton.addEventListener('click', function(){
    let inputValue = genInput.value.trim()
    if(!inputValue)return;
    if(inputValue){
        imgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${inputValue}`
        genImg.src = imgUrl
        genButton.innerHTML = `<img src='./giphy.gif' class='' alt='loading' />`
        let loading = document.querySelector('.generator__form button img')
        loading.classList.add('loading')

        genImg.addEventListener('load', function(){
            genImgContainer.classList.add('active')
            container.classList.add('active')
            genButton.innerHTML = ''
            genButton.innerText = 'Generate QR Code'
        }, false)
    }
})


genInput.addEventListener('keyup', function(){
    let inputValue = genInput.value.trim()
    if(!inputValue){
        container.classList.remove('active')
    }
})

genDownloadLink.addEventListener('click', function(){
    if(!imgUrl) return;
    fetchImg(imgUrl)
})

function fetchImg(url){
    fetch(url).then(res=> res.blob()).then(file=>{
        let tempFile = URL.createObjectURL(file)
        let date = new Date()
        let fileName = date.getHours() + date.getUTCMilliseconds() + date.getMinutes()
        let extension = file.type.split('/')[1]
        download(tempFile,fileName,extension);
    })
}

function download(tempFile,fileName,extension){
    let a = document.createElement('a')
    a.href = tempFile
    // console.log(fileName);
    a.download = `${fileName}.${extension}`
    document.body.appendChild(a)
    a.click()
    a.remove()
}

// scanner or reader
const camera = scannerSection.querySelector('.fa-camera')
const stopCam = scannerSection.querySelector('.fa-stop-circle')
const scannerForm = scannerSection.querySelector('.scanner__form')
const input = scannerForm.querySelector('input')
const img = scannerForm.querySelector('img')
const scannerContent = scannerForm.querySelector('.content')
const paragraph = scannerForm.querySelector('p')
const video = scannerForm.querySelector('video')
const textarea = scannerSection.querySelector('.scanner__details textarea');
const closeBtn = scannerSection.querySelector('.scanner__details .close');
const copy = scannerSection.querySelector('.scanner__details .copy');
const videoContent = scannerSection.querySelector('scanner__details')



scannerForm.addEventListener('click', ()=> input.click())

input.addEventListener('change', function(e){
    let file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    
    const i = document.querySelector('.content i')
    i.style.opacity = 0
    paragraph.innerHTML = `<img class="loading" src="./loading__spinner.gif" alt=""/>`

    fetch(`http://api.qrserver.com/v1/read-qr-code/`, {
        method: "POST",
        body: formData
    }).then(res => res.json()).then(result => {
        let content = result[0].symbol[0].data;

        if(!content){ 
            const i = document.querySelector('.content i')
            i.style.opacity = 1     
            paragraph.innerText = "Couldn't Scan QR Code"
            return;
        }

        scannerSection.classList.add('active')
        scannerForm.classList.add('active-img')
        
        img.src = URL.createObjectURL(file)
        textarea.innerText = content

    }).catch(err => console.log(err))
})

//video scanner
let scanner;
camera.addEventListener('click', function(){
    
    camera.style.display = 'none'
    scannerForm.classList.add('pointers__events')
    paragraph.innerText = 'Scanning QR Code...'

    scanner = new Instascan.Scanner({video:video})
    Instascan.Camera.getCameras()
    .then(cameras => {
        if(cameras.length > 0){
            scanner.start(cameras[0]).then(()=> {
                scannerForm.classList.add("active-video");
                stopCam.style.display = "inline-block"
            })
        }else{
            console.log('No Cameras Found')
        }
    })
    .catch(err => err)

    scanner.addListener("scan", (c)=>{
        scannerSection.classList.add("active")
        textarea.innerText = c
    })
})

//copy content scanned by scanner
copy.addEventListener('click', function(){
    let text = textarea.textContent
    navigator.clipboard.writeText(text)
})

closeBtn.addEventListener('click', function(){
    const i = document.querySelector('.content i')
    i.style.opacity = 1
    paragraph.innerText = "Upload QR Code to Scan"
    scannerSection.classList.remove('active')
    scannerForm.classList.remove('active-img')
})

stopCam.addEventListener('click', function(){

    stopCam.style.display = "none"
    camera.style.display = 'inline-block'
    const i = document.querySelector('.content i')
    i.style.opacity = 1
    paragraph.innerText = "Upload QR Code to Scan"

    scannerForm.classList.remove("active-video", "active-img", "pointers__events");
    scannerSection.classList.remove('active')
    scannerForm.classList.remove('active-img')
    if(scanner){
        scanner.stop();
    }
})
