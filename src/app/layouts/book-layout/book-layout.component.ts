import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpParams, HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpRequest, HttpEvent } from '@angular/common/http';
declare var $: any
declare var Typed: any
@Component({
  selector: 'app-book-layout',
  templateUrl: './book-layout.component.html',
  styleUrls: ['./book-layout.component.scss']
})
export class BookLayoutComponent implements OnInit {
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

    this.sections.forEach((section: HTMLElement) => {
      if (next >= (section.offsetTop - (section.clientHeight / 3))) {
        this.currentSection = section.id
      }
    })

    this.navLinks.forEach((nav: HTMLAnchorElement) => {
      if (nav.href.includes(this.currentSection)) {
        document.querySelector('.active').classList.remove('active')
        nav.classList.add('active')
      }
    })

  })

  navItems = [
    {
      id: '#home',
      label: 'Trang chủ'
    },
    {
      id: '#about',
      label: 'Về chúng tôi'
    },
    {
      id: '#ability',
      label: 'Dịch vụ'
    },
    {
      id: '#project',
      label: 'Gói thành viên'
    },
    {
      id: '#skills',
      label: 'Hướng dẫn'
    },
    // {
    //   id: '#project',
    //   label: 'Project'
    // },
    {
      id: '#contact',
      label: 'Liên hệ'
    }
  ]

  formEmail: FormGroup

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.formEmail = this.fb.group({
      mailAddress: [''],
      mailSubject: [''],
      mailContent: ['']
    })
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
        strings: ["Thư viện cá nhân của bạn.", "Thuê sách dễ dàng.", "Đọc không giới hạn."],
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
    this.navLinks.forEach((nav: HTMLAnchorElement) => {
      if (nav.href.includes(this.currentSection)) {
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

  sendMail(){
    console.log(this.formEmail.value)
    const data = {
      mailAddress: this.formEmail.value.mailAddress + '@gmail.com',
      mailSubject: this.formEmail.value.mailSubject,
      mailContent: this.formEmail.value.mailContent
    }
    this.http.post('https://67e5549418194932a585977b.mockapi.io/bookie/mail/email', data).subscribe((res) => {
      this.formEmail.reset()
    })
  }
}
