const navToggle=document.querySelector(".nav-toggle");
const navLinks=document.querySelector(".nav-links");
navToggle?.addEventListener("click",()=>{
  const open=navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded",String(open));
});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const floatCta=document.getElementById("floatCta");
window.addEventListener("load",()=>floatCta?.classList.add("visible"));

const filters=document.querySelectorAll(".filter");
const cards=document.querySelectorAll(".project-card");
filters.forEach(btn=>btn.addEventListener("click",()=>{
  filters.forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  const filter=btn.dataset.filter;
  cards.forEach(card=>card.classList.toggle("hidden",filter!=="all"&&card.dataset.category!==filter));
}));

const modal=document.getElementById("image-modal");
const modalImg=modal.querySelector("img");
const modalTitle=modal.querySelector("p");
document.querySelectorAll("[data-image]").forEach(btn=>btn.addEventListener("click",()=>{
  modalImg.src=btn.dataset.image;
  modalImg.alt=btn.dataset.title;
  modalTitle.textContent=btn.dataset.title;
  modal.showModal();
}));
modal.querySelector(".modal-close").addEventListener("click",()=>modal.close());
modal.addEventListener("click",e=>{if(e.target===modal)modal.close();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.open)modal.close();});
document.getElementById("year").textContent=new Date().getFullYear();

const form=document.getElementById('contactForm');
const status=document.getElementById('formStatus');

form?.addEventListener('submit',async e=>{
  e.preventDefault();

  const honeypot=form.querySelector('.honeypot');
  if(honeypot && honeypot.value) return;

  const name=form.querySelector('#name').value.trim();
  const email=form.querySelector('#email').value.trim();
  const message=form.querySelector('#message').value.trim();

  if(!name || !email || !message){
    status.textContent='Please fill in your name, email, and message.';
    status.style.color='#FBBF24';
    return;
  }

  const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailPattern.test(email)){
    status.textContent='Please enter a valid email address.';
    status.style.color='#FBBF24';
    return;
  }

  const btn=document.getElementById('submitBtn');
  if(form.action.includes('your-form-id')){
    status.textContent='Please replace the placeholder Formspree form ID with your real one before testing.';
    status.style.color='#FBBF24';
    btn.disabled=false;
    btn.textContent='Send Message →';
    return;
  }

  btn.disabled=true;
  btn.textContent='Sending...';
  status.textContent='Sending your message...';
  status.style.color='#FBBF24';

  try{
    const response=await fetch(form.action,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)});
    if(response.ok){
      form.reset();
      status.textContent='Thanks! Your message has been sent successfully.';
      status.style.color='#34D399';
      window.location.href='thank-you.html';
    }else{
      throw new Error('Submission failed');
    }
  }catch(error){
    status.textContent='Sorry, something went wrong. Please email me directly at mercado.abegail@gmail.com.';
    status.style.color='#F87171';
  }finally{
    btn.disabled=false;
    btn.textContent='Send Message →';
  }
});