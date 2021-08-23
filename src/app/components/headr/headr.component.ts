import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

declare var jQuery: any;


@Component({
  selector: 'app-headr',
  templateUrl: './headr.component.html',
  styleUrls: ['./headr.component.css']
})
export class HeadrComponent implements OnInit {

  info: any;

  constructor(private token: TokenStorageService,
    private router: Router,
    public translate: TranslateService

    ) {
      this.translate.addLangs(["fr", "en"]);
      let defaultLang;
      //pour savoir quelle langue
      const browserLang = this.translate.getBrowserLang();
      defaultLang = browserLang.match(/en|fr/) ? browserLang : 'fr';
      this.translate.setDefaultLang(defaultLang);
      this.translate.use(defaultLang);

    }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    console.log(this.info)
  }
  toggleLogout(){
    this.token.signOut();
    window.location.reload();
  }

  changeLanguage(value:any): void {

    this.translate.use(value);
}

 /**
     * @description Determines whether open on
     */
    onOpen() {
      (function (a) {
          a(this).toggleClass("active");
          a(".side-navbar").toggleClass("shrinked");
          a(".content-inner").toggleClass("active");
          a("#toggle-btn").on("click", function (b) {
              b.preventDefault();

              if (a(window).outerWidth() > 1183) {
                  if (a("#toggle-btn").hasClass("active")) {
                      a(".navbar-header .brand-small").hide();
                      a(".navbar-header .brand-big").show()
                  } else {
                      a(".navbar-header .brand-small").show();
                      a(".navbar-header .brand-big").hide()
                  }
              }
              if (a(window).outerWidth() < 1183) {
                  a(".navbar-header .brand-small").show()
              }
          });
      }
      )(jQuery);
  }

  onOpenUserDetail() {
      (function (a) {
          a(".nav-item.dropdown").addClass("show");
          a(".dropdown-menu.notification").addClass("show");
          var x = document.getElementById("notifications").getAttribute("aria-expanded") ;
          x = "true"; 
          document.getElementById("notifications").setAttribute("aria-expanded", x);
          a(".nav-item.dropdown").on("click", function (b) {
              a(".nav-item.dropdown").removeClass("show");
              a(".dropdown-menu.notification").removeClass("show");
              x = "false"
              document.getElementById("notifications").setAttribute("aria-expanded", x);

          })
      })(jQuery);
  }

}
