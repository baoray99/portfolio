import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
declare var $: any
declare var Typed: any
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, AfterViewInit {
  navbar: any
  backtop: any
  sections: any
  navLinks: any
  currentSection = 'home'
  windowScroll$ = fromEvent(window, 'scroll').pipe(
    map((e: Event) => {
      return window.scrollY
    })
  ).subscribe((next) => {
    if (next > 20) {
      this.navbar.classList.add('sticky')
      this.backtop.classList.add('show')
    } else {
      this.navbar.classList.remove('sticky')
      this.backtop.classList.remove('show')
    } 

    this.sections.forEach((section : HTMLElement) =>{
      if(next >= (section.offsetTop - (section.clientHeight / 3))){
        this.currentSection = section.id
      }
    })

    this.navLinks.forEach((nav : HTMLAnchorElement) => {
      if(nav.href.includes(this.currentSection)){
        document.querySelector('.active').classList.remove('active')
        nav.classList.add('active')
      }
    })
    
  })

  navItems = [
    {
      id: '#home',
      label: 'Home'
    },
    {
      id: '#about',
      label: 'About'
    },
    {
      id: '#ability',
      label: 'Ability'
    },
    {
      id: '#skills',
      label: 'Skills'
    },
    {
      id: '#project',
      label: 'Project'
    },
    {
      id: '#contact',
      label: 'Contact'
    }
  ]



  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      //menu link click smooth
      // $("a")
      //   .not('[href="#"]')
      //   .not('[href="#0"]')
      //   .click(function (e) {
      //     var data_id = $(this).attr("href");
      //     $("html, body").animate(
      //       {
      //         scrollTop: $(data_id).offset().top,
      //       },
      //       700
      //     );
      //   });
      //typing animation
      var type = new Typed(".typing", {
        strings: ["Front-end Developer.", "Coder.", "Programmer.", "Gymmer."],
        typeSpeed: 150,
        backType: 120,
        loop: true,
      });
      //navbar animation
      // $(window).scroll(function () {
      //   if (this.scrollY > 20) {
      //     $(".navbar").addClass("sticky");
      //   } else {
      //     $(".navbar").removeClass("sticky");
      //   }
      //   if (this.scrollY > 100) {
      //     $(".backtop").addClass("show");
      //   } else {
      //     $(".backtop").removeClass("show");
      //   }
      // });
      //toggle menu/navbar
      // $(".menu-btn").click(function () {
      //   $(".navbar .menu").toggleClass("active");
      //   $(".menu-btn i").toggleClass("active");
      // });
      // owl carousel use owl carousel library
      $(".carousel").owlCarousel({
        margin: 30,
        loop: true,
        autoplay: 1000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
            nav: false,
          },
          600: {
            items: 2,
            nav: false,
          },
          1000: {
            items: 3,
            nav: false,
          },
        },
      });
    });

    this.navbar = document.querySelector('.custom-nav')
    this.backtop = document.querySelector('.backtop')
    this.sections = document.querySelectorAll('.section')
    this.navLinks = document.querySelectorAll('.nav_link')
    this.navLinks.forEach((nav : HTMLAnchorElement) => {
      if(nav.href.includes(this.currentSection)){
        nav.classList.add('active')
      }
    })
  }

  // scrollToTop(id){
  //   const el = document.querySelector(`${id}`)
  //   if(el){
  //     el.scrollTo({top: 0, behavior: 'smooth'})
  //   }
  // }

}
