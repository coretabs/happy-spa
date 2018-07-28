var myMenu = document.getElementById("menuItems");
var newItem = document.getElementById("RABT");

newItem.addEventListener('click' , addItem);

function addItem () {
    myMenu.innerHTML += "<li><div class='field linkMSM'><div class='linkSSM'><div class='control linkSM-para'><div class='select'><select><option>موقع</option><option>facebook</option><option>twitter</option><option>instagram</option><option>telegram</option><option>githun</option><option>اخرى</option></select></div></div><p class='control has-icons-left linkSM'><input class='input linkSM-input' type='link' placeholder='https://www.wep-site.com'><span class='icon is-small RBR'><i class='fas fa-trash'></i></span></p></div></div></li>";
}

var pwd = document.getElementById('pwd');
var eye = document.getElementById('eye');

eye.addEventListener('click',togglePass);

function togglePass(){
    
    eye.classList.toggle('active');
    
    (pwd.type == 'password') ? pwd.type = 'text' : pwd.type = 'password';
}