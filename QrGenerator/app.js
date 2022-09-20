const wrapper = document.querySelector('.wrapper')
const QrGeneratorBtn = document.querySelector('button')
const UrlAndTextInput = document.querySelector('.wrapper .form input')
const qrImg = document.querySelector('.wrapper .form img')


const QrGenerate =()=>{
    let qrInputValue = UrlAndTextInput.value
    if(!qrInputValue) return;
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrInputValue}`;
    QrGeneratorBtn.innerHTML = `<img src='giphy.gif' alt='' />`
    const loadingImg = document.querySelector('button img');
    loadingImg.classList.add('loading')
    qrImg.addEventListener('load', function(){
        wrapper.classList.add('active')
        QrGeneratorBtn.innerHTML = ''
        QrGeneratorBtn.innerText = 'Generate QR code'
    })
}

QrGeneratorBtn.addEventListener('click', QrGenerate, false)
UrlAndTextInput.addEventListener('keyup',function(){
    let qrInputValue = UrlAndTextInput.value
    if(!qrInputValue){
        wrapper.classList.remove('active')
    }
} , false)

