

function init(){
    const 
        year = document.querySelector('.year'),
        make = document.querySelector('.make'),
        model = document.querySelector('./model')
    
    //auto & manual radios
    const radio = document.querySelectorAll('.radio')

    radio.addEventLister('click', (e) =>{
        console.log(e.target.id)
    })
}




