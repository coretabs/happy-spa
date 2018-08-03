var myMenu = document.getElementById("menuItems");
var newItem = document.getElementById("RABT");

newItem.addEventListener('click' , addItem);

function addItem () {
    myMenu.innerHTML += "<div class='enterMail'><p class='paraContent'>البريد الإلكتروني الإحتياطي</p><div class='field'><p class='control has-icons-right'><input class='input' type='email' placeholder='أدخل بريدك الإلكتروني'><span class='icon is-small is-right'><i class='fas fa-envelope'></i></span></p></div></div>";
}

var pwd = document.getElementById('pwd');
var eye = document.getElementById('eye');


eye.addEventListener('click' , togglePass);

function togglePass() {
    
    eye.classList.toggle('active');
    
    (pwd.type === 'password') ? pwd.type = 'text' : pwd.type = 'password';
}

