gsap.registerPlugin(ScrollTrigger);
function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

loco();
var image = document.querySelector("#main img");
var main = document.querySelector("#main");

main.addEventListener("mousemove",function(dets){
    image.style.top = 1-dets.y*0.03 +"px"
    image.style.left = 1-dets.x*0.03 + "px"
    image.style.transform = `rotateY(${1-dets.x*0.01}deg)`
    
})

var products = document.querySelector("#products");
window.addEventListener("mousemove",function(dets){
    products.style.transform = `rotateY(${1-dets.x*0.02}deg)`

})

var tl = gsap.timeline({
    scrollTrigger:{
        trigger:"#page1",
        scroller:"#main",
        // markers:true,
        pin:true,
        start:"top 0%",
   
        scrub:4
    }
});

tl
.to("#centernav>a",{
    
        y:-300,
        opacity:0,
        stagger:1,
        ease:Expo.easeInOut,
},"a")
.to("#page1>h1",{
  
    y:-200,
    color:"rgb(97 26 190)",
    duration:1

},"a")
.to("#page1>img",{
   
    scale:0.9,
    opacity:0,
    duration:0.5,
    ease:Expo.ease
},"a")

  

