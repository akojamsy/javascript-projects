/** Show modal content **/

function showModal(openModal, modalContent){

    const openButton = document.getElementById(openModal), modal = document.getElementById(modalContent)

    openButton.addEventListener('click', function(){
        modal.classList.add('show_modal');
    }, false );


}

function closeModal (){
    const closed = document.querySelectorAll('.close'),
    modal = document.getElementById('modal-container');

    closed.forEach(content => {
        content.addEventListener('click', function(){
            modal.classList.remove('show_modal')
        });
    });
    
}


showModal('open-modal', 'modal-container');
closeModal();
