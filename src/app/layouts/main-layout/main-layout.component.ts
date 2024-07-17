import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var $: any
declare var Typed: any
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      //menu link click smooth
      $("a")
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (e) {
          var data_id = $(this).attr("href");
          $("html, body").animate(
            {
              scrollTop: $(data_id).offset().top,
            },
            700
          );
        });
      //typing animation
      var type = new Typed(".typing", {
        strings: ["Programmer.", "Coder.", "Designer.", "Gymmer."],
        typeSpeed: 150,
        backType: 120,
        loop: true,
      });
      //navbar animation
      $(window).scroll(function () {
        if (this.scrollY > 20) {
          $(".navbar").addClass("sticky");
        } else {
          $(".navbar").removeClass("sticky");
        }
        if (this.scrollY > 100) {
          $(".backtop").addClass("show");
        } else {
          $(".backtop").removeClass("show");
        }
      });
      //toggle menu/navbar
      $(".menu-btn").click(function () {
        $(".navbar .menu").toggleClass("active");
        $(".menu-btn i").toggleClass("active");
      });
      // owl carousel use owl carousel library
      $(".carousel").owlCarousel({
        margin: 30,
        loop: true,
        autoplay:1000,
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
    
  }

}
