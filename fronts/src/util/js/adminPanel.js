
const testFunction = () => {

  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    // sidebar.classList.replace('col-lg-4', 'col-lg-4');
    // console.log(sidebar);
  }
 
};


// navbar logo and sidebar toggle function 

const sidebarToggle = () => {
    let logoSize = document.querySelector('.logo');
    let sidebarSize = document.querySelector('.sidebar');

  
    window.addEventListener('resize', function(event){
        let innerWidth = window.innerWidth;
        
        if(innerWidth < 950){
 
            logoSize.style.width = '0px';
            logoSize.style.transitionDuration = '0s';
            logoSize.style.overflow = 'hidden';

            sidebarSize.style.width = '0px';
            sidebarSize.style.transitionDuration = '0.6s';
            sidebarSize.style.overflow = 'hidden';
        
        }
        if(innerWidth > 950){

      

            logoSize.style.width = '250px';
            logoSize.style.transitionDuration = '0.6s';
            

            sidebarSize.style.width = '250px';
            sidebarSize.style.transitionDuration = '0.6s';   
      }
    });
};


const accordControl = () => {
  const card = document.getElementById('accordianCard');
  card.classList.toggle('accord-Display');
  
  if (!card.classList.contains('accord-Display')) {
      card.style.display = 'none';

  } else {
      card.style.display = 'block';
  }
};


const tabWidth = () => {
    window.addEventListener('resize', function() {
          let innerWidth = window.innerWidth;

          if(innerWidth > 950){
            let tabSidebar = document.querySelector('.sb-wrapper');

            if(tabSidebar){
              tabSidebar.style.position = 'absolute';
              tabSidebar.style.width = '250px';
              tabSidebar.style.transitionDuration = '0.6s';
              tabSidebar.style.overflow = 'hidden';
              // tabSidebar.style.width = '250px';
            }
           
          }else{
            let tabSidebar = document.querySelector('.sb-wrapper');
          
            if(tabSidebar){
              tabSidebar.style.position = 'absolute';
              tabSidebar.style.width = '0px';
              tabSidebar.style.transitionDuration = '0.6s';
              tabSidebar.style.overflow = 'hidden';
            }
           

          }

        
    });

}



const adminHelper = {
  testFunction,
  sidebarToggle,
  accordControl,
  tabWidth,
 
};

export {adminHelper};